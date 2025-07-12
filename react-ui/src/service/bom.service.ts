import {
  BOM_DROPDOWNS_URL,
  BOM_TABLE_URL,
  CREATE_REDLINES_URL,
  CREATE_STRUCTURE_URL,
} from "./bom-api.constants";

// BOM API service
export async function fetchBomDropdowns() {
  const res = await fetch(BOM_DROPDOWNS_URL);
  return res.json();
}

export async function fetchBomTable(
  templateId?: string,
  itemBomTemplateId?: string,
  loadBomId?: string
) {
  let url = BOM_TABLE_URL;
  const params = [];
  if (templateId) params.push(`templateId=${templateId}`);
  if (itemBomTemplateId) params.push(`itemBomTemplate=${itemBomTemplateId}`);
  if (loadBomId) params.push(`loadBom=${loadBomId}`);
  if (params.length) url += `?${params.join("&")}`;
  const res = await fetch(url);
  return res.json();
}

export async function submitRedlines(tableRows: any) {
  const res = await fetch(CREATE_REDLINES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableRows }),
  });
  return res.json();
}

export async function submitStructure(tableRows: any) {
  const res = await fetch(CREATE_STRUCTURE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableRows }),
  });
  return res.json();
}
