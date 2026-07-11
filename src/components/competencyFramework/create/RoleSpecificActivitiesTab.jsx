/* eslint-disable react/prop-types */
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { hasRoleActivitiesSectionData } from '../../../api/competencyFramework/competencyFrameworkRoleSpecificUtils';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../skeleton';
import AddNewDomainModal from '../AddNewDomainModal';
import AddNewSubDomainModal from '../AddNewSubDomainModal';
import ConfirmActionDialog from '../../confirmActionDialog/ConfirmActionDialog';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import { useToast } from '../../toast/ToastProvider';

const createActivityEntry = () => ({ id: `${Date.now()}-${Math.random()}`, entryId: null, text: '' });
const createActivityLevelBlock = () => ({
  id: `${Date.now()}-${Math.random()}`,
  proficiencyLevel: '',
  activities: [createActivityEntry()],
});
const createActivityDomainBlock = () => ({
  id: `${Date.now()}-${Math.random()}`,
  domain: '',
  requireProficiency: false,
  requireSubDomain: false,
  subDomain: '',
  levels: [createActivityLevelBlock()],
  flatActivities: [createActivityEntry()],
});
const createRsaRoleItem = () => ({
  id: `${Date.now()}-${Math.random()}`,
  role: '',
  domains: [createActivityDomainBlock()],
});

const isActivityDomainBlockInvalid = (d) => {
  if (!d.domain) {
    return true;
  }
  if (d.requireSubDomain && !d.subDomain) {
    return true;
  }
  if (d.requireProficiency) {
    return d.levels.some(level => (
      !level.proficiencyLevel
      || level.activities.some(act => !act.text.trim())
    ));
  }
  return d.flatActivities.some(act => !act.text.trim());
};

const filterSubDomainsForDomain = (subDomainOptions, domainValue, subDomainOptionsByDomain) => {
  if (!domainValue) {
    return [];
  }

  if (subDomainOptionsByDomain?.[domainValue]?.length) {
    return subDomainOptionsByDomain[domainValue];
  }

  return subDomainOptions.filter(
    (option) => !option.parentDomain || option.parentDomain === domainValue,
  );
};

const RoleSpecificActivitiesTab = ({
  labels,
  canEdit,
  items,
  onChangeItems,
  domainOptions,
  subDomainOptions,
  subDomainOptionsByDomain = {},
  proficiencyLevelOptions,
  roleOptions,
  onAddDomainOption,
  onAddSubDomainOption,
  onSave,
  isSaving = false,
  isPrefilling = false,
  optionsLoading = false,
}) => {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [addDomainOpen, setAddDomainOpen] = useState(false);
  const [addSubDomainOpen, setAddSubDomainOpen] = useState(false);
  const [subDomainModalParent, setSubDomainModalParent] = useState('');

  const mutate = updater => onChangeItems(updater(items));

  const hasInvalid = useMemo(
    () => items.some(roleRow => !roleRow.role || roleRow.domains.some(isActivityDomainBlockInvalid)),
    [items],
  );
  const isUpdateMode = hasRoleActivitiesSectionData(items);
  const submitLabel = isUpdateMode ? labels.update : labels.save;
  const savingLabel = isUpdateMode ? labels.updating : labels.saving;
  const isSaveDisabled = !canEdit || isSaving || isPrefilling || hasInvalid;
  const dropdownDisabled = !canEdit || optionsLoading || isPrefilling;

  const removeWithGuard = (guardPassed, onRemove, name = '') => {
    if (!guardPassed) {
      showToast({ title: labels.deleteFailedTitle, description: labels.deleteBlockedDescription });
      return;
    }
    setPendingDelete({ onRemove, name });
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

  const openAddSubDomain = (parentDomain) => {
    setSubDomainModalParent(parentDomain || '');
    setAddSubDomainOpen(true);
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
          onClick={() => mutate(prev => [...prev, createRsaRoleItem()])}
        >
          <FontAwesomeIcon icon={faPlus} />
          {labels.addRole}
        </button>
      </div>

      <div className="framework-builder__org-type-list">
        {items.map((roleItem) => {
          const canDeleteRole = items.length > 1;
          const roleLabel = roleOptions.find(o => o.value === roleItem.role)?.label || '';
          const anyDomainInvalidInRole = roleItem.domains.some(isActivityDomainBlockInvalid);

          return (
            <div key={roleItem.id} className="framework-builder__org-type-card">
              <div className="framework-builder__org-row-head">
                <div className="framework-builder__org-row-main">
                  <label className="framework-builder__proficiency-label">{labels.roleLabel}</label>
                  <SearchableDropdown
                    value={roleItem.role}
                    options={roleOptions}
                    onChange={(next) => mutate(prev => prev.map(r => (
                      r.id === roleItem.id ? { ...r, role: next } : r
                    )))}
                    triggerLabel={roleLabel || labels.selectRolePlaceholder}
                    searchPlaceholder={labels.dropdownSearchPlaceholder}
                    noOptionsText={labels.dropdownNoOptions}
                    disabled={dropdownDisabled}
                  />
                </div>
                <button
                  type="button"
                  className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                  disabled={!canEdit || !canDeleteRole || isDeleting}
                  onClick={() => removeWithGuard(
                    canDeleteRole,
                    () => mutate(prev => prev.filter(r => r.id !== roleItem.id)),
                    roleLabel,
                  )}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>

              <div className="framework-builder__rsc-role-inner">
                <div className="framework-builder__org-domain-list">
                  {roleItem.domains.map((domainItem) => {
                    const canDeleteDomain = roleItem.domains.length > 1;
                    const subOptions = filterSubDomainsForDomain(
                      subDomainOptions,
                      domainItem.domain,
                      subDomainOptionsByDomain,
                    );
                    const domainTriggerLabel = domainOptions.find(o => o.value === domainItem.domain)?.label
                      || labels.selectDomainPlaceholder;
                    const subDomainTriggerLabel = subOptions.find(o => o.value === domainItem.subDomain)?.label
                      || labels.selectSubDomainPlaceholder;

                    const updateDomain = (patch) => {
                      mutate(prev => prev.map(r => (
                        r.id === roleItem.id
                          ? {
                            ...r,
                            domains: r.domains.map(d => (d.id === domainItem.id ? { ...d, ...patch } : d)),
                          }
                          : r
                      )));
                    };

                    return (
                      <div key={domainItem.id} className="framework-builder__org-domain-card">
                        <div className="framework-builder__org-row-head">
                          <div className="framework-builder__domain-input-row framework-builder__domain-input-row--grow">
                            <div className="framework-builder__domain-input-main">
                              <label className="framework-builder__proficiency-label">{labels.domainLabel}</label>
                              <SearchableDropdown
                                value={domainItem.domain}
                                options={domainOptions}
                                onChange={(next) => {
                                  mutate(prev => prev.map((r) => {
                                    if (r.id !== roleItem.id) {
                                      return r;
                                    }
                                    return {
                                      ...r,
                                      domains: r.domains.map((d) => {
                                        if (d.id !== domainItem.id) {
                                          return d;
                                        }
                                        const filtered = filterSubDomainsForDomain(
                                          subDomainOptions,
                                          next,
                                          subDomainOptionsByDomain,
                                        );
                                        const keepSub = Boolean(
                                          d.subDomain && filtered.some(o => o.value === d.subDomain),
                                        );
                                        return { ...d, domain: next, subDomain: keepSub ? d.subDomain : '' };
                                      }),
                                    };
                                  }));
                                }}
                                triggerLabel={domainTriggerLabel}
                                searchPlaceholder={labels.dropdownSearchPlaceholder}
                                noOptionsText={labels.dropdownNoOptions}
                                disabled={dropdownDisabled}
                              />
                            </div>
                            <button
                              type="button"
                              className="competency-framework-page__outline-button framework-builder__domain-plus-button"
                              onClick={() => setAddDomainOpen(true)}
                              disabled={!canEdit}
                              title={labels.addNewDomainTitle}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                            disabled={!canEdit || !canDeleteDomain || isDeleting}
                            onClick={() => removeWithGuard(
                              canDeleteDomain,
                              () => mutate(prev => prev.map(r => (
                                r.id === roleItem.id
                                  ? { ...r, domains: r.domains.filter(d => d.id !== domainItem.id) }
                                  : r
                              ))),
                              labels.domainLabel,
                            )}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>

                        <div className="framework-builder__rsc-check-row">
                          <label className="framework-builder__rsc-check">
                            <input
                              type="checkbox"
                              checked={domainItem.requireProficiency}
                              onChange={(e) => {
                                const { checked } = e.target;
                                updateDomain(checked
                                  ? { requireProficiency: true, levels: [createActivityLevelBlock()] }
                                  : { requireProficiency: false, flatActivities: [createActivityEntry()] });
                              }}
                              disabled={!canEdit}
                            />
                            <span>{labels.requireProficiency}</span>
                          </label>
                          <label className="framework-builder__rsc-check">
                            <input
                              type="checkbox"
                              checked={domainItem.requireSubDomain}
                              onChange={(e) => {
                                const { checked } = e.target;
                                updateDomain(checked
                                  ? { requireSubDomain: true }
                                  : { requireSubDomain: false, subDomain: '' });
                              }}
                              disabled={!canEdit}
                            />
                            <span>{labels.requireSubDomain}</span>
                          </label>
                        </div>

                        {domainItem.requireSubDomain && (
                          <div className="framework-builder__domain-input-row framework-builder__domain-input-row--sub">
                            <div className="framework-builder__domain-input-main">
                              <label className="framework-builder__proficiency-label">{labels.subDomainLabel}</label>
                              <SearchableDropdown
                                value={domainItem.subDomain}
                                options={subOptions}
                                onChange={(next) => updateDomain({ subDomain: next })}
                                triggerLabel={subDomainTriggerLabel}
                                searchPlaceholder={labels.dropdownSearchPlaceholder}
                                noOptionsText={labels.dropdownNoOptions}
                                disabled={dropdownDisabled}
                              />
                            </div>
                            <button
                              type="button"
                              className="competency-framework-page__outline-button framework-builder__domain-plus-button"
                              onClick={() => openAddSubDomain(domainItem.domain)}
                              disabled={!canEdit}
                              title={labels.addNewSubDomainTitle}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        )}

                        <div className="framework-builder__org-level-list framework-builder__rsc-nested">
                          {domainItem.requireProficiency ? (
                            <>
                              {domainItem.levels.map((levelItem) => {
                                const canDeleteLevel = domainItem.levels.length > 1;
                                const levelTriggerLabel = proficiencyLevelOptions.find(
                                  o => o.value === levelItem.proficiencyLevel,
                                )?.label || labels.selectLevelPlaceholder;
                                return (
                                  <div key={levelItem.id} className="framework-builder__org-level-card">
                                    <div className="framework-builder__org-row-head">
                                      <div className="framework-builder__org-row-main">
                                        <label className="framework-builder__proficiency-label">{labels.proficiencyLevelLabel}</label>
                                        <SearchableDropdown
                                          value={levelItem.proficiencyLevel}
                                          options={proficiencyLevelOptions}
                                          onChange={(next) => mutate(prev => prev.map(r => (
                                            r.id === roleItem.id
                                              ? {
                                                ...r,
                                                domains: r.domains.map(d => (
                                                  d.id === domainItem.id
                                                    ? {
                                                      ...d,
                                                      levels: d.levels.map(l => (
                                                        l.id === levelItem.id ? { ...l, proficiencyLevel: next } : l
                                                      )),
                                                    }
                                                    : d
                                                )),
                                              }
                                              : r
                                          )))}
                                          triggerLabel={levelTriggerLabel}
                                          searchPlaceholder={labels.dropdownSearchPlaceholder}
                                          noOptionsText={labels.dropdownNoOptions}
                                          disabled={dropdownDisabled}
                                        />
                                      </div>
                                      <div className="framework-builder__org-inline-actions">
                                        <button
                                          type="button"
                                          className="competency-framework-page__outline-button framework-builder__org-small-add"
                                          disabled={!canEdit || levelItem.activities.some(act => !act.text.trim())}
                                          onClick={() => mutate(prev => prev.map(r => (
                                            r.id === roleItem.id
                                              ? {
                                                ...r,
                                                domains: r.domains.map(d => (
                                                  d.id === domainItem.id
                                                    ? {
                                                      ...d,
                                                      levels: d.levels.map(l => (
                                                        l.id === levelItem.id
                                                          ? {
                                                            ...l,
                                                            activities: [...l.activities, createActivityEntry()],
                                                          }
                                                          : l
                                                      )),
                                                    }
                                                    : d
                                                )),
                                              }
                                              : r
                                          )))}
                                        >
                                          <FontAwesomeIcon icon={faPlus} />
                                          {labels.addActivity}
                                        </button>
                                        <button
                                          type="button"
                                          className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                                          disabled={!canEdit || !canDeleteLevel || isDeleting}
                                          onClick={() => removeWithGuard(
                                            canDeleteLevel,
                                            () => mutate(prev => prev.map(r => (
                                              r.id === roleItem.id
                                                ? {
                                                  ...r,
                                                  domains: r.domains.map(d => (
                                                    d.id === domainItem.id
                                                      ? { ...d, levels: d.levels.filter(l => l.id !== levelItem.id) }
                                                      : d
                                                  )),
                                                }
                                                : r
                                            ))),
                                            labels.proficiencyLevelLabel,
                                          )}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="framework-builder__org-competency-list">
                                      {levelItem.activities.map((actItem, actIndex) => {
                                        const canDeleteAct = levelItem.activities.length > 1;
                                        return (
                                          <div key={actItem.id} className="framework-builder__org-competency-row">
                                            <span className="framework-builder__org-competency-index">{`${actIndex + 1}.`}</span>
                                            <input
                                              className="framework-builder__input framework-builder__org-competency-input"
                                              placeholder={labels.activityPlaceholder}
                                              value={actItem.text}
                                              onChange={(event) => mutate(prev => prev.map(r => (
                                                r.id === roleItem.id
                                                  ? {
                                                    ...r,
                                                    domains: r.domains.map(d => (
                                                      d.id === domainItem.id
                                                        ? {
                                                          ...d,
                                                          levels: d.levels.map(l => (
                                                            l.id === levelItem.id
                                                              ? {
                                                                ...l,
                                                                activities: l.activities.map((c) => (
                                                                  c.id === actItem.id
                                                                    ? { ...c, text: event.target.value }
                                                                    : c
                                                                )),
                                                              }
                                                              : l
                                                          )),
                                                        }
                                                        : d
                                                    )),
                                                  }
                                                  : r
                                              )))}
                                              disabled={!canEdit}
                                            />
                                            <button
                                              type="button"
                                              className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                                              disabled={!canEdit || !canDeleteAct || isDeleting}
                                              onClick={() => removeWithGuard(
                                                canDeleteAct,
                                                () => mutate(prev => prev.map(r => (
                                                  r.id === roleItem.id
                                                    ? {
                                                      ...r,
                                                      domains: r.domains.map(d => (
                                                        d.id === domainItem.id
                                                          ? {
                                                            ...d,
                                                            levels: d.levels.map(l => (
                                                              l.id === levelItem.id
                                                                ? {
                                                                  ...l,
                                                                  activities: l.activities.filter(
                                                                    c => c.id !== actItem.id,
                                                                  ),
                                                                }
                                                                : l
                                                            )),
                                                          }
                                                          : d
                                                      )),
                                                    }
                                                    : r
                                                ))),
                                                labels.activityPlaceholder,
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
                                disabled={!canEdit || domainItem.levels.some(level => (
                                  !level.proficiencyLevel || level.activities.some(act => !act.text.trim())
                                ))}
                                onClick={() => mutate(prev => prev.map(r => (
                                  r.id === roleItem.id
                                    ? {
                                      ...r,
                                      domains: r.domains.map(d => (
                                        d.id === domainItem.id
                                          ? { ...d, levels: [...d.levels, createActivityLevelBlock()] }
                                          : d
                                      )),
                                    }
                                    : r
                                )))}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                                {labels.addProficiencyLevel}
                              </button>
                            </>
                          ) : (
                            <div className="framework-builder__org-level-card framework-builder__rsc-flat-card">
                              <div className="framework-builder__org-row-head">
                                <label className="framework-builder__proficiency-label">{labels.flatActivitiesLabel}</label>
                                <button
                                  type="button"
                                  className="competency-framework-page__outline-button framework-builder__org-small-add"
                                  disabled={!canEdit || domainItem.flatActivities.some(act => !act.text.trim())}
                                  onClick={() => mutate(prev => prev.map(r => (
                                    r.id === roleItem.id
                                      ? {
                                        ...r,
                                        domains: r.domains.map(d => (
                                          d.id === domainItem.id
                                            ? { ...d, flatActivities: [...d.flatActivities, createActivityEntry()] }
                                            : d
                                        )),
                                      }
                                      : r
                                  )))}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                  {labels.addActivity}
                                </button>
                              </div>
                              <div className="framework-builder__org-competency-list">
                                {domainItem.flatActivities.map((actItem, actIndex) => {
                                  const canDeleteAct = domainItem.flatActivities.length > 1;
                                  return (
                                    <div key={actItem.id} className="framework-builder__org-competency-row">
                                      <span className="framework-builder__org-competency-index">{`${actIndex + 1}.`}</span>
                                      <input
                                        className="framework-builder__input framework-builder__org-competency-input"
                                        placeholder={labels.activityPlaceholder}
                                        value={actItem.text}
                                        onChange={(event) => mutate(prev => prev.map(r => (
                                          r.id === roleItem.id
                                            ? {
                                              ...r,
                                              domains: r.domains.map(d => (
                                                d.id === domainItem.id
                                                  ? {
                                                    ...d,
                                                    flatActivities: d.flatActivities.map(c => (
                                                      c.id === actItem.id ? { ...c, text: event.target.value } : c
                                                    )),
                                                  }
                                                  : d
                                              )),
                                            }
                                            : r
                                        )))}
                                        disabled={!canEdit}
                                      />
                                      <button
                                        type="button"
                                        className="competency-framework-page__icon-button competency-framework-page__icon-button--danger"
                                        disabled={!canEdit || !canDeleteAct || isDeleting}
                                        onClick={() => removeWithGuard(
                                          canDeleteAct,
                                          () => mutate(prev => prev.map(r => (
                                            r.id === roleItem.id
                                              ? {
                                                ...r,
                                                domains: r.domains.map(d => (
                                                  d.id === domainItem.id
                                                    ? {
                                                      ...d,
                                                      flatActivities: d.flatActivities.filter(
                                                        c => c.id !== actItem.id,
                                                      ),
                                                    }
                                                    : d
                                                )),
                                              }
                                              : r
                                          ))),
                                          labels.activityPlaceholder,
                                        )}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="competency-framework-page__outline-button framework-builder__org-small-add"
                    disabled={!canEdit || anyDomainInvalidInRole}
                    onClick={() => mutate(prev => prev.map(r => (
                      r.id === roleItem.id
                        ? { ...r, domains: [...r.domains, createActivityDomainBlock()] }
                        : r
                    )))}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    {labels.addDomain}
                  </button>
                </div>
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

      <AddNewDomainModal
        isOpen={addDomainOpen}
        onClose={() => setAddDomainOpen(false)}
        labels={labels.addDomainModal}
        onSubmit={onAddDomainOption}
      />
      <AddNewSubDomainModal
        isOpen={addSubDomainOpen}
        onClose={() => {
          setAddSubDomainOpen(false);
          setSubDomainModalParent('');
        }}
        labels={labels.addSubDomainModal}
        parentDomainOptions={domainOptions}
        defaultParentDomain={subDomainModalParent}
        onSubmit={onAddSubDomainOption}
      />

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

export { createRsaRoleItem };
export default RoleSpecificActivitiesTab;
