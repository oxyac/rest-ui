import {Programmer} from "./programmer";

export interface Department{
  id: number;
  name: string;
  language: string;

  programmer_ids?: number[];
}
