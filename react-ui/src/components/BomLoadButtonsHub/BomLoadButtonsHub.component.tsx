import React, { useEffect, useState } from "react";
import { bomMockData } from "../../mock/bomMockData";
import { fetchBomDropdowns } from "../../service/bom.service";
import BomLoadButton from "../BomLoadButton/BomLoadButton.component";

interface BomLoadButtonsHubProps {
  setRows: (rows: any[]) => void;
}

const BomLoadButtonsHub: React.FC<BomLoadButtonsHubProps> = ({ setRows }) => {
  const [bomTemplate, setBomTemplate] = useState("");
  const [itemBomTemplate, setItemBomTemplate] = useState("");
  const [loadBom, setLoadBom] = useState("");
  const [bomTemplateOptions, setBomTemplateOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [itemBomTemplateOptions, setItemBomTemplateOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [loadBomOptions, setLoadBomOptions] = useState<
    { id: string; label: string }[]
  >([]);

  useEffect(() => {
    if (window.location.href.includes("mock")) {
      setBomTemplateOptions(bomMockData.bomTemplates);
      setItemBomTemplateOptions(bomMockData.itemBomTemplates);
      setLoadBomOptions(bomMockData.loadBoms);
    } else {
      fetchBomDropdowns()
        .then((data) => {
          setBomTemplateOptions(data.bomTemplates || []);
          setItemBomTemplateOptions(data.itemBomTemplates || []);
          setLoadBomOptions(data.loadBoms || []);
        })
        .catch(() => {
          setBomTemplateOptions([]);
          setItemBomTemplateOptions([]);
          setLoadBomOptions([]);
        });
    }
  }, []);

  return (
    <>
      <div className="bom-form-container">
        <div className="bom-form-row">
          <BomLoadButton
            label="BOM Template"
            value={bomTemplate}
            options={bomTemplateOptions}
            placeholder="Select BOM Template"
            dropdownType="bomTemplate"
            setRows={setRows}
          />
          <BomLoadButton
            label="Item BOM Template"
            value={itemBomTemplate}
            options={itemBomTemplateOptions}
            placeholder="Select Item BOM Template"
            dropdownType="itemBomTemplate"
            setRows={setRows}
          />
          <BomLoadButton
            label="Load BOM"
            value={loadBom}
            options={loadBomOptions}
            placeholder="Select Load BOM"
            dropdownType="loadBom"
            setRows={setRows}
          />
        </div>
      </div>
    </>
  );
};
export default BomLoadButtonsHub;
