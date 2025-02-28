import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Departement } from "app/model/Departement.enum";
import { UpdateUserRequest } from "app/model/updateRequest";
import { UserInformations } from "app/model/user.model";
import { AdminService } from "app/_services/admin.service";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent {
  users: any[];
  user: any;
  updateUserForm: FormGroup;
  updateUserRequest: UpdateUserRequest = {
    id: null,
    firstName: "",
    lastName: "",
    departements: [],
    contacts: [],
  };
  departements: any[];
  contacts: any[] = [];
  userId: any;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.departements = Object.values(Departement);
    this.user = history.state.myObject;
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      departements: [this.user.departements],
      contacts: [this.user.contacts],
    });
  }

  onSubmit(): void {
    this.updateUserRequest = {
      id: this.userId,
      firstName: this.updateUserForm.get("firstName").value,
      lastName: this.updateUserForm.get("lastName").value,
      departements: this.updateUserForm.get("departements").value,
      contacts: this.contacts,
    };
    console.log(this.updateUserRequest);

    this.adminService.updateUser(this.updateUserRequest).subscribe(
      (data) => {
        this.router.navigate(["admin/users/load"]);
      },
      (error) => {}
    );
  }
  addContact(contact: string) {
    if (Array.isArray(contact)) contact.forEach((c) => this.contacts.push(c));
    else this.contacts.push(contact);
    this.updateUserForm.get("contacts").setValue("");
  }
}
