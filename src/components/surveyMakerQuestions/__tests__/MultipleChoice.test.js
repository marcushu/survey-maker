import React from 'react';
import {  fireEvent, render } from '@testing-library/react';
import MultipleChoice from '../MultipleChoice';

describe("multiple choice",() => {

    const mockfunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(<MultipleChoice addQuestion={mockfunc}/>);

        expect(asFragment()).toMatchSnapshot();
    });


    it("correctly returns a list of options", () => {
        const { getByPlaceholderText, getByRole } = render(<MultipleChoice addQuestion={mockfunc}/>);

        fireEvent.change(getByPlaceholderText("Your question here..."),
            { target: { value: "any text will do"}});

        fireEvent.change(getByPlaceholderText("ok, good, great..."), 
            { target: { value: ['one', 'two', 'three'] } });
        
        fireEvent.click(getByRole("button"));

        expect(mockfunc).toHaveBeenCalledTimes(1);
        expect(mockfunc.mock.calls[0][0].choices).toStrictEqual([ 'one', 'two', 'three' ]);
    })
})