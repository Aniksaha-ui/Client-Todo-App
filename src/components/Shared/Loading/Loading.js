import React from "react";

const Loading = () => {
  return (
    <div
      className="spinner-border text-secondary d-flex align-item-center justify-content-center container mt-5"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
