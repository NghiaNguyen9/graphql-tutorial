import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})

export class GraphqlApiService {
    constructor(private apollo: Apollo) { 
        const uri = environment.graphqlUri;
    }

    
}