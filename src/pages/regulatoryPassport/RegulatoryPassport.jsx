import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import RegulatoryPassportView from '../../components/users/regulatoryPassport/RegulatoryPassportView';
import { REGULATORY_PASSPORT_FILTER_ALL } from '../../components/users/regulatoryPassport/RegulatoryPassportDomainCoverage';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import AccessRestrictedPage from '../AccessRestrictedPage';
import { useUserRole } from '../../contexts/UserRoleContext';
import useRegulatoryPassportPdfDownload from '../../hooks/users/useRegulatoryPassportPdfDownload';
import useRegulatoryPassportCompletedTrainings from '../../hooks/users/useRegulatoryPassportCompletedTrainings';
import useRegulatoryPassportDomainCoverage from '../../hooks/users/useRegulatoryPassportDomainCoverage';
import useRegulatoryPassportDomainFilterOptions from '../../hooks/users/useRegulatoryPassportDomainFilterOptions';
import useRegulatoryPassportSummary from '../../hooks/users/useRegulatoryPassportSummary';
import regulatoryPassportMessages from '../users/regulatoryPassportMessages';
import '../users/UserRegulatoryPassport.scss';

const RegulatoryPassport = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { navbarAccess } = useUserRole();
  const [completedPage, setCompletedPage] = useState(1);
  const [domainFilter, setDomainFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [productTypeFilter, setProductTypeFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [levelFilter, setLevelFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);

  const canAccessRegulatoryPassport = Boolean(navbarAccess?.accessRegulatoryPassport ?? false);

  const {
    detail,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useRegulatoryPassportSummary({ enabled: canAccessRegulatoryPassport });

  const {
    items: domainCoverage,
    isLoading: isDomainCoverageLoading,
    isError: isDomainCoverageError,
    errorMessage: domainCoverageErrorMessage,
  } = useRegulatoryPassportDomainCoverage({
    domainId: domainFilter,
    subDomainId: subDomainFilter,
    levelId: levelFilter,
    productTypeId: productTypeFilter,
    enabled: canAccessRegulatoryPassport && Boolean(detail),
  });

  const {
    domainOptions,
    subDomainOptions,
    productTypeOptions,
    levelOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
    errorMessage: filterOptionsErrorMessage,
  } = useRegulatoryPassportDomainFilterOptions({
    enabled: canAccessRegulatoryPassport,
  });

  const {
    page: completedTrainingsPage,
    isLoading: isCompletedTrainingsLoading,
    isError: isCompletedTrainingsError,
    errorMessage: completedTrainingsErrorMessage,
  } = useRegulatoryPassportCompletedTrainings({
    page: completedPage,
    enabled: canAccessRegulatoryPassport && Boolean(detail),
  });

  const { downloadPassport, isExporting } = useRegulatoryPassportPdfDownload();

  useEffect(() => {
    if (!isFilterOptionsError) {
      return;
    }

    showToast({
      title: formatMessage(regulatoryPassportMessages.domainOptionsLoadError),
      description: filterOptionsErrorMessage || formatMessage(regulatoryPassportMessages.domainOptionsLoadError),
    });
  }, [filterOptionsErrorMessage, formatMessage, isFilterOptionsError, showToast]);

  const profileImageUrl = detail?.userProfileImage ?? '';

  const domainCoverageProps = useMemo(() => ({
    domainOptions,
    subDomainOptions,
    productTypeOptions,
    levelOptions,
    domainFilter,
    subDomainFilter,
    productTypeFilter,
    levelFilter,
    onDomainFilterChange: setDomainFilter,
    onSubDomainFilterChange: setSubDomainFilter,
    onProductTypeFilterChange: setProductTypeFilter,
    onLevelFilterChange: setLevelFilter,
    filtersDisabled: isFilterOptionsLoading,
    isLoading: isDomainCoverageLoading,
    isError: isDomainCoverageError,
    errorMessage: domainCoverageErrorMessage,
  }), [
    domainCoverageErrorMessage,
    domainFilter,
    domainOptions,
    isDomainCoverageError,
    isDomainCoverageLoading,
    isFilterOptionsLoading,
    levelFilter,
    levelOptions,
    productTypeFilter,
    productTypeOptions,
    subDomainFilter,
    subDomainOptions,
  ]);

  const completedTrainingsProps = useMemo(() => ({
    isLoading: isCompletedTrainingsLoading,
    isError: isCompletedTrainingsError,
    errorMessage: completedTrainingsErrorMessage,
  }), [
    completedTrainingsErrorMessage,
    isCompletedTrainingsError,
    isCompletedTrainingsLoading,
  ]);

  if (!canAccessRegulatoryPassport) {
    return <AccessRestrictedPage />;
  }

  if (isSummaryLoading || isCompletedTrainingsLoading) {
    return (
      <SkeletonScreen
        variant={SKELETON_VARIANTS.TOOLBAR_TABLE}
        ariaLabel={formatMessage(regulatoryPassportMessages.loadingPassport)}
      />
    );
  }

  if (isSummaryError || !detail) {
    return null;
  }

  return (
    <RegulatoryPassportView
      detail={detail}
      profileImageUrl={profileImageUrl}
      domainCoverage={domainCoverage}
      domainCoverageProps={domainCoverageProps}
      completedTrainingsPage={completedTrainingsPage}
      completedTrainingsProps={completedTrainingsProps}
      onCompletedTrainingsPageChange={setCompletedPage}
      onDownloadClick={() => downloadPassport({
        detail,
        profileImageUrl,
        domainCoverage,
      })}
      isExporting={isExporting}
    />
  );
};

export default RegulatoryPassport;
