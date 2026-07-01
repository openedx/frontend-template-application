import { useIntl } from '@edx/frontend-platform/i18n';
import {
  faChevronLeft,
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { SkeletonCard, SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import Tabs from '../../components/tabs/Tabs';
import { useToast } from '../../components/toast/ToastProvider';
import { useUserRole } from '../../contexts/UserRoleContext';
import SuggestionsTab from '../../components/competencyFramework/create/SuggestionsTab';
import {
  buildCreateDomainPayload,
  buildDomainsSyncPayload,
  mapCreatedDomainToMultiSelectOption,
  mapDomainsSyncResponseToFormRows,
} from '../../api/competencyFramework/competencyFrameworkDomainsUtils';
import {
  buildCreateSubDomainPayload,
  buildSubDomainsSyncPayload,
  mapCreatedSubDomainToMultiSelectOption,
  mapSubDomainsSyncResponseToFormRows,
} from '../../api/competencyFramework/competencyFrameworkSubDomainsUtils';
import {
  buildRolesSyncPayload,
  mapFrameworkRolesToFormRows,
  unwrapRolesResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkRolesUtils';
import {
  buildProficiencyLevelsSyncPayload,
  mapFrameworkProficiencyLevelsToFormRows,
  unwrapProficiencyResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkProficiencyUtils';
import { fetchFrameworkRoles } from '../../api/competencyFramework/competencyFrameworkRolesApi';
import { fetchFrameworkProficiencyLevels } from '../../api/competencyFramework/competencyFrameworkProficiencyApi';
import {
  buildOrganizationCompetenciesSyncPayload,
  mapOrganizationCompetenciesToFormItems,
  unwrapOrganizationCompetenciesResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesUtils';
import { fetchFrameworkOrganizationCompetencies } from '../../api/competencyFramework/competencyFrameworkOrganizationCompetenciesApi';
import { fetchFrameworkRoleCompetencies } from '../../api/competencyFramework/competencyFrameworkRoleCompetenciesApi';
import { fetchFrameworkRoleActivities } from '../../api/competencyFramework/competencyFrameworkRoleActivitiesApi';
import {
  buildRoleActivitiesSyncPayload,
  buildRoleCompetenciesSyncPayload,
  mapRoleActivitiesToFormRoles,
  mapRoleCompetenciesToFormRoles,
  unwrapRoleSpecificResultsPayload,
} from '../../api/competencyFramework/competencyFrameworkRoleSpecificUtils';
import {
  buildGeneralInformationPayload,
  buildIntroductionPayload,
  buildOverviewPayload,
  mapGeneralInformationFieldsFromApi,
  mergeFrameworkDetailIntoBuilderForm,
  resolveFrameworkIdFromApiResponse,
} from '../../api/competencyFramework/competencyFrameworkUtils';
import useCompetencyFrameworkDomainsMutations from '../../hooks/competencyFramework/useCompetencyFrameworkDomainsMutations';
import useCompetencyFrameworkSubDomainsMutations from '../../hooks/competencyFramework/useCompetencyFrameworkSubDomainsMutations';
import useCompetencyFrameworkRolesMutations from '../../hooks/competencyFramework/useCompetencyFrameworkRolesMutations';
import useCompetencyFrameworkProficiencyMutations from '../../hooks/competencyFramework/useCompetencyFrameworkProficiencyMutations';
import useFrameworkRoles from '../../hooks/competencyFramework/useFrameworkRoles';
import useFrameworkProficiencyLevels from '../../hooks/competencyFramework/useFrameworkProficiencyLevels';
import useDomainOptions from '../../hooks/competencyFramework/useDomainOptions';
import useFrameworkDomains from '../../hooks/competencyFramework/useFrameworkDomains';
import useFrameworkSubDomains from '../../hooks/competencyFramework/useFrameworkSubDomains';
import useSubDomainOptions from '../../hooks/competencyFramework/useSubDomainOptions';
import useCompetencyFrameworkOrganizationCompetenciesMutations from '../../hooks/competencyFramework/useCompetencyFrameworkOrganizationCompetenciesMutations';
import useFrameworkOrganizationCompetencies from '../../hooks/competencyFramework/useFrameworkOrganizationCompetencies';
import useCompetencyFrameworkRoleCompetenciesMutations from '../../hooks/competencyFramework/useCompetencyFrameworkRoleCompetenciesMutations';
import useFrameworkRoleCompetencies from '../../hooks/competencyFramework/useFrameworkRoleCompetencies';
import useCompetencyFrameworkRoleActivitiesMutations from '../../hooks/competencyFramework/useCompetencyFrameworkRoleActivitiesMutations';
import useFrameworkRoleActivities from '../../hooks/competencyFramework/useFrameworkRoleActivities';
import useFrameworkCompetencyTypeOptions from '../../hooks/competencyFramework/useFrameworkCompetencyTypeOptions';
import useFrameworkLinkedDomainOptions from '../../hooks/competencyFramework/useFrameworkLinkedDomainOptions';
import useFrameworkProficiencyDropdownOptions from '../../hooks/competencyFramework/useFrameworkProficiencyDropdownOptions';
import useFrameworkRoleOptions from '../../hooks/competencyFramework/useFrameworkRoleOptions';
import useSubDomainOptionsByDomains from '../../hooks/competencyFramework/useSubDomainOptionsByDomains';
import { SOURCE_FRAMEWORK_BY_TAB } from '../../api/competencyFramework/competencyFrameworkConstants';
import useCompetencyFrameworkDetail, {
  competencyFrameworkDetailQueryKey,
  fetchFrameworkDetailFormState,
} from '../../hooks/competencyFramework/useCompetencyFrameworkDetail';
import useCompetencyFrameworkGeneralMutations from '../../hooks/competencyFramework/useCompetencyFrameworkGeneralMutations';
import useCompetencyFrameworkList from '../../hooks/competencyFramework/useCompetencyFrameworkList';
import useProductTypeOptions from '../../hooks/competencyFramework/useProductTypeOptions';
import useSourceFrameworkOptions from '../../hooks/competencyFramework/useSourceFrameworkOptions';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { buildPaginationShowingParams } from '../../utils/paginationUtils';
import messages from './messages';
import './CompetencyFramework.scss';
const BUILDER_TABS_CONFIG = [
  { id: 'general', messageKey: 'tabGeneralInformation' },
  { id: 'introduction', messageKey: 'tabIntroduction' },
  { id: 'overview', messageKey: 'tabOverview' },
  { id: 'domains', messageKey: 'tabDomains' },
  { id: 'subDomains', messageKey: 'tabSubDomain' },
  { id: 'frameworkRoles', messageKey: 'tabRole' },
  { id: 'proficiencyLevels', messageKey: 'tabProficiencyLevel' },
  { id: 'orgCompetencies', messageKey: 'tabOrgCompetencies' },
  { id: 'roleCompetencies', messageKey: 'tabRoleSpecificCompetencies' },
  { id: 'activities', messageKey: 'tabRoleSpecificActivities' },
];

const CompetencyFramework = () => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { frameworkId: routeFrameworkId } = useParams();
  const isBuilderNewPage = /\/competency-frameworks\/new\/?$/.test(location.pathname);
  const isBuilderEditPage = Boolean(routeFrameworkId) && location.pathname.includes('/edit');
  const isBuilderPage = isBuilderNewPage || isBuilderEditPage;
  const isListPage = !isBuilderPage;
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
  const [frameworkUuid, setFrameworkUuid] = useState(null);
  const [isPrefillingGeneral, setIsPrefillingGeneral] = useState(false);
  const [domainsPrefillApplied, setDomainsPrefillApplied] = useState(false);
  const [subDomainsPrefillApplied, setSubDomainsPrefillApplied] = useState(false);
  const [rolesPrefillApplied, setRolesPrefillApplied] = useState(false);
  const [proficiencyPrefillApplied, setProficiencyPrefillApplied] = useState(false);
  const [orgCompetenciesPrefillApplied, setOrgCompetenciesPrefillApplied] = useState(false);
  const [roleCompetenciesPrefillApplied, setRoleCompetenciesPrefillApplied] = useState(false);
  const [roleActivitiesPrefillApplied, setRoleActivitiesPrefillApplied] = useState(false);
  const [builderForm, setBuilderForm] = useState({
    name: '',
    productTypes: [],
    description: '',
    sourceFramework: '',
    introductionBackground: '',
    introductionObjectives: '',
    overviewCompetencyModel: '',
    domainsCompetencyTypes: [createCompetencyTypeItem()],
    subDomainsCompetencyTypes: [createSubDomainCompetencyTypeItem()],
    frameworkRoles: [createFrameworkRoleItem()],
    proficiencyLevels: [createProficiencyLevelItem()],
    orgCompetencyTypes: [createOrgCompetencyType()],
    roleSpecificRoles: [createRscRoleItem()],
    roleSpecificActivityRoles: [createRsaRoleItem()],
  });

  const builderTabIdContext = location.state?.tabId || 'who';
  const builderMode = location.state?.mode === 'view'
    ? 'view'
    : (isBuilderEditPage ? 'edit' : 'create');
  const isReadOnlyMode = builderMode === 'view';

  const {
    dropdownOptions: productTypeOptions,
    isLoading: isProductTypesLoading,
    isError: isProductTypesError,
    errorMessage: productTypesErrorMessage,
  } = useProductTypeOptions({ enabled: isBuilderPage });

  const {
    dropdownOptions: sourceFrameworkOptions,
    isLoading: isSourceFrameworkOptionsLoading,
    isError: isSourceFrameworkOptionsError,
    errorMessage: sourceFrameworkOptionsErrorMessage,
  } = useSourceFrameworkOptions({ enabled: isBuilderPage });

  const shouldLoadFrameworkDetail = isBuilderPage && hasDisplayValue(frameworkUuid);

  const {
    detail: frameworkDetail,
    isLoading: isFrameworkDetailLoading,
    isError: isFrameworkDetailError,
    errorMessage: frameworkDetailErrorMessage,
  } = useCompetencyFrameworkDetail({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail,
  });

  const { createMutation, updateMutation, deleteMutation } = useCompetencyFrameworkGeneralMutations();
  const { createDomainMutation, syncDomainsMutation } = useCompetencyFrameworkDomainsMutations();
  const { createSubDomainMutation, syncSubDomainsMutation } = useCompetencyFrameworkSubDomainsMutations();
  const { syncRolesMutation } = useCompetencyFrameworkRolesMutations();
  const { syncProficiencyLevelsMutation } = useCompetencyFrameworkProficiencyMutations();
  const { syncOrganizationCompetenciesMutation } = useCompetencyFrameworkOrganizationCompetenciesMutations();
  const { syncRoleCompetenciesMutation } = useCompetencyFrameworkRoleCompetenciesMutations();
  const { syncRoleActivitiesMutation } = useCompetencyFrameworkRoleActivitiesMutations();

  const {
    domainOptions,
    isError: isDomainOptionsError,
    errorMessage: domainOptionsErrorMessage,
    refetch: refetchDomainOptions,
  } = useDomainOptions({ enabled: isBuilderPage });

  const {
    subDomainOptions,
    isError: isSubDomainOptionsError,
    errorMessage: subDomainOptionsErrorMessage,
    refetch: refetchSubDomainOptions,
  } = useSubDomainOptions({ enabled: isBuilderPage });

  const prefillGeneralInformationFromApi = useCallback(async (uuid) => {
    if (!hasDisplayValue(uuid)) {
      return;
    }

    setIsPrefillingGeneral(true);

    try {
      const mapped = await fetchFrameworkDetailFormState({
        formatMessage,
        frameworkUuid: uuid,
      });

      queryClient.setQueryData(competencyFrameworkDetailQueryKey(uuid), mapped);
      setBuilderForm(prev => mergeFrameworkDetailIntoBuilderForm(prev, mapped));
    } finally {
      setIsPrefillingGeneral(false);
    }
  }, [formatMessage, queryClient]);

  useEffect(() => {
    if (!isBuilderPage) {
      return;
    }

    setBuilderActiveTabId('general');

    if (isBuilderEditPage && hasDisplayValue(routeFrameworkId)) {
      setFrameworkUuid(String(routeFrameworkId));
      return;
    }

    if (isBuilderNewPage) {
      const tabId = location.state?.tabId || 'who';
      setFrameworkUuid(null);
      setBuilderForm(prev => ({
        ...prev,
        name: '',
        productTypes: [],
        description: '',
        sourceFramework: SOURCE_FRAMEWORK_BY_TAB[tabId] || '',
      }));
    }
  }, [
    isBuilderPage,
    isBuilderEditPage,
    isBuilderNewPage,
    routeFrameworkId,
    location.state?.tabId,
  ]);

  useEffect(() => {
    if (!frameworkDetail) {
      return;
    }

    setBuilderForm(prev => mergeFrameworkDetailIntoBuilderForm(prev, frameworkDetail));
  }, [frameworkDetail]);
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
    count: frameworksCount,
    totalPages,
    isLoading: isFrameworkListLoading,
    isError: isFrameworkListError,
    errorMessage: frameworkListErrorMessage,
  } = useCompetencyFrameworkList({
    sourceFramework,
    page,
    enabled: isListPage && Boolean(sourceFramework),
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

  const confirmDeleteFramework = useCallback(async () => {
    if (!pendingDeleteFramework || deleteMutation.isPending) {
      return;
    }

    const { id, title } = pendingDeleteFramework;

    try {
      const result = await deleteMutation.mutateAsync(id);

      showToast({
        title: formatMessage(messages.frameworkDeleteSuccessTitle),
        description: hasDisplayValue(result.message)
          ? result.message
          : formatMessage(messages.frameworkDeleteSuccessDescription, { name: title || '' }),
      });
      setPendingDeleteFramework(null);

      if (frameworks.length === 1 && page > 1) {
        setPage((currentPage) => Math.max(1, currentPage - 1));
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkDeleteFailedTitle),
        description: error?.message || formatMessage(messages.frameworkDeleteFailedDescription),
      });
    }
  }, [
    deleteMutation,
    formatMessage,
    frameworks.length,
    page,
    pendingDeleteFramework,
    showToast,
  ]);
  const canShowSuggestionsTab = Boolean(access.showSuggestionsTab);
  const importModalLabels = {
    title: formatMessage(messages.importModalTitle),
    description: formatMessage(messages.importModalDescription),
    downloadTemplate: formatMessage(messages.downloadTemplate),
    chooseFile: formatMessage(messages.importModalChooseFile),
    cancel: formatMessage(messages.importModalCancel),
    import: formatMessage(messages.importModalImport),
  };
  const canCreateFrameworkInActiveTab = useMemo(() => {
    const tabId = isBuilderPage ? builderTabIdContext : activeTabSafe;
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
    isBuilderPage,
    builderTabIdContext,
    activeTabSafe,
    access.canCreateFrameworkNraTab,
    access.canCreateFrameworkSearnTab,
    access.canCreateFrameworkWhoTab,
  ]);
  const canEditFrameworkInActiveTab = canEditFramework;
  const canShowDownloadAndImport = canCreateFrameworkInActiveTab || canEditFrameworkInActiveTab;

  const canEditBuilderBase = !isReadOnlyMode && (
    builderMode === 'edit'
      ? canEditFrameworkInActiveTab
      : canCreateFrameworkInActiveTab || canEditFrameworkInActiveTab
  );

  const hasFrameworkUuid = hasDisplayValue(frameworkUuid);

  const isGeneralOptionsLoading = isProductTypesLoading || isSourceFrameworkOptionsLoading;
  const isGeneralFormInitialLoading = shouldLoadFrameworkDetail
    && isFrameworkDetailLoading
    && !frameworkDetail;
  const isSavingFramework = createMutation.isPending || updateMutation.isPending;
  const isSavingDomains = syncDomainsMutation.isPending;
  const isSavingSubDomains = syncSubDomainsMutation.isPending;
  const isSavingRoles = syncRolesMutation.isPending;
  const isSavingProficiencyLevels = syncProficiencyLevelsMutation.isPending;
  const isSavingOrgCompetencies = syncOrganizationCompetenciesMutation.isPending;
  const isSavingRoleCompetencies = syncRoleCompetenciesMutation.isPending;
  const isSavingRoleActivities = syncRoleActivitiesMutation.isPending;

  useEffect(() => {
    if (!isBuilderPage || !isProductTypesError) {
      return;
    }

    showToast({
      title: formatMessage(messages.productTypesErrorTitle),
      description: productTypesErrorMessage || formatMessage(messages.productTypesLoadError),
    });
  }, [
    formatMessage,
    isBuilderPage,
    isProductTypesError,
    productTypesErrorMessage,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isSourceFrameworkOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.sourceFrameworkOptionsErrorTitle),
      description: sourceFrameworkOptionsErrorMessage || formatMessage(messages.sourceFrameworkOptionsLoadError),
    });
  }, [
    formatMessage,
    isBuilderPage,
    isSourceFrameworkOptionsError,
    showToast,
    sourceFrameworkOptionsErrorMessage,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkDetailError) {
      return;
    }

    showToast({
      title: formatMessage(messages.frameworkDetailErrorTitle),
      description: frameworkDetailErrorMessage || formatMessage(messages.frameworkDetailLoadError),
    });
  }, [
    formatMessage,
    frameworkDetailErrorMessage,
    isBuilderPage,
    isFrameworkDetailError,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isDomainOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.domainOptionsErrorTitle),
      description: domainOptionsErrorMessage || formatMessage(messages.domainOptionsLoadError),
    });
  }, [
    domainOptionsErrorMessage,
    formatMessage,
    isBuilderPage,
    isDomainOptionsError,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isSubDomainOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(messages.subDomainOptionsErrorTitle),
      description: subDomainOptionsErrorMessage || formatMessage(messages.subDomainOptionsLoadError),
    });
  }, [
    formatMessage,
    isBuilderPage,
    isSubDomainOptionsError,
    showToast,
    subDomainOptionsErrorMessage,
  ]);

  useEffect(() => {
    setDomainsPrefillApplied(false);
    setSubDomainsPrefillApplied(false);
    setRolesPrefillApplied(false);
    setProficiencyPrefillApplied(false);
    setOrgCompetenciesPrefillApplied(false);
  }, [frameworkUuid]);

  const prefillFrameworkFromApi = prefillGeneralInformationFromApi;

  const handleFrameworkSectionSave = async ({
    payload,
    errorMessage: sectionErrorMessage,
  }) => {
    if (!hasFrameworkUuid) {
      return;
    }

    try {
      const result = await updateMutation.mutateAsync({
        frameworkUuid,
        payload,
        fallbackMessage: sectionErrorMessage,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      try {
        await prefillFrameworkFromApi(frameworkUuid);
      } catch (prefillError) {
        showToast({
          title: formatMessage(messages.frameworkDetailErrorTitle),
          description: prefillError?.message || formatMessage(messages.frameworkDetailLoadError),
        });
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(sectionErrorMessage),
      });
    }
  };

  const handleSaveIntroduction = () => handleFrameworkSectionSave({
    payload: buildIntroductionPayload({
      background: builderForm.introductionBackground,
      objectives: builderForm.introductionObjectives,
    }),
    errorMessage: messages.introductionSaveError,
  });

  const handleSaveOverview = () => handleFrameworkSectionSave({
    payload: buildOverviewPayload({
      competencyModel: builderForm.overviewCompetencyModel,
    }),
    errorMessage: messages.overviewSaveError,
  });

  const handleSaveDomains = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildDomainsSyncPayload(builderForm.domainsCompetencyTypes);

    try {
      const result = await syncDomainsMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      const rows = mapDomainsSyncResponseToFormRows(result.data);

      if (rows) {
        setBuilderForm(prev => ({
          ...prev,
          domainsCompetencyTypes: rows.length > 0 ? rows : [createCompetencyTypeItem()],
        }));
        setDomainsPrefillApplied(true);
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.domainsSaveError),
      });
    }
  };

  const handleCreateDomainOption = async ({ domainId, domainName, domainDescription }) => {
    const payload = buildCreateDomainPayload({ domainId, domainName, domainDescription });

    try {
      const result = await createDomainMutation.mutateAsync(payload);
      const option = mapCreatedDomainToMultiSelectOption(result.data);

      if (option) {
        const exists = domainOptions.some(item => item.value === option.value);

        if (exists) {
          showToast({
            title: formatMessage(messages.addDomainDuplicateTitle),
            description: formatMessage(messages.addDomainDuplicateDescription),
          });
          return;
        }
      }

      await refetchDomainOptions();

      showToast({
        title: formatMessage(messages.addDomainSuccessTitle),
        description: result.message || formatMessage(messages.addDomainSuccessDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.domainCreateErrorTitle),
        description: error?.message || formatMessage(messages.domainCreateError),
      });
      throw error;
    }
  };

  const handleSaveSubDomains = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildSubDomainsSyncPayload(builderForm.subDomainsCompetencyTypes);

    try {
      const result = await syncSubDomainsMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      const rows = mapSubDomainsSyncResponseToFormRows(result.data);

      if (rows) {
        setBuilderForm(prev => ({
          ...prev,
          subDomainsCompetencyTypes: rows.length > 0 ? rows : [createSubDomainCompetencyTypeItem()],
        }));
        setSubDomainsPrefillApplied(true);
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.subDomainsSaveError),
      });
    }
  };

  const handleCreateSubDomainOption = async ({ parentDomainId, subDomainName, subDomainDescription }) => {
    const payload = buildCreateSubDomainPayload({
      parentDomainId,
      subDomainName,
      subDomainDescription,
    });

    try {
      const result = await createSubDomainMutation.mutateAsync(payload);
      const option = mapCreatedSubDomainToMultiSelectOption(result.data);

      if (option) {
        const exists = subDomainOptions.some(item => item.value === option.value);

        if (exists) {
          showToast({
            title: formatMessage(messages.addSubDomainDuplicateTitle),
            description: formatMessage(messages.addSubDomainDuplicateDescription),
          });
          return;
        }
      }

      await refetchSubDomainOptions();

      showToast({
        title: formatMessage(messages.addSubDomainSuccessTitle),
        description: result.message || formatMessage(messages.addSubDomainSuccessDescription),
      });
    } catch (error) {
      showToast({
        title: formatMessage(messages.subDomainCreateErrorTitle),
        description: error?.message || formatMessage(messages.subDomainCreateError),
      });
      throw error;
    }
  };

  const refreshFrameworkRolesForm = useCallback(async (uuid) => {
    const result = await fetchFrameworkRoles({ formatMessage, frameworkUuid: uuid });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const payload = unwrapRolesResultsPayload(result.data);
    const rows = mapFrameworkRolesToFormRows(payload?.roles);

    setBuilderForm(prev => ({
      ...prev,
      frameworkRoles: rows && rows.length > 0 ? rows : [createFrameworkRoleItem()],
    }));
    setRolesPrefillApplied(true);
  }, [formatMessage]);

  const refreshFrameworkProficiencyForm = useCallback(async (uuid) => {
    const result = await fetchFrameworkProficiencyLevels({ formatMessage, frameworkUuid: uuid });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const results = unwrapProficiencyResultsPayload(result.data);
    const rows = mapFrameworkProficiencyLevelsToFormRows(results);

    setBuilderForm(prev => ({
      ...prev,
      proficiencyLevels: rows && rows.length > 0 ? rows : [createProficiencyLevelItem()],
    }));
    setProficiencyPrefillApplied(true);
  }, [formatMessage]);

  const handleSaveRoles = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildRolesSyncPayload(builderForm.frameworkRoles);

    try {
      const result = await syncRolesMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      setRolesPrefillApplied(false);
      await refreshFrameworkRolesForm(frameworkUuid);
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.rolesSaveError),
      });
    }
  };

  const refreshFrameworkOrganizationCompetenciesForm = useCallback(async (uuid) => {
    const result = await fetchFrameworkOrganizationCompetencies({
      formatMessage,
      frameworkUuid: uuid,
    });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const payload = unwrapOrganizationCompetenciesResultsPayload(result.data);
    const rows = mapOrganizationCompetenciesToFormItems(payload?.items);

    setBuilderForm(prev => ({
      ...prev,
      orgCompetencyTypes: rows && rows.length > 0 ? rows : [createOrgCompetencyType()],
    }));
    setOrgCompetenciesPrefillApplied(true);
  }, [formatMessage]);

  const handleSaveOrganizationCompetencies = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildOrganizationCompetenciesSyncPayload(builderForm.orgCompetencyTypes);

    try {
      const result = await syncOrganizationCompetenciesMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      setOrgCompetenciesPrefillApplied(false);
      await refreshFrameworkOrganizationCompetenciesForm(frameworkUuid);
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.orgCompetenciesSaveError),
      });
    }
  };

  const refreshFrameworkRoleCompetenciesForm = useCallback(async (uuid) => {
    const result = await fetchFrameworkRoleCompetencies({
      formatMessage,
      frameworkUuid: uuid,
    });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const payload = unwrapRoleSpecificResultsPayload(result.data);
    const rows = mapRoleCompetenciesToFormRoles(payload?.roles);

    setBuilderForm(prev => ({
      ...prev,
      roleSpecificRoles: rows && rows.length > 0 ? rows : [createRscRoleItem()],
    }));
    setRoleCompetenciesPrefillApplied(true);
  }, [formatMessage]);

  const handleSaveRoleCompetencies = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildRoleCompetenciesSyncPayload(builderForm.roleSpecificRoles);

    try {
      const result = await syncRoleCompetenciesMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      setRoleCompetenciesPrefillApplied(false);
      await refreshFrameworkRoleCompetenciesForm(frameworkUuid);
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.roleCompetenciesSaveError),
      });
    }
  };

  const refreshFrameworkRoleActivitiesForm = useCallback(async (uuid) => {
    const result = await fetchFrameworkRoleActivities({
      formatMessage,
      frameworkUuid: uuid,
    });

    if (!result.ok) {
      throw new Error(result.message);
    }

    const payload = unwrapRoleSpecificResultsPayload(result.data);
    const rows = mapRoleActivitiesToFormRoles(payload?.roles);

    setBuilderForm(prev => ({
      ...prev,
      roleSpecificActivityRoles: rows && rows.length > 0 ? rows : [createRsaRoleItem()],
    }));
    setRoleActivitiesPrefillApplied(true);
  }, [formatMessage]);

  const handleSaveRoleActivities = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildRoleActivitiesSyncPayload(builderForm.roleSpecificActivityRoles);

    try {
      const result = await syncRoleActivitiesMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      setRoleActivitiesPrefillApplied(false);
      await refreshFrameworkRoleActivitiesForm(frameworkUuid);
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.roleActivitiesSaveError),
      });
    }
  };

  const handleSaveProficiencyLevels = async () => {
    if (!hasFrameworkUuid) {
      return;
    }

    const payload = buildProficiencyLevelsSyncPayload(builderForm.proficiencyLevels);

    try {
      const result = await syncProficiencyLevelsMutation.mutateAsync({
        frameworkUuid,
        payload,
      });

      showToast({
        title: formatMessage(messages.frameworkSectionSaveSuccessTitle),
        description: result.message,
      });

      setProficiencyPrefillApplied(false);
      await refreshFrameworkProficiencyForm(frameworkUuid);
    } catch (error) {
      showToast({
        title: formatMessage(messages.frameworkSectionSaveErrorTitle),
        description: error?.message || formatMessage(messages.proficiencySaveError),
      });
    }
  };

  const handleSaveGeneralInformation = async () => {
    const payload = buildGeneralInformationPayload({
      name: builderForm.name,
      description: builderForm.description,
      sourceFramework: builderForm.sourceFramework,
      productTypes: builderForm.productTypes,
    });

    try {
      if (hasFrameworkUuid) {
        await handleFrameworkSectionSave({
          payload,
          errorMessage: messages.generalInformationSaveError,
        });
        return;
      }

      const result = await createMutation.mutateAsync(payload);
      const frameworkId = resolveFrameworkIdFromApiResponse(result.data);

      showToast({
        title: formatMessage(messages.generalInformationSaveSuccessTitle),
        description: result.message,
      });

      if (hasDisplayValue(frameworkId)) {
        const idString = String(frameworkId);

        const postFormFields = mapGeneralInformationFieldsFromApi(result.data);
        if (postFormFields) {
          setBuilderForm(prev => mergeFrameworkDetailIntoBuilderForm(prev, postFormFields));
          queryClient.setQueryData(competencyFrameworkDetailQueryKey(idString), postFormFields);
        }

        setFrameworkUuid(idString);

        try {
          await prefillGeneralInformationFromApi(idString);
        } catch (prefillError) {
          showToast({
            title: formatMessage(messages.frameworkDetailErrorTitle),
            description: prefillError?.message || formatMessage(messages.frameworkDetailLoadError),
          });
        }

        navigate(ADMIN_PATHS.competencyFrameworkEdit(idString), {
          replace: true,
          state: { tabId: builderTabIdContext },
        });
      }
    } catch (error) {
      showToast({
        title: formatMessage(messages.generalInformationSaveErrorTitle),
        description: error?.message || formatMessage(messages.generalInformationSaveError),
      });
    }
  };
  const builderTabs = useMemo(
    () => {
      const baseTabs = BUILDER_TABS_CONFIG
        .map(item => ({ id: item.id, label: formatMessage(messages[item.messageKey]) }));

      if (isBuilderPage && canShowSuggestionsTab) {
        return [
          ...baseTabs,
          { id: 'suggestions', label: formatMessage(messages.tabSuggestions) },
        ];
      }

      return baseTabs;
    },
    [formatMessage, isBuilderPage, canShowSuggestionsTab],
  );
  const builderTabSafe = builderTabs.some(tab => tab.id === builderActiveTabId)
    ? builderActiveTabId
    : (builderTabs[0]?.id || null);
  const isDomainsBuilderTab = builderTabSafe === 'domains';
  const isSubDomainsBuilderTab = builderTabSafe === 'subDomains';
  const isFrameworkRolesBuilderTab = builderTabSafe === 'frameworkRoles';
  const isProficiencyLevelsBuilderTab = builderTabSafe === 'proficiencyLevels';
  const isOrgCompetenciesBuilderTab = builderTabSafe === 'orgCompetencies';
  const isRoleCompetenciesBuilderTab = builderTabSafe === 'roleCompetencies';
  const isRoleActivitiesBuilderTab = builderTabSafe === 'activities';
  const needsFrameworkBuilderOptions = shouldLoadFrameworkDetail && (
    isOrgCompetenciesBuilderTab
    || isProficiencyLevelsBuilderTab
    || builderTabSafe === 'roleCompetencies'
    || builderTabSafe === 'activities'
  );

  const {
    competencyTypeOptions: frameworkCompetencyTypeOptions,
    isLoading: isCompetencyTypeOptionsLoading,
    isError: isCompetencyTypeOptionsError,
    errorMessage: competencyTypeOptionsErrorMessage,
  } = useFrameworkCompetencyTypeOptions({
    frameworkUuid,
    enabled: needsFrameworkBuilderOptions,
  });

  const {
    domainOptions: frameworkLinkedDomainOptions,
    isLoading: isFrameworkLinkedDomainOptionsLoading,
    isError: isFrameworkLinkedDomainOptionsError,
    errorMessage: frameworkLinkedDomainOptionsErrorMessage,
  } = useFrameworkLinkedDomainOptions({
    frameworkUuid,
    enabled: needsFrameworkBuilderOptions,
  });

  const {
    proficiencyLevelOptions: frameworkProficiencyDropdownOptions,
    isLoading: isFrameworkProficiencyDropdownLoading,
    isError: isFrameworkProficiencyDropdownError,
    errorMessage: frameworkProficiencyDropdownErrorMessage,
  } = useFrameworkProficiencyDropdownOptions({
    frameworkUuid,
    enabled: needsFrameworkBuilderOptions,
  });

  const {
    roleOptions: frameworkRoleOptionsFromApi,
    isLoading: isFrameworkRoleOptionsLoading,
    isError: isFrameworkRoleOptionsError,
    errorMessage: frameworkRoleOptionsErrorMessage,
  } = useFrameworkRoleOptions({
    frameworkUuid,
    enabled: needsFrameworkBuilderOptions,
  });

  const frameworkLinkedDomainIds = useMemo(
    () => frameworkLinkedDomainOptions.map((option) => option.value),
    [frameworkLinkedDomainOptions],
  );

  const {
    optionsByDomain: subDomainOptionsByDomain,
    isLoading: isSubDomainOptionsByDomainLoading,
    isError: isSubDomainOptionsByDomainError,
    errorMessage: subDomainOptionsByDomainErrorMessage,
  } = useSubDomainOptionsByDomains({
    domainIds: frameworkLinkedDomainIds,
    enabled: needsFrameworkBuilderOptions && frameworkLinkedDomainIds.length > 0,
  });

  const {
    competencyTypes: frameworkDomainsCompetencyTypes,
    isLoading: isFrameworkDomainsLoading,
    isError: isFrameworkDomainsError,
    errorMessage: frameworkDomainsErrorMessage,
  } = useFrameworkDomains({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isDomainsBuilderTab,
  });

  const isPrefillingDomains = isDomainsBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkDomainsLoading
    && !domainsPrefillApplied;

  const {
    competencyTypes: frameworkSubDomainsCompetencyTypes,
    isLoading: isFrameworkSubDomainsLoading,
    isError: isFrameworkSubDomainsError,
    errorMessage: frameworkSubDomainsErrorMessage,
  } = useFrameworkSubDomains({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isSubDomainsBuilderTab,
  });

  const isPrefillingSubDomains = isSubDomainsBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkSubDomainsLoading
    && !subDomainsPrefillApplied;

  const {
    roles: frameworkRolesFromApi,
    isLoading: isFrameworkRolesLoading,
    isError: isFrameworkRolesError,
    errorMessage: frameworkRolesErrorMessage,
  } = useFrameworkRoles({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isFrameworkRolesBuilderTab,
  });

  const isPrefillingRoles = isFrameworkRolesBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkRolesLoading
    && !rolesPrefillApplied;

  const {
    levels: frameworkProficiencyLevelsFromApi,
    isLoading: isFrameworkProficiencyLoading,
    isError: isFrameworkProficiencyError,
    errorMessage: frameworkProficiencyErrorMessage,
  } = useFrameworkProficiencyLevels({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isProficiencyLevelsBuilderTab,
  });

  const isPrefillingProficiency = isProficiencyLevelsBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkProficiencyLoading
    && !proficiencyPrefillApplied;

  const {
    items: frameworkOrgCompetenciesItems,
    isLoading: isFrameworkOrgCompetenciesLoading,
    isError: isFrameworkOrgCompetenciesError,
    errorMessage: frameworkOrgCompetenciesErrorMessage,
  } = useFrameworkOrganizationCompetencies({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isOrgCompetenciesBuilderTab,
  });

  const isPrefillingOrgCompetencies = isOrgCompetenciesBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkOrgCompetenciesLoading
    && !orgCompetenciesPrefillApplied;

  const {
    roles: frameworkRoleCompetenciesRoles,
    isLoading: isFrameworkRoleCompetenciesLoading,
    isError: isFrameworkRoleCompetenciesError,
    errorMessage: frameworkRoleCompetenciesErrorMessage,
  } = useFrameworkRoleCompetencies({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isRoleCompetenciesBuilderTab,
  });

  const isPrefillingRoleCompetencies = isRoleCompetenciesBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkRoleCompetenciesLoading
    && !roleCompetenciesPrefillApplied;

  const {
    roles: frameworkRoleActivitiesRoles,
    isLoading: isFrameworkRoleActivitiesLoading,
    isError: isFrameworkRoleActivitiesError,
    errorMessage: frameworkRoleActivitiesErrorMessage,
  } = useFrameworkRoleActivities({
    frameworkUuid,
    enabled: shouldLoadFrameworkDetail && isRoleActivitiesBuilderTab,
  });

  const isPrefillingRoleActivities = isRoleActivitiesBuilderTab
    && shouldLoadFrameworkDetail
    && isFrameworkRoleActivitiesLoading
    && !roleActivitiesPrefillApplied;

  const orgBuilderOptionsLoading = isCompetencyTypeOptionsLoading
    || isFrameworkLinkedDomainOptionsLoading
    || isFrameworkProficiencyDropdownLoading;

  const roleBuilderOptionsLoading = isFrameworkRoleOptionsLoading
    || isFrameworkLinkedDomainOptionsLoading
    || isFrameworkProficiencyDropdownLoading
    || isSubDomainOptionsByDomainLoading;

  useEffect(() => {
    if (!isDomainsBuilderTab) {
      setDomainsPrefillApplied(false);
    }
  }, [isDomainsBuilderTab]);

  useEffect(() => {
    if (!isSubDomainsBuilderTab) {
      setSubDomainsPrefillApplied(false);
    }
  }, [isSubDomainsBuilderTab]);

  useEffect(() => {
    if (!isFrameworkRolesBuilderTab) {
      setRolesPrefillApplied(false);
    }
  }, [isFrameworkRolesBuilderTab]);

  useEffect(() => {
    if (!isProficiencyLevelsBuilderTab) {
      setProficiencyPrefillApplied(false);
    }
  }, [isProficiencyLevelsBuilderTab]);

  useEffect(() => {
    if (!isOrgCompetenciesBuilderTab) {
      setOrgCompetenciesPrefillApplied(false);
    }
  }, [isOrgCompetenciesBuilderTab]);

  useEffect(() => {
    if (!isRoleCompetenciesBuilderTab) {
      setRoleCompetenciesPrefillApplied(false);
    }
  }, [isRoleCompetenciesBuilderTab]);

  useEffect(() => {
    if (!isRoleActivitiesBuilderTab) {
      setRoleActivitiesPrefillApplied(false);
    }
  }, [isRoleActivitiesBuilderTab]);

  useEffect(() => {
    if (!isBuilderPage || !isCompetencyTypeOptionsError || !needsFrameworkBuilderOptions) {
      return;
    }

    showToast({
      title: formatMessage(messages.competencyTypeOptionsErrorTitle),
      description: competencyTypeOptionsErrorMessage || formatMessage(messages.competencyTypeOptionsLoadError),
    });
  }, [
    competencyTypeOptionsErrorMessage,
    formatMessage,
    isBuilderPage,
    isCompetencyTypeOptionsError,
    needsFrameworkBuilderOptions,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkLinkedDomainOptionsError || !needsFrameworkBuilderOptions) {
      return;
    }

    showToast({
      title: formatMessage(messages.frameworkDomainOptionsErrorTitle),
      description: frameworkLinkedDomainOptionsErrorMessage || formatMessage(messages.frameworkDomainOptionsLoadError),
    });
  }, [
    formatMessage,
    frameworkLinkedDomainOptionsErrorMessage,
    isBuilderPage,
    isFrameworkLinkedDomainOptionsError,
    needsFrameworkBuilderOptions,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkProficiencyDropdownError || !needsFrameworkBuilderOptions) {
      return;
    }

    showToast({
      title: formatMessage(messages.proficiencyLoadErrorTitle),
      description: frameworkProficiencyDropdownErrorMessage || formatMessage(messages.proficiencyLoadError),
    });
  }, [
    formatMessage,
    frameworkProficiencyDropdownErrorMessage,
    isBuilderPage,
    isFrameworkProficiencyDropdownError,
    needsFrameworkBuilderOptions,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkRoleOptionsError || !needsFrameworkBuilderOptions) {
      return;
    }

    showToast({
      title: formatMessage(messages.frameworkRoleOptionsErrorTitle),
      description: frameworkRoleOptionsErrorMessage || formatMessage(messages.frameworkRoleOptionsLoadError),
    });
  }, [
    formatMessage,
    frameworkRoleOptionsErrorMessage,
    isBuilderPage,
    isFrameworkRoleOptionsError,
    needsFrameworkBuilderOptions,
    showToast,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isSubDomainOptionsByDomainError || !needsFrameworkBuilderOptions) {
      return;
    }

    showToast({
      title: formatMessage(messages.subDomainOptionsErrorTitle),
      description: subDomainOptionsByDomainErrorMessage || formatMessage(messages.subDomainOptionsLoadError),
    });
  }, [
    formatMessage,
    isBuilderPage,
    isSubDomainOptionsByDomainError,
    needsFrameworkBuilderOptions,
    showToast,
    subDomainOptionsByDomainErrorMessage,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkDomainsError || !isDomainsBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.domainsLoadErrorTitle),
      description: frameworkDomainsErrorMessage || formatMessage(messages.domainsLoadError),
    });
  }, [
    formatMessage,
    frameworkDomainsErrorMessage,
    isBuilderPage,
    isDomainsBuilderTab,
    isFrameworkDomainsError,
    showToast,
  ]);

  useEffect(() => {
    if (!isDomainsBuilderTab || !hasFrameworkUuid || isFrameworkDomainsLoading || domainsPrefillApplied) {
      return;
    }

    if (isFrameworkDomainsError) {
      return;
    }

    const rows = frameworkDomainsCompetencyTypes;

    setBuilderForm(prev => ({
      ...prev,
      domainsCompetencyTypes: rows && rows.length > 0 ? rows : [createCompetencyTypeItem()],
    }));
    setDomainsPrefillApplied(true);
  }, [
    domainsPrefillApplied,
    frameworkDomainsCompetencyTypes,
    hasFrameworkUuid,
    isDomainsBuilderTab,
    isFrameworkDomainsError,
    isFrameworkDomainsLoading,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkSubDomainsError || !isSubDomainsBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.subDomainsLoadErrorTitle),
      description: frameworkSubDomainsErrorMessage || formatMessage(messages.subDomainsLoadError),
    });
  }, [
    formatMessage,
    frameworkSubDomainsErrorMessage,
    isBuilderPage,
    isFrameworkSubDomainsError,
    isSubDomainsBuilderTab,
    showToast,
  ]);

  useEffect(() => {
    if (!isSubDomainsBuilderTab || !hasFrameworkUuid || isFrameworkSubDomainsLoading || subDomainsPrefillApplied) {
      return;
    }

    if (isFrameworkSubDomainsError) {
      return;
    }

    const rows = frameworkSubDomainsCompetencyTypes;

    setBuilderForm(prev => ({
      ...prev,
      subDomainsCompetencyTypes: rows && rows.length > 0 ? rows : [createSubDomainCompetencyTypeItem()],
    }));
    setSubDomainsPrefillApplied(true);
  }, [
    frameworkSubDomainsCompetencyTypes,
    hasFrameworkUuid,
    isFrameworkSubDomainsError,
    isFrameworkSubDomainsLoading,
    isSubDomainsBuilderTab,
    subDomainsPrefillApplied,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkRolesError || !isFrameworkRolesBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.rolesLoadErrorTitle),
      description: frameworkRolesErrorMessage || formatMessage(messages.rolesLoadError),
    });
  }, [
    formatMessage,
    frameworkRolesErrorMessage,
    isBuilderPage,
    isFrameworkRolesBuilderTab,
    isFrameworkRolesError,
    showToast,
  ]);

  useEffect(() => {
    if (!isFrameworkRolesBuilderTab || !hasFrameworkUuid || isFrameworkRolesLoading || rolesPrefillApplied) {
      return;
    }

    if (isFrameworkRolesError) {
      return;
    }

    const rows = frameworkRolesFromApi;

    setBuilderForm(prev => ({
      ...prev,
      frameworkRoles: rows && rows.length > 0 ? rows : [createFrameworkRoleItem()],
    }));
    setRolesPrefillApplied(true);
  }, [
    frameworkRolesFromApi,
    hasFrameworkUuid,
    isFrameworkRolesBuilderTab,
    isFrameworkRolesError,
    isFrameworkRolesLoading,
    rolesPrefillApplied,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkProficiencyError || !isProficiencyLevelsBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.proficiencyLoadErrorTitle),
      description: frameworkProficiencyErrorMessage || formatMessage(messages.proficiencyLoadError),
    });
  }, [
    formatMessage,
    frameworkProficiencyErrorMessage,
    isBuilderPage,
    isFrameworkProficiencyError,
    isProficiencyLevelsBuilderTab,
    showToast,
  ]);

  useEffect(() => {
    if (
      !isProficiencyLevelsBuilderTab
      || !hasFrameworkUuid
      || isFrameworkProficiencyLoading
      || proficiencyPrefillApplied
    ) {
      return;
    }

    if (isFrameworkProficiencyError) {
      return;
    }

    const rows = frameworkProficiencyLevelsFromApi;

    setBuilderForm(prev => ({
      ...prev,
      proficiencyLevels: rows && rows.length > 0 ? rows : [createProficiencyLevelItem()],
    }));
    setProficiencyPrefillApplied(true);
  }, [
    frameworkProficiencyLevelsFromApi,
    hasFrameworkUuid,
    isFrameworkProficiencyError,
    isFrameworkProficiencyLoading,
    isProficiencyLevelsBuilderTab,
    proficiencyPrefillApplied,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkOrgCompetenciesError || !isOrgCompetenciesBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.orgCompetenciesLoadErrorTitle),
      description: frameworkOrgCompetenciesErrorMessage || formatMessage(messages.orgCompetenciesLoadError),
    });
  }, [
    formatMessage,
    frameworkOrgCompetenciesErrorMessage,
    isBuilderPage,
    isFrameworkOrgCompetenciesError,
    isOrgCompetenciesBuilderTab,
    showToast,
  ]);

  useEffect(() => {
    if (
      !isOrgCompetenciesBuilderTab
      || !hasFrameworkUuid
      || isFrameworkOrgCompetenciesLoading
      || orgCompetenciesPrefillApplied
    ) {
      return;
    }

    if (isFrameworkOrgCompetenciesError) {
      return;
    }

    const rows = frameworkOrgCompetenciesItems;

    setBuilderForm(prev => ({
      ...prev,
      orgCompetencyTypes: rows && rows.length > 0 ? rows : [createOrgCompetencyType()],
    }));
    setOrgCompetenciesPrefillApplied(true);
  }, [
    frameworkOrgCompetenciesItems,
    hasFrameworkUuid,
    isFrameworkOrgCompetenciesError,
    isFrameworkOrgCompetenciesLoading,
    isOrgCompetenciesBuilderTab,
    orgCompetenciesPrefillApplied,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkRoleCompetenciesError || !isRoleCompetenciesBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.roleCompetenciesLoadErrorTitle),
      description: frameworkRoleCompetenciesErrorMessage || formatMessage(messages.roleCompetenciesLoadError),
    });
  }, [
    formatMessage,
    frameworkRoleCompetenciesErrorMessage,
    isBuilderPage,
    isFrameworkRoleCompetenciesError,
    isRoleCompetenciesBuilderTab,
    showToast,
  ]);

  useEffect(() => {
    if (
      !isRoleCompetenciesBuilderTab
      || !hasFrameworkUuid
      || isFrameworkRoleCompetenciesLoading
      || roleCompetenciesPrefillApplied
    ) {
      return;
    }

    if (isFrameworkRoleCompetenciesError) {
      return;
    }

    const rows = frameworkRoleCompetenciesRoles;

    setBuilderForm(prev => ({
      ...prev,
      roleSpecificRoles: rows && rows.length > 0 ? rows : [createRscRoleItem()],
    }));
    setRoleCompetenciesPrefillApplied(true);
  }, [
    frameworkRoleCompetenciesRoles,
    hasFrameworkUuid,
    isFrameworkRoleCompetenciesError,
    isFrameworkRoleCompetenciesLoading,
    isRoleCompetenciesBuilderTab,
    roleCompetenciesPrefillApplied,
  ]);

  useEffect(() => {
    if (!isBuilderPage || !isFrameworkRoleActivitiesError || !isRoleActivitiesBuilderTab) {
      return;
    }

    showToast({
      title: formatMessage(messages.roleActivitiesLoadErrorTitle),
      description: frameworkRoleActivitiesErrorMessage || formatMessage(messages.roleActivitiesLoadError),
    });
  }, [
    formatMessage,
    frameworkRoleActivitiesErrorMessage,
    isBuilderPage,
    isFrameworkRoleActivitiesError,
    isRoleActivitiesBuilderTab,
    showToast,
  ]);

  useEffect(() => {
    if (
      !isRoleActivitiesBuilderTab
      || !hasFrameworkUuid
      || isFrameworkRoleActivitiesLoading
      || roleActivitiesPrefillApplied
    ) {
      return;
    }

    if (isFrameworkRoleActivitiesError) {
      return;
    }

    const rows = frameworkRoleActivitiesRoles;

    setBuilderForm(prev => ({
      ...prev,
      roleSpecificActivityRoles: rows && rows.length > 0 ? rows : [createRsaRoleItem()],
    }));
    setRoleActivitiesPrefillApplied(true);
  }, [
    frameworkRoleActivitiesRoles,
    hasFrameworkUuid,
    isFrameworkRoleActivitiesError,
    isFrameworkRoleActivitiesLoading,
    isRoleActivitiesBuilderTab,
    roleActivitiesPrefillApplied,
  ]);

  const isGeneralBuilderTab = builderTabSafe === 'general';
  const canEditCurrentBuilderTab = isGeneralBuilderTab
    ? canEditBuilderBase
    : hasFrameworkUuid && canEditBuilderBase;
  const showGeneralInfoRequiredBanner = isBuilderPage
    && !isGeneralBuilderTab
    && !hasFrameworkUuid
    && !isReadOnlyMode;
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
      submitting: formatMessage(messages.addDomainModalSubmitting),
    },
    save: formatMessage(messages.generalSaveButton),
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
      submitting: formatMessage(messages.addSubDomainModalSubmitting),
      dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
      dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
    },
    save: formatMessage(messages.generalSaveButton),
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
  };
  const proficiencyLevelOptions = useMemo(() => {
    if (frameworkProficiencyDropdownOptions.length > 0) {
      return frameworkProficiencyDropdownOptions;
    }

    return builderForm.proficiencyLevels
      .filter(level => level.code.trim() && level.name.trim())
      .map(level => ({
        value: `level-${level.code.toLowerCase()}`,
        label: `${level.name.trim()} (${level.code.trim()})`,
      }));
  }, [builderForm.proficiencyLevels, frameworkProficiencyDropdownOptions]);
  const roleSpecificRoleOptions = useMemo(() => {
    if (frameworkRoleOptionsFromApi.length > 0) {
      return frameworkRoleOptionsFromApi;
    }

    return builderForm.frameworkRoles
      .filter(role => role.name.trim())
      .map(role => ({
        value: role.name.trim(),
        label: role.name.trim(),
      }));
  }, [builderForm.frameworkRoles, frameworkRoleOptionsFromApi]);

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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
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
    saving: formatMessage(messages.generalSavingButton),
    update: formatMessage(messages.generalUpdateButton),
    updating: formatMessage(messages.generalUpdatingButton),
    dropdownSearchPlaceholder: formatMessage(messages.builderDropdownSearchPlaceholder),
    dropdownNoOptions: formatMessage(messages.builderDropdownNoOptions),
  };

  let builderContent = null;
  if (builderTabSafe === 'general') {
    builderContent = isGeneralFormInitialLoading ? (
      <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
    ) : (
      <GeneralInformationTab
        labels={generalLabels}
        values={builderForm}
        onChange={(key, value) => setBuilderForm(prev => ({ ...prev, [key]: value }))}
        sourceFrameworkOptions={sourceFrameworkOptions}
        productTypeOptions={productTypeOptions}
        canEdit={canEditCurrentBuilderTab}
        onSave={handleSaveGeneralInformation}
        isSaving={isSavingFramework}
        isPrefilling={isPrefillingGeneral}
        hasFrameworkId={hasFrameworkUuid}
        optionsLoading={isGeneralOptionsLoading}
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
        canEdit={canEditCurrentBuilderTab}
        onSave={handleSaveIntroduction}
        isSaving={isSavingFramework}
        isPrefilling={isPrefillingGeneral}
      />
    );
  } else if (builderTabSafe === 'overview') {
    builderContent = (
      <OverviewTab
        labels={overviewLabels}
        value={builderForm.overviewCompetencyModel}
        onChange={next => setBuilderForm(prev => ({ ...prev, overviewCompetencyModel: next }))}
        canEdit={canEditCurrentBuilderTab}
        onSave={handleSaveOverview}
        isSaving={isSavingFramework}
        isPrefilling={isPrefillingGeneral}
      />
    );
  } else if (builderTabSafe === 'domains') {
    builderContent = (
      <DomainsTab
        labels={domainsLabels}
        canEdit={canEditCurrentBuilderTab}
        competencyTypes={builderForm.domainsCompetencyTypes}
        onChangeCompetencyTypes={next => setBuilderForm(prev => ({ ...prev, domainsCompetencyTypes: next }))}
        domainOptions={domainOptions}
        onCreateDomain={handleCreateDomainOption}
        isCreatingDomain={createDomainMutation.isPending}
        onSave={handleSaveDomains}
        isSaving={isSavingDomains}
        isPrefilling={isPrefillingDomains}
      />
    );
  } else if (builderTabSafe === 'subDomains') {
    builderContent = (
      <SubDomainTab
        labels={subDomainsLabels}
        canEdit={canEditCurrentBuilderTab}
        competencyTypes={builderForm.subDomainsCompetencyTypes}
        onChangeCompetencyTypes={next => setBuilderForm(prev => ({ ...prev, subDomainsCompetencyTypes: next }))}
        subDomainOptions={subDomainOptions}
        onCreateSubDomain={handleCreateSubDomainOption}
        isCreatingSubDomain={createSubDomainMutation.isPending}
        parentDomainOptions={domainOptions}
        onSave={handleSaveSubDomains}
        isSaving={isSavingSubDomains}
        isPrefilling={isPrefillingSubDomains}
      />
    );
  } else if (builderTabSafe === 'frameworkRoles') {
    builderContent = (
      <RoleTab
        labels={roleLabels}
        canEdit={canEditCurrentBuilderTab}
        roles={builderForm.frameworkRoles}
        onChangeRoles={next => setBuilderForm(prev => ({ ...prev, frameworkRoles: next }))}
        onSave={handleSaveRoles}
        isSaving={isSavingRoles}
        isPrefilling={isPrefillingRoles}
      />
    );
  } else if (builderTabSafe === 'proficiencyLevels') {
    builderContent = (
      <ProficiencyLevelTab
        labels={proficiencyLabels}
        canEdit={canEditCurrentBuilderTab}
        levels={builderForm.proficiencyLevels}
        onChangeLevels={next => setBuilderForm(prev => ({ ...prev, proficiencyLevels: next }))}
        onSave={handleSaveProficiencyLevels}
        isSaving={isSavingProficiencyLevels}
        isPrefilling={isPrefillingProficiency}
      />
    );
  } else if (builderTabSafe === 'orgCompetencies') {
    builderContent = (
      <OrganizationalCompetenciesTab
        labels={orgCompetenciesLabels}
        canEdit={canEditCurrentBuilderTab}
        items={builderForm.orgCompetencyTypes}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, orgCompetencyTypes: next }))}
        competencyTypeOptions={frameworkCompetencyTypeOptions}
        domainOptions={frameworkLinkedDomainOptions}
        proficiencyLevelOptions={proficiencyLevelOptions}
        onSave={handleSaveOrganizationCompetencies}
        isSaving={isSavingOrgCompetencies}
        isPrefilling={isPrefillingOrgCompetencies}
        optionsLoading={orgBuilderOptionsLoading}
      />
    );
  } else if (builderTabSafe === 'roleCompetencies') {
    builderContent = (
      <RoleSpecificCompetenciesTab
        labels={roleSpecificLabels}
        canEdit={canEditCurrentBuilderTab}
        items={builderForm.roleSpecificRoles}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, roleSpecificRoles: next }))}
        domainOptions={frameworkLinkedDomainOptions}
        subDomainOptions={subDomainOptions}
        subDomainOptionsByDomain={subDomainOptionsByDomain}
        proficiencyLevelOptions={proficiencyLevelOptions}
        roleOptions={roleSpecificRoleOptions}
        onAddDomainOption={handleCreateDomainOption}
        onAddSubDomainOption={handleCreateSubDomainOption}
        onSave={handleSaveRoleCompetencies}
        isSaving={isSavingRoleCompetencies}
        isPrefilling={isPrefillingRoleCompetencies}
        optionsLoading={roleBuilderOptionsLoading}
      />
    );
  } else if (builderTabSafe === 'activities') {
    builderContent = (
      <RoleSpecificActivitiesTab
        labels={roleActivitiesLabels}
        canEdit={canEditCurrentBuilderTab}
        items={builderForm.roleSpecificActivityRoles}
        onChangeItems={next => setBuilderForm(prev => ({ ...prev, roleSpecificActivityRoles: next }))}
        domainOptions={frameworkLinkedDomainOptions}
        subDomainOptions={subDomainOptions}
        subDomainOptionsByDomain={subDomainOptionsByDomain}
        proficiencyLevelOptions={proficiencyLevelOptions}
        roleOptions={roleSpecificRoleOptions}
        onAddDomainOption={handleCreateDomainOption}
        onAddSubDomainOption={handleCreateSubDomainOption}
        onSave={handleSaveRoleActivities}
        isSaving={isSavingRoleActivities}
        isPrefilling={isPrefillingRoleActivities}
        optionsLoading={roleBuilderOptionsLoading}
      />
    );
  } else if (builderTabSafe === 'suggestions') {
    const canEditSuggestions = canShowSuggestionsTab && hasFrameworkUuid;
    const suggestionsActionsLocked = canShowSuggestionsTab && !hasFrameworkUuid;

    builderContent = (
      <SuggestionsTab
        frameworkUuid={frameworkUuid}
        canEdit={canEditSuggestions}
        actionsLocked={suggestionsActionsLocked}
      />
    );
  }

  return (
    <section className="competency-framework-page">
      {isBuilderPage ? (
        <>
          <div className="framework-builder__top">
            <button
              type="button"
              className="framework-builder__back-button"
              onClick={() => navigate(ADMIN_PATHS.competencyFrameworks)}
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
            {showGeneralInfoRequiredBanner && (
              <div className="framework-builder__readonly-banner" role="status">
                {formatMessage(messages.generalInfoRequiredBannerText)}
              </div>
            )}
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
                <button type="button" className="competency-framework-page__outline-button is-ui-hidden">
                  <FontAwesomeIcon icon={faDownload} />
                  {formatMessage(messages.downloadTemplate)}
                </button>
              )}
              {canShowDownloadAndImport && (
                <button
                  type="button"
                  className="competency-framework-page__outline-button is-ui-hidden"
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
                  onClick={() => navigate(ADMIN_PATHS.competencyFrameworkNew, {
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
                  navigate(ADMIN_PATHS.competencyFrameworkEdit(framework.id), {
                    state: {
                      mode: 'view',
                      tabId: activeTabSafe,
                    },
                  });
                }}
                onEditClick={(framework) => {
                  navigate(ADMIN_PATHS.competencyFrameworkEdit(framework.id), {
                    state: {
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
              paginationLabel={formatMessage(messages.paginationLabel)}
              footerContent={formatMessage(
                messages.showingCount,
                buildPaginationShowingParams(frameworks, frameworksCount),
              )}
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
              onConfirm={confirmDeleteFramework}
            />
          )}
        </>
      )}
    </section>
  );
};

export default CompetencyFramework;
