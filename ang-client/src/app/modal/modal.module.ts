import { NgModule } from "@angular/core";
import { SigninComponent } from './signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [NgbModule, FormsModule, ReactiveFormsModule],
    exports: [SigninComponent]
})

export class ModalModule { }