import {Programmer} from "./programmer";
import {Project} from "./project";
import {Lead} from "./lead";

export interface Department{
  id: number;
  name: string;
  language: string;

  programmerIds?: Programmer[];
  project?: Project;
  lead?: Lead;
}
