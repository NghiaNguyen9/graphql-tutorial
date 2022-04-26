import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get frm(){
    return this.signInForm && this.signInForm.controls;
  }
  Signin() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid) {

    }
  }
}
