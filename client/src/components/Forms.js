import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BookForms from './BookForm';
import AuthorForm from './AuthorForm';
const Forms = () => {
    return (
        <Row>
            <Col>
                <BookForms />
            </Col>
            <Col>
                <AuthorForm />
            </Col>
        </Row>
    )
}
export default Forms