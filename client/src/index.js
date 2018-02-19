import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './components/app.jsx';

const Main = () => {
  return(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}


ReactDOM.render(<Main />, document.getElementById('root'));



