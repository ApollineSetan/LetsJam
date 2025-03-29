import { useState, useEffect } from 'react'
import axios from 'axios'
import React from "react";
import { DemoProvider } from "./contexts/DemoContext";
import "./App.css";
import { LeftMenu } from "./components/LeftMenu";
import { EditionPage } from "./pages/EditionPage";
import { AddDemo } from "./pages/AddDemo";
import { InfoDemo } from "./pages/InfoDemo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <DemoProvider>
      <Router>
        <div className="App">
          <LeftMenu />
          <Routes>
            <Route path="/" element={<EditionPage />} />
            <Route path="/add-demo" element={<AddDemo />} />
            <Route path="/edit-demo/:demoId" element={<InfoDemo />} />
          </Routes>

          <div className="background"></div>
        </div>
      </Router>
    </DemoProvider>
  );
}

export default App;