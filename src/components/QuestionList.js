import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import StringQuestion from './questions/StringQuestion';
import BinaryQuestion from './questions/BinaryQuestion';
import './css/QuestionList.css';

export default function QuestionList({ questions, deleteQuestion, editQuesiton, isEditable }) {

  const updateQuestion = updated => {
    const updateResult = old_question => {
      if (old_question.question === updated.question)
        old_question.result = updated.result;
    }

    questions.map(oldQuestion => updateResult(oldQuestion));
  }


  const editableOptions = question => {
    if (isEditable) return (
      <div>
        <button className="edDelBtn" onClick={() => deleteQuestion(question)}> Delete &nbsp;</button> | 
        <button className="edDelBtn" onClick={() => editQuesiton(question)}>Edit</button>
      </div>
    )
  }


  return (
    <div>
      {questions.map((question) =>
        <div key={question.question}>
          {question.questionType === "BINARY" &&
            <div>
              {editableOptions(question)}
              <BinaryQuestion
                question={question}
                updateQuestion={updateQuestion} />
              <br />
            </div>}
          {question.questionType === "MULTCHOICE" &&
            <div>
              {editableOptions(question)}
              <MultipleChoiceQuestion
                question={question}
                updateQuestion={updateQuestion} />
              <br />
            </div>}
          {question.questionType === "TEXT" &&
            <div>
              {editableOptions(question)}
              <StringQuestion
                question={question}
                updateQuestion={updateQuestion} />
              <br />
            </div>}
        </div>
      )}
    </div>
  )
}

QuestionList.propTypes = {
  questions: PropTypes.array,
  deleteQuestion: PropTypes.func,
  editQuesiton: PropTypes.func,
  isEditable: PropTypes.bool
}
