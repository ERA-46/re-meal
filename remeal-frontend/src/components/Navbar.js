import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token"); 

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");  
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">ReMeal</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashBoard">DashBoard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/deliveries">Deliveries</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-light" onClick={handleLogout}>Logout</button>
                                </li>
                                {user?.userType === "FOOD_REQUESTER" && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/request-food">Request Food</Link>
                                </li>
                                )}
                                {user?.userType === "FOOD_REQUESTER" && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-requests">My Requests</Link>
                                </li>
                                )}

                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
