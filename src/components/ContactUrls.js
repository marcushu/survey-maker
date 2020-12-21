import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QuestionaireServiceMGO from '../js/QuestionaireServiceMGO';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Head from './Head';
import './css/ContactUrls.css';
import { thisHost } from '../js/host'

export default function ContactUrls() {
  const history = useHistory();
  const [urls, seturls] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    
    const surveyName = decodeURI(url.slice(url.indexOf('=') + 1));

    QuestionaireServiceMGO.getUsersBySurvey(surveyName)
      .then(res => seturls(res))
      .catch(err => console.error(err));

  }, []);

  return (
    <div id="mainDiv">
      <Head goto={() => history.push('/admin')} buttonLabel="Admin" />
      <Row>
        <Col>
          {!!urls.length &&
            <div id="surveyTitle">
              {urls[0].surveyName}
            </div>}
        </Col>
      </Row>
      <Row>
        <Col>
          <table>
            <tbody>
              {urls.length
                ? urls.map(url =>
                  <tr key={url._id}>
                    <td>{`${thisHost}surveyTaker?id=${url._id}`}</td>
                    <td>{url.participant}</td>
                  </tr>
                )
                : <tr>
                  <td>
                    <h4>No participants have been added for this survey</h4>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}