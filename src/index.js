import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import gallery from './gallery-data.json';

import './index.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App data={gallery}/>, document.getElementById('root'));
registerServiceWorker();
