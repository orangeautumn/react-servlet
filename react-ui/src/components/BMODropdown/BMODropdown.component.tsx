import React from "react";

interface BMODropdownProps {
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const BMODropdown: React.FC<BMODropdownProps> = ({
  value,
  options,
  onChange,
  placeholder,
  className,
}) => (
  <select
    className={className || "bom-form-input"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {placeholder ? <option value="">{placeholder}</option> : null}
    {options.map((opt) => (
      <option key={opt.id} value={opt.id}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default BMODropdown;
