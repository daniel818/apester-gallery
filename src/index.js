import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import gallery from './gallery-data.json';


ReactDOM.render(<App data={gallery}/>, document.getElementById('root'));
registerServiceWorker();
