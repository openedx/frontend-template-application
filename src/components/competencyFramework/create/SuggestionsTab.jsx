/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  buildSuggestionCreatePayload,
  buildSuggestionUpdatePayload,
  mapSuggestionToFormState,
} from '../../../api/competencyFramework/competencyFrameworkSuggestionsUtils';
import { EmptyState } from '../../emptyState';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import PopupDialog from '../../popupDialog/PopupDialog';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../skeleton';
import { useToast } from '../../toast/ToastProvider';
import { useUserRole } from '../../../contexts/UserRoleContext';
import useCompetencyFrameworkSuggestionsMutations from '../../../hooks/competencyFramework/useCompetencyFrameworkSuggestionsMutations';
import useFrameworkSuggestionDetail from '../../../hooks/competencyFramework/useFrameworkSuggestionDetail';
import useFrameworkSuggestions from '../../../hooks/competencyFramework/useFrameworkSuggestions';
import messages from '../../../pages/competencyFramework/messages';
import pageMessages from '../../../pages/messages';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import './SuggestionsTab.scss';

const DEFAULT_FORM = {
  type: 'competency',
  name: '',
  description: '',
  status: 'pending',
};

const statusClass = (status) => {
  if (status === 'approved') {
    return 'suggestions-tab__badge--approved';
  }
  if (status === 'rejected') {
    return 'suggestions-tab__badge--rejected';
  }
  return 'suggestions-tab__badge--pending';
};

const SuggestionsTab = ({ frameworkUuid, canEdit, actionsLocked = false }) => {
  const actionsEnabled = canEdit && !actionsLocked;
  const showActions = canEdit || actionsLocked;
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { navbarAccess } = useUserRole();

  const {
    suggestions,
    isLoading: isSuggestionsLoading,
    isError: isSuggestionsError,
    errorMessage: suggestionsErrorMessage,
  } = useFrameworkSuggestions({
    frameworkUuid,
    enabled: hasDisplayValue(frameworkUuid),
  });

  const {
    createSuggestionMutation,
    updateSuggestionMutation,
    deleteSuggestionMutation,
  } = useCompetencyFrameworkSuggestionsMutations();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [activeSuggestionId, setActiveSuggestionId] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditModal = modalOpen && modalMode === 'edit' && hasDisplayValue(activeSuggestionId);

  const {
    detail: editSuggestionDetail,
    isLoading: isEditDetailLoading,
    isError: isEditDetailError,
    errorMessage: editDetailErrorMessage,
  } = useFrameworkSuggestionDetail({
    suggestionId: activeSuggestionId,
    enabled: isEditModal,
  });

  const typeOptions = useMemo(() => ([
    { value: 'competency', label: formatMessage(messages.suggestionTypeCompetency) },
    { value: 'domain', label: formatMessage(messages.suggestionTypeDomain) },
    { value: 'sub_domain', label: formatMessage(messages.suggestionTypeSubDomain) },
    { value: 'activity', label: formatMessage(messages.suggestionTypeActivity) },
    { value: 'role', label: formatMessage(messages.suggestionTypeRole) },
    { value: 'other', label: formatMessage(messages.suggestionTypeOther) },
  ]), [formatMessage]);

  const statusOptions = useMemo(() => ([
    { value: 'pending', label: formatMessage(messages.suggestionStatusPending) },
    { value: 'approved', label: formatMessage(messages.suggestionStatusApproved) },
    { value: 'rejected', label: formatMessage(messages.suggestionStatusRejected) },
  ]), [formatMessage]);

  const resetForm = () => {
    setForm({
      type: typeOptions[0]?.value ?? DEFAULT_FORM.type,
      name: '',
      description: '',
      status: statusOptions[0]?.value ?? DEFAULT_FORM.status,
    });
  };

  const pendingDelete = useMemo(
    () => suggestions.find(s => s.id === pendingDeleteId) || null,
    [suggestions, pendingDeleteId],
  );

  const isSaving = createSuggestionMutation.isPending || updateSuggestionMutation.isPending;
  const isSaveDisabled = !form.name.trim() || !form.type || !form.status || isSaving;
  const isModalFormLoading = isEditModal && isEditDetailLoading;

  useEffect(() => {
    if (!isSuggestionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.suggestionsLoadErrorTitle),
      description: suggestionsErrorMessage || formatMessage(messages.suggestionsLoadError),
    });
  }, [
    formatMessage,
    isSuggestionsError,
    showToast,
    suggestionsErrorMessage,
  ]);

  useEffect(() => {
    if (!isEditModal || isEditDetailLoading || isEditDetailError || !editSuggestionDetail) {
      return;
    }

    setForm(mapSuggestionToFormState(editSuggestionDetail));
  }, [
    editSuggestionDetail,
    isEditDetailError,
    isEditDetailLoading,
    isEditModal,
  ]);

  useEffect(() => {
    if (!isEditModal || !isEditDetailError) {
      return;
    }

    showToast({
      title: formatMessage(messages.suggestionsLoadErrorTitle),
      description: editDetailErrorMessage || formatMessage(messages.suggestionDetailLoadError),
    });
    setModalOpen(false);
    setActiveSuggestionId(null);
  }, [
    editDetailErrorMessage,
    formatMessage,
    isEditDetailError,
    isEditModal,
    showToast,
  ]);

  const openAdd = () => {
    if (!actionsEnabled) {
      return;
    }

    setModalMode('add');
    setActiveSuggestionId(null);
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (suggestion) => {
    if (!actionsEnabled || !hasDisplayValue(suggestion?.id)) {
      return;
    }

    setModalMode('edit');
    setActiveSuggestionId(suggestion.id);
    resetForm();
    setModalOpen(true);
  };

  const requestDelete = (suggestionId) => {
    if (!actionsEnabled) {
      return;
    }

    setPendingDeleteId(suggestionId);
  };

  const handleSave = async () => {
    if (!actionsEnabled || isSaveDisabled || isModalFormLoading) {
      return;
    }

    if (!navbarAccess?.accessCompetencyFramework) {
      showToast({
        title: formatMessage(messages.suggestionsLoadErrorTitle),
        description: formatMessage(pageMessages.accessRestrictedMessage),
      });
      setModalOpen(false);
      return;
    }

    try {
      if (modalMode === 'add') {
        const result = await createSuggestionMutation.mutateAsync({
          frameworkUuid,
          payload: buildSuggestionCreatePayload(form),
        });

        showToast({
          title: formatMessage(messages.suggestionSavedToastTitle),
          description: result.message || formatMessage(messages.suggestionSavedToastDescription),
        });
      } else if (modalMode === 'edit' && hasDisplayValue(activeSuggestionId)) {
        const result = await updateSuggestionMutation.mutateAsync({
          frameworkUuid,
          suggestionId: activeSuggestionId,
          payload: buildSuggestionUpdatePayload(form),
        });

        showToast({
          title: formatMessage(messages.suggestionSavedToastTitle),
          description: result.message || formatMessage(messages.suggestionSavedToastDescription),
        });
      }

      setModalOpen(false);
      setActiveSuggestionId(null);
    } catch (error) {
      const fallback = modalMode === 'add'
        ? messages.suggestionCreateError
        : messages.suggestionUpdateError;

      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(fallback),
      });
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete || !hasDisplayValue(pendingDelete.id)) {
      setPendingDeleteId(null);
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteSuggestionMutation.mutateAsync({
        frameworkUuid,
        suggestionId: pendingDelete.id,
      });

      showToast({
        title: formatMessage(messages.suggestionDeletedToastTitle),
        description: result.message || formatMessage(messages.suggestionDeletedToastDescription, {
          name: pendingDelete.name,
        }),
      });
      setPendingDeleteId(null);
    } catch (error) {
      showToast({
        title: formatMessage(messages.suggestionDeletedToastTitle),
        description: error?.message || formatMessage(messages.suggestionDeleteError),
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getTypeLabel = (typeValue) => typeOptions.find(o => o.value === typeValue)?.label || typeValue;
  const getStatusLabel = (statusValue) => statusOptions.find(o => o.value === statusValue)?.label || statusValue;

  const listContent = () => {
    if (isSuggestionsLoading) {
      return <SkeletonScreen variant={SKELETON_VARIANTS.CARD_LIST} />;
    }

    if (isSuggestionsError) {
      return (
        <EmptyState
          message={suggestionsErrorMessage || formatMessage(messages.suggestionsLoadError)}
        />
      );
    }

    if (suggestions.length === 0) {
      return <EmptyState message={formatMessage(messages.suggestionsEmpty)} />;
    }

    return (
      <div className="suggestions-tab__list">
        {suggestions.map(suggestion => (
          <div className="suggestions-tab__item" key={suggestion.id}>
            <div className="suggestions-tab__item-main">
              <div className="suggestions-tab__item-top">
                {hasDisplayValue(suggestion.type) && (
                  <span className="suggestions-tab__badge suggestions-tab__badge--type">
                    {getTypeLabel(suggestion.type)}
                  </span>
                )}
                {hasDisplayValue(suggestion.status) && (
                  <span className={`suggestions-tab__badge ${statusClass(suggestion.status)}`}>
                    {getStatusLabel(suggestion.status)}
                  </span>
                )}
              </div>
              {hasDisplayValue(suggestion.name) && (
                <h4 className="suggestions-tab__item-name">{suggestion.name}</h4>
              )}
              {hasDisplayValue(suggestion.description) && (
                <p className="suggestions-tab__item-description">{suggestion.description}</p>
              )}
            </div>

            {showActions && (
              <div className="suggestions-tab__actions">
                <button
                  type="button"
                  className={`suggestions-tab__icon-button ${actionsLocked ? 'is-disabled' : ''}`}
                  aria-label={formatMessage(messages.suggestionModalTitleEdit)}
                  onClick={() => openEdit(suggestion)}
                  title={formatMessage(messages.suggestionModalTitleEdit)}
                  disabled={!actionsEnabled}
                  aria-disabled={!actionsEnabled}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  type="button"
                  className={`suggestions-tab__icon-button suggestions-tab__icon-button--danger ${actionsLocked ? 'is-disabled' : ''}`}
                  aria-label={formatMessage(messages.suggestionDeleteDialogTitle)}
                  onClick={() => requestDelete(suggestion.id)}
                  title={formatMessage(messages.suggestionDeleteDialogTitle)}
                  disabled={!actionsEnabled || deleteSuggestionMutation.isPending}
                  aria-disabled={!actionsEnabled}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="suggestions-tab">
      <div className="suggestions-tab__card">
        <div className="suggestions-tab__header">
          <div>
            <h3 className="suggestions-tab__title">{formatMessage(messages.tabSuggestions)}</h3>
            <p className="suggestions-tab__subtitle">{formatMessage(messages.suggestionsSubtitle)}</p>
          </div>
          {showActions && (
            <button
              type="button"
              className={`competency-framework-page__primary-button suggestions-tab__add-button ${actionsLocked ? 'is-disabled' : ''}`}
              onClick={openAdd}
              disabled={!actionsEnabled || isSuggestionsLoading}
              aria-disabled={!actionsEnabled}
            >
              <FontAwesomeIcon icon={faPlus} />
              {formatMessage(messages.addSuggestion)}
            </button>
          )}
        </div>

        {listContent()}
      </div>

      <PopupDialog
        isOpen={modalOpen}
        title={modalMode === 'edit' ? formatMessage(messages.suggestionModalTitleEdit) : formatMessage(messages.suggestionModalTitleAdd)}
        onClose={() => {
          if (!isSaving) {
            setModalOpen(false);
            setActiveSuggestionId(null);
          }
        }}
        contentClassName="suggestions-tab__dialog-content"
      >
        {isModalFormLoading ? (
          <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
        ) : (
          <div className="suggestions-tab__form">
            <div className="suggestions-tab__field">
              <label className="suggestions-tab__label">{formatMessage(messages.suggestionTypeLabel)}</label>
              <SearchableDropdown
                value={form.type}
                options={typeOptions}
                onChange={next => setForm(prev => ({ ...prev, type: next }))}
                triggerLabel={typeOptions.find(o => o.value === form.type)?.label || ''}
                searchPlaceholder={formatMessage(messages.builderDropdownSearchPlaceholder)}
                noOptionsText={formatMessage(messages.builderDropdownNoOptions)}
                disabled={!actionsEnabled}
              />
            </div>

            <div className="suggestions-tab__field">
              <label className="suggestions-tab__label">{formatMessage(messages.suggestionNameLabel)}</label>
              <input
                className="suggestions-tab__input"
                type="text"
                placeholder={formatMessage(messages.suggestionNamePlaceholder)}
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                disabled={!actionsEnabled}
              />
            </div>

            <div className="suggestions-tab__field">
              <label className="suggestions-tab__label">{formatMessage(messages.suggestionDescriptionLabel)}</label>
              <textarea
                className="suggestions-tab__textarea"
                placeholder={formatMessage(messages.suggestionDescriptionPlaceholder)}
                rows={4}
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                disabled={!actionsEnabled}
              />
            </div>

            <div className="suggestions-tab__field">
              <label className="suggestions-tab__label">{formatMessage(messages.suggestionStatusLabel)}</label>
              <SearchableDropdown
                value={form.status}
                options={statusOptions}
                onChange={next => setForm(prev => ({ ...prev, status: next }))}
                triggerLabel={statusOptions.find(o => o.value === form.status)?.label || ''}
                searchPlaceholder={formatMessage(messages.builderDropdownSearchPlaceholder)}
                noOptionsText={formatMessage(messages.builderDropdownNoOptions)}
                disabled={!actionsEnabled}
              />
            </div>

            <div className="suggestions-tab__dialog-actions">
              <button
                type="button"
                className="competency-framework-page__outline-button suggestions-tab__dialog-cancel"
                onClick={() => {
                  if (!isSaving) {
                    setModalOpen(false);
                    setActiveSuggestionId(null);
                  }
                }}
                disabled={isSaving}
              >
                {formatMessage(messages.cancel)}
              </button>
              <button
                type="button"
                className="competency-framework-page__primary-button"
                disabled={isSaveDisabled || !actionsEnabled}
                onClick={handleSave}
              >
                {isSaving
                  ? formatMessage(messages.suggestionSaving)
                  : (modalMode === 'edit' ? formatMessage(messages.save) : formatMessage(messages.add))}
              </button>
            </div>
          </div>
        )}
      </PopupDialog>

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteId)}
        title={formatMessage(messages.suggestionDeleteDialogTitle)}
        description={formatMessage(messages.suggestionDeleteDialogDescription, { name: pendingDelete?.name || '' })}
        cancelLabel={formatMessage(messages.cancel)}
        confirmLabel={formatMessage(messages.suggestionDeleteConfirmLabel)}
        onCancel={() => !isDeleting && setPendingDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default SuggestionsTab;
