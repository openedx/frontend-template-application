/* eslint-disable react/prop-types */
import classNames from 'classnames';
import SkeletonCard from './layouts/SkeletonCard';
import SkeletonCardList from './layouts/SkeletonCardList';
import SkeletonChartCard from './layouts/SkeletonChartCard';
import SkeletonDetail from './layouts/SkeletonDetail';
import SkeletonGridCards from './layouts/SkeletonGridCards';
import SkeletonStatsGrid from './layouts/SkeletonStatsGrid';
import SkeletonTable from './layouts/SkeletonTable';
import SkeletonToolbar from './layouts/SkeletonToolbar';
import { SKELETON_VARIANTS, TABLE_COLUMN_PRESETS } from './presets';
import './Skeleton.scss';

const renderVariant = (variant, props) => {
  switch (variant) {
    case SKELETON_VARIANTS.STATS:
      return <SkeletonStatsGrid count={props.count} />;

    case SKELETON_VARIANTS.TABLE:
      return (
        <SkeletonTable
          rows={props.rows}
          columns={props.columns}
          minWidth={props.minWidth}
        />
      );

    case SKELETON_VARIANTS.TOOLBAR_TABLE:
      return (
        <>
          <SkeletonToolbar
            showSearch={props.showSearch}
            showFilter={props.showFilter}
            showPrimaryButton={props.showPrimaryButton}
            searchWidth={props.searchWidth}
          />
          <SkeletonTable
            rows={props.rows}
            columns={props.columns ?? TABLE_COLUMN_PRESETS.nras}
            minWidth={props.minWidth}
          />
        </>
      );

    case SKELETON_VARIANTS.CARD:
      return (
        <SkeletonCard
          hasHeader={props.hasHeader}
          bodyLines={props.bodyLines}
          className={props.className}
        />
      );

    case SKELETON_VARIANTS.CARD_LIST:
      return <SkeletonCardList rows={props.rows} hasHeader={props.hasHeader} />;

    case SKELETON_VARIANTS.GRID_CARDS:
      return <SkeletonGridCards count={props.count} />;

    case SKELETON_VARIANTS.CHART_CARD:
      return <SkeletonChartCard />;

    case SKELETON_VARIANTS.DETAIL:
      return <SkeletonDetail actionCount={props.actionCount} />;

    case SKELETON_VARIANTS.DASHBOARD:
      return (
        <>
          <SkeletonStatsGrid count={props.statsCount ?? 4} />
          {props.showChart && <SkeletonChartCard />}
          {(props.showRequestCards ?? true) && (
            <div className="skeleton-dashboard-requests">
              <SkeletonCardList rows={props.cardListRows ?? 3} />
              <SkeletonCardList rows={props.cardListRows ?? 3} />
            </div>
          )}
        </>
      );

    case SKELETON_VARIANTS.PAGE:
      return (
        <div className="skeleton-page">
          {(props.showToolbar ?? true) && (
            <SkeletonToolbar
              showSearch={props.showSearch}
              showFilter={props.showFilter}
              showPrimaryButton={props.showPrimaryButton}
            />
          )}
          {props.pageContent}
        </div>
      );

    default:
      return null;
  }
};

/**
 * Flexible loading skeleton for pages and sections.
 *
 * @example
 * <SkeletonScreen variant="stats" />
 * <SkeletonScreen variant="toolbar-table" tablePreset="pendingRequests" rows={6} showFilter />
 * <SkeletonScreen variant="page" pageContent={<SkeletonGridCards count={9} />} />
 */
const SkeletonScreen = ({
  variant,
  children,
  className = '',
  ariaLabel = 'Loading',
  tablePreset,
  ...presetProps
}) => {
  const resolvedProps = tablePreset && TABLE_COLUMN_PRESETS[tablePreset]
    ? { ...presetProps, columns: TABLE_COLUMN_PRESETS[tablePreset] }
    : presetProps;

  const rendered = children ?? (variant ? renderVariant(variant, resolvedProps) : null);

  if (!rendered) {
    return null;
  }

  return (
    <div
      className={classNames('skeleton-screen', className)}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {rendered}
    </div>
  );
};

export default SkeletonScreen;
export { SKELETON_VARIANTS, TABLE_COLUMN_PRESETS };
