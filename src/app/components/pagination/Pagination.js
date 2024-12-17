import React from "react";

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="d-flex justify-content-between my-4">
      <button
        className="btn btn-primary"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="align-self-center">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;