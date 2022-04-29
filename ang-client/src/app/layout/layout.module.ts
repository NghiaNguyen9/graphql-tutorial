import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [CommonModule, NgbDropdownModule],
    exports: [HeaderComponent, FooterComponent]
})

export class LayoutModule { }