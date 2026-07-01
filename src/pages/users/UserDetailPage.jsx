import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import {
  faArrowLeft,
  faCalendar,
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import UserAvatar from '../../components/users/UserAvatar';
import AddUserModal from '../../components/addUserModal/AddUserModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import EmptyState from '../../components/emptyState/EmptyState';
import MultiSelectInput from '../../components/multiSelectInput/MultiSelectInput';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import useUserAssignedTrainings from '../../hooks/users/useUserAssignedTrainings';
import useUserAssignableTrainings from '../../hooks/users/useUserAssignableTrainings';
import useUserCompletedTrainings from '../../hooks/users/useUserCompletedTrainings';
import useUserAboutDetail from '../../hooks/users/useUserAboutDetail';
import useUserEditDetail from '../../hooks/users/useUserEditDetail';
import useUserMappedCompetencies from '../../hooks/users/useUserMappedCompetencies';
import useUserMutations from '../../hooks/users/useUserMutations';
import useUserTrainingStatus from '../../hooks/users/useUserTrainingStatus';
import useRoleOptions from '../../hooks/users/useRoleOptions';
import useUserFormCountries from '../../hooks/users/useUserFormCountries';
import { buildUserWritePayload } from '../../api/users/usersUtils';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import AccessRestrictedPage from '../AccessRestrictedPage';
import UserMappedCompetencies from '../../components/users/UserMappedCompetencies';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import detailMessages from './detailMessages';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import usersMessages from './messages';
import { getRoleDisplayLine } from './roleDisplay';
import './UserDetailPage.scss';

const UserDetailPage = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedTrainingIds, setSelectedTrainingIds] = useState([]);
  const [assignSearch, setAssignSearch] = useState('');
  const [debouncedAssignSearch, setDebouncedAssignSearch] = useState('');
  const [removeAssigned, setRemoveAssigned] = useState(null);
  const { componentAccess } = useUserRole();
  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canEditUser = Boolean(componentAccess?.users?.canEditUser ?? false);
  const canDeleteUser = Boolean(componentAccess?.users?.canDeleteUser ?? false);
  const canAssignTrainings = Boolean(componentAccess?.users?.canAssignTrainings ?? false);
  const canRemoveAssignedTrainings = Boolean(componentAccess?.users?.canRemoveAssignedTrainings ?? false);
  const canViewAssignedTrainings = Boolean(componentAccess?.users?.canViewAssignedTrainings ?? false);
  const canViewMappedCompetencies = Boolean(componentAccess?.users?.canViewMappedCompetencies ?? false);
  const canViewRegulatoryPassport = Boolean(componentAccess?.users?.canViewRegulatoryPassport ?? false);
  const showCountryField = Boolean(componentAccess?.users?.userFormFields?.showCountryField ?? false);
  const showRoleField = Boolean(componentAccess?.users?.userFormFields?.showRoleField ?? false);

  const { detail: userDetail, isLoading: isDetailLoading, isError: isDetailError } = useUserAboutDetail({
    userId,
    enabled: canViewUserAbout,
  });

  const {
    detail: editUserDetail,
    isLoading: isEditDetailLoading,
  } = useUserEditDetail({
    userId,
    enabled: canEditUser && editOpen,
  });

  const {
    items: completedTrainings,
    isLoading: isCompletedTrainingsLoading,
    isError: isCompletedTrainingsError,
    errorMessage: completedTrainingsErrorMessage,
  } = useUserCompletedTrainings({
    userId,
    enabled: canViewUserAbout && Boolean(userDetail),
  });

  const {
    items: trainingStatus,
    isLoading: isTrainingStatusLoading,
    isError: isTrainingStatusError,
    errorMessage: trainingStatusErrorMessage,
  } = useUserTrainingStatus({
    userId,
    enabled: canViewUserAbout && Boolean(userDetail),
  });

  const {
    items: mappedCompetencies,
    isLoading: isMappedCompetenciesLoading,
    isError: isMappedCompetenciesError,
    errorMessage: mappedCompetenciesErrorMessage,
  } = useUserMappedCompetencies({
    userId,
    enabled: canViewUserAbout && canViewMappedCompetencies && Boolean(userDetail),
  });

  const {
    items: assignedTrainings,
    isLoading: isAssignedTrainingsLoading,
    isError: isAssignedTrainingsError,
    errorMessage: assignedTrainingsErrorMessage,
  } = useUserAssignedTrainings({
    userId,
    enabled: canViewUserAbout && canViewAssignedTrainings && Boolean(userDetail),
  });

  const {
    options: assignableTrainingOptions,
    isLoading: isAssignableTrainingsLoading,
    isError: isAssignableTrainingsError,
    errorMessage: assignableTrainingsErrorMessage,
  } = useUserAssignableTrainings({
    userId,
    search: debouncedAssignSearch,
    enabled: canViewUserAbout
      && canViewAssignedTrainings
      && canAssignTrainings
      && assignOpen,
  });

  const { roleOptions } = useRoleOptions({
    enabled: canEditUser && editOpen && showRoleField,
  });

  const {
    options: countryOptions,
    isLoading: isCountriesLoading,
  } = useUserFormCountries({
    enabled: canEditUser && editOpen && showCountryField,
  });

  const {
    deleteMutation,
    assignTrainingsMutation,
    removeAssignedTrainingMutation,
    updateMutation,
  } = useUserMutations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAssignSearch(assignSearch.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [assignSearch]);

  useEffect(() => {
    if (!assignOpen) {
      setAssignSearch('');
      setDebouncedAssignSearch('');
    }
  }, [assignOpen]);

  if (!canViewUserAbout) {
    return <AccessRestrictedPage />;
  }

  if (isDetailLoading) {
    return (
      <SkeletonScreen
        variant={SKELETON_VARIANTS.TOOLBAR_TABLE}
        ariaLabel={formatMessage(detailMessages.backToUsers)}
      />
    );
  }

  if (isDetailError || !userDetail) {
    return <Navigate to={ADMIN_PATHS.users} replace />;
  }

  const canAssignSubmit = selectedTrainingIds.length > 0 && !assignTrainingsMutation.isPending;
  const profileImageUrl = location.state?.userProfileImage ?? userDetail.userProfileImage ?? '';
  const roleLabel = getRoleDisplayLine(userDetail);
  const statusLabel = hasDisplayValue(userDetail.status)
    ? userDetail.status
    : formatMessage(detailMessages.statusActiveDefault);

  const multiSelectOptions = assignableTrainingOptions.map(({ value, label }) => ({ value, label }));

  return (
    <section className="user-about-page">
      <div className="user-about-page__back">
        <button type="button" className="user-about-page__back-btn" onClick={() => navigate(ADMIN_PATHS.users)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          {formatMessage(detailMessages.backToUsers)}
        </button>
      </div>

      <div className="user-about-page__hero">
        <div className="user-about-page__hero-inner">
          <div className="user-about-page__hero-left">
            <UserAvatar variant="hero" name={userDetail.name} imageUrl={profileImageUrl} />
            <div>
              <h2 className="user-about-page__hero-name">{userDetail.name}</h2>
              <div className="user-about-page__hero-meta">
                <span className="user-about-page__hero-meta-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  {userDetail.email}
                </span>
                <span className="user-about-page__hero-meta-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {userDetail.country}
                </span>
              </div>
              <div className="user-about-page__hero-tags">
                {hasDisplayValue(roleLabel) && (
                  <span className="user-about-page__hero-tag">{roleLabel}</span>
                )}
                {hasDisplayValue(statusLabel) && (
                  <span className="user-about-page__hero-tag user-about-page__hero-tag--status">{statusLabel}</span>
                )}
              </div>
            </div>
          </div>

          {(canEditUser || canDeleteUser) && (
            <div className="user-about-page__hero-actions">
              {canEditUser && (
                <button type="button" className="user-about-page__hero-action" onClick={() => setEditOpen(true)}>
                  {formatMessage(detailMessages.edit)}
                </button>
              )}
              {canDeleteUser && (
                <button type="button" className="user-about-page__hero-action user-about-page__hero-action--danger" onClick={() => setDeleteOpen(true)}>
                  {formatMessage(detailMessages.delete)}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="user-about-page__stats">
        <div className="user-about-page__stat-card">
          <div className="user-about-page__stat-label">
            <FontAwesomeIcon icon={faCalendar} />
            <span>{formatMessage(detailMessages.createdAt)}</span>
          </div>
          <p className="user-about-page__stat-value">{userDetail.createdAt}</p>
        </div>
        <div className="user-about-page__stat-card">
          <div className="user-about-page__stat-label">
            <FontAwesomeIcon icon={faCalendar} />
            <span>{formatMessage(detailMessages.updatedAt)}</span>
          </div>
          <p className="user-about-page__stat-value">{userDetail.updatedAt}</p>
        </div>
        <div className="user-about-page__stat-card">
          <div className="user-about-page__stat-label">
            <FontAwesomeIcon icon={faClock} />
            <span>{formatMessage(detailMessages.lastLogin)}</span>
          </div>
          <p className="user-about-page__stat-value">{userDetail.lastLogin}</p>
        </div>
        <div className="user-about-page__stat-card">
          <div className="user-about-page__stat-label">
            <FontAwesomeIcon icon={faClock} />
            <span>{formatMessage(detailMessages.trainingsCompleted)}</span>
          </div>
          <p className="user-about-page__stat-value">{userDetail.trainingsCompleted}</p>
        </div>
      </div>

      <div className="user-about-page__grid">
        <div className="user-about-page__card">
          <div className="user-about-page__card-title">
            {formatMessage(detailMessages.completedTrainings)}
          </div>
          {isCompletedTrainingsLoading && (
            <SkeletonScreen
              variant={SKELETON_VARIANTS.GRID_CARDS}
              ariaLabel={formatMessage(detailMessages.completedTrainings)}
            />
          )}
          {isCompletedTrainingsError && (
            <EmptyState
              message={completedTrainingsErrorMessage
                || formatMessage(detailMessages.completedTrainingsLoadError)}
            />
          )}
          {!isCompletedTrainingsLoading && !isCompletedTrainingsError && completedTrainings.length === 0 && (
            <EmptyState message={formatMessage(detailMessages.sectionEmpty)} />
          )}
          {!isCompletedTrainingsLoading && !isCompletedTrainingsError && completedTrainings.length > 0 && (
            <div className="user-about-page__list">
              {completedTrainings.map(item => (
                <div key={item.id} className="user-about-page__list-item">
                  <div>
                    <p className="user-about-page__list-title">{item.title}</p>
                    {hasDisplayValue(item.completedOn) && (
                      <p className="user-about-page__list-sub">{item.completedOn}</p>
                    )}
                  </div>
                  {hasDisplayValue(item.score) && (
                    <span className="user-about-page__score">{item.score}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-about-page__card">
          <div className="user-about-page__card-title">
            {formatMessage(detailMessages.trainingStatus)}
          </div>
          {isTrainingStatusLoading && (
            <SkeletonScreen
              variant={SKELETON_VARIANTS.GRID_CARDS}
              ariaLabel={formatMessage(detailMessages.trainingStatus)}
            />
          )}
          {isTrainingStatusError && (
            <EmptyState
              message={trainingStatusErrorMessage
                || formatMessage(detailMessages.trainingStatusLoadError)}
            />
          )}
          {!isTrainingStatusLoading && !isTrainingStatusError && trainingStatus.length === 0 && (
            <EmptyState message={formatMessage(detailMessages.sectionEmpty)} />
          )}
          {!isTrainingStatusLoading && !isTrainingStatusError && trainingStatus.length > 0 && (
            <div className="user-about-page__status-list">
              {trainingStatus.map(item => (
                <div key={item.id} className="user-about-page__status-item">
                  <div className="user-about-page__status-row">
                    <p className="user-about-page__status-title">{item.title}</p>
                    {hasDisplayValue(item.status) && (
                      <span className="user-about-page__status-badge">{item.status}</span>
                    )}
                  </div>
                  <div className="user-about-page__progress">
                    <div className="user-about-page__progress-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {canViewMappedCompetencies && (
        <>
          {isMappedCompetenciesLoading && (
            <SkeletonScreen
              variant={SKELETON_VARIANTS.GRID_CARDS}
              ariaLabel={formatMessage(detailMessages.competenciesTitle, { value: 0 })}
            />
          )}
          {isMappedCompetenciesError && (
            <EmptyState
              message={mappedCompetenciesErrorMessage
                || formatMessage(detailMessages.mappedCompetenciesLoadError)}
            />
          )}
          {!isMappedCompetenciesLoading && !isMappedCompetenciesError && (
            <UserMappedCompetencies items={mappedCompetencies} />
          )}
        </>
      )}

      {canViewAssignedTrainings && (
        <div className="user-about-page__card user-about-page__assigned">
          <div className="user-about-page__assigned-head">
            <div className="user-about-page__card-title">
              {formatMessage(detailMessages.assignedTrainingsTitle, { count: assignedTrainings.length })}
            </div>
            {canAssignTrainings && (
              <button type="button" className="user-about-page__assigned-btn" onClick={() => setAssignOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
                {formatMessage(detailMessages.assignTraining)}
              </button>
            )}
          </div>
          {isAssignedTrainingsLoading && (
            <SkeletonScreen
              variant={SKELETON_VARIANTS.GRID_CARDS}
              ariaLabel={formatMessage(detailMessages.assignedTrainingsTitle, { count: 0 })}
            />
          )}
          {isAssignedTrainingsError && (
            <EmptyState
              message={assignedTrainingsErrorMessage
                || formatMessage(detailMessages.assignedTrainingsLoadError)}
            />
          )}
          {!isAssignedTrainingsLoading && !isAssignedTrainingsError && assignedTrainings.length === 0 && (
            <EmptyState message={formatMessage(detailMessages.sectionEmpty)} />
          )}
          {!isAssignedTrainingsLoading && !isAssignedTrainingsError && assignedTrainings.length > 0 && (
            <div className="user-about-page__assigned-list">
              {assignedTrainings.map(item => (
                <div key={item.id} className="user-about-page__assigned-item">
                  <div className="user-about-page__assigned-main">
                    <span className="user-about-page__assigned-link">{item.title}</span>
                    {hasDisplayValue(item.providerLine) && (
                      <p className="user-about-page__assigned-sub">{item.providerLine}</p>
                    )}
                  </div>
                  {canRemoveAssignedTrainings && (
                    <button
                      type="button"
                      className="user-about-page__assigned-remove"
                      aria-label={formatMessage(detailMessages.removeAssignedTraining)}
                      onClick={() => setRemoveAssigned(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {canViewRegulatoryPassport && (
        <div className="user-about-page__passport">
          <div className="user-about-page__passport-left">
            <div className="user-about-page__passport-icon" aria-hidden="true">RP</div>
            <div>
              <h3 className="user-about-page__passport-title">{formatMessage(detailMessages.passportTitle)}</h3>
              <p className="user-about-page__passport-desc">{formatMessage(detailMessages.passportDescription)}</p>
            </div>
          </div>
          <Link
            to={ADMIN_PATHS.userRegulatoryPassport(userId)}
            state={{
              userProfileImage: profileImageUrl,
              userListRow: location.state?.userListRow ?? null,
            }}
            className="user-about-page__passport-btn"
          >
            {formatMessage(detailMessages.passportButton)}
          </Link>
        </div>
      )}

      {canEditUser && (
        <AddUserModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          mode="edit"
          userDetail={editUserDetail}
          isLoadingDetail={isEditDetailLoading}
          isSaving={updateMutation.isPending}
          roleOptionRows={roleOptions}
          countryOptions={countryOptions}
          isCountriesLoading={isCountriesLoading}
          onSave={async (formValues) => {
            try {
              const result = await updateMutation.mutateAsync({
                userId,
                payload: buildUserWritePayload(formValues),
              });
              showToast({
                title: formatMessage(usersMessages.toastUserUpdatedTitle),
                description: result.message || formatMessage(usersMessages.toastUserUpdatedDescription, {
                  name: formValues.name.trim(),
                }),
              });
              setEditOpen(false);
            } catch (error) {
              showToast({
                title: formatMessage(usersMessages.updateErrorTitle),
                description: error?.message || formatMessage(usersMessages.updateError),
              });
            }
          }}
        />
      )}

      {canDeleteUser && (
        <ConfirmActionDialog
          isOpen={deleteOpen}
          title={formatMessage(usersMessages.deleteDialogTitle)}
          description={formatMessage(usersMessages.deleteDialogDescription, { name: userDetail.name })}
          cancelLabel={formatMessage(usersMessages.deleteDialogCancel)}
          confirmLabel={formatMessage(usersMessages.deleteDialogConfirm)}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={async () => {
            try {
              const result = await deleteMutation.mutateAsync(userId);
              showToast({
                title: formatMessage(usersMessages.toastUserDeletedTitle),
                description: result.message || formatMessage(usersMessages.toastUserDeletedDescription, {
                  name: userDetail.name,
                }),
              });
              setDeleteOpen(false);
              navigate(ADMIN_PATHS.users);
            } catch (error) {
              showToast({
                title: formatMessage(usersMessages.deleteErrorTitle),
                description: error?.message || formatMessage(usersMessages.deleteError),
              });
            }
          }}
        />
      )}

      {canAssignTrainings && (
        <PopupDialog
          isOpen={assignOpen}
          title={formatMessage(detailMessages.assignModalTitle, { name: userDetail.name })}
          onClose={() => {
            setAssignOpen(false);
            setSelectedTrainingIds([]);
          }}
          contentClassName="user-about-page__assign-modal"
        >
          <div className="user-about-page__assign-body">
            <p className="user-about-page__assign-desc">{formatMessage(detailMessages.assignModalDescription)}</p>
            {isAssignableTrainingsError && (
              <EmptyState
                message={assignableTrainingsErrorMessage
                  || formatMessage(detailMessages.assignableTrainingsLoadError)}
              />
            )}
            {!isAssignableTrainingsError && (
              <MultiSelectInput
                options={multiSelectOptions}
                selectedValues={selectedTrainingIds}
                onChange={setSelectedTrainingIds}
                disabled={isAssignableTrainingsLoading || assignTrainingsMutation.isPending}
                searchPlaceholder={formatMessage(detailMessages.assignModalSearchPlaceholder)}
                onSearchChange={setAssignSearch}
                filterOptionsLocally={false}
              />
            )}
            <div className="user-about-page__assign-actions">
              <button
                type="button"
                className="user-about-page__assign-cancel"
                onClick={() => {
                  setAssignOpen(false);
                  setSelectedTrainingIds([]);
                }}
              >
                {formatMessage(detailMessages.cancel)}
              </button>
              <button
                type="button"
                className="user-about-page__assign-confirm"
                disabled={!canAssignSubmit}
                onClick={async () => {
                  try {
                    const result = await assignTrainingsMutation.mutateAsync({
                      userId,
                      trainingIds: selectedTrainingIds,
                    });
                    showToast({
                      title: formatMessage(detailMessages.toastAssignedTitle),
                      description: result.message || formatMessage(detailMessages.toastAssignedDescription),
                    });
                    setAssignOpen(false);
                    setSelectedTrainingIds([]);
                  } catch (error) {
                    showToast({
                      title: formatMessage(detailMessages.assignTrainingsError),
                      description: error?.message || formatMessage(detailMessages.assignTrainingsError),
                    });
                  }
                }}
              >
                {formatMessage(detailMessages.assign)}
              </button>
            </div>
          </div>
        </PopupDialog>
      )}

      {canRemoveAssignedTrainings && (
        <ConfirmActionDialog
          isOpen={Boolean(removeAssigned)}
          title={formatMessage(detailMessages.removeAssignedDialogTitle)}
          description={formatMessage(detailMessages.removeAssignedDialogDescription, { title: removeAssigned?.title || '' })}
          cancelLabel={formatMessage(detailMessages.cancel)}
          confirmLabel={formatMessage(detailMessages.removeAssignedConfirm)}
          onCancel={() => setRemoveAssigned(null)}
          onConfirm={async () => {
            try {
              const result = await removeAssignedTrainingMutation.mutateAsync({
                userId,
                assignmentId: removeAssigned.id,
              });
              showToast({
                title: formatMessage(detailMessages.toastRemovedAssignedTitle),
                description: result.message || formatMessage(detailMessages.toastRemovedAssignedDescription),
              });
              setRemoveAssigned(null);
            } catch (error) {
              showToast({
                title: formatMessage(detailMessages.removeAssignedTrainingError),
                description: error?.message || formatMessage(detailMessages.removeAssignedTrainingError),
              });
            }
          }}
        />
      )}
    </section>
  );
};

export default UserDetailPage;
