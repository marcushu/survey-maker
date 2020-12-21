import React from 'react';
import {  render } from '@testing-library/react';
import BinaryQuestion from '../BinaryQuestion';

describe("BinaryQuestion", () => {
    const mockQuestion = {
        negativeIdentity: "no",
        positiveIdentity: "yes",
        question: "mock question?"
    };

    const mockfunc = jest.fn();


    it("renders", () => {
        const { asFragment } = render(<BinaryQuestion
            question={mockQuestion}
            updateQuestion={mockfunc} />
            );

        expect(asFragment()).toMatchSnapshot();
    })

    it("correctly renders the labels (yes/no)", () => {
        const { getByDisplayValue } = render(<BinaryQuestion
            question={mockQuestion}
            updateQuestion={mockfunc} />
            );

        expect(getByDisplayValue(/yes/i)).toBeInTheDocument();
        expect(getByDisplayValue(/no/i)).toBeInTheDocument();
    })


})