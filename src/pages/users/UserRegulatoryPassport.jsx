import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
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
import { ADMIN_PATHS } from '../../utils/adminPaths';
import regulatoryPassportMessages from './regulatoryPassportMessages';
import './UserRegulatoryPassport.scss';

const UserRegulatoryPassport = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const { userId } = useParams();
  const location = useLocation();
  const { componentAccess } = useUserRole();
  const [completedPage, setCompletedPage] = useState(1);
  const [domainFilter, setDomainFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [subDomainFilter, setSubDomainFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [productTypeFilter, setProductTypeFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);
  const [levelFilter, setLevelFilter] = useState(REGULATORY_PASSPORT_FILTER_ALL);

  const canViewUserAbout = Boolean(componentAccess?.users?.canViewUserAbout ?? false);
  const canViewRegulatoryPassport = Boolean(componentAccess?.users?.canViewRegulatoryPassport ?? false);
  const canLoadRegulatoryPassport = canViewUserAbout && canViewRegulatoryPassport;

  const {
    detail,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useRegulatoryPassportSummary({ userId, enabled: canViewUserAbout && canViewRegulatoryPassport });

  const {
    items: domainCoverage,
    isLoading: isDomainCoverageLoading,
    isError: isDomainCoverageError,
    errorMessage: domainCoverageErrorMessage,
  } = useRegulatoryPassportDomainCoverage({
    userId,
    domainId: domainFilter,
    subDomainId: subDomainFilter,
    levelId: levelFilter,
    productTypeId: productTypeFilter,
    enabled: canViewUserAbout && canViewRegulatoryPassport && Boolean(detail),
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
    enabled: canLoadRegulatoryPassport,
  });

  const {
    page: completedTrainingsPage,
    isLoading: isCompletedTrainingsLoading,
  } = useRegulatoryPassportCompletedTrainings({
    userId,
    page: completedPage,
    enabled: canViewUserAbout && canViewRegulatoryPassport && Boolean(detail),
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

  const profileImageUrl = location.state?.userProfileImage ?? detail?.userProfileImage ?? '';

  const domainCoverageProps = useMemo(() => ({
    domainOptions,
    subDomainOptions,
    productTypeOptions,
    levelOptions,
    domainFilter,
    subDomainFilter,
    productTypeFilter,
    levelFilter,
    onDomainFilterChange: (value) => {
      setDomainFilter(value);
    },
    onSubDomainFilterChange: (value) => {
      setSubDomainFilter(value);
    },
    onProductTypeFilterChange: (value) => {
      setProductTypeFilter(value);
    },
    onLevelFilterChange: (value) => {
      setLevelFilter(value);
    },
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

  if (!canViewUserAbout || !canViewRegulatoryPassport) {
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
    return <Navigate to={ADMIN_PATHS.users} replace />;
  }

  return (
    <RegulatoryPassportView
      detail={detail}
      profileImageUrl={profileImageUrl}
      domainCoverage={domainCoverage}
      domainCoverageProps={domainCoverageProps}
      completedTrainingsPage={completedTrainingsPage}
      onCompletedTrainingsPageChange={setCompletedPage}
      onDownloadClick={() => downloadPassport({
        detail,
        profileImageUrl,
        domainCoverage,
        userId,
      })}
      isExporting={isExporting}
      certificateLinkState={{
        userId,
        userProfileImage: profileImageUrl,
        userListRow: location.state?.userListRow ?? null,
      }}
    />
  );
};

export default UserRegulatoryPassport;
