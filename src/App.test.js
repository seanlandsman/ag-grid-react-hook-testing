import { act, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';
import App from './App';

beforeEach(async () => {
    render(<App />);
    // Ensure that the grid data has loaded before running tests
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'), { timeout: 5000 });
});

it('all rows selected', async () => {
    // no rows are selected initially
    await screen.findByText('Selected Rows: 0');

    // no actual event data is needed for this particular event/use case
    act(() => screen.getByText('Select All Rows').click());
    await screen.findByText('Selected Rows: 8618');
});

it('all rows deselected after selection', async () => {

    act(() => screen.getByText('Select All Rows').click());
    await screen.findByText('Selected Rows: 8618');

    act(() => screen.getByText('Deselect All Rows').click());
    await screen.findByText('Selected Rows: 0');

});
