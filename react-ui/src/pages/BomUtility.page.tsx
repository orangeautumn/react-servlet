import React, { useState, useEffect } from "react";
import "../bom-utility.scss";
import { fetchBomTable } from "../service/bom.service";
import { bomMockData } from "../mock/bomMockData";
import type { BomTemplateItem } from "../model/BomModel";
import BomLoadButtonsHub from "../components/BomLoadButtonsHub/BomLoadButtonsHub.component";
import BomCreateButtonsHub from "../components/BomCreateButtonsHub/BomCreateButtonsHub.component";
import BomTable from "../components/BomTable/BomTable.component";

const BomUtility: React.FC = () => {
  const [rows, setRows] = useState<BomTemplateItem[]>([]);

  useEffect(() => {
    if (window.location.href.includes("mock")) {
      setRows(bomMockData.tableRows);
    } else {
      fetchBomTable()
        .then((data) => {
          setRows(Array.isArray(data) ? data : []);
        })
        .catch(() => {
          setRows([]);
        });
    }
  }, []);

  return (
    <div className="bom-utility-container">
      <h2 className="bom-utility-title">BOM Utility</h2>
      <BomLoadButtonsHub setRows={setRows} />
      <div className="bom-preview-container">
        <button className="main-btn">Preview Structure</button>
      </div>
      <BomTable rows={rows} />
      <BomCreateButtonsHub rows={rows} />
    </div>
  );
};

export default BomUtility;
