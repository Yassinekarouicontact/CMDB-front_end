import { Departement } from "./Departement.enum";
import { Role } from "./role.enum";

export class UserRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  departements: Departement[];
  contacts: any[];
}
