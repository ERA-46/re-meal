import React, { useState } from "react";

const RequestFoodPage = () => {
    const [formData, setFormData] = useState({
        foodType: "",
        quantity: "",
    });

    const [message, setMessage] = useState("");
    const userData = JSON.parse(localStorage.getItem("data"));
    const requesterId = userData?.id;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/food-requests/create?reqsterId=${requesterId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Food request submitted successfully!");
                setFormData({ foodType: "", quantity: "" });
            } else {
                const err = await response.text();
                setMessage(`Error: ${err}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Request Food</h2>

            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <input
                        type="text"
                        name="foodType"
                        className="form-control"
                        placeholder="Type of Food"
                        value={formData.foodType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit Request</button>

                {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
            </form>
        </div>
    );
};

export default RequestFoodPage;
