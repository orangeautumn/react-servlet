import React from "react";
import { bomMockData } from "../../mock/bomMockData";
import BomButton from "../BomButton/BomButton.component";
import { fetchBomTable } from "../../service/bom.service";
import BMODropdown from "../BMODropdown/BMODropdown.component";

interface BomLoadButtonProps {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  placeholder: string;
  dropdownType: "bomTemplate" | "itemBomTemplate" | "loadBom";
  setRows: (rows: any[]) => void;
}

const BomLoadButton: React.FC<BomLoadButtonProps> = ({
  label,
  value,
  options,
  placeholder,
  dropdownType,
  setRows,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value);

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleDropdownChange = (val: string) => {
    setSelectedValue(val);
  };

  const handleLoad = async () => {
    if (!selectedValue) return;
    if (window.location.href.includes("mock")) {
      if (dropdownType === "bomTemplate") {
        setRows(bomMockData.bomTemplateTables[selectedValue] || []);
      } else if (dropdownType === "itemBomTemplate") {
        setRows(bomMockData.itemBomTemplateTables[selectedValue] || []);
      } else if (dropdownType === "loadBom") {
        setRows(bomMockData.loadBomTables[selectedValue] || []);
      }
    } else {
      try {
        let data;
        if (dropdownType === "bomTemplate") {
          data = await fetchBomTable(selectedValue);
        } else if (dropdownType === "itemBomTemplate") {
          data = await fetchBomTable(undefined, selectedValue);
        } else if (dropdownType === "loadBom") {
          data = await fetchBomTable(undefined, undefined, selectedValue);
        }
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setRows([]);
      }
    }
  };

  return (
    <>
      <label className="bom-form-label">{label}</label>
      <BMODropdown
        value={selectedValue}
        options={options}
        onChange={handleDropdownChange}
        placeholder={placeholder}
        className="bom-form-input"
      />
      <BomButton handleSubmit={handleLoad}>Load</BomButton>
    </>
  );
};

export default BomLoadButton;
