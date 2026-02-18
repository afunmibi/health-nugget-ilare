const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-success" role="status" aria-label="Loading">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
