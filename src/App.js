import React, { Component } from "react";
//import logo from './logo.svg';
import './App.css';
import { getWinLoss } from './message-control/renderer';

class App extends Component {
    constructor() {
        super()
        this.state = {
            Wins: 0,
            Losses: 0,
        };
    }
    componentDidMount() {
        this.getWL({Character: '*', OppCharacter: '*'});
    }

    async getWL(args) {
        let response = await getWinLoss(args);
        this.setState({Wins: response.wins, Losses: response.losses});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <h1>
                    SlippiDashBoard
                </h1>
                <button type="button" onClick={() => this.getWL({Character: 'Falco', OppCharacter: 'Marth'})}>Get W/L  F vs M</button>
                <article>W{this.state.Wins}/{this.state.Losses}L</article>
                </header>
            </div>
        );
    }
}

export default App;
