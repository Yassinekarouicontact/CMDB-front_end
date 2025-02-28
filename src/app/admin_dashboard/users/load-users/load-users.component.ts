import Swal from "sweetalert2";
import { throwError } from "rxjs";
import { catchError } from "rxjs";
import { DeleteUserRequest } from "app/model/deleteRequest";
import { Router } from "@angular/router";
import { AdminService } from "app/_services/admin.service";
import { Subject } from "rxjs";
import { UserInformations } from "app/model/user.model";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-load-users",
  templateUrl: "./load-users.component.html",
  styleUrls: ["./load-users.component.scss"],
})
export class LoadUsersComponent implements OnInit {
  users: UserInformations[];
  searchUsers: string;
  filteredUsers: UserInformations[];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  token: string;
  user: UserInformations;
  constructor(
    private adminService: AdminService,
    private alert: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: "full_numbers",
      searching: true,
      // paging: false,
      lengthChange: false,
      language: {
        searchPlaceholder: "Text Customer",
      },
    };
    this.LoadUsers();
  }

  LoadUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.filteredUsers = res;
      this.dtTrigger.next(null);
    });
  }
  onSearch() {
    this.filteredUsers = this.users.filter((user) => {
      const fullName = user.firstName + " " + user.lastName;
      return fullName.toLowerCase().includes(this.searchUsers.toLowerCase());
    });
  }

  deleteUser(user: UserInformations): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0d6efd",
        title: "Delete Equipement",
        text:
          "Are you sure you want to delete equipement with serial number " +
          user.email +
          " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.adminService.deleteUser(user).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                "Failed!",
                "failed to delete equipement.",
                "error"
              );
            },
            (error) => {
              this.LoadUsers();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Equipement has been deleted.",
                "success"
              );
            }
          );
        }
      });
  }

  EditUser(user: UserInformations) {
    this.router.navigate(["admin/users/update/" + user.id], {
      state: { myObject: user },
    });
  }
}
