import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild("rpForm") rpForm: NgForm;
  newPassword: string = "";
  confirmPassword = "";
  message = "";
  showForm = true;
  showMessage = false;
  token: any;
  errorMessage: string;
  resetPasswordToken: string; // updated property declaration
  form: FormGroup;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.resetPasswordToken = params.get("token"); // assign the value of the token variable to resetPasswordToken
      console.log(this.resetPasswordToken); // Make sure the token is printed correctly
    });
    this.form = new FormGroup({
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", [
        Validators.required,
        this.matchValues("password"),
      ]),
    });
    const video = document.getElementById("bg-video") as HTMLVideoElement;
    video.muted = true;
  }
  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { mismatch: true };
    };
  }

  onSubmit() {
    this.userService
      .updatePassword(this.rpForm.value.password, this.resetPasswordToken)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.message = error;
          this.showMessage = true;
        }
      );
  }
}
