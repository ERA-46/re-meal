import React, { useEffect, useState } from "react";

const SupplierStatsCard = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/admin/supplier/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                } else {
                    throw new Error("Failed to load stats.");
                }
            } catch (err) {
                setError("Could not fetch supplier stats.");
                console.error(err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="card mb-4">
            <div className="card-header">Supplier Statistics</div>
            <div className="card-body">
                {error && <p className="text-danger">{error}</p>}
                {stats.length === 0 ? (
                    <p>No supplier data available.</p>
                ) : (
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Total Quantity Listed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.supplier}</td>
                                    <td>{row.totalQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SupplierStatsCard;
