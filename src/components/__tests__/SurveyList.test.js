import React from 'react';
import {  render, fireEvent } from '@testing-library/react';
import SurveyList from '../SurveyList';

describe('SurveyList', () => {
    const mockFunc = jest.fn();

    const mockTypesArray = [
        {_key: "Gallery Show", _val: 5},
        {_key: "Valentines Receptions", _val: 1}
    ]

    it("renders", () => {
        const { asFragment } = render(
            
            <SurveyList
            surveyTypes={mockTypesArray}
            goToStats={mockFunc}
            addParticipants={mockFunc}
            createUrls={mockFunc}
            deleteSurvey={mockFunc} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("correctly renders survey name and participant count", () => {
        const { getByRole } = render(
            <SurveyList
            surveyTypes={mockTypesArray}
            goToStats={mockFunc}
            addParticipants={mockFunc}
            createUrls={mockFunc}
            deleteSurvey={mockFunc} />
        );

        expect(getByRole('cell', { name: /4/i })).toBeInTheDocument();
        expect(getByRole('cell', { name: /0/i })).toBeInTheDocument();
        expect(getByRole('cell', { name: /gallery show/i })).toBeInTheDocument();
        expect(getByRole('cell', { name: /valentines receptions/i })).toBeInTheDocument();
    
    });

    it("sends the correct information to callbacks", () => {
        const { getAllByTitle } = render(
            <SurveyList
            surveyTypes={mockTypesArray}
            goToStats={mockFunc}
            addParticipants={mockFunc}
            createUrls={mockFunc}
            deleteSurvey={mockFunc} />
        );
 
        fireEvent.click(getAllByTitle("Add survey participants")[0]);

        expect(mockFunc).toHaveBeenCalledTimes(1);
        expect(mockFunc.mock.calls[0][0]).toBe("Gallery Show");

    })
})