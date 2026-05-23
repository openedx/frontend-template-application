/* eslint-disable react/prop-types */
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { hasOrganizationCompetenciesSectionData } from '../../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesUtils';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../skeleton';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import { useToast } from '../../toast/ToastProvider';

const createCompetencyEntry = () => ({ id: `${Date.now()}-${Math.random()}`, text: '' });
const createLevel = () => ({ id: `${Date.now()}-${Math.random()}`, proficiencyLevel: '', competencies: [createCompetencyEntry()] });
const createDomain = () => ({ id: `${Date.now()}-${Math.random()}`, domain: '', levels: [createLevel()] });
const createOrgCompetencyType = () => ({ id: `${Date.now()}-${Math.random()}`, competencyType: '', domains: [createDomain()] });

const OrganizationalCompetenciesTab = ({
  labels,
  canEdit,
  items,
  onChangeItems,
  competencyTypeOptions,
  domainOptions,
  proficiencyLevelOptions,
  onSave,
  isSaving = false,
  isPrefilling = false,
  optionsLoading = false,
}) => {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasInvalid = useMemo(() => items.some(type => (
    !type.competencyType
    || type.domains.some(domain => (
      !domain.domain
      || domain.levels.some(level => (
        !level.proficiencyLevel
        || level.competencies.some(comp => !comp.text.trim())
      ))
    ))
  )), [items]);
  const isUpdateMode = hasOrganizationCompetenciesSectionData(items);
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;
  const isSaveDisabled = !canEdit || isSaving || isPrefilling || hasInvalid;
  const dropdownDisabled = !canEdit || optionsLoading || isPrefilling;

  const mutate = (updater) => onChangeItems(updater(items));

  const removeWithGuard = (kind, guardPassed, onRemove, name = '') => {
    if (!guardPassed) {
      showToast({ title: labels.deleteFailedTitle, description: labels.deleteBlockedDescription });
      return;
    }
    setPendingDelete({ kind, onRemove, name });
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    setIsDeleting(true);
    try {
      pendingDelete.onRemove();
      showToast({ title: labels.deleteSuccessTitle, description: labels.deleteSuccessDescription });
      setPendingDelete(null);
    } catch (error) {
      showToast({ title: labels.deleteFailedTitle, description: labels.deleteFailedDescription });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPrefilling) {
    return <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />;
  }

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
          disabled={!canEdit || hasInvalid}
          onClick={() => mutate(prev => [...prev, createOrgCompetencyType()])}
        >
          <FontAwesomeIcon icon={faPlus} />
          {labels.addCompetencyType}
        </button>
      </div>

      <div className="framework-builder__org-type-list">
        {items.map((typeItem) => {
          const canDeleteType = items.length > 1;
          return (
            <div key={typeItem.id} className="framework-builder__org-type-card">
              <div className="framework-builder__org-row-head">
                <div className="framework-builder__org-row-main">
                  <label className="framework-builder__proficiency-label">{labels.competencyTypeLabel}</label>
                  <SearchableDropdown
                    value={typeItem.competencyType}
                    options={competencyTypeOptions}
                    onChange={next => mutate(prev => prev.map(item => (item.id === typeItem.id ? { ...item, competencyType: next } : item)))}
                    triggerLabel={competencyTypeOptions.find(o => o.value === typeItem.competencyType)?.label || labels.selectTypePlaceholder}
                    searchPlaceholder={labels.dropdownSearchPlaceholder}
                    noOptionsText={labels.dropdownNoOptions}
                    disabled={dropdownDisabled}
                  />
                </div>
                <button
                  type="button"
                  className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                  disabled={!canEdit || !canDeleteType || isDeleting}
                  onClick={() => removeWithGuard(
                    'type',
                    canDeleteType,
                    () => mutate(prev => prev.filter(item => item.id !== typeItem.id)),
                    competencyTypeOptions.find(o => o.value === typeItem.competencyType)?.label || '',
                  )}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <div className="framework-builder__org-domain-list">
                {typeItem.domains.map((domainItem) => {
                  const canDeleteDomain = typeItem.domains.length > 1;
                  return (
                    <div key={domainItem.id} className="framework-builder__org-domain-card">
                      <div className="framework-builder__org-row-head">
                        <div className="framework-builder__org-row-main">
                          <label className="framework-builder__proficiency-label">{labels.domainLabel}</label>
                          <SearchableDropdown
                            value={domainItem.domain}
                            options={domainOptions}
                            onChange={next => mutate(prev => prev.map(item => (
                              item.id === typeItem.id
                                ? { ...item, domains: item.domains.map(d => (d.id === domainItem.id ? { ...d, domain: next } : d)) }
                                : item
                            )))}
                            triggerLabel={domainOptions.find(o => o.value === domainItem.domain)?.label || labels.selectDomainPlaceholder}
                            searchPlaceholder={labels.dropdownSearchPlaceholder}
                            noOptionsText={labels.dropdownNoOptions}
                            disabled={dropdownDisabled}
                          />
                        </div>
                        <button
                          type="button"
                          className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                          disabled={!canEdit || !canDeleteDomain || isDeleting}
                          onClick={() => removeWithGuard(
                            'domain',
                            canDeleteDomain,
                            () => mutate(prev => prev.map(item => (
                              item.id === typeItem.id
                                ? { ...item, domains: item.domains.filter(d => d.id !== domainItem.id) }
                                : item
                            ))),
                          )}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                      <div className="framework-builder__org-level-list">
                        {domainItem.levels.map((levelItem) => {
                          const canDeleteLevel = domainItem.levels.length > 1;
                          return (
                            <div key={levelItem.id} className="framework-builder__org-level-card">
                              <div className="framework-builder__org-row-head">
                                <div className="framework-builder__org-row-main">
                                  <label className="framework-builder__proficiency-label">{labels.proficiencyLevelLabel}</label>
                                  <SearchableDropdown
                                    value={levelItem.proficiencyLevel}
                                    options={proficiencyLevelOptions}
                                    onChange={next => mutate(prev => prev.map(item => (
                                      item.id === typeItem.id
                                        ? {
                                          ...item,
                                          domains: item.domains.map(d => (
                                            d.id === domainItem.id
                                              ? { ...d, levels: d.levels.map(l => (l.id === levelItem.id ? { ...l, proficiencyLevel: next } : l)) }
                                              : d
                                          )),
                                        }
                                        : item
                                    )))}
                                    triggerLabel={proficiencyLevelOptions.find(o => o.value === levelItem.proficiencyLevel)?.label || labels.selectLevelPlaceholder}
                                    searchPlaceholder={labels.dropdownSearchPlaceholder}
                                    noOptionsText={labels.dropdownNoOptions}
                                    disabled={dropdownDisabled}
                                  />
                                </div>
                                <div className="framework-builder__org-inline-actions">
                                  <button
                                    type="button"
                                    className="competency-framework-page__outline-button framework-builder__org-small-add"
                                    disabled={!canEdit || levelItem.competencies.some(comp => !comp.text.trim())}
                                    onClick={() => mutate(prev => prev.map(item => (
                                      item.id === typeItem.id
                                        ? {
                                          ...item,
                                          domains: item.domains.map(d => (
                                            d.id === domainItem.id
                                              ? { ...d, levels: d.levels.map(l => (l.id === levelItem.id ? { ...l, competencies: [...l.competencies, createCompetencyEntry()] } : l)) }
                                              : d
                                          )),
                                        }
                                        : item
                                    )))}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                    {labels.addCompetency}
                                  </button>
                                  <button
                                    type="button"
                                    className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                                    disabled={!canEdit || !canDeleteLevel || isDeleting}
                                    onClick={() => removeWithGuard(
                                      'level',
                                      canDeleteLevel,
                                      () => mutate(prev => prev.map(item => (
                                        item.id === typeItem.id
                                          ? {
                                            ...item,
                                            domains: item.domains.map(d => (
                                              d.id === domainItem.id
                                                ? { ...d, levels: d.levels.filter(l => l.id !== levelItem.id) }
                                                : d
                                            )),
                                          }
                                          : item
                                      ))),
                                    )}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>

                              <div className="framework-builder__org-competency-list">
                                {levelItem.competencies.map((compItem, compIndex) => {
                                  const canDeleteCompetency = levelItem.competencies.length > 1;
                                  return (
                                    <div key={compItem.id} className="framework-builder__org-competency-row">
                                      <span className="framework-builder__org-competency-index">{`${compIndex + 1}.`}</span>
                                      <input
                                        className="framework-builder__input framework-builder__org-competency-input"
                                        placeholder={labels.competencyPlaceholder}
                                        value={compItem.text}
                                        onChange={event => mutate(prev => prev.map(item => (
                                          item.id === typeItem.id
                                            ? {
                                              ...item,
                                              domains: item.domains.map(d => (
                                                d.id === domainItem.id
                                                  ? {
                                                    ...d,
                                                    levels: d.levels.map(l => (
                                                      l.id === levelItem.id
                                                        ? { ...l, competencies: l.competencies.map(c => (c.id === compItem.id ? { ...c, text: event.target.value } : c)) }
                                                        : l
                                                    )),
                                                  }
                                                  : d
                                              )),
                                            }
                                            : item
                                        )))}
                                        disabled={!canEdit}
                                      />
                                      <button
                                        type="button"
                                        className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                                        disabled={!canEdit || !canDeleteCompetency || isDeleting}
                                        onClick={() => removeWithGuard(
                                          'competency',
                                          canDeleteCompetency,
                                          () => mutate(prev => prev.map(item => (
                                            item.id === typeItem.id
                                              ? {
                                                ...item,
                                                domains: item.domains.map(d => (
                                                  d.id === domainItem.id
                                                    ? {
                                                      ...d,
                                                      levels: d.levels.map(l => (
                                                        l.id === levelItem.id
                                                          ? { ...l, competencies: l.competencies.filter(c => c.id !== compItem.id) }
                                                          : l
                                                      )),
                                                    }
                                                    : d
                                                )),
                                              }
                                              : item
                                          ))),
                                        )}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          className="competency-framework-page__outline-button framework-builder__org-small-add"
                          disabled={!canEdit || domainItem.levels.some(level => !level.proficiencyLevel || level.competencies.some(comp => !comp.text.trim()))}
                          onClick={() => mutate(prev => prev.map(item => (
                            item.id === typeItem.id
                              ? { ...item, domains: item.domains.map(d => (d.id === domainItem.id ? { ...d, levels: [...d.levels, createLevel()] } : d)) }
                              : item
                          )))}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          {labels.addProficiencyLevel}
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="competency-framework-page__outline-button framework-builder__org-small-add"
                  disabled={!canEdit || typeItem.domains.some(domain => !domain.domain || domain.levels.some(level => !level.proficiencyLevel || level.competencies.some(comp => !comp.text.trim())))}
                  onClick={() => mutate(prev => prev.map(item => (item.id === typeItem.id ? { ...item, domains: [...item.domains, createDomain()] } : item)))}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  {labels.addDomain}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {canEdit && (
        <div className="framework-builder__actions">
          <button
            type="button"
            className="competency-framework-page__primary-button"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            {isSaving ? savingLabel : submitLabel}
          </button>
        </div>
      )}

      <ConfirmActionDialog
        isOpen={Boolean(pendingDelete)}
        title={labels.deleteDialogTitle}
        description={labels.deleteDialogDescription(pendingDelete?.name || '')}
        cancelLabel={labels.deleteDialogCancel}
        confirmLabel={labels.deleteDialogConfirm}
        onCancel={() => !isDeleting && setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export { createOrgCompetencyType };
export default OrganizationalCompetenciesTab;
