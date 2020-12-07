import React from "react";
//import logo from './logo.svg';
import './App.css';

import { checkNewFiles } from './message-control/renderer';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1>
                SlippiDashBoard
            </h1>
        </header>
        <button type="button" onClick={() => checkNewFiles()}>
            Check for new files
        </button>
    </div>
);
}

export default App;
