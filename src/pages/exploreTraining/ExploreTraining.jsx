import { useIntl } from '@edx/frontend-platform/i18n';
import { faCompass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../components/emptyState';
import { SkeletonScreen, SKELETON_VARIANTS } from '../../components/skeleton';
import { useToast } from '../../components/toast/ToastProvider';
import useExploreTrainingRoles from '../../hooks/exploreTraining/useExploreTrainingRoles';
import { ADMIN_PATHS } from '../../utils/adminPaths';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import messages from './messages';
import './ExploreTraining.scss';

const ExploreTraining = () => {
  const { formatMessage } = useIntl();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    roles,
    isLoading,
    isError,
    errorMessage,
  } = useExploreTrainingRoles();

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: formatMessage(messages.loadErrorTitle),
      description: errorMessage || formatMessage(messages.rolesLoadError),
    });
  }, [errorMessage, formatMessage, isError, showToast]);

  return (
    <section className="explore-training-page">
      <div className="explore-training-hero">
        <div className="explore-training-hero__pattern" aria-hidden />
        <div className="explore-training-hero__content">
          <span className="explore-training-hero__badge">
            <FontAwesomeIcon icon={faCompass} aria-hidden />
            {formatMessage(messages.heroBadge)}
          </span>
          <h2 className="explore-training-hero__title">
            {formatMessage(messages.heroTitle)}
          </h2>
          <p className="explore-training-hero__subtitle">
            {formatMessage(messages.heroSubtitle)}
          </p>

          {isLoading && (
            <div className="explore-training-hero__loading">
              <SkeletonScreen variant={SKELETON_VARIANTS.GRID_CARDS} count={4} />
            </div>
          )}

          {!isLoading && isError && (
            <EmptyState
              className="explore-training-hero__empty"
              message={errorMessage || formatMessage(messages.rolesLoadError)}
            />
          )}

          {!isLoading && !isError && roles.length === 0 && (
            <EmptyState
              className="explore-training-hero__empty"
              message={formatMessage(messages.noActivities)}
            />
          )}

          {!isLoading && !isError && roles.length > 0 && (
            <div className="explore-training-hero__grid">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className="explore-role-card"
                  onClick={() => navigate(ADMIN_PATHS.exploreTrainingRole(role.id))}
                >
                  <span className="explore-role-card__icon" aria-hidden>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  {hasDisplayValue(role.label) && (
                    <span className="explore-role-card__label">{role.label}</span>
                  )}
                  <span className="explore-role-card__meta">
                    {formatMessage(messages.activitiesCount, { count: role.activityCount })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreTraining;
