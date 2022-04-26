import { gql } from 'apollo-angular';

export const GRAPHQL_QUERY = {
    getAllBook : gql`
    {
        books {
            id
            name
            genre
        }
    }
    `
}