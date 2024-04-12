import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from  './components/Header';
import Form from './components/Form';

  const AppLayout = () => {
    return (
      <React.Fragment>
        <Header />
        <Form />
      </React.Fragment>
    );
  };
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<AppLayout />);