import { Component, OnInit } from '@angular/core';
import { HttpApiService } from './services/http-api.service';
import { Apollo, gql } from 'apollo-angular';
import { GRAPHQL_QUERY } from '../app/shared/const/graphqlQueries';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpApiService, private apollo: Apollo) { }
  ngOnInit(): void {
    // const books = this.apollo.watchQuery({
    //   query: GRAPHQL_QUERY.getAllBook
    // })
    //   .valueChanges
    //   .subscribe((result: any) => {
    //     const data = result.data;
    //     console.log(data.books);
    //   })
  }
}
