import React, { useState } from "react";
//import logo from './logo.svg';
import './App.css';

import sendAsync from './message-control/renderer';

function App() {
  const [message, setMessage] = useState('SELECT * FROM Games');
  const [response, setResponse] = useState([]);

  function send(sql) {
      sendAsync(sql).then((result) => setResponse(result));
  }

  return (
    <div className="App">
        <header className="App-header">
            <h1>
                SlippiDashBoard
            </h1>
        </header>
        <article>
            <input
                type="text"
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
            />
            <button type="button" onClick={() => send(message)}>
                Send
            </button>
            <br />
            <p>Main process responses:</p>
            <br />
            <pre>
                {(response && JSON.stringify(response, null, 2)) ||
                    'No query results yet!'}
            </pre>
        </article>
    </div>
);
}

export default App;
