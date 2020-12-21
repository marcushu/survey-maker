import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './css/Head.css';


export default function Head({ goto, buttonLabel }) {
  return (
    <Row id="rowMain">
      <Col id="headMain">
        <div id="headTitle">
          Survey Maker
        </div>
        <div>
          <button className="goto" onClick={goto}>
            {buttonLabel}
          </button>
        </div>
      </Col>
    </Row>
  )
}

Head.propTypes = {
  goto: PropTypes.func,
  buttonLabel: PropTypes.string
}