import React, { useState, useEffect } from "react";
import type { BomTemplateItem } from "../../model/BomModel";
import BMODropdown from "../BMODropdown/BMODropdown.component";
import BomButton from "../BomButton/BomButton.component";

interface BomTableProps {
  rows: BomTemplateItem[];
}

const BomTable: React.FC<BomTableProps> = ({ rows }) => {
  const [tableRows, setTableRows] = useState<BomTemplateItem[]>(rows);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const handleAddRow = (index: number) => {
    const parent = tableRows[index];
    const newRow: BomTemplateItem = {
      ...parent,
      id: Date.now().toString(),
      numberCreation: "$Auto Number",
      number: "",
      level: parent.level + 1,
    };
    const newRows = [...tableRows];
    newRows.splice(index + 1, 0, newRow);
    setTableRows(newRows);
  };

  const handleRemoveRow = (index: number) => {
    if (tableRows.length === 1) return;
    const newRows = tableRows.filter((_, i) => i !== index);
    setTableRows(newRows);
  };

  const handleChange = (
    index: number,
    field: keyof BomTemplateItem,
    value: string
  ) => {
    const newRows = [...tableRows];
    (newRows[index] as any)[field] = value;
    if (field === "numberCreation" && value === "$Auto Number") {
      newRows[index].number = "";
    }
    setTableRows(newRows);
  };

  const getNumberCell = (row: BomTemplateItem, idx: number) => {
    if (row.numberCreation === "$Auto Number") {
      return <span style={{ color: "#888" }}>{`AUTO-${row.id}`}</span>;
    } else {
      return (
        <input
          value={row.number}
          onChange={(e) => handleChange(idx, "number", e.target.value)}
        />
      );
    }
  };

  return (
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
        {tableRows.map((row, idx) => (
          <tr key={row.id}>
            <td className="bom-table-cell">
              <BomButton
                className="bom-table-btn add bom-table-btn-add"
                handleSubmit={() => handleAddRow(idx)}
                type="button"
              >
                +Add
              </BomButton>
            </td>
            <td className="bom-table-cell">
              <BomButton
                className="bom-table-btn remove bom-table-btn-remove"
                handleSubmit={() => handleRemoveRow(idx)}
                type="button"
              >
                -Remove
              </BomButton>
            </td>
            <td
              className="bom-table-cell"
              style={{ paddingLeft: (row.level - 1) * 24 }}
            >
              {row.partType}
            </td>
            <td className="bom-table-cell">
              <BMODropdown
                value={row.numberCreation}
                options={[
                  { id: "$Auto Number", label: "$Auto Number" },
                  { id: "$Manual", label: "$Manual" },
                ]}
                onChange={(val: string) =>
                  handleChange(idx, "numberCreation", val)
                }
                className="bom-table-select"
              />
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
  );
};

export default BomTable;
