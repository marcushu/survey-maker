import React from 'react';
import { render } from '@testing-library/react';
import ResultStats from '../ResultStats';

describe("resultStats", () => {
    const mockData = [
        {
            No: 1,
            Yes: 3,
            question: "did you attend",
            questionType: "BINARY"
        },
        {
            "12 mostly family": 1,
            "asd asdf sad fsd ": 1,
            "asd asdf sadf asdf ": 1,
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
    ]

    it("renders", () => {
        const { asFragment } = render(
            <ResultStats surveyData={mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders the questions", () => {
        const { getByText } = render(
            <ResultStats surveyData={mockData} />
        );

        expect(getByText(/did you attend/i)).toBeInTheDocument();
        expect(getByText(/the event was.../i)).toBeInTheDocument();
        expect(getByText(/I had fun./i)).toBeInTheDocument();
    });

    it("sets the correct display class for results above/below %50", () => {
        const { container } = render(
            <ResultStats surveyData={mockData} />
        );

        // find any result displayed as > %50
        const pctResultHigh = container.getElementsByClassName("percentagesGreen")[0].innerHTML;
        // find any result displayed as < %50
        const pctResultLow = container.getElementsByClassName("percentages")[0].innerHTML;

        expect(pctResultHigh.slice(0, -1) > 50).toBeTruthy();
        expect(pctResultLow.slice(0, -1) < 50).toBeTruthy();

    })
})