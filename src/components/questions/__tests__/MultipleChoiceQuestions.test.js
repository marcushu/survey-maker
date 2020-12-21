import React from 'react';
import {  render } from '@testing-library/react';
import MultipleChoiceQuestions from '../MultipleChoiceQuestion';

describe("Multiple Choice Questions", () => {
    const mockQuestion = {
        question: "mock question?",
        choices: ['choiceOne', 'choice_two', 'choice_Three']
    };

    const mockfunc = jest.fn();


    it("renders", () => {
        const { asFragment } = render(<MultipleChoiceQuestions
            question={mockQuestion}
            updateQuestion={mockfunc} />
            );

        expect(asFragment()).toMatchSnapshot();
    })

    it("correctly renders all of the labels", () => {
        const { getByText } = render(<MultipleChoiceQuestions
            question={mockQuestion}
            updateQuestion={mockfunc} />
            );

        expect(getByText("choiceOne")).toBeInTheDocument();
        expect(getByText("choice two")).toBeInTheDocument();
        expect(getByText("choice Three")).toBeInTheDocument();
    })

})