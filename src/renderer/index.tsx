import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
console.log("Hello");
window.electron.common.pingPong();
console.log(window.electron.common.simpleMsg("hi"));
