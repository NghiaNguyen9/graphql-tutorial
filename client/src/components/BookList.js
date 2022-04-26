import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookDetail from './BookDetail';

import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/queries';

const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null)
    const { loading, error, data } = useQuery(getBooks)

    if (loading) return <p>Loading Books...</p>
    if (error) return <p>Error Loading Book!</p>
    return (
        <div>
            <Row>
                <Col xs={6}>
                    {
                        data.books.map(book =>
                            <Card style={{ width: '18rem' }}
                                border='info' text='info' className='text-certer shadow mb-2'
                                key={book.id}
                                onClick={setBookSelected.bind(this, book.id)}>
                                <Card.Body>{book.name}</Card.Body>
                            </Card>)
                    }
                </Col>
                <Col>
                    <BookDetail bookId={bookSelected} />
                </Col>
            </Row>
        </div>
    )
}

export default BookList