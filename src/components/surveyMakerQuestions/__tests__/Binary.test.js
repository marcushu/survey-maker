import React from 'react';
import {  render } from '@testing-library/react';
import Binary from '../Binary';

describe("binary question maker", () => {

    const mockfunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(<Binary addQuestion={mockfunc}/>);

        expect(asFragment()).toMatchSnapshot();
    })

    it('sets each of the two available default values', () => {
        const { getAllByRole } = render(<Binary addQuestion={mockfunc}/>);

        expect(getAllByRole("textbox")[1]).toHaveValue("Yes");
        expect(getAllByRole("textbox")[2]).toHaveValue("No");
    })
})