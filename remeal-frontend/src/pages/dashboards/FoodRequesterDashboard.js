import React, { useState, useEffect } from "react";

const FoodRequesterDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ requestedFoodType: "", quantity: 1 });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/food-requesting/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch food requests:", err);
    }
  };

  const handleChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/food-requesting/request-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRequest),
    });

    if (res.ok) {
      setNewRequest({ requestedFoodType: "", quantity: 1 });
      fetchRequests();
    } else {
      alert("Failed to submit food request.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    await fetch(`http://localhost:8080/api/food-requesting/delete-request/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchRequests();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Food Requester Dashboard</h2>

      {/* 新增請求表單 */}
      <div className="card p-3 mb-4">
        <h4>Submit a Food Request</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="requestedFoodType"
              placeholder="Requested Food Type"
              className="form-control"
              value={newRequest.requestedFoodType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="form-control"
              value={newRequest.quantity}
              onChange={handleChange}
              required
              min={1}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Submit Request
          </button>
        </form>
      </div>

      {/* 請求列表 */}
      <div className="card p-3">
        <h4>My Requests</h4>
        {requests.length === 0 ? (
          <p className="text-muted">No requests yet.</p>
        ) : (
          <ul className="list-group">
            {requests.map((req) => (
              <li key={req.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{req.requestedFoodType} - {req.quantity} pcs - Status: {req.status}</span>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(req.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodRequesterDashboard;
