import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from 'src/app/modal/signin/signin.component';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../store/index';
import * as userSelector from '../../store/selectors/user.selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged = false;
  constructor(private modalSrv: NgbModal, private store: Store<fromRoot.IAppState>) { }

  ngOnInit(): void {
    this.store.select(userSelector.getUsers).subscribe(user => {
      console.log(user);
      if (user && user.Email !== '') {
        this.logged = true;
      }
    })
  }
  signin() {
    this.modalSrv.open(SigninComponent, {
      ariaLabelledBy: 'modal-basic-title'
    })
  }
}
