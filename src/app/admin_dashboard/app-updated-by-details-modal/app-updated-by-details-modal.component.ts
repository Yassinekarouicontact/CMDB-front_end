import { Component } from "@angular/core";
import { Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-app-updated-by-details-modal",
  templateUrl: "./app-updated-by-details-modal.component.html",
  styleUrls: ["./app-updated-by-details-modal.component.css"],
})
export class AppUpdatedByDetailsModalComponent implements OnInit {
  @Input() updateBy: any;

  constructor(public modal: NgbActiveModal) {}
  ngOnInit(): void {}
}
