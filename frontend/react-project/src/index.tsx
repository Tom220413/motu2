// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProvideAuth } from './hooks/use-auth';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
