import React from 'react';
import { render } from '@testing-library/react';
import AddParticipants from '../AddParticipants';

describe("AddParcipants", () => {
    const mockFunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <AddParticipants
                surveyName="Mock Survey"
                hideMe={mockFunc}/> );

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with name", () => {
        const { getByText } = render(
            <AddParticipants
                surveyName="Mock Survey"
                hideMe={mockFunc}/> );

        expect(getByText(/Mock Survey/i)).toBeInTheDocument();
    })
})