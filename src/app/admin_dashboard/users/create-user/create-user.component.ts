import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserRegistrationRequest } from "app/model/RegistrationRequest";
import { AdminService } from "app/_services/admin.service";
import { Role } from "../users.component";
import { NgForm } from "@angular/forms";
import { Departement } from "app/model/Departement.enum";
import { Router } from "@angular/router";
@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent {
  userForm: FormGroup;
  role: Role;
  isLoading = false;
  isSuccess = false;
  errorMessage = "";
  collapsed: boolean;
  userRegistrationRequest: UserRegistrationRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
    departements: [],
    contacts: [],
  };
  contacts: string[] = [];
  departements: any[];
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.departements = Object.values(Departement);
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      role: ["", Validators.required],
      departements: [[]],
      contacts: [[]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.isSuccess = false;
    this.errorMessage = "";
    const userRegistrationRequest: UserRegistrationRequest = {
      firstName: this.userForm.get("firstName").value,
      lastName: this.userForm.get("lastName").value,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      role: this.userForm.get("role").value,
      departements: this.userForm.get("departements").value,
      contacts: this.contacts,
    };
    this.adminService.addUser(userRegistrationRequest).subscribe({
      next: () => {
        this.isSuccess = true;
        this.userForm.reset();
        this.router.navigate(["admin/users/load"]);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  addContact(contact: string) {
    this.contacts.push(contact);
  }
}
