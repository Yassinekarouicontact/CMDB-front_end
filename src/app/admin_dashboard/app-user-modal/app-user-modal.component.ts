import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'app/_services/admin.service';
import { UserInformations } from 'app/model/user.model';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-app-user-modal',
  templateUrl: './app-user-modal.component.html',
  styleUrls: ['./app-user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  user: UserInformations;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.adminService.getUserInformations(userId).subscribe(user => {
      this.user = user;
    });
  }
}