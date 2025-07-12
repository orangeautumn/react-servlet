import React from "react";

interface BomButtonProps {
  handleSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const BomButton: React.FC<BomButtonProps> = ({
  handleSubmit,
  children,
  className = "",
  type = "button",
}) => (
  <button
    className={`main-btn bom-main-btn ${className}`}
    onClick={handleSubmit}
    type={type}
  >
    {children}
  </button>
);

export default BomButton;
