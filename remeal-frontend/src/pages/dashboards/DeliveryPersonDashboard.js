import React, { useEffect, useState } from "react";

const DeliveryPersonDashboard = () => {
  const [availableDeliveries, setAvailableDeliveries] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  const API_BASE_URL = "http://localhost:8080/api/deliveries";

  const fetchAvailableDeliveries = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/available`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        console.warn("Access denied to available deliveries.");
        return;
      }

      const data = await res.json();
      setAvailableDeliveries(data);
    } catch (error) {
      console.error("Failed to fetch available deliveries:", error);
    }
  };

  const fetchMyDeliveries = async (id, token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/my-deliveries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        console.warn("Access denied to your deliveries.");
        return;
      }

      const data = await res.json();
      setMyDeliveries(data);
    } catch (error) {
      console.error("Failed to fetch my deliveries:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
      setUserName(parsedUser.name || parsedUser.email || "Delivery Person");

      fetchAvailableDeliveries(token);
      fetchMyDeliveries(parsedUser.id, token);
    }
  }, []);

  const handleAccept = async (deliveryId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/accept/${deliveryId}?deliveryPersonId=${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to accept delivery. Make sure you're logged in as a Delivery Person.");
        return;
      }

      fetchAvailableDeliveries(token);
      fetchMyDeliveries(userId, token);
    } catch (error) {
      console.error("Error accepting delivery:", error);
    }
  };

  const handleComplete = async (deliveryId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/complete/${deliveryId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchMyDeliveries(userId, token);
      } else {
        alert("Failed to complete delivery.");
      }
    } catch (err) {
      console.error("Error completing delivery:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Delivery Person Dashboard</h2>
      <p className="text-center text-muted">Welcome, {userName}</p>

      {/* 可接的單 */}
      <div className="card p-3 mb-4">
        <h4>Available Deliveries</h4>
        {availableDeliveries.length === 0 ? (
          <p className="text-muted">No available deliveries.</p>
        ) : (
          <ul className="list-group">
            {availableDeliveries.map((delivery) => (
              <li key={delivery.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>Delivery ID: {delivery.id}</span>
                <button className="btn btn-primary btn-sm" onClick={() => handleAccept(delivery.id)}>
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 自己接的單 */}
      <div className="card p-3">
        <h4>My Deliveries</h4>
        {myDeliveries.length === 0 ? (
          <p className="text-muted">No deliveries in progress.</p>
        ) : (
          <ul className="list-group">
            {myDeliveries.map((delivery) => (
              <li key={delivery.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  Delivery ID: {delivery.id} | Status: {delivery.status}
                </span>
                {delivery.status !== "COMPLETED" && (
                  <button className="btn btn-success btn-sm" onClick={() => handleComplete(delivery.id)}>
                    Complete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryPersonDashboard;
