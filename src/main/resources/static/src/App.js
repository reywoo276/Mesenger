import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Chat from "./Chat";

function App() {
    return (
        <Router>
            <nav style={{ padding: 10 }}>
                <Link to="/chat" style={{ marginRight: 10 }}>Чат</Link>
                <Link to="/sign-up" style={{ marginRight: 10 }}>Sign Up</Link>
                <Link to="/sign-in">Sign In</Link>
            </nav>
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
