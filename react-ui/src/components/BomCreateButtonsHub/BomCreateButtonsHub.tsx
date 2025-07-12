import React from "react";
import { useNavigate } from "react-router-dom";
import { submitRedlines, submitStructure } from "../../service/bom.service";
import { BomTemplateItem } from "../../model/BomModel";
import BomButton from "../BomButton/BomButton.component";
import "./BomCreateButtonsHub.component.scss";

interface BomCreateButtonsHubProps {
  rows: BomTemplateItem[];
}

const BomCreateButtonsHub: React.FC<BomCreateButtonsHubProps> = ({ rows }) => {
  const navigate = useNavigate();

  const handleSubmit = async (type: "redlines" | "structure") => {
    let response;
    if (window.location.href.includes("mock")) {
      response = {
        success: true,
        refNumber: "MOCK-" + Math.floor(Math.random() * 100000),
      };
    } else {
      if (type === "redlines") {
        response = await submitRedlines(rows);
      } else {
        response = await submitStructure(rows);
      }
    }
    if (response && response.success) {
      navigate("/success", {
        state: {
          message:
            type === "redlines"
              ? "Redlines created successfully!"
              : "Structure created successfully!",
          refNumber: response.refNumber,
        },
      });
    }
  };

  return (
    <div className="bom-bottom-btn-row">
      <BomButton
        handleSubmit={() => handleSubmit("redlines")}
        className="bom-main-btn"
      >
        Create Redlines
      </BomButton>
      <BomButton
        handleSubmit={() => handleSubmit("structure")}
        className="bom-main-btn"
      >
        Create Structure
      </BomButton>
    </div>
  );
};

export default BomCreateButtonsHub;
