import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './questionInsert.css';

export default function Binary( { addQuestion }) {
	const [question, setquestion] = useState("");
	const [positiveValue, setpositiveValue] = useState("Yes");
	const [negativeValue, setnegativeValue] = useState("No");

	const handleAddQuestion = () => {
		addQuestion({
			questionType: "BINARY",
			question: question,
			positiveIdentity: positiveValue.trim().replace(' ', '_'),
			negativeIdentity: negativeValue.trim().replace(' ', '_'),
		});

		setquestion("");
	}

	return (
		<span>
			<input type="text"
				value={question}
				onChange={e => setquestion(e.target.value)}>
			</input>
			&nbsp;
			<input type="text"
				className="yesNoTxt"
				value={positiveValue}
				onChange={e => setpositiveValue(e.target.value)}>
			</input>
			&nbsp;
			<input type="text"
				className="yesNoTxt"
				value={negativeValue}
				onChange={e => setnegativeValue(e.target.value)}>
			</input>
			&nbsp;
			<button className="add" onClick={handleAddQuestion}>+</button>
		</span>
	)
}

Binary.propTypes = {
	addQuestion: PropTypes.func
};