/* eslint-disable react/prop-types */
import { useIntl } from '@edx/frontend-platform/i18n';
import SearchableDropdown from '../../searchableDropdown/SearchableDropdown';
import EmptyState from '../../emptyState/EmptyState';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import messages from '../../../pages/users/regulatoryPassportMessages';

export const REGULATORY_PASSPORT_FILTER_ALL = '';

const getTriggerLabel = (options, value, fallbackMessage) => {
  if (!hasDisplayValue(value)) {
    return fallbackMessage;
  }

  const match = options.find((option) => String(option.value) === String(value));
  return match?.label ?? fallbackMessage;
};

const RegulatoryPassportDomainCoverage = ({
  items,
  domainOptions = [],
  subDomainOptions = [],
  productTypeOptions = [],
  levelOptions = [],
  domainFilter = REGULATORY_PASSPORT_FILTER_ALL,
  subDomainFilter = REGULATORY_PASSPORT_FILTER_ALL,
  productTypeFilter = REGULATORY_PASSPORT_FILTER_ALL,
  levelFilter = REGULATORY_PASSPORT_FILTER_ALL,
  onDomainFilterChange = () => {},
  onSubDomainFilterChange = () => {},
  onProductTypeFilterChange = () => {},
  onLevelFilterChange = () => {},
  filtersDisabled = false,
  isLoading = false,
  isError = false,
  errorMessage = null,
}) => {
  const { formatMessage } = useIntl();
  const visibleItems = (items ?? []).filter((item) => hasDisplayValue(item?.domain));

  return (
    <div className="user-passport-page__domains">
      <h3 className="user-passport-page__section-title">{formatMessage(messages.domainCoverageTitle)}</h3>

      <div className="user-passport-page__domain-filters">
        <SearchableDropdown
          value={domainFilter}
          options={domainOptions}
          disabled={filtersDisabled}
          onChange={onDomainFilterChange}
          triggerLabel={getTriggerLabel(
            domainOptions,
            domainFilter,
            formatMessage(messages.filterAllDomains),
          )}
          searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
          noOptionsText={formatMessage(messages.dropdownNoOptions)}
        />
        <SearchableDropdown
          value={subDomainFilter}
          options={subDomainOptions}
          disabled={filtersDisabled}
          onChange={onSubDomainFilterChange}
          triggerLabel={getTriggerLabel(
            subDomainOptions,
            subDomainFilter,
            formatMessage(messages.filterAllSubDomains),
          )}
          searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
          noOptionsText={formatMessage(messages.dropdownNoOptions)}
        />
        <SearchableDropdown
          value={productTypeFilter}
          options={productTypeOptions}
          disabled={filtersDisabled}
          onChange={onProductTypeFilterChange}
          triggerLabel={getTriggerLabel(
            productTypeOptions,
            productTypeFilter,
            formatMessage(messages.filterAllProductTypes),
          )}
          searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
          noOptionsText={formatMessage(messages.dropdownNoOptions)}
        />
        <SearchableDropdown
          value={levelFilter}
          options={levelOptions}
          disabled={filtersDisabled}
          onChange={onLevelFilterChange}
          triggerLabel={getTriggerLabel(
            levelOptions,
            levelFilter,
            formatMessage(messages.filterAllLevels),
          )}
          searchPlaceholder={formatMessage(messages.dropdownSearchPlaceholder)}
          noOptionsText={formatMessage(messages.dropdownNoOptions)}
        />
      </div>

      {isLoading && (
        <p className="user-passport-page__domain-loading">{formatMessage(messages.loadingPassport)}</p>
      )}

      {isError && hasDisplayValue(errorMessage) && (
        <EmptyState message={errorMessage} />
      )}

      {!isLoading && !isError && visibleItems.length === 0 && (
        <EmptyState message={formatMessage(messages.domainCoverageEmpty)} />
      )}

      {!isLoading && !isError && visibleItems.length > 0 && (
        <div className="user-passport-page__domain-list">
          {visibleItems.map((item) => (
            <div key={item.id} className="user-passport-page__domain">
              <div className="user-passport-page__domain-row">
                <p className="user-passport-page__domain-name">{item.domain}</p>
                <p className="user-passport-page__domain-percent">{item.percent}%</p>
              </div>
              <div className="user-passport-page__bar">
                <div className="user-passport-page__bar-fill" style={{ width: `${item.percent}%` }} />
              </div>
              {item.tags.length > 0 && (
                <div className="user-passport-page__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="user-passport-page__tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegulatoryPassportDomainCoverage;
