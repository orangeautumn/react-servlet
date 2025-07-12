import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const { message, refNumber } = location.state || {};

  return (
    <div className="success-container">
      <h2>Success!</h2>
      <p>{message || 'Your request was successful.'}</p>
      {refNumber && <p>Reference Number: <strong>{refNumber}</strong></p>}
    </div>
  );
};

export default SuccessPage;
