// BOM API service
export async function fetchBomDropdowns() {
  const res = await fetch("/api/bom-dropdowns");
  return res.json();
}

export async function fetchBomTable(
  templateId?: string,
  itemBomTemplateId?: string,
  loadBomId?: string
) {
  let url = "/api/bom-table";
  const params = [];
  if (templateId) params.push(`templateId=${templateId}`);
  if (itemBomTemplateId) params.push(`itemBomTemplate=${itemBomTemplateId}`);
  if (loadBomId) params.push(`loadBom=${loadBomId}`);
  if (params.length) url += `?${params.join("&")}`;
  const res = await fetch(url);
  return res.json();
}

export async function submitRedlines(tableRows: any) {
  const res = await fetch("/api/create-redlines", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableRows }),
  });
  return res.json();
}

export async function submitStructure(tableRows: any) {
  const res = await fetch("/api/create-structure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tableRows }),
  });
  return res.json();
}
