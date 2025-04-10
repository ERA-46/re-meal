import React, { useEffect, useState } from "react";

const MyRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    const userData = JSON.parse(localStorage.getItem("data"));
    const requesterId = userData?.id;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/food-requests/requester/${requesterId}`);
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                } else {
                    setError("Failed to fetch requests.");
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong.");
            }
        };

        if (requesterId) {
            fetchRequests();
        }
    }, [requesterId]);

    const handleCancel = async (id) => {
        const confirm = window.confirm("Are you sure you want to cancel this request?");
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:8080/api/food-requests/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setRequests(requests.filter((r) => r.id !== id));
            } else {
                alert("Failed to cancel request.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while cancelling.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">My Food Requests</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {requests.length === 0 ? (
                <p className="text-center">No food requests found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Timestamp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.foodType}</td>
                                    <td>{req.quantity}</td>
                                    <td>{req.status}</td>
                                    <td>{new Date(req.timestamp).toLocaleString()}</td>
                                    <td>
                                        {req.status === "PENDING" && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleCancel(req.id)}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;
