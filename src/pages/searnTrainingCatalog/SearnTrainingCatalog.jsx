import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearnTrainingCatalogListSection from '../../components/searnTrainingCatalog/SearnTrainingCatalogListSection';
import { FILTER_ALL } from '../../api/searnTrainingCatalog/trainingsCatalogOptionsUtils';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import './SearnTrainingCatalog.scss';

const SearnTrainingCatalog = () => {
  const [searchParams] = useSearchParams();

  const initialProviderFilter = useMemo(() => {
    const providerId = searchParams.get('training-provider');
    return hasDisplayValue(providerId) ? providerId : FILTER_ALL;
  }, [searchParams]);

  return (
    <section className="searn-training-catalog-page">
      <SearnTrainingCatalogListSection initialProviderFilter={initialProviderFilter} />
    </section>
  );
};

export default SearnTrainingCatalog;
