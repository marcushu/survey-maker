import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './questionInsert.css';

export default function MultipleChoice({ addQuestion }) {
  const [question, setquestion] = useState("");
  const [multChoiceOptions, setmultChoiceOptions] = useState("");

  const handleAddQuestion = () => {
    if (!!question && !!multChoiceOptions) {
      const cleanList = multChoiceOptions
        .split(',')
        .map(s => s.trim().replace(' ', '_'));

      addQuestion({
        questionType: "MULTCHOICE",
        question: question,
        choices: cleanList
      });

      setquestion("");
    } else {
      alert("Please enter question and choices");
    }

  }

  return (
    <span>
      <input type="text"
        className="inputText"
        placeholder="Your question here..."
        value={question}
        onChange={e => setquestion(e.target.value)}>
      </input>
      &nbsp;
      <input type="text"
        className="inputText"
        style={{ width: "150px" }}
        placeholder="ok, good, great..."
        value={multChoiceOptions}
        onChange={e => setmultChoiceOptions(e.target.value)}>
      </input>
      &nbsp;
      <button className="add" onClick={handleAddQuestion}>+</button>
    </span>
  )
}

MultipleChoice.propTypes = {
  addQuestion: PropTypes.func
}