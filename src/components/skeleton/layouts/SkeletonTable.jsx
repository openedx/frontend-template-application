/* eslint-disable react/prop-types, react/no-array-index-key */
import Skeleton from '../Skeleton';

/**
 * @typedef {'text' | 'textStack' | 'iconText' | 'pill' | 'actions'} SkeletonTableCellType
 */

const renderCell = (type) => {
  switch (type) {
    case 'iconText':
      return (
        <div className="skeleton-table__cell-with-icon">
          <Skeleton width="2.25rem" height="2.25rem" rounded="md" />
          <div className="skeleton-table__cell-stack" style={{ flex: 1 }}>
            <Skeleton width="70%" height=".875rem" />
            <Skeleton width="50%" height=".75rem" />
          </div>
        </div>
      );
    case 'textStack':
      return (
        <div className="skeleton-table__cell-stack">
          <Skeleton width="85%" height=".875rem" />
          <Skeleton width="60%" height=".75rem" />
        </div>
      );
    case 'pill':
      return <Skeleton width="4.5rem" height="1.5rem" rounded="md" style={{ margin: '0 auto' }} />;
    case 'actions':
      return <Skeleton width="2rem" height="2rem" rounded="md" style={{ marginLeft: 'auto' }} />;
    case 'text':
    default:
      return <Skeleton width="75%" height=".875rem" />;
  }
};

const SkeletonTable = ({
  rows = 5,
  columns = [
    { type: 'iconText' },
    { type: 'text' },
    { type: 'pill', align: 'center' },
    { type: 'actions', align: 'right' },
  ],
  minWidth = '560px',
}) => (
  <div className="skeleton-table-card">
    <div style={{ overflowX: 'auto' }}>
      <table className="skeleton-table" style={{ minWidth }}>
        <thead>
          <tr className="skeleton-table__head">
            {columns.map((col, colIndex) => (
              <th
                key={`skeleton-th-${colIndex}`}
                className={`skeleton-table__th ${col.align === 'right' ? 'skeleton-table__td--right' : ''} ${col.align === 'center' ? 'skeleton-table__td--center' : ''}`}
              >
                <Skeleton width={`${40 + (colIndex % 3) * 15}%`} height=".75rem" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={`skeleton-row-${rowIndex}`} className="skeleton-table__row">
              {columns.map((col, colIndex) => (
                <td
                  key={`skeleton-cell-${rowIndex}-${colIndex}`}
                  className={`skeleton-table__td ${col.align === 'right' ? 'skeleton-table__td--right' : ''} ${col.align === 'center' ? 'skeleton-table__td--center' : ''}`}
                >
                  {renderCell(col.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SkeletonTable;
