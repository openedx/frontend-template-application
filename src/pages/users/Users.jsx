import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState } from 'react';
import {
  faDownload,
  faEye,
  faPen,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { TablePaginationFooter } from '../../components/dataTable';
import AddUserModal from '../../components/addUserModal/AddUserModal';
import ImportFrameworkModal from '../../components/competencyFramework/ImportFrameworkModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import EmptyState from '../../components/emptyState/EmptyState';
import SearchInput from '../../components/searchInput/SearchInput';
import SearchableDropdown from '../../components/searchableDropdown/SearchableDropdown';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import userFormOptions from '../../mock/users/formOptions.json';
import usersData from '../../mock/users/users.json';
import messages from './messages';
import { getRoleDisplayLine } from './roleDisplay';
import '../competencyFramework/CompetencyFramework.scss';
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
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalInitialValues, setModalInitialValues] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);
  const [importUsersOpen, setImportUsersOpen] = useState(false);

  const canAddUser = Boolean(componentAccess?.users?.canAddUser ?? false);
  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canEditUser = Boolean(componentAccess?.users?.canEditUser ?? false);
  const canDeleteUser = Boolean(componentAccess?.users?.canDeleteUser ?? false);
  const canViewRoleColumn = Boolean(componentAccess?.users?.canViewRoleColumn ?? false);
  const canViewCompetencyRoleColumn = Boolean(componentAccess?.users?.canViewCompetencyRoleColumn ?? false);

  const canShowActions = canViewUserAbout || canEditUser || canDeleteUser;
  const canManageUsers = canAddUser || canEditUser;

  const importModalLabels = useMemo(() => ({
    title: formatMessage(messages.importModalTitle),
    description: formatMessage(messages.importModalDescription),
    chooseFile: formatMessage(messages.importModalChooseFile),
    cancel: formatMessage(messages.importModalCancel),
    import: formatMessage(messages.importModalImport),
  }), [formatMessage]);

  const roleOptions = [
    { value: 'all', label: formatMessage(messages.allRoles) },
    ...userFormOptions.roleOptions.map(item => ({
      value: item.value,
      label: item.label,
    })),
  ];

  const filteredUsers = useMemo(() => usersData.filter((user) => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const query = searchText.trim().toLowerCase();
    const matchesSearch = !query
      || user.name.toLowerCase().includes(query)
      || user.email.toLowerCase().includes(query);

    return matchesRole && matchesSearch;
  }), [roleFilter, searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const currentUsers = filteredUsers.slice((safePage - 1) * USERS_PER_PAGE, safePage * USERS_PER_PAGE);
  return (
    <section className="users-page">
      <div className="users-page__toolbar">
        <SearchInput
          value={searchText}
          placeholder={formatMessage(messages.searchPlaceholder)}
          onChange={(event) => {
            setSearchText(event.target.value);
            setPage(1);
          }}
        />

        <div className="users-page__actions">
          <SearchableDropdown
            value={roleFilter}
            options={roleOptions}
            onChange={(nextValue) => {
              setRoleFilter(nextValue);
              setPage(1);
            }}
            triggerLabel={
              roleOptions.find(item => item.value === roleFilter)?.label
              || formatMessage(messages.allRoles)
            }
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
          />

          {canManageUsers && (
            <>
              <button type="button" className="competency-framework-page__outline-button">
                <FontAwesomeIcon icon={faDownload} />
                {formatMessage(messages.downloadTemplate)}
              </button>
              <button
                type="button"
                className="competency-framework-page__outline-button"
                onClick={() => setImportUsersOpen(true)}
              >
                <FontAwesomeIcon icon={faUpload} />
                {formatMessage(messages.importFromExcel)}
              </button>
            </>
          )}

          {canAddUser && (
            <button
              type="button"
              className="competency-framework-page__primary-button"
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

      {filteredUsers.length === 0 ? (
        <div className="users-page__empty">
          <EmptyState message={formatMessage(messages.empty)} fullSize />
        </div>
      ) : (
        <div className="users-page__table-card">
          <div className="users-page__table-wrap">
            <table className="users-page__table">
              <thead>
                <tr className="users-page__thead-row">
                  <th className="users-page__th">{formatMessage(messages.columnUser)}</th>
                  {canViewRoleColumn && (
                    <th className="users-page__th">{formatMessage(messages.columnRole)}</th>
                  )}
                  {canViewCompetencyRoleColumn && (
                    <th className="users-page__th">{formatMessage(messages.columnCompetencyRole)}</th>
                  )}
                  {canShowActions && (
                    <th className="users-page__th users-page__th--right">{formatMessage(messages.columnActions)}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="users-page__tbody-row">
                    <td className="users-page__td">
                      <div className="users-page__identity">
                        <span className="users-page__avatar">{getInitials(user.name)}</span>
                        <div>
                          {canViewUserAbout ? (
                            <Link to={`/admin/users/${user.id}`} className="users-page__name users-page__name--link">
                              {user.name}
                            </Link>
                          ) : (
                            <p className="users-page__name">{user.name}</p>
                          )}
                          <p className="users-page__email">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {canViewRoleColumn && (
                      <td className="users-page__td">
                        <span className="users-page__role-pill">{getRoleDisplayLine(user)}</span>
                      </td>
                    )}

                    {canViewCompetencyRoleColumn && (
                      <td className="users-page__td">
                        <span className="users-page__competency-role">{user.competencyRole || ''}</span>
                      </td>
                    )}

                    {canShowActions && (
                      <td className="users-page__td users-page__td--right">
                        <div className="users-page__row-actions">
                          {canViewUserAbout && (
                            <Link
                              to={`/admin/users/${user.id}`}
                              className="users-page__icon-button"
                              aria-label={formatMessage(messages.viewAction)}
                            >
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
                                  name: user.name,
                                  email: user.email,
                                  country: user.country,
                                  role: user.role,
                                  roleSub: user.roleSub || '',
                                  competencyRole: user.competencyRole || '',
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
                              onClick={() => setDeleteUser(user)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePaginationFooter
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            paginationLabel="Users pagination"
            footerContent={formatMessage(messages.showingCount, {
              count: filteredUsers.length,
              total: usersData.length,
            })}
          />
        </div>
      )}

      {(canAddUser || canEditUser) && (
        <AddUserModal
          isOpen={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          mode={modalMode}
          initialValues={modalInitialValues}
        />
      )}

      {canManageUsers && (
        <ImportFrameworkModal
          isOpen={importUsersOpen}
          onClose={() => setImportUsersOpen(false)}
          labels={importModalLabels}
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
