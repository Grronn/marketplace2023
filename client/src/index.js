import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import MasterStore from './store/MasterStore';
import TypeServiceStore from './store/TypeServiceStore';


export const Context = createContext(null)
// console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      master: new MasterStore(),
      typeServices: new TypeServiceStore()
    }}>
      <App />
    </Context.Provider>
  // </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();