import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fbAuth } from '../firebaseConfig.js';
import QuestionaireserviceMGO from '../js/QuestionaireServiceMGO';
import QuestionList from './QuestionList';
import MultipleChoice from './surveyMakerQuestions/MultipleChoice.js';
import Head from './Head';
import Text from './surveyMakerQuestions/Text.js';
import EditQuestionModal from './EditQuestionModal.js';
import './css/SurveyMaker.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionaireServiceMGO from '../js/QuestionaireServiceMGO';

export default function SurveyMaker() {
  const history = useHistory();

  const [survey, setSurvey] = useState(null);
  const [surveyName, setsurveyName] = useState(null);
  const [count, setcount] = useState(0); 
  const [currentQuestion, setcurrentQuestion] = useState(null);
  const [modalVisible, setmodalVisible] = useState(false);
  const [showCreateSurvey, setshowCreateSurvey] = useState(true);
  const [questionMakerToShow, setquestionMakerToShow] = useState("NONE");


  useEffect(() => {
    fbAuth.auth().onAuthStateChanged(user => {
      if (!user)
        history.push('/login');
      else
        loadSurvey();
    });
  }, [history]);


  const createSurvey = surveyName => {
    if (surveyName) {
      let newSurvey = QuestionaireServiceMGO.newQuestionaire(surveyName);

      setSurvey(newSurvey);

      setshowCreateSurvey(false);
    } else {
      alert("Please enter a survey name.");
    }

  }


  const loadSurvey = () => {
    const url = window.location.href;
    const surveyName = decodeURI(url.slice(url.indexOf('=') + 1));

    if (surveyName !== "blank") {
      // no participants yet...ok to edit
      QuestionaireserviceMGO.getBlankSurveyByName(surveyName).then(unusedSurvey => {
        let blankSurvey = QuestionaireserviceMGO.newQuestionaire(surveyName);
        blankSurvey.questions = unusedSurvey.questions;

        setSurvey(blankSurvey);
        setsurveyName(surveyName);
        setshowCreateSurvey(false);
      })
        .catch(err => console.error(err));
    }
  }


  const addQuestion = newQuestion => {
    if (survey) {
      survey.addQuestion(newQuestion);
      setSurvey(survey);
      setcount(count + 1);
    } else {
      alert("create survey first");
    }
  }


  const deleteQuestion = surveyInput => {
    let undeletedQuestions = survey.questions.filter(
      ({ question }) => question !== surveyInput.question);

    survey.questions = undeletedQuestions

    setSurvey(survey);
    setcount(count - 1);
  }


  const editQuestion = newValues => {
    setmodalVisible(false);

    survey.questions.forEach(question => {
      if (question.question === currentQuestion.question) {
        switch (currentQuestion.questionType) {
          case "MULTCHOICE":
            question.choices = newValues.choices;
            question.question = newValues.question;
            break;
          case "TEXT":
            question.question = newValues.question;
            break;
          default:
            console.log(newValues)
            break;
        }
      }
    });
  }


  const saveSurvey = async () => {
    if (survey.questions.length) {
      try {
        await QuestionaireserviceMGO.delete(survey.questionaireTypeName);

        let res = await QuestionaireserviceMGO.persist({
          owner: survey.owner,
          questionaireTypeName: survey.questionaireTypeName,
          questions: survey.questions
        });

        alert(res);
        history.push('/admin');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Add survey questions.");
    }
  }


  const showQuestionMaker = () => {
    switch (questionMakerToShow) {
      case "MULTCHOICE":
        return (
          <div style={{ textAlign: "center" }}>
            <button className="delete" onClick={() => setquestionMakerToShow("NONE")}>
              &lt;&lt;
            </button>
            <MultipleChoice addQuestion={addQuestion} />
          </div>);
      case "TEXT":
        return (
          <div style={{ textAlign: "center" }}>
            <button className="delete" onClick={() => setquestionMakerToShow("NONE")}>
              &lt;&lt;
            </button>
            <Text addQuestion={addQuestion} />
          </div>);
      default:
        return (
          <div style={{ textAlign: "center" }}>
            <button className="save" onClick={saveSurvey} >
              Save Survey
            </button>
          </div>
        );
    }
  }



  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col>
          <Head
            goto={() => history.push('/admin')}
            buttonLabel="Admin" />
        </Col>
      </Row>
      <Row>
        <Col id="createSurvey">
          {showCreateSurvey
            ? <div>
              <input type="text"
                className="textInput"
                placeholder="My New Survey.."
                onChange={e => setsurveyName(e.target.value)} />&nbsp; &nbsp;
                <button className="bigOrangeBrdr" onClick={() => createSurvey(surveyName)}>
                Create
                </button>
            </div>
            : <div id="surveyTitle">
              {surveyName}
            </div>}
        </Col>
      </Row>
      <Row>
        <Col>
          <QuestionList
            questions={survey ? survey.questions : []}
            deleteQuestion={deleteQuestion}
            editQuesiton={(surveyInput) => {
              setcurrentQuestion(surveyInput);
              setmodalVisible(true);
            }}
            isEditable={true} />
        </Col>
      </Row>
      {!showCreateSurvey &&
        <Row id="bottomButtons">
          <Col>
            {questionMakerToShow === "NONE" &&
              <div style={{ textAlign: "center" }}>
                <br/>
                <div className="selectText">select survey question type...</div>
                <button className="bigOrangeBrdr" onClick={() => setquestionMakerToShow("TEXT")}>
                  Text
                  </button>
                <button className="bigOrangeBrdr" onClick={() => setquestionMakerToShow("MULTCHOICE")}>
                  Mult. Choice
                  </button>
                <br /><br />
              </div>
            }
            {showQuestionMaker()}
          </Col>
        </Row>
      }
      <EditQuestionModal
        questionEntry={currentQuestion}
        show={modalVisible}
        hideModal={() => setmodalVisible(false)}
        updateValues={editQuestion} />
    </div>
  )
}