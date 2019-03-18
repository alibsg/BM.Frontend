/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './App.css';
import './components/sign-in/SignIn';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import SignIn from './components/sign-in/SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: 'Make', field: 'make',
      }, {
        headerName: 'Model', field: 'model',
      }, {
        headerName: 'Price', field: 'price',
      }],
      rowData: [{
        make: 'Toyota', model: 'Celica', price: 35000,
      }, {
        make: 'Ford', model: 'Mondeo', price: 32000,
      }, {
        make: 'Porsche', model: 'Boxter', price: 72000,
      }],
    };
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px',
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
        <SignIn />
      </div>
    );
  }
}

export default App;
