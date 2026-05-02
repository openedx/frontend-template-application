/* eslint-disable react/prop-types */
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import { useToast } from '../../toast/ToastProvider';

const createProficiencyLevelItem = () => ({
  id: `${Date.now()}-${Math.random()}`,
  code: '',
  name: '',
});

const ProficiencyLevelTab = ({
  labels,
  canEdit,
  levels,
  onChangeLevels,
}) => {
  const { showToast } = useToast();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = levels.length > 1;
  const hasInvalidLevel = levels.some(item => !item.code.trim() || !item.name.trim());
  const pendingDeleteName = useMemo(
    () => levels.find(item => item.id === pendingDeleteId)?.name || '',
    [levels, pendingDeleteId],
  );

  const updateLevel = (id, key, value) => {
    onChangeLevels(levels.map(item => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleAddLevel = () => {
    onChangeLevels([...levels, createProficiencyLevelItem()]);
  };

  const handleDeleteLevel = (id) => {
    if (!canDelete) {
      showToast({
        title: labels.deleteFailedTitle,
        description: labels.deleteBlockedDescription,
      });
      return;
    }
    setPendingDeleteId(id);
  };

  const closeDeleteDialog = () => {
    if (!isDeleting) {
      setPendingDeleteId(null);
    }
  };

  const confirmDeleteLevel = async () => {
    if (!pendingDeleteId || !canDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      onChangeLevels(levels.filter(item => item.id !== pendingDeleteId));
      showToast({
        title: labels.deleteSuccessTitle,
        description: labels.deleteSuccessDescription,
      });
      setPendingDeleteId(null);
    } catch (error) {
      showToast({
        title: labels.deleteFailedTitle,
        description: labels.deleteFailedDescription,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = () => {
    try {
      showToast({
        title: labels.saveSuccessTitle,
        description: labels.saveSuccessDescription,
      });
    } catch (error) {
      showToast({
        title: labels.saveFailedTitle,
        description: labels.saveFailedDescription,
      });
    }
  };

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
      <div className="framework-builder__role-head">
        <div>
          <h3 className="framework-builder__section-title">{labels.title}</h3>
          <p className="framework-builder__section-description">{labels.description}</p>
        </div>
        <button
          type="button"
          className="competency-framework-page__outline-button"
          onClick={handleAddLevel}
          disabled={!canEdit || hasInvalidLevel}
        >
          <FontAwesomeIcon icon={faPlus} />
          {labels.addLevel}
        </button>
      </div>

      <div className="framework-builder__proficiency-list">
        {levels.map((item, index) => (
          <div key={item.id} className="framework-builder__proficiency-row">
            <span className="framework-builder__role-index">{`${index + 1}.`}</span>
            <div className="framework-builder__proficiency-fields">
              <label className="framework-builder__proficiency-label" htmlFor={`level-code-${item.id}`}>
                {labels.codeLabel}
              </label>
              <input
                id={`level-code-${item.id}`}
                className="framework-builder__input framework-builder__proficiency-code-input"
                placeholder={labels.codePlaceholder}
                value={item.code}
                onChange={event => updateLevel(item.id, 'code', event.target.value)}
                disabled={!canEdit}
              />
              <label className="framework-builder__proficiency-label" htmlFor={`level-name-${item.id}`}>
                {labels.nameLabel}
              </label>
              <input
                id={`level-name-${item.id}`}
                className="framework-builder__input framework-builder__proficiency-name-input"
                placeholder={labels.namePlaceholder}
                value={item.name}
                onChange={event => updateLevel(item.id, 'name', event.target.value)}
                disabled={!canEdit}
              />
            </div>
            <button
              type="button"
              className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
              onClick={() => handleDeleteLevel(item.id)}
              disabled={!canEdit || !canDelete || isDeleting}
              aria-label={labels.deleteLevel}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      <div className="framework-builder__actions">
        <button
          type="button"
          className="competency-framework-page__primary-button"
          disabled={!canEdit || hasInvalidLevel}
          onClick={handleSave}
        >
          {labels.save}
        </button>
      </div>

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteId)}
        title={labels.deleteDialogTitle}
        description={labels.deleteDialogDescription(pendingDeleteName)}
        cancelLabel={labels.deleteDialogCancel}
        confirmLabel={labels.deleteDialogConfirm}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDeleteLevel}
      />
    </div>
  );
};

export { createProficiencyLevelItem };
export default ProficiencyLevelTab;
