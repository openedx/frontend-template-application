import { useIntl } from '@edx/frontend-platform/i18n';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyTrainingCatalogListSection from '../../components/myTrainingCatalog/MyTrainingCatalogListSection';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import {
  findTrainingProviderOptionBySlug,
  FILTER_ALL,
} from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import useSearnTrainingCatalogProvider from '../../hooks/searnTrainingCatalog/useSearnTrainingCatalogProvider';
import useTrainingCatalogFilterOptions from '../../hooks/searnTrainingCatalog/useTrainingCatalogFilterOptions';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from '../searnTrainingCatalog/messages';
import '../searnTrainingCatalog/SearnTrainingCatalog.scss';

const NraSpecificTrainingProviderCatalog = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { providerSlug } = useParams();

  const {
    provider,
    isLoading: isProviderLoading,
    isError: isProviderError,
    errorMessage: providerErrorMessage,
  } = useSearnTrainingCatalogProvider({ providerSlug });

  const { providerOptionsRaw, isOptionsLoading } = useTrainingCatalogFilterOptions();

  const providerFilterId = useMemo(() => {
    if (!provider || !providerOptionsRaw.length) {
      return FILTER_ALL;
    }

    const matched = findTrainingProviderOptionBySlug(providerOptionsRaw, provider.slug);

    if (matched?.value) {
      return matched.value;
    }

    const byName = providerOptionsRaw.find(
      (option) => option.label === provider.name || option.value === provider.name,
    );

    return byName?.value ?? FILTER_ALL;
  }, [provider, providerOptionsRaw]);

  if (isProviderLoading || (isOptionsLoading && providerFilterId === FILTER_ALL && provider)) {
    return (
      <section className="searn-training-catalog-page">
        <SkeletonScreen variant={SKELETON_VARIANTS.TOOLBAR_TABLE} tablePreset="requestedTrainings" />
      </section>
    );
  }

  if (isProviderError || !provider) {
    return (
      <section className="searn-training-catalog-page">
        <EmptyState
          fullSize
          className="searn-training-catalog-page__empty"
          message={providerErrorMessage || formatMessage(messages.providerNotFound)}
        />
      </section>
    );
  }

  if (!hasDisplayValue(providerFilterId) || providerFilterId === FILTER_ALL) {
    return (
      <section className="searn-training-catalog-page">
        <button
          type="button"
          className="provider-page__back"
          onClick={() => navigate(ADMIN_PATHS.nraSpecificTrainingCatalog)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {formatMessage(messages.backToProvider)}
        </button>
        <EmptyState
          fullSize
          className="searn-training-catalog-page__empty"
          message={formatMessage(messages.providerNotFound)}
        />
      </section>
    );
  }

  return (
    <section className="searn-training-catalog-page">
      <button
        type="button"
        className="provider-page__back"
        onClick={() => navigate(ADMIN_PATHS.nraSpecificTrainingCatalogProvider(provider.slug))}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        {formatMessage(messages.backToProvider)}
      </button>

      <MyTrainingCatalogListSection
        initialProviderFilter={providerFilterId}
        lockProviderFilter
        lockedProviderLabel={provider.name}
      />
    </section>
  );
};

export default NraSpecificTrainingProviderCatalog;
