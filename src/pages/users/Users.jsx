import { useIntl } from '@edx/frontend-platform/i18n';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
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
import UserListAvatar from '../../components/users/UserListAvatar';
import UsersRoleFilter, { USERS_ROLE_FILTER_ALL } from '../../components/users/UsersRoleFilter';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { fetchUserDetail } from '../../api/users/usersApi';
import {
  buildUserWritePayload,
  findRoleOptionByValue,
  mapUserDetail,
  roleOptionHasSubOptions,
} from '../../api/users/usersUtils';
import useRoleOptions from '../../hooks/users/useRoleOptions';
import useUserDetail, { userDetailQueryKey } from '../../hooks/users/useUserDetail';
import useUserFormCountries from '../../hooks/users/useUserFormCountries';
import useUserMutations from '../../hooks/users/useUserMutations';
import useUsersList from '../../hooks/users/useUsersList';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import { getRoleDisplayLine } from './roleDisplay';
import '../competencyFramework/CompetencyFramework.scss';
import './Users.scss';

const Users = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { componentAccess } = useUserRole();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(USERS_ROLE_FILTER_ALL);
  const [providerFilter, setProviderFilter] = useState(USERS_ROLE_FILTER_ALL);
  const [page, setPage] = useState(1);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingUserId, setEditingUserId] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [importUsersOpen, setImportUsersOpen] = useState(false);
  const [isEditUserLoading, setIsEditUserLoading] = useState(false);

  const canAddUser = Boolean(componentAccess?.users?.canAddUser ?? false);
  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canEditUser = Boolean(componentAccess?.users?.canEditUser ?? false);
  const canDeleteUser = Boolean(componentAccess?.users?.canDeleteUser ?? false);
  const canViewRoleColumn = Boolean(componentAccess?.users?.canViewRoleColumn ?? false);
  const canViewCompetencyRoleColumn = Boolean(componentAccess?.users?.canViewCompetencyRoleColumn ?? false);

  const canShowActions = canViewUserAbout || canEditUser || canDeleteUser;
  const canManageUsers = canAddUser || canEditUser;

  const {
    roleOptions,
    isError: isRoleOptionsError,
    errorMessage: roleOptionsErrorMessage,
  } = useRoleOptions({ enabled: true });

  const selectedFilterRole = useMemo(
    () => findRoleOptionByValue(roleOptions, roleFilter),
    [roleFilter, roleOptions],
  );

  const showProviderFilter = roleFilter !== USERS_ROLE_FILTER_ALL
    && roleOptionHasSubOptions(selectedFilterRole);

  const listRoleValue = roleFilter !== USERS_ROLE_FILTER_ALL ? roleFilter : undefined;
  const listProviderId = showProviderFilter && providerFilter !== USERS_ROLE_FILTER_ALL
    ? providerFilter
    : undefined;

  const {
    items: users,
    count: usersCount,
    totalPages,
    isLoading: isListLoading,
    isError: isListError,
    errorMessage: listErrorMessage,
  } = useUsersList({
    page,
    search: debouncedSearch,
    roleValue: listRoleValue,
    providerId: listProviderId,
  });

  const isEditing = addUserOpen && modalMode === 'edit' && editingUserId != null;

  const { detail: userDetail } = useUserDetail({
    userId: editingUserId,
    enabled: isEditing,
  });

  const {
    options: countryOptions,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage: countriesErrorMessage,
  } = useUserFormCountries({ enabled: addUserOpen });

  const { createMutation, updateMutation, deleteMutation } = useUserMutations();

  const closeAddUserModal = () => {
    setAddUserOpen(false);
    setEditingUserId(null);
    setModalMode('add');
  };

  const importModalLabels = useMemo(() => ({
    title: formatMessage(messages.importModalTitle),
    description: formatMessage(messages.importModalDescription),
    chooseFile: formatMessage(messages.importModalChooseFile),
    cancel: formatMessage(messages.importModalCancel),
    import: formatMessage(messages.importModalImport),
  }), [formatMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (!isListError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listErrorTitle),
      description: listErrorMessage || formatMessage(messages.listLoadError),
    });
  }, [formatMessage, isListError, listErrorMessage, showToast]);

  useEffect(() => {
    if (!isRoleOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.roleOptionsErrorTitle),
      description: roleOptionsErrorMessage || formatMessage(messages.roleOptionsLoadError),
    });
  }, [formatMessage, isRoleOptionsError, roleOptionsErrorMessage, showToast]);

  useEffect(() => {
    if (!addUserOpen || !isCountriesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.countriesErrorTitle),
      description: countriesErrorMessage || formatMessage(messages.countriesLoadError),
    });
  }, [addUserOpen, countriesErrorMessage, formatMessage, isCountriesError, showToast]);

  const openAddUser = () => {
    setModalMode('add');
    setEditingUserId(null);
    setAddUserOpen(true);
  };

  const openEditUser = async (user) => {
    const userId = user?.id;
    if (userId == null || userId === '') {
      return;
    }

    setIsEditUserLoading(true);
    try {
      await queryClient.fetchQuery({
        queryKey: userDetailQueryKey(userId),
        queryFn: async () => {
          const result = await fetchUserDetail({ formatMessage, userId });

          if (!result.ok) {
            throw new Error(result.message);
          }

          const detail = mapUserDetail(result.data);
          if (!detail) {
            throw new Error(formatMessage(messages.detailLoadError));
          }

          return detail;
        },
      });

      setEditingUserId(userId);
      setModalMode('edit');
      setAddUserOpen(true);
    } catch (error) {
      showToast({
        title: formatMessage(messages.detailErrorTitle),
        description: error?.message || formatMessage(messages.detailLoadError),
      });
    } finally {
      setIsEditUserLoading(false);
    }
  };

  const handleSaveUser = async (formValues) => {
    const payload = buildUserWritePayload(formValues);

    try {
      if (modalMode === 'edit') {
        await updateMutation.mutateAsync({ userId: editingUserId, payload });
        showToast({
          title: formatMessage(messages.toastUserUpdatedTitle),
          description: formatMessage(messages.toastUserUpdatedDescription, {
            name: formValues.name.trim(),
          }),
        });
      } else {
        await createMutation.mutateAsync(payload);
        showToast({
          title: formatMessage(messages.toastUserCreatedTitle),
          description: formatMessage(messages.toastUserCreatedDescription, {
            name: formValues.name.trim(),
          }),
        });
      }
      closeAddUserModal();
    } catch (error) {
      const fallback = modalMode === 'edit'
        ? formatMessage(messages.updateError)
        : formatMessage(messages.createError);
      const title = modalMode === 'edit'
        ? formatMessage(messages.updateErrorTitle)
        : formatMessage(messages.createErrorTitle);

      showToast({
        title,
        description: error?.message || fallback,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUser?.id) {
      return;
    }

    const userName = hasDisplayValue(deleteUser.name) ? deleteUser.name : '';

    try {
      await deleteMutation.mutateAsync(deleteUser.id);
      setDeleteUser(null);
      showToast({
        title: formatMessage(messages.toastUserDeletedTitle),
        description: formatMessage(messages.toastUserDeletedDescription, { name: userName }),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.deleteErrorTitle),
        description: error?.message || formatMessage(messages.deleteError),
      });
    }
  };

  return (
    <section className="users-page">
      <div className={`users-page__toolbar ${showProviderFilter ? 'users-page__toolbar--with-subfilter' : ''}`}>
        <SearchInput
          value={searchInput}
          placeholder={formatMessage(messages.searchPlaceholder)}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <div className="users-page__actions">
          <UsersRoleFilter
            roleFilter={roleFilter}
            providerFilter={providerFilter}
            roleOptions={roleOptions}
            allRolesLabel={formatMessage(messages.allRoles)}
            allProvidersLabel={formatMessage(messages.allProviders)}
            searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
            noOptionsText={formatMessage(messages.dropdownNoOptions)}
            onRoleChange={(nextValue) => {
              setRoleFilter(nextValue);
              setProviderFilter(USERS_ROLE_FILTER_ALL);
              setPage(1);
            }}
            onProviderChange={(nextValue) => {
              setProviderFilter(nextValue);
              setPage(1);
            }}
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
              onClick={openAddUser}
            >
              <FontAwesomeIcon icon={faPlus} />
              {formatMessage(messages.addUser)}
            </button>
          )}
        </div>
      </div>

      {isListLoading && (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.TOOLBAR_TABLE}
          tablePreset="users"
          rows={6}
          showPrimaryButton={false}
          showSearch={false}
          showFilter={false}
          ariaLabel={formatMessage(messages.listLoading)}
        />
      )}

      {!isListLoading && isListError && (
        <div className="users-page__empty">
          <EmptyState message={listErrorMessage || formatMessage(messages.listLoadError)} fullSize />
        </div>
      )}

      {!isListLoading && !isListError && users.length === 0 && (
        <div className="users-page__empty">
          <EmptyState message={formatMessage(messages.noUsersFound)} fullSize />
        </div>
      )}

      {!isListLoading && !isListError && users.length > 0 && (
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
                {users.map((user) => (
                  <tr key={user.id} className="users-page__tbody-row">
                    <td className="users-page__td">
                      <div className="users-page__identity">
                        <UserListAvatar name={user.name} imageUrl={user.userProfileImage} />
                        <div>
                          {canViewUserAbout ? (
                            <Link
                              to={ADMIN_PATHS.userDetail(user.id)}
                              state={{ userProfileImage: user.userProfileImage }}
                              className="users-page__name users-page__name--link"
                            >
                              {user.name}
                            </Link>
                          ) : (
                            <p className="users-page__name">{user.name}</p>
                          )}
                          {hasDisplayValue(user.email) && (
                            <p className="users-page__email">{user.email}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {canViewRoleColumn && (
                      <td className="users-page__td">
                        {hasDisplayValue(getRoleDisplayLine(user)) && (
                          <span className="users-page__role-pill">{getRoleDisplayLine(user)}</span>
                        )}
                      </td>
                    )}

                    {canViewCompetencyRoleColumn && (
                      <td className="users-page__td">
                        {hasDisplayValue(user.competencyRole) && (
                          <span className="users-page__competency-role">{user.competencyRole}</span>
                        )}
                      </td>
                    )}

                    {canShowActions && (
                      <td className="users-page__td users-page__td--right">
                        <div className="users-page__row-actions">
                          {canViewUserAbout && (
                            <Link
                              to={ADMIN_PATHS.userDetail(user.id)}
                              state={{ userProfileImage: user.userProfileImage }}
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
                              disabled={isEditUserLoading}
                              onClick={() => openEditUser(user)}
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
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            paginationLabel={formatMessage(messages.paginationLabel)}
            footerContent={formatMessage(
              messages.showingCount,
              buildPaginationShowingParams(users, usersCount),
            )}
          />
        </div>
      )}

      {(canAddUser || canEditUser) && (
        <AddUserModal
          isOpen={addUserOpen}
          onClose={closeAddUserModal}
          mode={modalMode}
          userDetail={userDetail}
          isLoadingDetail={false}
          isSaving={createMutation.isPending || updateMutation.isPending}
          roleOptionRows={roleOptions}
          countryOptions={countryOptions}
          isCountriesLoading={isCountriesLoading}
          onSave={handleSaveUser}
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
          description={formatMessage(messages.deleteDialogDescription, {
            name: hasDisplayValue(deleteUser?.name) ? deleteUser.name : '',
          })}
          cancelLabel={formatMessage(messages.deleteDialogCancel)}
          confirmLabel={formatMessage(messages.deleteDialogConfirm)}
          onCancel={() => setDeleteUser(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </section>
  );
};

export default Users;
