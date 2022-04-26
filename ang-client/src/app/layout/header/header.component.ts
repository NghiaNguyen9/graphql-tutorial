import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from 'src/app/modal/signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private modalSrv: NgbModal) { }

  ngOnInit(): void {
  }
  signin() {
    this.modalSrv.open(SigninComponent, { 
      ariaLabelledBy: 'modal-basic-title' })
  }
}
