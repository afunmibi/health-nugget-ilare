const DisclaimerPage = () => {
  return (
    <div className="container">
      <h1 className="h3 mb-3">Medical Disclaimer</h1>
      <div className="alert alert-warning">
        This platform provides general education only and is not a substitute for medical diagnosis or treatment.
      </div>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <p className="mb-3">
            Always consult a qualified healthcare provider before making decisions about medications, treatments, or lifestyle changes.
          </p>
          <p className="mb-0">
            If you are experiencing an emergency, seek immediate medical attention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
