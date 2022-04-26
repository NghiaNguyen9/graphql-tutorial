import { NgModule } from "@angular/core";
import { SigninComponent } from './signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [NgbModule, FormsModule, ReactiveFormsModule, SharedModule, CommonModule],
    exports: [SigninComponent]
})

export class ModalModule { }