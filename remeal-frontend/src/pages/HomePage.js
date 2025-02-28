import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const isAuthenticated = localStorage.getItem("data");

    return (
        <div className="container text-center homepage-container">
            <h2 className="mt-5">Welcome to ReMeal</h2>
            {!isAuthenticated && (
                <div className="mt-4">
                    <Link to="/register" className="btn btn-primary me-2">Sign Up</Link>
                    <Link to="/login" className="btn btn-primary">Log In</Link>
                </div>
            )}
        </div>
    );
};

export default HomePage;
