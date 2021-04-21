import React from 'react';
import App from './App';
import {AgGridReact} from 'ag-grid-react';
import {mount} from 'enzyme';
import {act} from "@testing-library/react";

let component = null;
let agGridReact = null;

const ensureGridApiHasBeenSet = async (componentRef) => {
    await act(async () => {
        await new Promise(function (resolve, reject) {
            (function waitForGridReady() {
                if (componentRef.current.getApi()) {
                    if (componentRef.current.getApi().getRowNode(8)) {
                        return resolve();
                    }

                }
                setTimeout(waitForGridReady, 10);
            })();
        })

    });
};

beforeEach(async () => {
    const ref = React.createRef()
    component = mount(<App ref={ref}/>);
    agGridReact = component.find(AgGridReact).instance();
    await ensureGridApiHasBeenSet(ref);
});

afterEach(() => {
    component.unmount();
    agGridReact = null;
})


it('all rows selected', () => {
    // no rows are selected initially
    expect(agGridReact.api.getSelectedRows().length).toEqual(0);

    // simulate a user clicking on the select all button
    component.find('#selectAll').simulate('click', {
    // no actual event data is needed for this particular event/use case
    });

    expect(agGridReact.api.getSelectedRows().length).toEqual(8618)
});

it('all rows deselected', () => {
  // no rows are selected initially - use the grid directly to select them all (bypassing our app component)
  agGridReact.api.selectAll();

  // simulate a user clicking on the deselect all button
  component.find('#deSelectAll').simulate('click', {
    // no actual event data is needed for this particular event/use case
  });

  expect(agGridReact.api.getSelectedRows().length).toEqual(0);
});
