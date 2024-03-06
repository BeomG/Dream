import React from "react";
import "./App.css";
import Router from "./router/Router";
import { DndProvider } from "react-dnd";

// for mobile
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  return (
    <DndProvider backend={TouchBackend}>
      <div className="App">
        <Router></Router>
      </div>
    </DndProvider>
  );
}

export default App;
