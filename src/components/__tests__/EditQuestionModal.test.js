import React from 'react';
import { render } from '@testing-library/react';
import EditQuestionModal from '../EditQuestionModal';

describe("editQuestionModal", () => {
    const mockFunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <EditQuestionModal
            questionEntry={"mock Question"}
            show={true}
            hideModal={mockFunc}
            updateValues={mockFunc} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
    
})