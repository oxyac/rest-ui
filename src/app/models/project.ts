export interface Project{
  id: number;
  name: string;
  date_start: string;
  is_active: boolean;

  client_id?: number;
  department_id?: number;
}
