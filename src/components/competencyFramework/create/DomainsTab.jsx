/* eslint-disable react/prop-types */
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import MultiSelectInput from '../../multiSelectInput/MultiSelectInput';
import { useToast } from '../../toast/ToastProvider';
import AddNewDomainModal from '../AddNewDomainModal';

const createCompetencyTypeItem = () => ({
  id: `${Date.now()}-${Math.random()}`,
  competencyType: '',
  domains: [],
});

const DomainsTab = ({
  labels,
  canEdit,
  competencyTypes,
  onChangeCompetencyTypes,
  domainOptions,
  onAddDomainOption,
}) => {
  const { showToast } = useToast();
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const canDelete = competencyTypes.length > 1;
  const hasInvalidRow = competencyTypes.some(
    item => !item.competencyType.trim() || item.domains.length === 0,
  );

  const pendingDeleteName = useMemo(
    () => competencyTypes.find(item => item.id === pendingDeleteId)?.competencyType || '',
    [competencyTypes, pendingDeleteId],
  );

  const updateCompetencyType = (id, key, value) => {
    onChangeCompetencyTypes(
      competencyTypes.map(item => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const handleAddCompetencyType = () => {
    onChangeCompetencyTypes([...competencyTypes, createCompetencyTypeItem()]);
  };

  const requestDeleteCompetencyType = (id) => {
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

  const confirmDeleteCompetencyType = async () => {
    if (!pendingDeleteId || !canDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      onChangeCompetencyTypes(competencyTypes.filter(item => item.id !== pendingDeleteId));
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

  return (
    <div className="framework-builder__section-card framework-builder__section-card--form">
      <div className="framework-builder__domains-list">
        {competencyTypes.map((item, index) => (
          <div key={item.id} className="framework-builder__domain-item">
            <div className="framework-builder__domain-item-head">
              <div className="framework-builder__domain-item-title-wrap">
                <span className="framework-builder__domain-item-index">{index + 1}</span>
                <label className="framework-builder__label" htmlFor={`competency-type-${item.id}`}>
                  {labels.competencyType}
                </label>
                <input
                  id={`competency-type-${item.id}`}
                  className="framework-builder__input framework-builder__domain-item-input"
                  placeholder={labels.competencyTypePlaceholder}
                  value={item.competencyType}
                  onChange={event => updateCompetencyType(item.id, 'competencyType', event.target.value)}
                  disabled={!canEdit}
                />
              </div>
              <button
                type="button"
                className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                onClick={() => requestDeleteCompetencyType(item.id)}
                disabled={!canEdit || isDeleting || !canDelete}
                aria-label={labels.deleteCompetencyType}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <div className="framework-builder__field">
              <label className="framework-builder__label">{labels.domains}</label>
              <div className="framework-builder__domain-input-row">
                <div className="framework-builder__domain-input-main">
                  <MultiSelectInput
                    options={domainOptions}
                    selectedValues={item.domains}
                    onChange={next => updateCompetencyType(item.id, 'domains', next)}
                    disabled={!canEdit}
                  />
                </div>
                <button
                  type="button"
                  className="competency-framework-page__outline-button framework-builder__domain-plus-button"
                  onClick={() => setIsAddDomainOpen(true)}
                  disabled={!canEdit}
                  title={labels.addNewDomain}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="framework-builder__domains-add-wrap">
        <button
          type="button"
          className="competency-framework-page__outline-button"
          onClick={handleAddCompetencyType}
          disabled={!canEdit || hasInvalidRow}
        >
          <FontAwesomeIcon icon={faPlus} />
          {labels.addCompetencyType}
        </button>
      </div>

      <div className="framework-builder__actions">
        <button
          type="button"
          className="competency-framework-page__primary-button"
          disabled={!canEdit || hasInvalidRow}
        >
          {labels.save}
        </button>
      </div>

      <AddNewDomainModal
        isOpen={isAddDomainOpen}
        onClose={() => setIsAddDomainOpen(false)}
        labels={labels.addDomainModal}
        onAdd={onAddDomainOption}
      />

      <ConfirmActionDialog
        isOpen={Boolean(pendingDeleteId)}
        title={labels.deleteDialogTitle}
        description={labels.deleteDialogDescription(pendingDeleteName)}
        cancelLabel={labels.deleteDialogCancel}
        confirmLabel={labels.deleteDialogConfirm}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDeleteCompetencyType}
      />
    </div>
  );
};

export { createCompetencyTypeItem };
export default DomainsTab;
