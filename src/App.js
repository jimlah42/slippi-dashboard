import React, { Component } from "react";
//import logo from './logo.svg';
import './App.css';
import sendMsg from './message-control/renderer';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Wins: 0,
            Losses: 0,
        };
    }
 

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <h1>
                    SlippiDashBoard
                </h1>
                <button type="button" onClick={() => sendMsg('get-w/l', {Character: 'Falco', OppCharacter: 'Falco'})}>Get W/L</button>
                </header>
            </div>
        );
    }
}

export default App;
