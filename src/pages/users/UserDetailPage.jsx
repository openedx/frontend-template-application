import { useIntl } from '@edx/frontend-platform/i18n';
import { useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AddUserModal from '../../components/addUserModal/AddUserModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { useToast } from '../../components/toast/ToastProvider';
import AccessRestrictedPage from '../AccessRestrictedPage';
import UserCompetenciesCard from '../../components/userDetails/UserCompetenciesCard';
import UserHeroCard from '../../components/userDetails/UserHeroCard';
import UserPassportCard from '../../components/userDetails/UserPassportCard';
import UserStatsGrid from '../../components/userDetails/UserStatsGrid';
import UserTrainingPanels from '../../components/userDetails/UserTrainingPanels';
import { useUserRole } from '../../contexts/UserRoleContext';
import userDetailsData from '../../mock/users/userDetails.json';
import usersData from '../../mock/users/users.json';
import detailMessages from './detailMessages';
import usersMessages from './messages';
import '../../components/userDetails/UserDetails.scss';

const getInitials = name => name.split(' ')
  .slice(0, 2)
  .map(part => part.charAt(0))
  .join('')
  .toUpperCase();

const UserDetailPage = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { componentAccess } = useUserRole();
  const canViewUserDetail = Boolean(componentAccess?.users?.canViewUserDetail ?? true);
  const canEditUser = Boolean(componentAccess?.users?.canEditUser ?? true);
  const canDeleteUser = Boolean(componentAccess?.users?.canDeleteUser ?? true);

  if (!canViewUserDetail) {
    return <AccessRestrictedPage />;
  }

  const user = usersData.find(item => item.id === userId);
  if (!user) {
    return <Navigate to="/admin/users" replace />;
  }

  const defaultDetail = userDetailsData.find(item => item.id === 'default');
  const detail = userDetailsData.find(item => item.id === userId) || {
    ...defaultDetail,
    createdAt: user.joined,
  };

  const statItems = [
    { key: 'createdAt', label: formatMessage(detailMessages.createdAt), value: detail.createdAt },
    { key: 'updatedAt', label: formatMessage(detailMessages.updatedAt), value: detail.updatedAt },
    { key: 'lastLogin', label: formatMessage(detailMessages.lastLogin), value: detail.lastLogin },
    { key: 'trainingsCompleted', label: formatMessage(detailMessages.trainingsCompleted), value: String(detail.trainingsCompleted) },
  ];

  return (
    <section className="user-detail">
      <div className="user-detail__back">
        <button type="button" className="user-detail__back-btn" onClick={() => navigate('/admin/users')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          {formatMessage(detailMessages.backToUsers)}
        </button>
      </div>

      <UserHeroCard
        user={user}
        detail={detail}
        initials={getInitials(user.name)}
        roleLabel={user.role}
        statusLabel={detail.status}
        canEditUser={canEditUser}
        canDeleteUser={canDeleteUser}
        editLabel={formatMessage(detailMessages.edit)}
        deleteLabel={formatMessage(detailMessages.delete)}
        onEditClick={() => setEditOpen(true)}
        onDeleteClick={() => setDeleteOpen(true)}
      />

      <UserStatsGrid items={statItems} />

      <UserTrainingPanels
        completedTitle={formatMessage(detailMessages.completedTrainings)}
        statusTitle={formatMessage(detailMessages.trainingStatus)}
        completedTrainings={detail.completedTrainings}
        trainingStatus={detail.trainingStatus}
      />

      <UserCompetenciesCard
        title={formatMessage(detailMessages.competenciesTitle, { value: detail.competenciesSummary })}
        competencies={detail.competencies}
        proficiencyLabel={value => formatMessage(detailMessages.proficiency, { value })}
        completedLabel={formatMessage(detailMessages.competencyCompleted)}
        pendingLabel={formatMessage(detailMessages.competencyPending)}
      />

      <UserPassportCard
        title={formatMessage(detailMessages.passportTitle)}
        description={detail.passportDescription}
        buttonLabel={formatMessage(detailMessages.passportButton)}
      />

      {canEditUser && (
        <AddUserModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          mode="edit"
          initialValues={{
            name: user.name,
            email: user.email,
            country: user.country,
            role: user.role,
          }}
        />
      )}

      {canDeleteUser && (
        <ConfirmActionDialog
          isOpen={deleteOpen}
          title={formatMessage(usersMessages.deleteDialogTitle)}
          description={formatMessage(usersMessages.deleteDialogDescription, { name: user.name })}
          cancelLabel={formatMessage(usersMessages.deleteDialogCancel)}
          confirmLabel={formatMessage(usersMessages.deleteDialogConfirm)}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => {
            showToast({
              title: formatMessage(usersMessages.toastUserDeletedTitle),
              description: formatMessage(usersMessages.toastUserDeletedDescription, { name: user.name }),
            });
            setDeleteOpen(false);
          }}
        />
      )}
    </section>
  );
};

export default UserDetailPage;
