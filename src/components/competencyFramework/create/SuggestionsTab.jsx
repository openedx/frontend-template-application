/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import PopupDialog from '../../popupDialog/PopupDialog';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import { useToast } from '../../toast/ToastProvider';
import { useUserRole } from '../../../contexts/UserRoleContext';
import messages from '../../../pages/competencyFramework/messages';
import pageMessages from '../../../pages/messages';
import './SuggestionsTab.scss';

const SUGGESTION_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
];

const SUGGESTION_TYPE_OPTIONS = [
  { value: 'competency', label: 'Competency' },
  { value: 'domain', label: 'Domain' },
  { value: 'sub-domain', label: 'Sub-domain' },
  { value: 'activity', label: 'Activity' },
];

const createMockSuggestions = () => ([
  {
    id: 'sug-1',
    type: 'competency',
    name: 'Risk-based decision making',
    description: 'Apply risk-based judgement during product reviews.',
    status: 'pending',
  },
  {
    id: 'sug-2',
    type: 'domain',
    name: 'Digital health regulation',
    description: 'Coverage for software-as-a-medical-device.',
    status: 'pending',
  },
]);

const statusClass = (status) => {
  if (status === 'approved') {
    return 'suggestions-tab__badge--approved';
  }
  return 'suggestions-tab__badge--pending';
};

const SuggestionsTab = ({ canEdit }) => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { navbarAccess } = useUserRole();

  // Local mock state (no API integration yet).
  const [suggestions, setSuggestions] = useState(() => createMockSuggestions());

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [activeSuggestionId, setActiveSuggestionId] = useState(null);

  const activeSuggestion = useMemo(
    () => suggestions.find(s => s.id === activeSuggestionId) || null,
    [suggestions, activeSuggestionId],
  );

  const [form, setForm] = useState({
    type: SUGGESTION_TYPE_OPTIONS[0].value,
    name: '',
    description: '',
    status: SUGGESTION_STATUS_OPTIONS[0].value,
  });

  const typeOptions = useMemo(() => SUGGESTION_TYPE_OPTIONS, []);
  const statusOptions = useMemo(() => SUGGESTION_STATUS_OPTIONS, []);

  const resetForm = () => {
    setForm({
      type: typeOptions[0].value,
      name: '',
      description: '',
      status: statusOptions[0].value,
    });
  };

  const openAdd = () => {
    setModalMode('add');
    setActiveSuggestionId(null);
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (suggestion) => {
    setModalMode('edit');
    setActiveSuggestionId(suggestion.id);
    setForm({
      type: suggestion.type,
      name: suggestion.name,
      description: suggestion.description,
      status: suggestion.status,
    });
    setModalOpen(true);
  };

  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const pendingDelete = useMemo(
    () => suggestions.find(s => s.id === pendingDeleteId) || null,
    [suggestions, pendingDeleteId],
  );

  const isSaveDisabled = !form.name.trim() || !form.type || !form.status;

  const handleSave = () => {
    if (isSaveDisabled) {
      return;
    }

    // Basic route-level guard (in addition to `canEdit`)
    if (!navbarAccess?.accessCompetencyFramework) {
      showToast({
        title: 'Access restricted',
        description: formatMessage(pageMessages.accessRestrictedMessage),
      });
      setModalOpen(false);
      return;
    }

    if (modalMode === 'add') {
      const newSuggestion = {
        id: `sug-${Date.now()}`,
        type: form.type,
        name: form.name.trim(),
        description: form.description.trim(),
        status: form.status,
      };
      setSuggestions(prev => [newSuggestion, ...prev]);
      showToast({
        title: formatMessage(messages.suggestionSavedToastTitle),
        description: formatMessage(messages.suggestionSavedToastDescription),
      });
    } else if (modalMode === 'edit' && activeSuggestion) {
      setSuggestions(prev => prev.map(s => (
        s.id === activeSuggestion.id
          ? {
            ...s,
            type: form.type,
            name: form.name.trim(),
            description: form.description.trim(),
            status: form.status,
          }
          : s
      )));
      showToast({
        title: formatMessage(messages.suggestionSavedToastTitle),
        description: formatMessage(messages.suggestionSavedToastDescription),
      });
    }

    setModalOpen(false);
  };

  return (
    <section className="suggestions-tab">
      <div className="suggestions-tab__card">
        <div className="suggestions-tab__header">
          <div>
            <h3 className="suggestions-tab__title">{formatMessage(messages.tabSuggestions)}</h3>
            <p className="suggestions-tab__subtitle">{formatMessage(messages.suggestionsSubtitle)}</p>
          </div>
          {canEdit && (
            <button
              type="button"
              className="competency-framework-page__primary-button suggestions-tab__add-button"
              onClick={openAdd}
            >
              <FontAwesomeIcon icon={faPlus} />
              {formatMessage(messages.addSuggestion)}
            </button>
          )}
        </div>

        <div className="suggestions-tab__list">
          {suggestions.map(suggestion => {
            const typeLabel = typeOptions.find(o => o.value === suggestion.type)?.label || suggestion.type;
            return (
              <div className="suggestions-tab__item" key={suggestion.id}>
                <div className="suggestions-tab__item-main">
                  <div className="suggestions-tab__item-top">
                    <span className="suggestions-tab__badge suggestions-tab__badge--type">{typeLabel}</span>
                    <span className={`suggestions-tab__badge ${statusClass(suggestion.status)}`}>{suggestion.status === 'approved' ? 'Approved' : 'Pending'}</span>
                  </div>
                  <h4 className="suggestions-tab__item-name">{suggestion.name}</h4>
                  <p className="suggestions-tab__item-description">{suggestion.description}</p>
                </div>

                {canEdit && (
                  <div className="suggestions-tab__actions">
                    <button
                      type="button"
                      className="suggestions-tab__icon-button"
                      aria-label="Edit suggestion"
                      onClick={() => openEdit(suggestion)}
                      title="Edit suggestion"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      type="button"
                      className="suggestions-tab__icon-button suggestions-tab__icon-button--danger"
                      aria-label="Delete suggestion"
                      onClick={() => setPendingDeleteId(suggestion.id)}
                      title="Delete suggestion"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <PopupDialog
        isOpen={modalOpen}
        title={modalMode === 'edit' ? formatMessage(messages.suggestionModalTitleEdit) : formatMessage(messages.suggestionModalTitleAdd)}
        onClose={() => setModalOpen(false)}
        contentClassName="suggestions-tab__dialog-content"
      >
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
            />
          </div>

          <div className="suggestions-tab__dialog-actions">
            <button
              type="button"
              className="competency-framework-page__outline-button suggestions-tab__dialog-cancel"
              onClick={() => setModalOpen(false)}
            >
              {formatMessage(messages.cancel)}
            </button>
            <button
              type="button"
              className="competency-framework-page__primary-button"
              disabled={isSaveDisabled}
              onClick={handleSave}
            >
              {modalMode === 'edit' ? formatMessage(messages.save) : formatMessage(messages.add)}
            </button>
          </div>
        </div>
      </PopupDialog>

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteId)}
        title={formatMessage(messages.suggestionDeleteDialogTitle)}
        description={formatMessage(messages.suggestionDeleteDialogDescription, { name: pendingDelete?.name || '' })}
        cancelLabel={formatMessage(messages.cancel)}
        confirmLabel={formatMessage(messages.suggestionDeleteConfirmLabel)}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            setPendingDeleteId(null);
            return;
          }

          setSuggestions(prev => prev.filter(s => s.id !== pendingDelete.id));
          showToast({
            title: formatMessage(messages.suggestionDeletedToastTitle),
            description: formatMessage(messages.suggestionDeletedToastDescription, { name: pendingDelete.name }),
          });
          setPendingDeleteId(null);
        }}
      />
    </section>
  );
};

export default SuggestionsTab;
