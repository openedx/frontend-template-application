import { useIntl } from '@edx/frontend-platform/i18n';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import AddTeamMemberModal from '../../components/myTeam/AddTeamMemberModal';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { DataTable } from '../../components/dataTable';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import useMyTeamCandidateUsers from '../../hooks/myTeam/useMyTeamCandidateUsers';
import useMyTeamList from '../../hooks/myTeam/useMyTeamList';
import useMyTeamMutations from '../../hooks/myTeam/useMyTeamMutations';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import '../competencyFramework/CompetencyFramework.scss';
import './MyTeam.scss';

const MyTeam = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(null);
  const [page, setPage] = useState(1);

  const canAddTeamMember = Boolean(componentAccess?.myTeam?.canAddTeamMember);
  const canRemoveTeamMember = Boolean(componentAccess?.myTeam?.canRemoveTeamMember);

  const {
    items,
    count,
    totalPages,
    isLoading,
    isError,
    errorMessage,
  } = useMyTeamList({ page });

  const safePage = Math.min(page, Math.max(1, totalPages));

  useEffect(() => {
    if (page > totalPages) {
      setPage(Math.max(1, totalPages));
    }
  }, [page, totalPages]);

  const {
    dropdownOptions,
    isLoading: isCandidatesLoading,
    isError: isCandidatesError,
    errorMessage: candidatesErrorMessage,
  } = useMyTeamCandidateUsers({ enabled: addModalOpen });

  const { addMutation, removeMutation } = useMyTeamMutations();

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listLoadErrorTitle),
      description: errorMessage || formatMessage(messages.listLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  useEffect(() => {
    if (!addModalOpen || !isCandidatesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.addMemberErrorTitle),
      description: candidatesErrorMessage || formatMessage(messages.candidatesLoadError),
    });
  }, [
    addModalOpen,
    candidatesErrorMessage,
    formatMessage,
    isCandidatesError,
    showToast,
  ]);

  const columns = useMemo(() => {
    const tableColumns = [
      {
        key: 'name',
        header: formatMessage(messages.columnName),
        renderCell: (row) => (
          hasDisplayValue(row.name) ? (
            <span className="my-team-page__name">{row.name}</span>
          ) : null
        ),
      },
      {
        key: 'email',
        header: formatMessage(messages.columnEmail),
        renderCell: (row) => (
          hasDisplayValue(row.email) ? (
            <span className="my-team-page__email">{row.email}</span>
          ) : null
        ),
      },
    ];

    if (canRemoveTeamMember) {
      tableColumns.push({
        key: 'actions',
        header: formatMessage(messages.columnAction),
        align: 'right',
        renderCell: (row) => (
          <div className="my-team-page__row-actions">
            <button
              type="button"
              className="my-team-page__icon-button my-team-page__icon-button--danger"
              aria-label={formatMessage(messages.removeMember)}
              onClick={() => setPendingRemove(row)}
            >
              <FontAwesomeIcon icon={faTrash} aria-hidden />
            </button>
          </div>
        ),
      });
    }

    return tableColumns;
  }, [canRemoveTeamMember, formatMessage]);

  const handleAddTeamMember = async (userId) => {
    try {
      const result = await addMutation.mutateAsync(userId);
      showToast({
        title: formatMessage(messages.addMemberSuccessTitle),
        description: result.message || formatMessage(messages.addMemberSuccess),
      });
      setAddModalOpen(false);
    } catch (error) {
      showToast({
        title: formatMessage(messages.addMemberErrorTitle),
        description: error?.message || formatMessage(messages.addMemberError),
      });
    }
  };

  const handleRemoveTeamMember = async () => {
    if (!pendingRemove?.id) {
      return;
    }

    try {
      const result = await removeMutation.mutateAsync(pendingRemove.id);
      showToast({
        title: formatMessage(messages.removeMemberSuccessTitle),
        description: result.message || formatMessage(messages.removeMemberSuccess),
      });
      setPendingRemove(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.removeMemberErrorTitle),
        description: error?.message || formatMessage(messages.removeMemberError),
      });
    }
  };

  const showTable = !isLoading && !isError && count > 0;
  const showEmpty = !isLoading && !isError && count === 0;

  const pageHeader = (
    <div className="my-team-page__header">
      <div className="my-team-page__intro">
        <h1 className="my-team-page__title">{formatMessage(messages.pageTitle)}</h1>
        <p className="my-team-page__subtitle">{formatMessage(messages.pageSubtitle)}</p>
      </div>

      {canAddTeamMember && (
        <button
          type="button"
          className="competency-framework-page__primary-button"
          onClick={() => setAddModalOpen(true)}
        >
          <FontAwesomeIcon icon={faUserPlus} aria-hidden />
          {formatMessage(messages.addTeamMember)}
        </button>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <section className="my-team-page">
        {pageHeader}
        <SkeletonScreen variant={SKELETON_VARIANTS.TOOLBAR_TABLE} tablePreset="requestedTrainings" />
      </section>
    );
  }

  return (
    <section className="my-team-page">
      {pageHeader}

      {isError && (
        <EmptyState
          fullSize
          className="my-team-page__empty"
          message={errorMessage || formatMessage(messages.listLoadError)}
        />
      )}

      {showEmpty && (
        <EmptyState
          fullSize
          className="my-team-page__empty"
          message={formatMessage(messages.empty)}
        />
      )}

      {showTable && (
        <DataTable
          columns={columns}
          rows={items}
          rowKey="id"
          minWidth={640}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          paginationLabel={formatMessage(messages.paginationLabel)}
          footerContent={formatMessage(
            messages.showingCount,
            buildPaginationShowingParams(items, count),
          )}
        />
      )}

      {canAddTeamMember && (
        <AddTeamMemberModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          dropdownOptions={dropdownOptions}
          isCandidatesLoading={isCandidatesLoading}
          isSaving={addMutation.isPending}
          onSubmit={handleAddTeamMember}
        />
      )}

      {canRemoveTeamMember && (
        <ConfirmActionDialog
          isOpen={Boolean(pendingRemove)}
          title={formatMessage(messages.removeDialogTitle)}
          description={formatMessage(messages.removeDialogDescription, {
            name: pendingRemove?.name || '',
          })}
          cancelLabel={formatMessage(messages.addModalCancel)}
          confirmLabel={formatMessage(messages.removeDialogConfirm)}
          onCancel={() => setPendingRemove(null)}
          onConfirm={handleRemoveTeamMember}
        />
      )}
    </section>
  );
};

export default MyTeam;
