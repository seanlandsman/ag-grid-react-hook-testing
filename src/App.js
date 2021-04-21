import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import './App.css';
import 'ag-grid-enterprise';
import {AgGridReact} from 'ag-grid-react';

const App = forwardRef(function (props, ref) {
    const columnDefs = [
        {
            field: 'country',
            rowGroup: true,
        },
        {
            field: 'year',
            rowGroup: true,
        },
        {field: 'sport'},
        {field: 'athlete'},
        {field: 'total'},
    ];
    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
    };
    const [api, setApi] = useState(null);
    const onGridReady = (params) => {
        setApi(params.api);
    };
    const [rowData, setRowData] = useState(null);
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => {
                setRowData(data);
            });
    }, [])

    const handleSelectAll = () => {
        api.selectAll();
    };

    const handleDeselectAll = () => {
        api.deselectAll();
    };

    useImperativeHandle(ref, () => {
        return {
            getApi() {
                return api;
            }
        }
    });

    return (
        <div>
            <button id="selectAll" onClick={handleSelectAll}>Select All Rows</button>
            <button id="deSelectAll" onClick={handleDeselectAll}>Deselect All Rows</button>
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    enableRangeSelection={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                    rowData={rowData}
                />
            </div>
        </div>
    );
});
export default App;
