import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SurveySaved() {
  return (
    <div>
      <Row>
        <Col className="text-center">
          <h3 style={{ padding: "30px" }}>
            Survey Saved.  Thank You.
          </h3>
        </Col>
      </Row>
    </div>
  )
}