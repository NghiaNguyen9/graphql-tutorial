import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';

import { useQuery } from '@apollo/client'
import { getBookDetail } from '../graphql-client/queries';

const BookDetail = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBookDetail, {
        variables: {
            id: bookId
        },
        skip: !bookId // condition to skip use query
    })

    if (loading) return <p>Loading Book Detail...</p>
    if (error) return <p>Error Loading Book Detail!</p>

    const book = bookId ? data.book : null;
    return (
        <div>
            <Card bg='info' text='white' className='shadow'>
                <Card.Body>
                    {
                        book == null ? <Card.Text>Please select Book</Card.Text> :
                            <Fragment>
                                <Card.Title>{book.name}</Card.Title>
                                <Card.Subtitle>{book.genre}</Card.Subtitle>
                                <p>{book.author.name}</p>
                                <p>Age: {book.author.age}</p>
                                <p>All book by this author</p>
                                <ul>
                                    {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
                                </ul>
                            </Fragment>
                    }

                </Card.Body>
            </Card>
        </div>
    )
}
export default BookDetail