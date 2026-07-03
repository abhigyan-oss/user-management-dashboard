function Pagination({
    currentPage,
    totalPages,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  }) {
    return (
      <div className="pagination">
        <div>
          <label>Rows per page: </label>
  
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
  
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
  
          <span style={{ margin: "0 15px" }}>
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  
  export default Pagination;