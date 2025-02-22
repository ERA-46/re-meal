import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        userType: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert("Registration failed!");
        }
    };

    return (
        <div className="container mt-4 form-container">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <input type="text" name="name" className="form-control" placeholder="Full Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="phone" className="form-control" placeholder="Phone Number" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="address" className="form-control" placeholder="Address" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <select name="userType" className="form-select" onChange={handleChange} required>
                        <option value="">Select User Type</option>
                        <option value="FOOD_SUPPLIER">Food Supplier</option>
                        <option value="DELIVERY_PERSON">Delivery Person</option>
                        <option value="FOOD_REQUESTER">Food Requester</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>

    );
};

export default RegisterPage;
