import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Head from '../Head';

describe("header component Head", () => {
    const mockFunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <Head
                goto={mockFunc}
                buttonLabel="Mock Button Label" />)

        expect(asFragment()).toMatchSnapshot();
    });

    it("correctly renders the button", () => {
        const { getByRole } = render(
            <Head
                goto={mockFunc}
                buttonLabel="Mock Button Label" />);

        expect(getByRole('button', { name: /Mock Button Label/i })).toBeInTheDocument();
    });

    it("calls the prop function when clicked", () => {
        const { getByRole } = render(
            <Head
                goto={mockFunc}
                buttonLabel="Mock Button Label" />);
                
        fireEvent.click(getByRole('button', { name: /Mock Button Label/i }));

        expect(mockFunc).toHaveBeenCalledTimes(1);
    })
})