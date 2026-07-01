import { useLocation } from 'react-router-dom';
import { getTrainingCatalogVariantFromPath } from '../../utils/trainingCatalogVariantConfig';

const useTrainingCatalogVariant = () => {
  const { pathname } = useLocation();
  return getTrainingCatalogVariantFromPath(pathname);
};

export default useTrainingCatalogVariant;
