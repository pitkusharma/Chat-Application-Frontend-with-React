import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginView';
import Signup from './pages/SignupView';
import NotFound from './pages/NotFound';
import AuthorizedRoutes from "./pages/AuthorizedRoutes";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="*" element={ <NotFound/> } />
        <Route element={ <AuthorizedRoutes/> } >
          <Route path="/" element={ <Home/> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
