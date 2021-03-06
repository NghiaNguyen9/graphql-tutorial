import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LayoutModule } from './layout/layout.module';
import { ModalModule } from './modal/modal.module';
import { AuthInterceptor } from './interceptor/auth-interceptor';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './store'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    LazyLoadImageModule,
    LayoutModule,
    ModalModule,
    StoreModule.forRoot(appReducer),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
