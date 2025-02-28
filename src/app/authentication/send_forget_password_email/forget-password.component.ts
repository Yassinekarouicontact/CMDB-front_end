import { Component, ViewChild } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent {
  @ViewChild("rpForm") rpForm: NgForm;
  isRpFailed = false;
  email: string;
  successMessage: string;
  errorMessage: string;

  constructor(private userService: UserService) {}
  ngOnInit() {
    const video = document.getElementById("bg-video") as HTMLVideoElement;
    video.muted = true;
  }
  onSubmit() {
    this.userService.sendResetPasswordToken(this.rpForm.value.email).subscribe(
      (response) => {
        if (response) {
          this.errorMessage = "";
          this.successMessage =
            "An email has been sent to your email address with instructions on how to reset your password.";
        }
      },
      (error) => {
        this.successMessage = "";
        this.errorMessage = "Something went wrong";
      }
    );
  }
}
