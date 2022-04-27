import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from 'src/app/modal/signin/signin.component';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../store/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private modalSrv: NgbModal, private store: Store<fromRoot.IAppState>) { }

  ngOnInit(): void {
    this.store.select(fromRoot.getUsers).subscribe(user=>{
      console.log(user);
    })
  }
  signin() {
    this.modalSrv.open(SigninComponent, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }
}
