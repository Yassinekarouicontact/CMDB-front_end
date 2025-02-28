import { Departement } from "./Departement.enum";

export interface UserInformations {
  sub(sub: any): unknown;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  departements: Departement[]; // <-- define as an array of Departement objects
  contacts: string[];
  enabled: boolean;
  locked: boolean;
}
