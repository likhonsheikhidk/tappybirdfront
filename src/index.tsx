import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
export const socket = new WebSocket('wss://tappyback.ton-runes.top/ws');
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
