import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AddUserModal from '../../components/addUserModal/AddUserModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import DataTable from '../../components/dataTable/DataTable';
import SearchInput from '../../components/searchInput/SearchInput';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import userModeFilterOptions from '../../mock/users/filterOptions.json';
import usersData from '../../mock/users/users.json';
import messages from './messages';
import './Users.scss';

const USERS_PER_PAGE = 8;

const getInitials = name => name.split(' ')
  .slice(0, 2)
  .map(part => part.charAt(0))
  .join('')
  .toUpperCase();

const Users = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const [searchText, setSearchText] = useState('');
  const [modeFilter, setModeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalInitialValues, setModalInitialValues] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);

  const canShowTable = Boolean(componentAccess?.users?.showTable ?? true);
  const canSearchAndFilter = Boolean(componentAccess?.users?.canSearchAndFilter ?? true);
  const canAddUser = Boolean(componentAccess?.users?.canAddUser ?? true);
  const canViewUserDetail = Boolean(componentAccess?.users?.canViewUserDetail ?? true);
  const canEditUser = Boolean(componentAccess?.users?.canEditUser ?? true);
  const canDeleteUser = Boolean(componentAccess?.users?.canDeleteUser ?? true);
  const canShowActions = canViewUserDetail || canEditUser || canDeleteUser;
  const shouldRenderToolbar = canSearchAndFilter || canAddUser;

  const modeOptions = userModeFilterOptions.map(item => ({
    value: item.value,
    label: item.messageKey ? formatMessage(messages[item.messageKey]) : item.label,
  }));

  const filteredUsers = useMemo(() => usersData.filter((user) => {
    const matchesMode = !canSearchAndFilter || modeFilter === 'all' || user.mode === modeFilter;
    const query = canSearchAndFilter ? searchText.trim().toLowerCase() : '';
    const matchesSearch = !query
      || user.name.toLowerCase().includes(query)
      || user.email.toLowerCase().includes(query);

    return matchesMode && matchesSearch;
  }), [canSearchAndFilter, modeFilter, searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const currentUsers = filteredUsers.slice((safePage - 1) * USERS_PER_PAGE, safePage * USERS_PER_PAGE);
  const columns = [
    {
      key: 'user',
      header: formatMessage(messages.columnUser),
      renderCell: user => (
        <div className="users-page__identity">
          <span className="users-page__avatar">{getInitials(user.name)}</span>
          <div>
            {canViewUserDetail ? (
              <Link to={`/admin/users/${user.id}`} className="users-page__name users-page__name--link">
                {user.name}
              </Link>
            ) : (
              <p className="users-page__name">{user.name}</p>
            )}
            <p className="users-page__email">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: formatMessage(messages.columnRole),
      renderCell: user => <span className="users-page__role-pill">{user.role}</span>,
    },
    { key: 'country', header: formatMessage(messages.columnCountry) },
    { key: 'joined', header: formatMessage(messages.columnJoined) },
    ...(canShowActions ? [{
      key: 'actions',
      header: formatMessage(messages.columnActions),
      align: 'right',
      renderCell: row => (
        <div className="users-page__row-actions">
          {canViewUserDetail && (
            <Link to={`/admin/users/${row.id}`} className="users-page__icon-button" aria-label={formatMessage(messages.viewAction)}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          )}
          {canEditUser && (
            <button
              type="button"
              className="users-page__icon-button"
              aria-label={formatMessage(messages.editAction)}
              onClick={() => {
                setModalMode('edit');
                setModalInitialValues({
                  name: row.name,
                  email: row.email,
                  country: row.country,
                  role: row.role,
                });
                setAddUserOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
          {canDeleteUser && (
            <button
              type="button"
              className="users-page__icon-button users-page__icon-button--danger"
              aria-label={formatMessage(messages.deleteAction)}
              onClick={() => setDeleteUser(row)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      ),
    },
    ] : []),
  ];

  return (
    <section className="users-page">
      {shouldRenderToolbar && (
        <div className="users-page__toolbar">
          {canSearchAndFilter && (
            <SearchInput
              value={searchText}
              placeholder={formatMessage(messages.searchPlaceholder)}
              onChange={(event) => {
                setSearchText(event.target.value);
                setPage(1);
              }}
            />
          )}

          <div className="users-page__actions">
            {canSearchAndFilter && (
              <SearchableDropdown
                value={modeFilter}
                options={modeOptions}
                onChange={(nextValue) => {
                  setModeFilter(nextValue);
                  setPage(1);
                }}
                triggerLabel={
                  modeOptions.find(item => item.value === modeFilter)?.label
                  || formatMessage(messages.allModes)
                }
                searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
                noOptionsText={formatMessage(messages.dropdownNoOptions)}
              />
            )}
            {canAddUser && (
              <button
                type="button"
                className="users-page__add-button"
                onClick={() => {
                  setModalMode('add');
                  setModalInitialValues({});
                  setAddUserOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                {formatMessage(messages.addUser)}
              </button>
            )}
          </div>
        </div>
      )}

      {canShowTable && (
        <DataTable
          columns={columns}
          rows={currentUsers}
          rowKey="id"
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          footerContent={formatMessage(messages.showingCount, {
            count: filteredUsers.length,
            total: usersData.length,
          })}
        />
      )}

      {(canAddUser || canEditUser) && (
        <AddUserModal
          isOpen={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          mode={modalMode}
          initialValues={modalInitialValues}
        />
      )}

      {canDeleteUser && (
        <ConfirmActionDialog
          isOpen={Boolean(deleteUser)}
          title={formatMessage(messages.deleteDialogTitle)}
          description={formatMessage(messages.deleteDialogDescription, { name: deleteUser?.name || '' })}
          cancelLabel={formatMessage(messages.deleteDialogCancel)}
          confirmLabel={formatMessage(messages.deleteDialogConfirm)}
          onCancel={() => setDeleteUser(null)}
          onConfirm={() => {
            showToast({
              title: formatMessage(messages.toastUserDeletedTitle),
              description: formatMessage(messages.toastUserDeletedDescription, { name: deleteUser?.name || '' }),
            });
            setDeleteUser(null);
          }}
        />
      )}
    </section>
  );
};

export default Users;
