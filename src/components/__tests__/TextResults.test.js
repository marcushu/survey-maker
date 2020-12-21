import React from 'react';
import { render } from '@testing-library/react';
import TextResults from '../TextResults';

describe("TextResults", () => {
    const mockData = [
        {
            No: 1,
            Yes: 3,
            question: "did you attend",
            questionType: "BINARY"
        },
        {
            "12 mostly family": 1,
            "2": 1,
            "3, myselfe, my wife and our dog": 1,
            asdfasfd: 1,
            question: "how many in your party",
            questionType: "TEXT"
        },
        {
            good: 1,
            great: 3,
            question: "the event was...",
            questionType: "MULTCHOICE"
        },
        {
            No: 2,
            Yes: 2,
            question: "I had fun.",
            questionType: "BINARY"
        }
    ];

    it("renders", () => {
        const { asFragment } = render(
            <TextResults surveyData={mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("prints the question and answer", () => {
        const { getByRole, getByText } = render(
            <TextResults surveyData={mockData} />
        );

        expect(getByRole('heading', { name: /how many in your party/i })).toBeInTheDocument();
        expect(getByText(/"12 mostly family"/i)).toBeInTheDocument();
    })
})