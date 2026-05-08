import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../../components/emptyState/EmptyState';
import providersData from '../../mock/trainingCatalog/providers.json';
import './SearnTrainingProvider.scss';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

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
  const navigate = useNavigate();
  const { providerSlug } = useParams();

  const provider = useMemo(
    () => providersData.find(p => p.slug === providerSlug),
    [providerSlug],
  );

  if (!provider) {
    return (
      <section className="provider-page">
        <button type="button" className="provider-page__back" onClick={() => navigate('/admin/searn-training-catalog')}>
          <ArrowLeftIcon className="provider-page__back-icon" />
          Back to SEARN Training Catalog
        </button>
        <EmptyState fullSize className="provider-page__empty" message="No provider found." />
      </section>
    );
  }

  return (
    <section className="provider-page">
      <button type="button" className="provider-page__back" onClick={() => navigate('/admin/searn-training-catalog')}>
        <ArrowLeftIcon className="provider-page__back-icon" />
        Back to SEARN Training Catalog
      </button>

      <div className="provider-page__hero">
        <div
          className="provider-page__hero-top"
          style={{ background: `linear-gradient(90deg, ${provider.headerFrom}, ${provider.headerTo})` }}
        >
          <div className="provider-page__hero-row">
            <div className="provider-page__logo" style={{ background: provider.brandColor }}>
              {provider.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="provider-page__hero-subtitle">Training Provider</p>
              <h1 className="provider-page__hero-title">{provider.name}</h1>
              <a className="provider-page__hero-link" href={provider.website} target="_blank" rel="noreferrer">
                <GlobeIcon className="provider-page__link-icon" />
                {provider.websiteLabel || provider.website}
              </a>
            </div>
            <button
              type="button"
              className="provider-page__hero-action"
              onClick={() => navigate(`/admin/searn-training-catalog/providers/${provider.slug}/catalog`)}
            >
              <BookOpenIcon className="provider-page__action-icon" />
              View Catalog
            </button>
          </div>
        </div>
      </div>

      <div className="provider-page__panel">
        <div className="provider-page__panel-body">
          <div className="provider-page__h2-row">
            <Building2Icon className="provider-page__h2-icon" />
            <h2 className="provider-page__h2">Overview</h2>
          </div>
          <p className="provider-page__text">{provider.overview}</p>

          <div className="provider-page__divider" />

          <div className="provider-page__h2-row provider-page__h2-row--tight">
            <GlobeIcon className="provider-page__h2-icon" />
            <h2 className="provider-page__h2">Website</h2>
          </div>
          <a className="provider-page__link" href={provider.website} target="_blank" rel="noreferrer">
            {provider.website}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SearnTrainingProvider;

