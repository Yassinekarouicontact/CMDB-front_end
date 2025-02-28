import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserRegistrationRequest } from "app/model/RegistrationRequest";
import { UpdateUserRequest } from "app/model/updateRequest";
import { UserInformations } from "app/model/user.model";
import { AdminService } from "app/_services/admin.service";

export enum Role {
  ADMIN = "ADMIN",
  CONSULTANT = "CONSULTANT",
  COMMERCIAL = "COMMERCIAL",
  CLIENT = "CLIENT",
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  @ViewChild("closeButton") closeButton: ElementRef;

  userForm: FormGroup;
  role: Role;
  isLoading = false;
  isSuccess = false;
  errorMessage = "";
  collapsed: boolean;

  showAddModal: boolean = false;
  users: UserInformations[];
  user: UserInformations;
  userRegistrationRequest: UserRegistrationRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
    departements: [],
    contacts: [],
  };
  token: string;
  email: string;
  submitted = false;
  updatingUser: UserInformations;
  updateUserForm: FormGroup;
  content: any;
  showUpdateModal = false;
  updateUserRequest: UpdateUserRequest = {
    id: null,
    firstName: "",
    lastName: "",
    departements: [],
    contacts: [],
  };
  departements: any[];
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //   this.getUsers();
    //   this.departements = Object.values(Departement);
    //   this.updateUserForm = this.formBuilder.group({
    //     id: ['', Validators.required],
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     departements: [[]]
    //     contacts: ['']
    //   });
    //   this.userForm = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    //     role: ['', Validators.required],
    //     departements: [[]],
    //     contacts: ['']
    //   });
    // }
    // get f() {
    //   return this.updateUserForm.controls;
  }
  getUsers() {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    const updateUserRequest: UpdateUserRequest = {
      id: this.updateUserForm.get("id").value,
      firstName: this.updateUserForm.get("firstName").value,
      lastName: this.updateUserForm.get("lastName").value,
      departements: this.updateUserForm.get("departements").value,
      contacts: this.updateUserForm.get("contacts").value,
    };
    console.log(updateUserRequest);

    this.adminService.updateUser(updateUserRequest).subscribe(
      (data) => {
        console.log("User information updated successfully");
        // Reload the user information from the server
        this.adminService.getUserInformations(updateUserRequest.id).subscribe(
          (data: UserInformations) => {
            this.user = data;
            // Update the form with the new user information
            this.updateUserForm.patchValue({
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              departements: this.user.departements,
              contacts: this.user.contacts,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        location.reload();
        console.log("botton pressed");
        this.closeButton.nativeElement.click();
      }
    );
  }

  @ViewChild("updateUserModal") updateUserModal: ElementRef;

  showUpdateForm(content: any, user: UserInformations) {
    console.log("showUpdateForm called", user);
    this.updateUserRequest.id = user.id;
    this.updateUserRequest.firstName = user.firstName;
    this.updateUserRequest.lastName = user.lastName;
    this.updateUserRequest.departements = user.departements;
    this.updateUserRequest.contacts = user.contacts;

    console.log("this.updateUserRequest", this.updateUserRequest);
    this.showUpdateModal = true;
  }

  // addUser(): void {
  //   this.isLoading = true;
  //   this.isSuccess = false;
  //   this.errorMessage = '';
  //   const userRegistrationRequest: UserRegistrationRequest = {
  //     firstName: this.userForm.get('firstName').value,
  //     lastName: this.userForm.get('lastName').value,
  //     email: this.userForm.get('email').value,
  //     password: this.userForm.get('password').value,
  //     role: this.userForm.get('role').value,
  //     departements: this.userForm.get('departements').value,
  //     contacts: []
  //   };
  //   this.adminService.addUser(userRegistrationRequest).subscribe({
  //     next: () => {
  //       this.isSuccess = true;
  //       this.userForm.reset();
  //     },
  //     error: (error) => {
  //       this.errorMessage = error.error.message;
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // deleteUser(email: string, token: string, user: UserInformations): void {
  //   const request: DeleteUserRequest = { email: email, token: token };

  //   this.adminService.deleteUser(request)
  //     .pipe(
  //       catchError(error => {
  //         console.error(error);
  //         return throwError('Could not delete user.');
  //       })
  //     )
  //     .subscribe(() => {
  //       this.users = this.users.filter(u => u !== user);

  //     });
}
