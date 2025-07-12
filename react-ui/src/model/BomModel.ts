export interface BomTemplateItem {
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

export interface DropdownOption {
  id: string;
  label: string;
  Foundary?: string;
  FoudaryLocation?: string;
  Technology?: string;
}
