import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faBookOpen, faExternalLinkAlt, faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import { DataTable } from '../../components/dataTable';
import { EmptyState } from '../../components/emptyState';
import SearchInput from '../../components/searchInput/SearchInput';
import UpdateTrainingStatusModal from '../../components/myTraining/UpdateTrainingStatusModal';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import {
  getMyTrainingStatusBadgeClass,
  getMyTrainingStatusLabel,
  MY_TRAINING_STATUS,
} from '../../api/myTraining/myTrainingUtils';
import useMyTrainingList from '../../hooks/myTraining/useMyTrainingList';
import useMyTrainingMutations from '../../hooks/myTraining/useMyTrainingMutations';
import useMyTrainingStatusOptions from '../../hooks/myTraining/useMyTrainingStatusOptions';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import './MyTraining.scss';

const MyTraining = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { componentAccess } = useUserRole();
  const canUpdateTraining = Boolean(componentAccess?.myTraining?.canUpdateTraining);

  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [startConfirmTraining, setStartConfirmTraining] = useState(null);

  const { statusOptions } = useMyTrainingStatusOptions({ enabled: true });
  const { updateMutation, startMutation } = useMyTrainingMutations();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchText.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const {
    items,
    count,
    totalPages,
    isLoading,
    isError,
    errorMessage,
  } = useMyTrainingList({
    page,
    search: searchQuery,
  });

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.listLoadErrorTitle),
      description: errorMessage || formatMessage(messages.listLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  const safePage = Math.min(page, Math.max(1, totalPages));
  const showTableSkeleton = isLoading && items.length === 0;
  const showEmpty = !isLoading && !isError && items.length === 0;
  const showTable = !isError && items.length > 0;

  const handleAccessClick = (training) => {
    if (training.status === MY_TRAINING_STATUS.NOT_STARTED) {
      setStartConfirmTraining(training);
      return;
    }

    if (hasDisplayValue(training.accessUrl)) {
      window.open(training.accessUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleConfirmStart = async () => {
    if (!startConfirmTraining?.id) {
      return;
    }

    const accessUrl = startConfirmTraining.accessUrl;
    const trainingName = startConfirmTraining.title;

    try {
      const result = await startMutation.mutateAsync({
        trainingId: startConfirmTraining.id,
      });

      showToast({
        title: formatMessage(messages.startSuccessTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.startSuccessDescription, { name: trainingName }),
      });

      setStartConfirmTraining(null);

      if (hasDisplayValue(accessUrl)) {
        window.open(accessUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.startErrorTitle),
        description: error?.message || formatMessage(messages.startError),
      });
    }
  };

  const handleSaveTraining = async ({
    trainingId,
    status,
    rating,
    feedback,
    proofFile,
    proofFileName,
  }) => {
    if (status === MY_TRAINING_STATUS.COMPLETED) {
      if (!hasDisplayValue(proofFileName) && !(proofFile instanceof File)) {
        showToast({
          title: formatMessage(messages.proofRequiredTitle),
          description: formatMessage(messages.proofRequiredDescription),
        });
        return;
      }

      if (!rating) {
        showToast({
          title: formatMessage(messages.ratingRequiredTitle),
          description: formatMessage(messages.ratingRequiredDescription),
        });
        return;
      }
    }

    try {
      const result = await updateMutation.mutateAsync({
        trainingId,
        status,
        rating,
        feedback,
        proofFile,
        proofFileName,
      });

      showToast({
        title: formatMessage(messages.updateSuccessTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.updateSuccessDescription, {
            status: getMyTrainingStatusLabel(status, statusOptions),
          }),
      });

      setEditingTrainingId(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.updateErrorTitle),
        description: error?.message || formatMessage(messages.updateError),
      });
    }
  };

  const columns = useMemo(() => [
    {
      key: 'training',
      header: formatMessage(messages.columnTraining),
      renderCell: (row) => (
        <div className="my-training-page__training-cell">
          <span className="my-training-page__training-icon" aria-hidden>
            <FontAwesomeIcon icon={faBookOpen} />
          </span>
          <div className="min-w-0">
            {hasDisplayValue(row.title) && (
              <p className="my-training-page__training-title">{row.title}</p>
            )}
            {hasDisplayValue(row.description) && (
              <p className="my-training-page__training-desc">{row.description}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'provider',
      header: formatMessage(messages.columnProvider),
      renderCell: (row) => (
        hasDisplayValue(row.provider) ? row.provider : null
      ),
    },
    {
      key: 'status',
      header: formatMessage(messages.columnStatus),
      renderCell: (row) => (
        hasDisplayValue(row.status) ? (
          <span className={getMyTrainingStatusBadgeClass(row.status)}>
            {getMyTrainingStatusLabel(row.status, statusOptions)}
          </span>
        ) : null
      ),
    },
    {
      key: 'actions',
      header: formatMessage(messages.columnActions),
      align: 'right',
      renderCell: (row) => (
        <div className="my-training-page__actions">
          <button
            type="button"
            className="my-training-page__icon-button"
            aria-label={formatMessage(messages.accessTraining)}
            title={formatMessage(messages.accessTooltip)}
            onClick={() => handleAccessClick(row)}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} aria-hidden />
          </button>
          {canUpdateTraining && (
            <button
              type="button"
              className="my-training-page__icon-button"
              aria-label={formatMessage(messages.updateTraining)}
              title={formatMessage(messages.updateTooltip)}
              onClick={() => setEditingTrainingId(row.id)}
            >
              <FontAwesomeIcon icon={faPen} aria-hidden />
            </button>
          )}
        </div>
      ),
    },
  ], [canUpdateTraining, formatMessage, statusOptions]);

  return (
    <section className="my-training-page">
      <div className="my-training-page__search">
        <SearchInput
          value={searchText}
          placeholder={formatMessage(messages.searchPlaceholder)}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {showTableSkeleton && (
        <SkeletonScreen variant={SKELETON_VARIANTS.TOOLBAR_TABLE} tablePreset="requestedTrainings" />
      )}

      {isError && !showTableSkeleton && (
        <EmptyState
          fullSize
          className="my-training-page__empty"
          message={errorMessage || formatMessage(messages.listLoadError)}
        />
      )}

      {showEmpty && (
        <EmptyState
          fullSize
          className="my-training-page__empty"
          message={formatMessage(messages.empty)}
        />
      )}

      {showTable && (
        <DataTable
          columns={columns}
          rows={items}
          rowKey="id"
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          minWidth={760}
          paginationLabel={formatMessage(messages.paginationLabel)}
          footerContent={formatMessage(
            messages.showingCount,
            buildPaginationShowingParams(items, count),
          )}
        />
      )}

      {canUpdateTraining && (
        <UpdateTrainingStatusModal
          trainingId={editingTrainingId}
          isOpen={hasDisplayValue(editingTrainingId)}
          onClose={() => setEditingTrainingId(null)}
          onSave={handleSaveTraining}
          isSaving={updateMutation.isPending}
        />
      )}

      <ConfirmActionDialog
        isOpen={Boolean(startConfirmTraining)}
        title={formatMessage(messages.startConfirmTitle)}
        description={formatMessage(messages.startConfirmDescription)}
        cancelLabel={formatMessage(messages.startConfirmNo)}
        confirmLabel={formatMessage(messages.startConfirmYes)}
        onCancel={() => setStartConfirmTraining(null)}
        onConfirm={handleConfirmStart}
      />
    </section>
  );
};

export default MyTraining;
