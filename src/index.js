import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = {
  typography: {
    styles: {
      variants: {
        h1: {
          fontFamily: 'Merriweather'
        },
        h2: {
          fontFamily: 'Merriweather'
        },
        h3: {
          fontFamily: 'Merriweather'
        },
        h4: {
          fontFamily: 'Merriweather'
        },
        h5: {
          fontFamily: 'Merriweather'
        },
        h6: {
          fontFamily: 'Merriweather'
        },
        lead: {
          fontFamily: 'Merriweather'
        },
        paragraph: {
          fontFamily: 'Merriweather'
        },
        small: {
          fontFamily: 'Merriweather'
        }
      }
    }
  }
}

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider value={theme}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
