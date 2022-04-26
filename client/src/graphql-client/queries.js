import { gql } from '@apollo/client'

const getBooks = gql`
    query getBooks {
        books {
            id
            name
        }
    }
`
const getBookDetail = gql`
    query getBookDetailQuery ($id: ID!) {
        book(id: $id){
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    id 
                    name
                }
            }
        }
    }
`

const getAuthors = gql`
    query getAuthorsQuery {
        authors {
            id
            name
        }
    }
`
export { getBooks, getBookDetail, getAuthors }