import { useIntl } from '@edx/frontend-platform/i18n';
import { useMemo, useState, useEffect } from 'react';
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
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import UserAvatar from '../../components/users/UserAvatar';
import AddUserModal from '../../components/addUserModal/AddUserModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import MultiSelectInput from '../../components/multiSelectInput/MultiSelectInput';
import PopupDialog from '../../components/popupDialog/PopupDialog';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import { resolveUserAboutDetailMock, resolveUserAssignedTrainingsMock, resolveUserCompletedTrainingsMock, resolveUserMappedCompetenciesMock, resolveUserTrainingStatusMock } from '../../api/users/userPageMockData';
import { mapUserAboutDetail, mergeUserIdentityIntoAboutDetail } from '../../api/users/usersUtils';
import useUserDetail from '../../hooks/users/useUserDetail';
import userDetailsMock from '../../mock/users/userDetails.json';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import AccessRestrictedPage from '../AccessRestrictedPage';
import UserMappedCompetencies from '../../components/users/UserMappedCompetencies';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import trainingCatalog from '../../mock/trainingCatalog/trainings.json';
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

  const completedTrainings = useMemo(() => resolveUserCompletedTrainingsMock(), []);
  const trainingStatus = useMemo(() => resolveUserTrainingStatusMock(), []);
  const mappedCompetencies = useMemo(() => resolveUserMappedCompetenciesMock(), []);

  const listRowFromState = location.state?.userListRow ?? null;

  const { detail: apiDetail, isLoading: isApiDetailLoading } = useUserDetail({
    userId,
    enabled: !listRowFromState,
  });

  const userDetail = useMemo(() => {
    const fromNavigation = resolveUserAboutDetailMock(userId, listRowFromState);
    if (fromNavigation) {
      return fromNavigation;
    }

    if (apiDetail) {
      const template = mapUserAboutDetail(userDetailsMock);
      if (!template) {
        return null;
      }

      return mergeUserIdentityIntoAboutDetail(template, {
        id: apiDetail.id,
        name: apiDetail.name,
        email: apiDetail.email,
        country: apiDetail.country,
        role: apiDetail.role,
        roleSub: '',
        competencyRole: apiDetail.competencyRole ?? '',
        userProfileImage: apiDetail.userProfileImage,
        joined: '',
      });
    }

    return null;
  }, [apiDetail, listRowFromState, userId]);

  const [assignedTrainings, setAssignedTrainings] = useState([]);

  useEffect(() => {
    setAssignedTrainings(resolveUserAssignedTrainingsMock());
  }, [userId]);

  const availableTrainingOptions = useMemo(
    () => trainingCatalog
      .filter(t => !assignedTrainings.some(a => a.id === t.id))
      .slice(0, 40)
      .map(t => ({ value: t.id, label: `${t.title} — ${t.provider} • ${t.duration}` })),
    [assignedTrainings],
  );

  if (!canViewUserAbout) {
    return <AccessRestrictedPage />;
  }

  if (!userDetail) {
    if (isApiDetailLoading) {
      return (
        <SkeletonScreen
          variant={SKELETON_VARIANTS.TOOLBAR_TABLE}
          ariaLabel={formatMessage(detailMessages.backToUsers)}
        />
      );
    }

    return <Navigate to={ADMIN_PATHS.users} replace />;
  }

  const canAssignSubmit = selectedTrainingIds.length > 0;
  const profileImageUrl = location.state?.userProfileImage ?? userDetail.userProfileImage ?? '';
  const roleLabel = getRoleDisplayLine(userDetail);
  const statusLabel = hasDisplayValue(userDetail.status)
    ? userDetail.status
    : formatMessage(detailMessages.statusActiveDefault);

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
        </div>

        <div className="user-about-page__card">
          <div className="user-about-page__card-title">
            {formatMessage(detailMessages.trainingStatus)}
          </div>
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
        </div>
      </div>

      {canViewMappedCompetencies && (
        <UserMappedCompetencies items={mappedCompetencies} />
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
          <div className="user-about-page__assigned-list">
            {assignedTrainings.map(item => (
              <div key={item.id} className="user-about-page__assigned-item">
                <div className="user-about-page__assigned-main">
                  <a className="user-about-page__assigned-link" href={ADMIN_PATHS.trainingCatalogDetail(item.id)}>
                    {item.title}
                  </a>
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
          initialValues={{
            name: userDetail.name,
            email: userDetail.email,
            country: userDetail.country,
            role: userDetail.role,
            roleSub: userDetail.roleSub || '',
            competencyRole: userDetail.competencyRole || '',
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
          onConfirm={() => {
            showToast({
              title: formatMessage(usersMessages.toastUserDeletedTitle),
              description: formatMessage(usersMessages.toastUserDeletedDescription, { name: userDetail.name }),
            });
            setDeleteOpen(false);
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
            <MultiSelectInput
              options={availableTrainingOptions}
              selectedValues={selectedTrainingIds}
              onChange={setSelectedTrainingIds}
            />
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
                onClick={() => {
                  const next = trainingCatalog
                    .filter(t => selectedTrainingIds.includes(t.id))
                    .map(t => ({
                      id: t.id,
                      title: t.title,
                      providerLine: `${t.provider} • ${t.duration}`,
                    }));
                  setAssignedTrainings(prev => [...next, ...prev]);
                  showToast({
                    title: formatMessage(detailMessages.toastAssignedTitle),
                    description: formatMessage(detailMessages.toastAssignedDescription),
                  });
                  setAssignOpen(false);
                  setSelectedTrainingIds([]);
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
          onConfirm={() => {
            setAssignedTrainings(prev => prev.filter(t => t.id !== removeAssigned?.id));
            showToast({
              title: formatMessage(detailMessages.toastRemovedAssignedTitle),
              description: formatMessage(detailMessages.toastRemovedAssignedDescription),
            });
            setRemoveAssigned(null);
          }}
        />
      )}
    </section>
  );
};

export default UserDetailPage;
