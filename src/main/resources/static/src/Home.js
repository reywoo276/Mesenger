import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <div className="home-box">
                <h1>Ласкаво просимо до Месенджера</h1>
                <div className="home-buttons">
                    <Link to="/sign-in" className="home-btn">Увійти</Link>
                    <Link to="/sign-up" className="home-btn">Реєстрація</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;