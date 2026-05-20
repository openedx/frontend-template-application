import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faChevronLeft,
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoleSpecificActivitiesTab, { createRsaRoleItem } from '../../components/competencyFramework/create/RoleSpecificActivitiesTab';
import ConfirmActionDialog from '../../components/confirmActionDialog/ConfirmActionDialog';
import DomainsTab, { createCompetencyTypeItem } from '../../components/competencyFramework/create/DomainsTab';
import FrameworkCard from '../../components/competencyFramework/FrameworkCard';
import GeneralInformationTab from '../../components/competencyFramework/create/GeneralInformationTab';
import ImportFrameworkModal from '../../components/competencyFramework/ImportFrameworkModal';
import IntroductionTab from '../../components/competencyFramework/create/IntroductionTab';
import OrganizationalCompetenciesTab, { createOrgCompetencyType } from '../../components/competencyFramework/create/OrganizationalCompetenciesTab';
import OverviewTab from '../../components/competencyFramework/create/OverviewTab';
import ProficiencyLevelTab, { createProficiencyLevelItem } from '../../components/competencyFramework/create/ProficiencyLevelTab';
import RoleSpecificCompetenciesTab, { createRscRoleItem } from '../../components/competencyFramework/create/RoleSpecificCompetenciesTab';
import RoleTab, { createFrameworkRoleItem } from '../../components/competencyFramework/create/RoleTab';
import SubDomainTab, { createSubDomainCompetencyTypeItem } from '../../components/competencyFramework/create/SubDomainTab';
import { TablePaginationFooter } from '../../components/dataTable';
import { EmptyState } from '../../components/emptyState';
import { SkeletonCard } from '../../components/skeleton';
import Tabs from '../../components/tabs/Tabs';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import SuggestionsTab from '../../components/competencyFramework/create/SuggestionsTab';
import { SOURCE_FRAMEWORK_BY_TAB } from '../../api/competencyFramework/competencyFrameworkConstants';
import useCompetencyFrameworkList from '../../hooks/competencyFramework/useCompetencyFrameworkList';
import builderOptions from '../../mock/competencyFramework/builderOptions.json';
import messages from './messages';
import './CompetencyFramework.scss';
const BUILDER_TABS_CONFIG = [
  { id: 'general', messageKey: 'tabGeneralInformation', accessKey: 'showBuilderGeneralTab' },
  { id: 'introduction', messageKey: 'tabIntroduction', accessKey: 'showBuilderIntroductionTab' },
  { id: 'overview', messageKey: 'tabOverview', accessKey: 'showBuilderOverviewTab' },
  { id: 'domains', messageKey: 'tabDomains', accessKey: 'showBuilderDomainsTab' },
  { id: 'subDomains', messageKey: 'tabSubDomain', accessKey: 'showBuilderSubDomainsTab' },
  { id: 'frameworkRoles', messageKey: 'tabRole', accessKey: 'showBuilderRoleTab' },
  { id: 'proficiencyLevels', messageKey: 'tabProficiencyLevel', accessKey: 'showBuilderProficiencyLevelTab' },
  { id: 'orgCompetencies', messageKey: 'tabOrgCompetencies', accessKey: 'showBuilderOrgCompetenciesTab' },
  { id: 'roleCompetencies', messageKey: 'tabRoleSpecificCompetencies', accessKey: 'showBuilderRoleCompetenciesTab' },
  { id: 'activities', messageKey: 'tabRoleSpecificActivities', accessKey: 'showBuilderActivitiesTab' },
];

const CompetencyFramework = () => {
  const { formatMessage } = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isCreateMode = location.pathname === '/admin/competency-frameworks/new';
  const { componentAccess } = useUserRole();
  const access = componentAccess?.competencyFramework || {};
  const visibleTabs = useMemo(() => {
    const fixedTabs = [
      { id: 'who', label: formatMessage(messages.frameworkTabWho) },
      { id: 'searn', label: formatMessage(messages.frameworkTabSearn) },
      { id: 'nra', label: formatMessage(messages.frameworkTabNraSpecific) },
    ];

    return fixedTabs.filter(tab => {
      if (tab.id === 'who') {
        return Boolean(access.showWhoTab);
      }
      if (tab.id === 'searn') {
        return Boolean(access.showSearnTab);
      }
      if (tab.id === 'nra') {
        return Boolean(access.showNraTab);
      }
      return false;
    });
  }, [access.showNraTab, access.showSearnTab, access.showWhoTab, formatMessage]);
  const [activeTabId, setActiveTabId] = useState(visibleTabs[0]?.id || null);
  const [page, setPage] = useState(1);
  const [importOpen, setImportOpen] = useState(false);
  const [pendingDeleteFramework, setPendingDeleteFramework] = useState(null);
  const [builderActiveTabId, setBuilderActiveTabId] = useState('general');
  const [builderForm, setBuilderForm] = useState({
    name: '',
    productTypes: [],
    description: '',
    sourceFramework: '',
    introductionBackground: '',
    introductionObjectives: '',
    overviewCompetencyModel: '',
    domainsCompetencyTypes: [createCompetencyTypeItem()],
    domainsOptions: builderOptions.domainOptions,
    subDomainsCompetencyTypes: [createSubDomainCompetencyTypeItem()],
    subDomainsOptions: builderOptions.subDomainOptions,
    frameworkRoles: [createFrameworkRoleItem()],
    proficiencyLevels: [createProficiencyLevelItem()],
    orgCompetencyTypes: [createOrgCompetencyType()],
    roleSpecificRoles: [createRscRoleItem()],
    roleSpecificActivityRoles: [createRsaRoleItem()],
  });

  const sourceFrameworkByTabId = useMemo(() => ({
    who: 'who-framework',
    searn: 'searn-framework',
    nra: 'nra-framework',
  }), []);
  const builderTabIdContext = location.state?.tabId || 'who';

  useEffect(() => {
    if (!isCreateMode) {
      return;
    }

    const framework = location.state?.framework;
    const tabId = location.state?.tabId || 'who';

    setBuilderActiveTabId('general');

    if (!framework) {
      // New create flow: default the source framework based on originating tab.
      setBuilderForm(prev => ({
        ...prev,
        name: '',
        description: '',
        sourceFramework: sourceFrameworkByTabId[tabId] || '',
      }));
      return;
    }

    // Edit/view flow: best-effort prefill from framework card data.
    setBuilderForm(prev => ({
      ...prev,
      name: framework.title || '',
      description: framework.description || '',
      sourceFramework: sourceFrameworkByTabId[tabId] || prev.sourceFramework,
    }));
  }, [isCreateMode, location.state, sourceFrameworkByTabId]);
  const activeTabSafe = visibleTabs.some(tab => tab.id === activeTabId) ? activeTabId : (visibleTabs[0]?.id || null);
  const canViewFramework = Boolean(
    (activeTabSafe === 'who' && access.canViewFrameworkWhoTab)
    || (activeTabSafe === 'searn' && access.canViewFrameworkSearnTab)
    || (activeTabSafe === 'nra' && access.canViewFrameworkNraTab),
  );
  const canEditFramework = Boolean(
    (activeTabSafe === 'who' && access.canEditFrameworkWhoTab)
    || (activeTabSafe === 'searn' && access.canEditFrameworkSearnTab)
    || (activeTabSafe === 'nra' && access.canEditFrameworkNraTab),
  );
  const canDeleteFramework = Boolean(
    (activeTabSafe === 'who' && access.canDeleteFrameworkWhoTab)
    || (activeTabSafe === 'searn' && access.canDeleteFrameworkSearnTab)
    || (activeTabSafe === 'nra' && access.canDeleteFrameworkNraTab),
  );
  const sourceFramework = activeTabSafe ? SOURCE_FRAMEWORK_BY_TAB[activeTabSafe] : null;
  const {
    frameworks,
    totalPages,
    isLoading: isFrameworkListLoading,
    isError: isFrameworkListError,
    errorMessage: frameworkListErrorMessage,
  } = useCompetencyFrameworkList({
    sourceFramework,
    page,
    enabled: !isCreateMode && Boolean(sourceFramework),
  });

  useEffect(() => {
    setPage(1);
  }, [activeTabSafe]);

  useEffect(() => {
    if (!isFrameworkListError) {
      return;
    }

    showToast({
      title: formatMessage(messages.frameworkListErrorTitle),
      description: frameworkListErrorMessage || formatMessage(messages.frameworkListLoadError),
    });
  }, [
    formatMessage,
    frameworkListErrorMessage,
    isFrameworkListError,
    showToast,
  ]);
  const cardLabels = {
    viewAction: formatMessage(messages.viewAction),
    editAction: formatMessage(messages.editAction),
    deleteAction: formatMessage(messages.deleteAction),
    domains: count => formatMessage(messages.metaDomains, { count }),
    subDomains: count => formatMessage(messages.metaSubDomains, { count }),
    created: date => formatMessage(messages.metaCreated, { date }),
  };
  const canShowSuggestionsTab = Boolean(access.showSuggestionsTab);
  const { sourceFrameworkOptions, productTypeOptions } = builderOptions;
  const importModalLabels = {
    title: formatMessage(messages.importModalTitle),
    description: formatMessage(messages.importModalDescription),
    downloadTemplate: formatMessage(messages.downloadTemplate),
    chooseFile: formatMessage(messages.importModalChooseFile),
    cancel: formatMessage(messages.importModalCancel),
    import: formatMessage(messages.importModalImport),
  };
  const builderMode = location.state?.mode || 'create'; // 'create' | 'edit' | 'view'
  const isReadOnlyMode = builderMode === 'view';

  const canCreateFrameworkInActiveTab = useMemo(() => {
    const tabId = isCreateMode ? builderTabIdContext : activeTabSafe;
    if (tabId === 'who') {
      return Boolean(access.canCreateFrameworkWhoTab);
    }
    if (tabId === 'searn') {
      return Boolean(access.canCreateFrameworkSearnTab);
    }
    if (tabId === 'nra') {
      return Boolean(access.canCreateFrameworkNraTab);
    }
    return false;
  }, [
    isCreateMode,
    builderTabIdContext,
    activeTabSafe,
    access.canCreateFrameworkNraTab,
    access.canCreateFrameworkSearnTab,
    access.canCreateFrameworkWhoTab,
  ]);
  const canEditFrameworkInActiveTab = canEditFramework;
  const canShowDownloadAndImport = canCreateFrameworkInActiveTab || canEditFrameworkInActiveTab;

  const canEditBuilderTabs = !isReadOnlyMode && (
    builderMode === 'edit'
      ? canEditFrameworkInActiveTab
      : canCreateFrameworkInActiveTab || canEditFrameworkInActiveTab
  );
  const builderTabs = useMemo(
    () => {
      const baseTabs = BUILDER_TABS_CONFIG
        .map(item => ({ id: item.id, label: formatMessage(messages[item.messageKey]) }));

      if (isCreateMode && canShowSuggestionsTab) {
        return [
          ...baseTabs,
          { id: 'suggestions', label: formatMessage(messages.tabSuggestions) },
        ];
      }

      return baseTabs;
    },
    [formatMessage, isCreateMode, canShowSuggestionsTab],
  );
  const builderTabSafe = builderTabs.some(tab => tab.id === builderActiveTabId)
    ? builderActiveTabId
    : (builderTabs[0]?.id || null);
  const generalLabels = {
    name: formatMessage(messages.fieldName),
    namePlaceholder: formatMessage(messages.fieldNamePlaceholder),
    typeOfProduct: formatMessage(messages.fieldTypeOfProduct),
    description: formatMessage(messages.fieldDescription),
    descriptionPlaceholder: formatMessage(messages.fieldDescriptionPlaceholder),
    sourceFramework: formatMessage(messages.fieldSourceFramework),
    sourceFrameworkPlaceholder: formatMessage(messages.fieldSourceFrameworkPlaceholder),
    editor: formatMessage(messages.editorLabel),
    preview: formatMessage(messages.previewLabel),
    bold: formatMessage(messages.boldLabel),
    italic: formatMessage(messages.italicLabel),
    underline: formatMessage(messages.underlineLabel),
    list: formatMessage(messages.listLabel),
    heading3: formatMessage(messages.heading3Label),
    save: formatMessage(messages.generalSaveButton),
    dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
    dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
  };
  const introductionLabels = {
    background: formatMessage(messages.introductionBackground),
    backgroundPlaceholder: formatMessage(messages.introductionBackgroundPlaceholder),
    objectives: formatMessage(messages.introductionObjectives),
    objectivesPlaceholder: formatMessage(messages.introductionObjectivesPlaceholder),
    editor: formatMessage(messages.editorLabel),
    preview: formatMessage(messages.previewLabel),
    bold: formatMessage(messages.boldLabel),
    italic: formatMessage(messages.italicLabel),
    underline: formatMessage(messages.underlineLabel),
    list: formatMessage(messages.listLabel),
    heading3: formatMessage(messages.heading3Label),
    save: formatMessage(messages.generalSaveButton),
  };
  const overviewLabels = {
    competencyModel: formatMessage(messages.overviewCompetencyModel),
    competencyModelPlaceholder: formatMessage(messages.overviewCompetencyModelPlaceholder),
    editor: formatMessage(messages.editorLabel),
    preview: formatMessage(messages.previewLabel),
    bold: formatMessage(messages.boldLabel),
    italic: formatMessage(messages.italicLabel),
    underline: formatMessage(messages.underlineLabel),
    list: formatMessage(messages.listLabel),
    heading3: formatMessage(messages.heading3Label),
    save: formatMessage(messages.generalSaveButton),
  };
  const domainsLabels = {
    competencyType: formatMessage(messages.domainsCompetencyType),
    competencyTypePlaceholder: formatMessage(messages.domainsCompetencyTypePlaceholder),
    domains: formatMessage(messages.domainsFieldLabel),
    addCompetencyType: formatMessage(messages.addCompetencyType),
    addNewDomain: formatMessage(messages.addNewDomain),
    deleteCompetencyType: formatMessage(messages.deleteCompetencyType),
    deleteDialogTitle: formatMessage(messages.deleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.domainsCompetencyType);
      return formatMessage(messages.deleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.deleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.deleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.deleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.deleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.deleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.deleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.deleteBlockedDescription),
    addDomainModal: {
      title: formatMessage(messages.addDomainModalTitle),
      domainId: formatMessage(messages.addDomainModalDomainId),
      domainIdPlaceholder: formatMessage(messages.addDomainModalDomainIdPlaceholder),
      domainName: formatMessage(messages.addDomainModalDomainName),
      domainNamePlaceholder: formatMessage(messages.addDomainModalDomainNamePlaceholder),
      domainDescription: formatMessage(messages.addDomainModalDomainDescription),
      domainDescriptionPlaceholder: formatMessage(messages.addDomainModalDomainDescriptionPlaceholder),
      cancel: formatMessage(messages.addDomainModalCancel),
      confirm: formatMessage(messages.addDomainModalConfirm),
    },
    save: formatMessage(messages.generalSaveButton),
  };
  const subDomainsLabels = {
    competencyType: formatMessage(messages.subDomainsCompetencyType),
    competencyTypePlaceholder: formatMessage(messages.subDomainsCompetencyTypePlaceholder),
    subDomains: formatMessage(messages.subDomainsFieldLabel),
    addCompetencyType: formatMessage(messages.addSubDomainCompetencyType),
    addNewSubDomain: formatMessage(messages.addNewSubDomain),
    deleteCompetencyType: formatMessage(messages.deleteSubDomainCompetencyType),
    deleteDialogTitle: formatMessage(messages.deleteSubDomainDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.subDomainsCompetencyType);
      return formatMessage(messages.deleteSubDomainDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.deleteSubDomainDialogCancel),
    deleteDialogConfirm: formatMessage(messages.deleteSubDomainDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.deleteSubDomainSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.deleteSubDomainSuccessDescription),
    deleteFailedTitle: formatMessage(messages.deleteSubDomainFailedTitle),
    deleteFailedDescription: formatMessage(messages.deleteSubDomainFailedDescription),
    deleteBlockedDescription: formatMessage(messages.deleteSubDomainBlockedDescription),
    addSubDomainModal: {
      title: formatMessage(messages.addSubDomainModalTitle),
      parentDomain: formatMessage(messages.addSubDomainModalParentDomain),
      parentDomainPlaceholder: formatMessage(messages.addSubDomainModalParentDomainPlaceholder),
      subDomainId: formatMessage(messages.addSubDomainModalSubDomainId),
      subDomainIdPlaceholder: formatMessage(messages.addSubDomainModalSubDomainIdPlaceholder),
      subDomainName: formatMessage(messages.addSubDomainModalSubDomainName),
      subDomainNamePlaceholder: formatMessage(messages.addSubDomainModalSubDomainNamePlaceholder),
      subDomainDescription: formatMessage(messages.addSubDomainModalSubDomainDescription),
      subDomainDescriptionPlaceholder: formatMessage(messages.addSubDomainModalSubDomainDescriptionPlaceholder),
      cancel: formatMessage(messages.addSubDomainModalCancel),
      confirm: formatMessage(messages.addSubDomainModalConfirm),
      dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
      dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
    },
    save: formatMessage(messages.generalSaveButton),
  };
  const roleLabels = {
    title: formatMessage(messages.roleTabTitle),
    description: formatMessage(messages.roleTabDescription),
    addRole: formatMessage(messages.roleTabAddRole),
    deleteRole: formatMessage(messages.roleTabDeleteRole),
    roleNamePlaceholder: formatMessage(messages.roleTabRoleNamePlaceholder),
    deleteDialogTitle: formatMessage(messages.roleTabDeleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.roleTabTitle);
      return formatMessage(messages.roleTabDeleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.roleTabDeleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.roleTabDeleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.roleTabDeleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.roleTabDeleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.roleTabDeleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.roleTabDeleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.roleTabDeleteBlockedDescription),
    saveSuccessTitle: formatMessage(messages.roleTabSaveSuccessTitle),
    saveSuccessDescription: formatMessage(messages.roleTabSaveSuccessDescription),
    saveFailedTitle: formatMessage(messages.roleTabSaveFailedTitle),
    saveFailedDescription: formatMessage(messages.roleTabSaveFailedDescription),
    save: formatMessage(messages.generalSaveButton),
  };
  const proficiencyLabels = {
    title: formatMessage(messages.proficiencyTabTitle),
    description: formatMessage(messages.proficiencyTabDescription),
    addLevel: formatMessage(messages.proficiencyTabAddLevel),
    codeLabel: formatMessage(messages.proficiencyTabCodeLabel),
    codePlaceholder: formatMessage(messages.proficiencyTabCodePlaceholder),
    nameLabel: formatMessage(messages.proficiencyTabNameLabel),
    namePlaceholder: formatMessage(messages.proficiencyTabNamePlaceholder),
    deleteLevel: formatMessage(messages.proficiencyTabDeleteLevel),
    deleteDialogTitle: formatMessage(messages.proficiencyTabDeleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.proficiencyTabTitle);
      return formatMessage(messages.proficiencyTabDeleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.proficiencyTabDeleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.proficiencyTabDeleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.proficiencyTabDeleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.proficiencyTabDeleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.proficiencyTabDeleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.proficiencyTabDeleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.proficiencyTabDeleteBlockedDescription),
    saveSuccessTitle: formatMessage(messages.proficiencyTabSaveSuccessTitle),
    saveSuccessDescription: formatMessage(messages.proficiencyTabSaveSuccessDescription),
    saveFailedTitle: formatMessage(messages.proficiencyTabSaveFailedTitle),
    saveFailedDescription: formatMessage(messages.proficiencyTabSaveFailedDescription),
    save: formatMessage(messages.generalSaveButton),
  };
  const proficiencyLevelOptions = [
    ...(builderOptions.proficiencyLevelOptions || []),
    ...builderForm.proficiencyLevels
      .filter(level => level.code.trim() && level.name.trim())
      .map(level => ({
        value: level.id,
        label: `${level.name} (${level.code})`,
      })),
  ];
  const roleSpecificRoleOptions = useMemo(
    () => builderForm.frameworkRoles.map(role => ({
      value: role.id,
      label: role.name.trim() || formatMessage(messages.roleTabRoleNamePlaceholder),
    })),
    [builderForm.frameworkRoles, formatMessage],
  );

  const roleSpecificLabels = {
    title: formatMessage(messages.sectionRoleCompetenciesTitle),
    description: formatMessage(messages.sectionRoleCompetenciesDescription),
    addRole: formatMessage(messages.roleSpecificAddRole),
    roleLabel: formatMessage(messages.roleSpecificRoleLabel),
    selectRolePlaceholder: formatMessage(messages.roleSpecificSelectRolePlaceholder),
    competencyTypeLabel: formatMessage(messages.roleSpecificCompetencyTypeLabel),
    competencyTypeValue: formatMessage(messages.roleSpecificCompetencyTypeValue),
    domainLabel: formatMessage(messages.roleSpecificDomainLabel),
    subDomainLabel: formatMessage(messages.roleSpecificSubDomainLabel),
    requireProficiency: formatMessage(messages.roleSpecificRequireProficiency),
    requireSubDomain: formatMessage(messages.roleSpecificRequireSubDomain),
    addDomain: formatMessage(messages.roleSpecificAddDomain),
    addProficiencyLevel: formatMessage(messages.roleSpecificAddProficiencyLevel),
    addCompetency: formatMessage(messages.roleSpecificAddCompetency),
    flatCompetenciesLabel: formatMessage(messages.roleSpecificFlatCompetenciesLabel),
    selectDomainPlaceholder: formatMessage(messages.roleSpecificSelectDomainPlaceholder),
    selectSubDomainPlaceholder: formatMessage(messages.roleSpecificSelectSubDomainPlaceholder),
    selectLevelPlaceholder: formatMessage(messages.roleSpecificSelectLevelPlaceholder),
    proficiencyLevelLabel: formatMessage(messages.orgCompetenciesLevelLabel),
    competencyPlaceholder: formatMessage(messages.roleSpecificCompetencyPlaceholder),
    addNewDomainTitle: formatMessage(messages.roleSpecificAddNewDomainTitle),
    addNewSubDomainTitle: formatMessage(messages.roleSpecificAddNewSubDomainTitle),
    addDomainModal: domainsLabels.addDomainModal,
    addSubDomainModal: subDomainsLabels.addSubDomainModal,
    deleteDialogTitle: formatMessage(messages.roleSpecificDeleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.sectionRoleCompetenciesTitle);
      return formatMessage(messages.roleSpecificDeleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.roleSpecificDeleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.roleSpecificDeleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.roleSpecificDeleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.roleSpecificDeleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.roleSpecificDeleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.roleSpecificDeleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.roleSpecificDeleteBlockedDescription),
    saveSuccessTitle: formatMessage(messages.roleSpecificSaveSuccessTitle),
    saveSuccessDescription: formatMessage(messages.roleSpecificSaveSuccessDescription),
    saveFailedTitle: formatMessage(messages.roleSpecificSaveFailedTitle),
    saveFailedDescription: formatMessage(messages.roleSpecificSaveFailedDescription),
    save: formatMessage(messages.generalSaveButton),
    dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
    dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
  };

  const roleActivitiesLabels = {
    title: formatMessage(messages.sectionActivitiesTitle),
    description: formatMessage(messages.sectionActivitiesDescription),
    addRole: formatMessage(messages.roleActivitiesAddRole),
    roleLabel: formatMessage(messages.roleActivitiesRoleLabel),
    selectRolePlaceholder: formatMessage(messages.roleActivitiesSelectRolePlaceholder),
    domainLabel: formatMessage(messages.roleActivitiesDomainLabel),
    subDomainLabel: formatMessage(messages.roleActivitiesSubDomainLabel),
    requireProficiency: formatMessage(messages.roleActivitiesRequireProficiency),
    requireSubDomain: formatMessage(messages.roleActivitiesRequireSubDomain),
    addDomain: formatMessage(messages.roleActivitiesAddDomain),
    addProficiencyLevel: formatMessage(messages.roleActivitiesAddProficiencyLevel),
    addActivity: formatMessage(messages.roleActivitiesAddActivity),
    flatActivitiesLabel: formatMessage(messages.roleActivitiesFlatSectionLabel),
    selectDomainPlaceholder: formatMessage(messages.roleActivitiesSelectDomainPlaceholder),
    selectSubDomainPlaceholder: formatMessage(messages.roleActivitiesSelectSubDomainPlaceholder),
    selectLevelPlaceholder: formatMessage(messages.roleActivitiesSelectLevelPlaceholder),
    proficiencyLevelLabel: formatMessage(messages.orgCompetenciesLevelLabel),
    activityPlaceholder: formatMessage(messages.roleActivitiesActivityPlaceholder),
    addNewDomainTitle: formatMessage(messages.roleActivitiesAddNewDomainTitle),
    addNewSubDomainTitle: formatMessage(messages.roleActivitiesAddNewSubDomainTitle),
    addDomainModal: domainsLabels.addDomainModal,
    addSubDomainModal: subDomainsLabels.addSubDomainModal,
    deleteDialogTitle: formatMessage(messages.roleActivitiesDeleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.sectionActivitiesTitle);
      return formatMessage(messages.roleActivitiesDeleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.roleActivitiesDeleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.roleActivitiesDeleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.roleActivitiesDeleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.roleActivitiesDeleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.roleActivitiesDeleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.roleActivitiesDeleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.roleActivitiesDeleteBlockedDescription),
    saveSuccessTitle: formatMessage(messages.roleActivitiesSaveSuccessTitle),
    saveSuccessDescription: formatMessage(messages.roleActivitiesSaveSuccessDescription),
    saveFailedTitle: formatMessage(messages.roleActivitiesSaveFailedTitle),
    saveFailedDescription: formatMessage(messages.roleActivitiesSaveFailedDescription),
    save: formatMessage(messages.generalSaveButton),
    dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
    dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
  };

  const orgCompetenciesLabels = {
    title: formatMessage(messages.orgCompetenciesTabTitle),
    description: formatMessage(messages.orgCompetenciesTabDescription),
    addCompetencyType: formatMessage(messages.orgCompetenciesAddType),
    addDomain: formatMessage(messages.orgCompetenciesAddDomain),
    addProficiencyLevel: formatMessage(messages.orgCompetenciesAddLevel),
    addCompetency: formatMessage(messages.orgCompetenciesAddCompetency),
    competencyTypeLabel: formatMessage(messages.orgCompetenciesTypeLabel),
    domainLabel: formatMessage(messages.orgCompetenciesDomainLabel),
    proficiencyLevelLabel: formatMessage(messages.orgCompetenciesLevelLabel),
    selectTypePlaceholder: formatMessage(messages.orgCompetenciesSelectTypePlaceholder),
    selectDomainPlaceholder: formatMessage(messages.orgCompetenciesSelectDomainPlaceholder),
    selectLevelPlaceholder: formatMessage(messages.orgCompetenciesSelectLevelPlaceholder),
    competencyPlaceholder: formatMessage(messages.orgCompetenciesCompetencyPlaceholder),
    deleteDialogTitle: formatMessage(messages.orgCompetenciesDeleteDialogTitle),
    deleteDialogDescription: (name) => {
      const fallback = formatMessage(messages.orgCompetenciesTabTitle);
      return formatMessage(messages.orgCompetenciesDeleteDialogDescription, { name: name || fallback });
    },
    deleteDialogCancel: formatMessage(messages.orgCompetenciesDeleteDialogCancel),
    deleteDialogConfirm: formatMessage(messages.orgCompetenciesDeleteDialogConfirm),
    deleteSuccessTitle: formatMessage(messages.orgCompetenciesDeleteSuccessTitle),
    deleteSuccessDescription: formatMessage(messages.orgCompetenciesDeleteSuccessDescription),
    deleteFailedTitle: formatMessage(messages.orgCompetenciesDeleteFailedTitle),
    deleteFailedDescription: formatMessage(messages.orgCompetenciesDeleteFailedDescription),
    deleteBlockedDescription: formatMessage(messages.orgCompetenciesDeleteBlockedDescription),
    saveSuccessTitle: formatMessage(messages.orgCompetenciesSaveSuccessTitle),
    saveSuccessDescription: formatMessage(messages.orgCompetenciesSaveSuccessDescription),
    saveFailedTitle: formatMessage(messages.orgCompetenciesSaveFailedTitle),
    saveFailedDescription: formatMessage(messages.orgCompetenciesSaveFailedDescription),
    save: formatMessage(messages.generalSaveButton),
    dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
    dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
  };

  const handleAddDomainOption = (domain) => {
    const normalizedValue = domain.value.toLowerCase();
    const exists = builderForm.domainsOptions.some(
      item => item.value.toLowerCase() === normalizedValue,
    );

    if (exists) {
      showToast({
        title: formatMessage(messages.addDomainDuplicateTitle),
        description: formatMessage(messages.addDomainDuplicateDescription),
      });
      return;
    }

    setBuilderForm(prev => ({
      ...prev,
      domainsOptions: [...prev.domainsOptions, domain],
    }));
    showToast({
      title: formatMessage(messages.addDomainSuccessTitle),
      description: formatMessage(messages.addDomainSuccessDescription),
    });
  };

  const handleAddSubDomainOption = (subDomain) => {
    const normalizedValue = subDomain.value.toLowerCase();
    const exists = builderForm.subDomainsOptions.some(
      item => item.value.toLowerCase() === normalizedValue,
    );

    if (exists) {
      showToast({
        title: formatMessage(messages.addSubDomainDuplicateTitle),
        description: formatMessage(messages.addSubDomainDuplicateDescription),
      });
      return;
    }

    setBuilderForm(prev => ({
      ...prev,
      subDomainsOptions: [...prev.subDomainsOptions, subDomain],
    }));
    showToast({
      title: formatMessage(messages.addSubDomainSuccessTitle),
      description: formatMessage(messages.addSubDomainSuccessDescription),
    });
  };

  let builderContent = null;
  if (builderTabSafe === 'general') {
    builderContent = (
      <GeneralInformationTab
        labels={generalLabels}
        values={builderForm}
        onChange={(key, value) => setBuilderForm(prev => ({ ...prev, [key]: value }))}
        sourceFrameworkOptions={sourceFrameworkOptions}
        productTypeOptions={productTypeOptions}
        canEdit={canEditBuilderTabs}
      />
    );
  } else if (builderTabSafe === 'introduction') {
    builderContent = (
      <IntroductionTab
        labels={introductionLabels}
        values={{
          background: builderForm.introductionBackground,
          objectives: builderForm.introductionObjectives,
        }}
        onChange={(key, value) => setBuilderForm(prev => ({ ...prev, [key]: value }))}
        canEdit={canEditBuilderTabs}
      />
    );
  } else if (builderTabSafe === 'overview') {
    builderContent = (
      <OverviewTab
        labels={overviewLabels}
        value={builderForm.overviewCompetencyModel}
        onChange={next => setBuilderForm(prev => ({ ...prev, overviewCompetencyModel: next }))}
        canEdit={canEditBuilderTabs}
      />
    );
  } else if (builderTabSafe === 'domains') {
    builderContent = (
      <DomainsTab
        labels={domainsLabels}
        canEdit={canEditBuilderTabs}
        competencyTypes={builderForm.domainsCompetencyTypes}
        onChangeCompetencyTypes={next => setBuilderForm(prev => ({ ...prev, domainsCompetencyTypes: next }))}
        domainOptions={builderForm.domainsOptions}
        onAddDomainOption={handleAddDomainOption}
      />
    );
  } else if (builderTabSafe === 'subDomains') {
    builderContent = (
      <SubDomainTab
        labels={subDomainsLabels}
        canEdit={canEditBuilderTabs}
        competencyTypes={builderForm.subDomainsCompetencyTypes}
        onChangeCompetencyTypes={next => setBuilderForm(prev => ({ ...prev, subDomainsCompetencyTypes: next }))}
        subDomainOptions={builderForm.subDomainsOptions}
        onAddSubDomainOption={handleAddSubDomainOption}
        parentDomainOptions={builderForm.domainsOptions}
      />
    );
  } else if (builderTabSafe === 'frameworkRoles') {
    builderContent = (
      <RoleTab
        labels={roleLabels}
        canEdit={canEditBuilderTabs}
        roles={builderForm.frameworkRoles}
        onChangeRoles={next => setBuilderForm(prev => ({ ...prev, frameworkRoles: next }))}
      />
    );
  } else if (builderTabSafe === 'proficiencyLevels') {
    builderContent = (
      <ProficiencyLevelTab
        labels={proficiencyLabels}
        canEdit={canEditBuilderTabs}
        levels={builderForm.proficiencyLevels}
        onChangeLevels={next => setBuilderForm(prev => ({ ...prev, proficiencyLevels: next }))}
      />
    );
  } else if (builderTabSafe === 'orgCompetencies') {
    builderContent = (
      <OrganizationalCompetenciesTab
        labels={orgCompetenciesLabels}
        canEdit={canEditBuilderTabs}
        items={builderForm.orgCompetencyTypes}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, orgCompetencyTypes: next }))}
        competencyTypeOptions={builderOptions.competencyTypeOptions}
        domainOptions={builderForm.domainsOptions}
        proficiencyLevelOptions={proficiencyLevelOptions}
      />
    );
  } else if (builderTabSafe === 'roleCompetencies') {
    builderContent = (
      <RoleSpecificCompetenciesTab
        labels={roleSpecificLabels}
        canEdit={canEditBuilderTabs}
        items={builderForm.roleSpecificRoles}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, roleSpecificRoles: next }))}
        domainOptions={builderForm.domainsOptions}
        subDomainOptions={builderForm.subDomainsOptions}
        proficiencyLevelOptions={proficiencyLevelOptions}
        roleOptions={roleSpecificRoleOptions}
        onAddDomainOption={handleAddDomainOption}
        onAddSubDomainOption={handleAddSubDomainOption}
      />
    );
  } else if (builderTabSafe === 'activities') {
    builderContent = (
      <RoleSpecificActivitiesTab
        labels={roleActivitiesLabels}
        canEdit={canEditBuilderTabs}
        items={builderForm.roleSpecificActivityRoles}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, roleSpecificActivityRoles: next }))}
        domainOptions={builderForm.domainsOptions}
        subDomainOptions={builderForm.subDomainsOptions}
        proficiencyLevelOptions={proficiencyLevelOptions}
        roleOptions={roleSpecificRoleOptions}
        onAddDomainOption={handleAddDomainOption}
        onAddSubDomainOption={handleAddSubDomainOption}
      />
    );
  } else if (builderTabSafe === 'suggestions') {
    builderContent = (
      <SuggestionsTab canEdit={canShowSuggestionsTab} />
    );
  }

  return (
    <section className="competency-framework-page">
      {isCreateMode ? (
        <>
          <div className="framework-builder__top">
            <button
              type="button"
              className="framework-builder__back-button"
              onClick={() => navigate('/admin/competency-frameworks')}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              {formatMessage(messages.backToFrameworks)}
            </button>
          </div>

          <Tabs
            items={builderTabs}
            activeId={builderTabSafe}
            onChange={setBuilderActiveTabId}
          />

          <div className="framework-builder__content">
            {isReadOnlyMode && builderTabSafe !== 'suggestions' && (
              <div className="framework-builder__readonly-banner" role="status">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="framework-builder__readonly-icon"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {formatMessage(messages.readOnlyBannerText)}
              </div>
            )}
            {builderContent}
          </div>
        </>
      ) : (
        <>
          <div className="competency-framework-page__top">
            <div />
            <div className="competency-framework-page__actions">
              {canShowDownloadAndImport && (
                <button type="button" className="competency-framework-page__outline-button">
                  <FontAwesomeIcon icon={faDownload} />
                  {formatMessage(messages.downloadTemplate)}
                </button>
              )}
              {canShowDownloadAndImport && (
                <button
                  type="button"
                  className="competency-framework-page__outline-button"
                  onClick={() => setImportOpen(true)}
                >
                  <FontAwesomeIcon icon={faUpload} />
                  {formatMessage(messages.importFromExcel)}
                </button>
              )}
              {canCreateFrameworkInActiveTab && (
                <button
                  type="button"
                  className="competency-framework-page__primary-button"
                  onClick={() => navigate('/admin/competency-frameworks/new', {
                    state: {
                      mode: 'create',
                      tabId: activeTabSafe || 'who',
                    },
                  })}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  {formatMessage(messages.createFramework)}
                </button>
              )}
            </div>
          </div>

          <Tabs
            items={visibleTabs}
            activeId={activeTabSafe}
            onChange={setActiveTabId}
          />

          {isFrameworkListLoading && (
            <div
              className="competency-framework-page__list"
              aria-busy="true"
              aria-label={formatMessage(messages.frameworkListLoading)}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard
                  key={`framework-skeleton-${index}`}
                  hasHeader={false}
                  bodyLines={3}
                  className="competency-framework-page__card-skeleton"
                />
              ))}
            </div>
          )}

          {!isFrameworkListLoading && isFrameworkListError && (
            <EmptyState
              fullSize
              className="competency-framework-page__empty"
              message={frameworkListErrorMessage || formatMessage(messages.frameworkListLoadError)}
            />
          )}

          {!isFrameworkListLoading && !isFrameworkListError && frameworks.length === 0 && (
            <EmptyState
              fullSize
              className="competency-framework-page__empty"
              message={formatMessage(messages.noFrameworkFound)}
            />
          )}

          {!isFrameworkListLoading && !isFrameworkListError && frameworks.length > 0 && (
            <div className="competency-framework-page__list">
              {frameworks.map(item => (
              <FrameworkCard
                key={item.id}
                item={item}
                labels={cardLabels}
                canViewFramework={canViewFramework}
                canEditFramework={canEditFramework}
                canDeleteFramework={canDeleteFramework}
                onDeleteClick={setPendingDeleteFramework}
                onViewClick={(framework) => {
                  navigate('/admin/competency-frameworks/new', {
                    state: {
                      mode: 'view',
                      framework,
                      tabId: activeTabSafe,
                    },
                  });
                }}
                onEditClick={(framework) => {
                  navigate('/admin/competency-frameworks/new', {
                    state: {
                      mode: 'edit',
                      framework,
                      tabId: activeTabSafe,
                    },
                  });
                }}
              />
            ))}
            </div>
          )}

          {!isFrameworkListLoading && !isFrameworkListError && (
            <TablePaginationFooter
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              paginationLabel="Competency framework pagination"
            />
          )}

          {canShowDownloadAndImport && (
            <ImportFrameworkModal
              isOpen={importOpen}
              onClose={() => setImportOpen(false)}
              labels={importModalLabels}
            />
          )}
          {canDeleteFramework && (
            <ConfirmActionDialog
              isOpen={Boolean(pendingDeleteFramework)}
              title={formatMessage(messages.frameworkDeleteDialogTitle)}
              description={formatMessage(messages.frameworkDeleteDialogDescription, { name: pendingDeleteFramework?.title || '' })}
              cancelLabel={formatMessage(messages.frameworkDeleteDialogCancel)}
              confirmLabel={formatMessage(messages.frameworkDeleteDialogConfirm)}
              onCancel={() => setPendingDeleteFramework(null)}
              onConfirm={() => {
                try {
                  showToast({
                    title: formatMessage(messages.frameworkDeleteSuccessTitle),
                    description: formatMessage(messages.frameworkDeleteSuccessDescription, { name: pendingDeleteFramework?.title || '' }),
                  });
                  setPendingDeleteFramework(null);
                } catch (error) {
                  showToast({
                    title: formatMessage(messages.frameworkDeleteFailedTitle),
                    description: formatMessage(messages.frameworkDeleteFailedDescription),
                  });
                }
              }}
            />
          )}
        </>
      )}
    </section>
  );
};

export default CompetencyFramework;
