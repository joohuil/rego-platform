import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';
import { TokenProvider } from "./contexts/TokenContext";

import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenProvider>
      <App />
    </TokenProvider>
  </BrowserRouter>
)
