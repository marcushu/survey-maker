import React from 'react';
import people from '../images/people-fill.svg';
import envelope from '../images/envelope-fill.svg'
import PropTypes from 'prop-types';
import './css/SurveyList.css';

export default function SurveyList({
  surveyTypes,
  goToStats,
  addParticipants,
  createUrls,
  deleteSurvey }) {


  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Survey (view/edit)</th>
          <th style={{width: "75px"}}>Respondents</th>
        </tr>
      </thead>
      <tbody>
        {surveyTypes
          ? surveyTypes.map(surveyItem =>
            <tr key={surveyItem._key}> 
              <td>
                <button className="surveyBtn"
                  onClick={() => goToStats(surveyItem._key)}>
                  {surveyItem._key}
                </button>
              </td>
              <td className="respondents">
                {surveyItem._val - 1}
              </td>
              <td style={{  width: "135px" }}>
                <button
                  title="Add survey participants"
                  className="graphicButtons"
                  onClick={() => addParticipants(surveyItem._key)}>
                  <img src={people} alt="new participants"></img>
                </button>
                  &nbsp;
                <button
                  title="Create email URL's"
                  className="graphicButtons"
                  onClick={() => createUrls(surveyItem._key)}>
                  <img src={envelope} alt="email urls"></img>
                </button>
                  &nbsp;
                <button
                  onClick={() => deleteSurvey(surveyItem._key)}
                  className="graphicButtons">
                    X
                </button>
              </td>
            </tr>
          )
          : <tr>
            <td colSpan="2"> <h5 style={{ color: "orange" }}>Loading...</h5></td>
          </tr>
        }
      </tbody>
    </table>
  )
}

SurveyList.propTypes = {
  surveyTypes: PropTypes.array,
  goToStats: PropTypes.func,
  addParticipants: PropTypes.func,
  createUrls: PropTypes.func,
  deleteSurvey: PropTypes.func
}