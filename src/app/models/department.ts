import {Programmer} from "./programmer";

export interface Department{
  id: number;
  language: string;

  project_id?: number;
  lead_id?: number;
  programmer_ids?: number[];
}
