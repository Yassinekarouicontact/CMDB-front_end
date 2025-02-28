import { Departement } from "./Departement.enum";

export interface UpdateUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  departements: Departement[];
  contacts: string[];
}
