import { useIntl } from '@edx/frontend-platform/i18n';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import { findTrainingProviderOptionBySlug } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import useSearnTrainingCatalogProvider from '../../hooks/searnTrainingCatalog/useSearnTrainingCatalogProvider';
import useTrainingCatalogFilterOptions from '../../hooks/searnTrainingCatalog/useTrainingCatalogFilterOptions';
import brandPlaceholder from '../../assets/images/brand-placeholder.svg';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './SearnTrainingProvider.scss';

const GlobeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
);

const Building2Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const SearnTrainingProvider = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { providerSlug } = useParams();

  const {
    provider,
    isLoading,
    isError,
    errorMessage,
  } = useSearnTrainingCatalogProvider({ providerSlug });

  const { providerOptionsRaw } = useTrainingCatalogFilterOptions();

  const providerFilterId = useMemo(() => {
    if (!provider) {
      return null;
    }

    const matched = findTrainingProviderOptionBySlug(providerOptionsRaw, provider.slug);
    if (matched?.value) {
      return matched.value;
    }

    const byName = providerOptionsRaw.find(
      (option) => option.label === provider.name || option.value === provider.name,
    );

    return byName?.value ?? null;
  }, [provider, providerOptionsRaw]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.providerLoadErrorTitle),
      description: errorMessage || formatMessage(messages.providerLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  const handleViewCatalog = () => {
    if (hasDisplayValue(providerFilterId)) {
      navigate(ADMIN_PATHS.trainingCatalogWithProviderFilter(providerFilterId));
      return;
    }

    if (provider?.slug) {
      navigate(ADMIN_PATHS.trainingCatalogProviderCatalog(provider.slug));
    }
  };

  if (isLoading) {
    return (
      <section className="provider-page">
        <SkeletonScreen variant={SKELETON_VARIANTS.DETAIL} />
      </section>
    );
  }

  if (isError || !provider) {
    return (
      <section className="provider-page">
        <EmptyState
          fullSize
          className="provider-page__empty"
          message={errorMessage || formatMessage(messages.providerNotFound)}
        />
      </section>
    );
  }

  const websiteHref = hasDisplayValue(provider.website) ? provider.website : null;
  const websiteLabel = hasDisplayValue(provider.websiteLabel)
    ? provider.websiteLabel
    : (websiteHref || '');

  return (
    <section className="provider-page">
      <div className="provider-page__hero">
        <div className="provider-page__hero-top">
          <div className="provider-page__hero-row">
            <div className="provider-page__logo" aria-hidden="true">
              <img
                className="provider-page__logo-img"
                src={hasDisplayValue(provider.logoUrl) ? provider.logoUrl : brandPlaceholder}
                alt=""
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = brandPlaceholder;
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="provider-page__hero-subtitle">{formatMessage(messages.providerSubtitle)}</p>
              {hasDisplayValue(provider.name) && (
                <h1 className="provider-page__hero-title">{provider.name}</h1>
              )}
              {websiteHref && (
                <a className="provider-page__hero-link" href={websiteHref} target="_blank" rel="noreferrer">
                  <GlobeIcon className="provider-page__link-icon" />
                  {websiteLabel}
                </a>
              )}
            </div>
            <button
              type="button"
              className="provider-page__hero-action"
              onClick={handleViewCatalog}
            >
              <BookOpenIcon className="provider-page__action-icon" />
              {formatMessage(messages.viewCatalog)}
            </button>
          </div>
        </div>
      </div>

      <div className="provider-page__panel">
        <div className="provider-page__panel-body">
          <div className="provider-page__h2-row">
            <Building2Icon className="provider-page__h2-icon" />
            <h2 className="provider-page__h2">{formatMessage(messages.providerOverview)}</h2>
          </div>
          {hasDisplayValue(provider.overview) && (
            <p className="provider-page__text">{provider.overview}</p>
          )}

          {websiteHref && (
            <>
              <div className="provider-page__divider" />

              <div className="provider-page__h2-row provider-page__h2-row--tight">
                <GlobeIcon className="provider-page__h2-icon" />
                <h2 className="provider-page__h2">{formatMessage(messages.providerWebsite)}</h2>
              </div>
              <a className="provider-page__link" href={websiteHref} target="_blank" rel="noreferrer">
                {websiteLabel}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearnTrainingProvider;
