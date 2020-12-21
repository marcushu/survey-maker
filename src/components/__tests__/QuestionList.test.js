import React from 'react';
import { render } from '@testing-library/react';
import QuestionList from '../QuestionList';

describe("QuestionList", () => {
    const mockFunc = jest.fn();

    const mockQuestions = [
        {
            choices: [],
            negativeIdentity: "No",
            positiveIdentity: "Yes",
            question: "Did you attend with a guest?",
            questionType: "BINARY",
            result: "",
            _id: "5fb43ce7f5397f164e5a7a0d"
        },
        {
            choices: [],
            negativeIdentity: "No",
            positiveIdentity: "Yes",
            question: "Did you stay the whole time?",
            questionType: "BINARY",
            result: "",
            _id: "5fb43ce7f5397f164e5a7a0e"
        },
        {
            choices: ["ok", "good", "great"],
            negativeIdentity: "",
            positiveIdentity: "",
            question: "How was the food?",
            questionType: "MULTCHOICE",
            result: "",
            _id: "5fb43ce7f5397f164e5a7a0f"
        },
        {
            choices: ["ok", "good", "great"],
            negativeIdentity: "",
            positiveIdentity: "",
            question: "How was the entertainment?",
            questionType: "MULTCHOICE",
            result: "",
            _id: "5fb43ce7f5397f164e5a7a10"
        },
        {
            choices: [],
            negativeIdentity: "",
            positiveIdentity: "",
            question: "How can we improve?",
            questionType: "TEXT",
            result: "",
            _id: "5fb43ce7f5397f164e5a7a11"
        }
    ];

    it("renders", () => {
        const { asFragment } = render(
            <QuestionList
                questions={mockQuestions}
                deleteQuestion={mockFunc}
                editQuestion={mockFunc}
                isEditable={true} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("displays all the questions", () => {
        const { getByText } = render(
            <QuestionList
                questions={mockQuestions}
                deleteQuestion={mockFunc}
                editQuestion={mockFunc}
                isEditable={true} />
        );

        expect(getByText(/Did you attend with a guest?/i)).toBeInTheDocument();
        expect(getByText(/Did you stay the whole time?/i)).toBeInTheDocument();
        expect(getByText(/how was the food?/i)).toBeInTheDocument();
        expect(getByText(/How was the entertainment?/i)).toBeInTheDocument();
        expect(getByText(/How can we improve?/i)).toBeInTheDocument();
    })
});