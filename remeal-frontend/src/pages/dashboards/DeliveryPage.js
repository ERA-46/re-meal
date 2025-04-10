import React, { useEffect, useState } from "react";

const DeliveryPage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        
        fetch("http://localhost:8080/api/deliveries/available")
            .then((res) => res.json())
            .then((data) => setDeliveries(data))
            .catch((err) => console.error("Error fetching deliveries:", err));

        
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const acceptDelivery = async (deliveryId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/deliveries/accept/${deliveryId}?deliveryPersonId=${userId}`,
                {
                    method: "POST",
                }
            );
            if (response.ok) {
                alert("Delivery accepted!");
                setDeliveries(deliveries.filter(d => d.id !== deliveryId));
            } else {
                alert("Failed to accept delivery.");
            }
        } catch (error) {
            console.error("Error accepting delivery:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Available Deliveries</h2>
            {deliveries.length === 0 ? (
                <p className="text-center">No deliveries available at the moment.</p>
            ) : (
                <div className="list-group">
                    {deliveries.map((delivery) => (
                        <div key={delivery.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Delivery ID:</strong> {delivery.id}<br />
                                <strong>Status:</strong> {delivery.status}<br />
                                <strong>Timestamp:</strong> {delivery.timeStamp}
                            </div>
                            <button
                                className="btn btn-success"
                                onClick={() => acceptDelivery(delivery.id)}
                            >
                                Accept
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryPage;
