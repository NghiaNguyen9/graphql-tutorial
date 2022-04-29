import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { REGEX } from './../../shared/const/regular-expression';
import { Store } from '@ngrx/store';
import * as userAction from './../../store/actions/user-actions';
import * as fromRoot from './../../store/index';
import { HttpApiService } from 'src/app/services/http-api.service';
import { PATH_URI } from '../../shared/const/path-uri';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
    private store: Store<fromRoot.IAppState>,
    private httpSrv: HttpApiService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  get frm() {
    return this.signInForm && this.signInForm.controls;
  }
  Signin() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid) {
      const _request = {
        Email: this.frm.email.value,
        Password: this.frm.password.value
      };
      this.httpSrv.callPostApi(PATH_URI.getUser, _request).subscribe(res => {
        console.log(res);
      })
      this.store.dispatch(new userAction.CheckLogin(_request))
    }
  }
}
