import React, { useState, useEffect } from "react";
import '../bmoutility.scss';
import { fetchBomDropdowns, fetchBomTable, submitRedlines, submitStructure } from '../service/bomService';
import { bomMockData } from '../mock/bomMockData';
import { useNavigate } from 'react-router-dom';

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

const BomUtility: React.FC = () => {
  const [rows, setRows] = useState<BomRow[]>([]);
  const [bomTemplate, setBomTemplate] = useState("");
  const [itemBomTemplate, setItemBomTemplate] = useState("");
  const [loadBom, setLoadBom] = useState("");
  const [bomTemplateOptions, setBomTemplateOptions] = useState<{id: string, label: string}[]>([]);
  const [itemBomTemplateOptions, setItemBomTemplateOptions] = useState<{id: string, label: string}[]>([]);
  const [loadBomOptions, setLoadBomOptions] = useState<{id: string, label: string}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.includes('mock')) {
      setBomTemplateOptions(bomMockData.bomTemplates);
      setItemBomTemplateOptions(bomMockData.itemBomTemplates);
      setLoadBomOptions(bomMockData.loadBoms);
      setRows(bomMockData.tableRows);
    } else {
      fetchBomDropdowns()
        .then(data => {
          setBomTemplateOptions(data.bomTemplates || []);
          setItemBomTemplateOptions(data.itemBomTemplates || []);
          setLoadBomOptions(data.loadBoms || []);
        })
        .catch(() => {
          setBomTemplateOptions([]);
          setItemBomTemplateOptions([]);
          setLoadBomOptions([]);
        });
      fetchBomTable()
        .then(data => {
          setRows(Array.isArray(data) ? data : []);
        })
        .catch(() => {
          setRows([]);
        });
    }
  }, []);

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

  const handleSubmit = async (type: 'redlines' | 'structure') => {
    let response;
    if (window.location.href.includes('mock')) {
      // Simulate mock API response
      response = { success: true, refNumber: 'MOCK-' + Math.floor(Math.random() * 100000) };
    } else {
      if (type === 'redlines') {
        response = await submitRedlines(rows);
      } else {
        response = await submitStructure(rows);
      }
    }
    if (response && response.success) {
      navigate('/success', {
        state: {
          message: type === 'redlines' ? 'Redlines created successfully!' : 'Structure created successfully!',
          refNumber: response.refNumber
        }
      });
    }
  };

  // Dropdown change handlers (only update value)
  const handleBomTemplateSelect = (templateId: string) => {
    setBomTemplate(templateId);
  };
  const handleItemBomTemplateSelect = (templateId: string) => {
    setItemBomTemplate(templateId);
  };
  const handleLoadBomSelect = (loadBomId: string) => {
    setLoadBom(loadBomId);
  };

  // Load button handlers (call API/mock)
  const handleBomTemplateLoad = async () => {
    if (!bomTemplate) return;
    if (window.location.href.includes('mock')) {
      setRows(bomMockData.bomTemplateTables[bomTemplate] || []);
    } else {
      try {
        const data = await fetchBomTable(bomTemplate);
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setRows([]);
      }
    }
  };
  const handleItemBomTemplateLoad = async () => {
    if (!itemBomTemplate) return;
    if (window.location.href.includes('mock')) {
      setRows(bomMockData.itemBomTemplateTables[itemBomTemplate] || []);
    } else {
      try {
        const data = await fetchBomTable(undefined, itemBomTemplate);
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setRows([]);
      }
    }
  };
  const handleLoadBomLoad = async () => {
    if (!loadBom) return;
    if (window.location.href.includes('mock')) {
      setRows(bomMockData.loadBomTables[loadBom] || []);
    } else {
      try {
        const data = await fetchBomTable(undefined, undefined, loadBom);
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setRows([]);
      }
    }
  };

  return (
    <div className="bom-utility-container">
      <h2 className="bom-utility-title">BOM Utility</h2>
      <div className="bom-form-container">
        <div className="bom-form-row">
          {/* BOM Template */}
          <label className="bom-form-label">BOM Template</label>
          <select
            className="bom-form-input"
            value={bomTemplate}
            onChange={e => handleBomTemplateSelect(e.target.value)}
          >
            <option value="">Select BOM Template</option>
            {bomTemplateOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <button className="main-btn bom-main-btn" onClick={handleBomTemplateLoad}>Load</button>

          {/* Item BOM Template */}
          <label className="bom-form-label">Item BOM Template</label>
          <select
            className="bom-form-input"
            value={itemBomTemplate}
            onChange={e => handleItemBomTemplateSelect(e.target.value)}
          >
            <option value="">Select Item BOM Template</option>
            {itemBomTemplateOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <button className="main-btn bom-main-btn" onClick={handleItemBomTemplateLoad}>Load</button>

          {/* Load BOM in the same column as other buttons */}
          <label className="bom-form-label">Load BOM</label>
          <select
            className="bom-form-input"
            value={loadBom}
            onChange={e => handleLoadBomSelect(e.target.value)}
          >
            <option value="">Select Load BOM</option>
            {loadBomOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
          <button className="main-btn bom-main-btn" onClick={handleLoadBomLoad}>Load</button>
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
        <button className="main-btn" onClick={() => handleSubmit('redlines')}>Create Redlines</button>
        <button className="main-btn" onClick={() => handleSubmit('structure')}>Create Structure</button>
      </div>
    </div>
  );
};

export default BomUtility;
