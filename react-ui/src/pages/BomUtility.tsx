import React, { useState } from "react";
import '../bmoutility.scss';

interface BomRow {
  id: string;
  partType: string;
  numberCreation: string;
  number: string;
  description: string;
  quantity: string;
  dieRank: string;
  bomDesignator: string;
  supplier: string;
  level: number;
}

const initialRows: BomRow[] = [
  { id: "1", partType: "IC-Finished Good", numberCreation: "$Auto Number", number: "", description: "[Pull from Finished Good Part Number]", quantity: "", dieRank: "", bomDesignator: "", supplier: "", level: 1 },
  { id: "2", partType: "IC-FT2", numberCreation: "$Auto Number", number: "", description: "", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "3", partType: "IC-FT1 Bin", numberCreation: "$Auto Number", number: "", description: "FT1 Bin", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "4", partType: "IC-FT1", numberCreation: "$Auto Number", number: "", description: "FT1", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "5", partType: "IC-Assembly", numberCreation: "$Auto Number", number: "", description: "Assembly", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "6", partType: "IC-Die", numberCreation: "$Auto Number", number: "", description: "Die", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "7", partType: "IC-Bump Sort", numberCreation: "$Auto Number", number: "", description: "Bump Sort", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "8", partType: "IC-Bumped Wafer", numberCreation: "$Auto Number", number: "", description: "Bump", quantity: "", dieRank: "", bomDesignator: "", supplier: "Sub-AKTW", level: 2 },
  { id: "9", partType: "IC-Wafer", numberCreation: "$Auto Number", number: "", description: "[Pull from Wafer Part Number]", quantity: "", dieRank: "", bomDesignator: "", supplier: "", level: 1 },
];

const BomUtility: React.FC = () => {
  const [rows, setRows] = useState<BomRow[]>(initialRows);
  const [bomTemplate, setBomTemplate] = useState("");
  const [itemBomTemplate, setItemBomTemplate] = useState("");
  const [loadBom, setLoadBom] = useState("");

  const handleAddRow = (index: number) => {
    const parent = rows[index];
    const newRow: BomRow = {
      ...parent,
      id: Date.now().toString(),
      numberCreation: "$Auto Number",
      number: "",
      level: parent.level + 1
    };
    const newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    setRows(newRows);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length === 1) return;
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleChange = (index: number, field: keyof BomRow, value: string) => {
    const newRows = [...rows];
    (newRows[index] as any)[field] = value;
    if (field === "numberCreation" && value === "$Auto Number") {
      newRows[index].number = "";
    }
    setRows(newRows);
  };

  const getNumberCell = (row: BomRow, idx: number) => {
    if (row.numberCreation === "$Auto Number") {
      return <span style={{ color: '#888' }}>{`AUTO-${row.id}`}</span>;
    } else {
      return <input value={row.number} onChange={e => handleChange(idx, "number", e.target.value)} />;
    }
  };

  return (
    <div className="bom-utility-container">
      <h2 className="bom-utility-title">BOM Utility</h2>
      <div className="bom-form-container">
        <div className="bom-form-row">
          {/* BOM Template */}
          <label className="bom-form-label">BOM Template</label>
          <input className="bom-form-input" value={bomTemplate} onChange={e => setBomTemplate(e.target.value)} />
          <button className="main-btn bom-main-btn">Load</button>

          {/* Item BOM Template */}
          <label className="bom-form-label">Item BOM Template</label>
          <input className="bom-form-input" value={itemBomTemplate} onChange={e => setItemBomTemplate(e.target.value)} />
          <button className="main-btn bom-main-btn">Load</button>

          {/* Load BOM in the same column as other buttons */}
          <label className="bom-form-label">Load BOM</label>
          <input className="bom-form-input" value={loadBom} onChange={e => setLoadBom(e.target.value)} />
          <button className="main-btn bom-main-btn">Load</button>
        </div>
      </div>
      <div className="bom-preview-container" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <button className="main-btn">Preview Structure</button>
      </div>
      <table className="bom-table">
        <thead className="bom-table-header">
          <tr>
            <th colSpan={2}>Edit Structure</th>
            <th>Part Type</th>
            <th>Number Creation</th>
            <th>Number</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Die Rank</th>
            <th>BOM Designator</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id}>
              <td className="bom-table-cell">
                <button 
                  className="bom-table-btn add"
                  onClick={() => handleAddRow(idx)}
                >+Add</button>
              </td>
              <td className="bom-table-cell">
                <button 
                  className="bom-table-btn remove"
                  onClick={() => handleRemoveRow(idx)}
                >-Remove</button>
              </td>
              <td className="bom-table-cell" style={{ paddingLeft: (row.level - 1) * 24 }}>{row.partType}</td>
              <td className="bom-table-cell">
                <select 
                  className="bom-table-select"
                  value={row.numberCreation} 
                  onChange={e => handleChange(idx, "numberCreation", e.target.value)}
                >
                  <option value="$Auto Number">$Auto Number</option>
                  <option value="$Manual">$Manual</option>
                </select>
              </td>
              <td className="bom-table-cell">{getNumberCell(row, idx)}</td>
              <td className="bom-table-cell">{row.description}</td>
              <td className="bom-table-cell">{row.quantity}</td>
              <td className="bom-table-cell">{row.dieRank}</td>
              <td className="bom-table-cell">{row.bomDesignator}</td>
              <td className="bom-table-cell">{row.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bom-bottom-btn-row">
        <button className="main-btn">Create Redlines</button>
        <button className="main-btn">Create Structure</button>
      </div>
    </div>
  );
};

export default BomUtility;
