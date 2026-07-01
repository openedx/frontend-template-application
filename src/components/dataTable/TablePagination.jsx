/* eslint-disable react/prop-types */
import { Pagination } from '@openedx/paragon';
import './DataTable.scss';

/**
 * Shared Paragon pagination with global `data-table__pagination` styles.
 * Renders nothing when `totalPages <= 1`.
 */
export const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  paginationLabel = 'Table pagination',
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <Pagination
      className="data-table__pagination"
      paginationLabel={paginationLabel}
      pageCount={totalPages}
      currentPage={currentPage}
      onPageSelect={onPageChange}
    />
  );
};

/**
 * Footer row with optional left summary and shared pagination on the right.
 * Pagination controls render only when `totalPages > 1`.
 * The summary (`footerContent`) renders whenever it is provided, including single-page lists.
 */
export const TablePaginationFooter = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  paginationLabel = 'Table pagination',
  footerContent = null,
}) => {
  const showPagination = totalPages > 1;
  const hasFooterContent = footerContent != null && footerContent !== '';

  if (!showPagination && !hasFooterContent) {
    return null;
  }

  return (
    <div className="data-table__footer">
      {hasFooterContent && <div>{footerContent}</div>}
      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          paginationLabel={paginationLabel}
        />
      )}
    </div>
  );
};

export default TablePagination;
