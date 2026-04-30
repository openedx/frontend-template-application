/* eslint-disable react/prop-types */
import { Pagination } from '@openedx/paragon';
import './DataTable.scss';

const DataTable = ({
  columns = [],
  rows = [],
  rowKey,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  footerContent = null,
  minWidth = 900,
}) => (
  <div className="data-table">
    <div className="data-table__wrap">
      <table className="data-table__table" style={{ minWidth }}>
        <thead>
          <tr className="data-table__head-row">
            {columns.map(column => (
              <th
                key={column.key}
                className={`data-table__head-cell ${column.align === 'right' ? 'data-table__head-cell--right' : ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr className="data-table__body-row" key={row[rowKey]}>
              {columns.map(column => (
                <td
                  key={`${row[rowKey]}-${column.key}`}
                  className={`data-table__body-cell ${column.align === 'right' ? 'data-table__body-cell--right' : ''}`}
                >
                  {column.renderCell ? column.renderCell(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="data-table__footer">
      <div>{footerContent}</div>
      <Pagination
        className="data-table__pagination"
        paginationLabel="Table pagination"
        pageCount={totalPages}
        currentPage={currentPage}
        onPageSelect={selectedPage => onPageChange(selectedPage)}
      />
    </div>
  </div>
);

export default DataTable;
