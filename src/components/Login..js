import React, { useState } from 'react';
import { fbAuth } from '../firebaseConfig.js';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import './css/login.css';
import Head from './Head.js';


export default function Login() {
  const history = useHistory();

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");


  const logIn = () => {
    fbAuth.auth()
      .signInWithEmailAndPassword(name, password)
      .then(() => history.push('/admin'))
      .catch(error => alert(error.code));
  }

  return (
    <div style={{width: "100%"}}>
      <Row>
        <Col>
          <Head />
        </Col>
      </Row>
      <Row style={{height: "100%"}}>
        <Col id="colMain">
          <Card id="cardStyle">
            <Card.Body>
              <input className="inputTxtLogin"
                type="email"
                value={name}
                onChange={e => setname(e.target.value)}
                placeholder="email"></input>
              <input className="inputTxtLogin"
                type="password"
                value={password}
                onChange={e => setpassword(e.target.value)}
                placeholder="password">
              </input>
              <div className="text-center">
                <button id="loginBtn" onClick={logIn}>Log In</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}