import React, { useEffect, useState } from "react";
import SupplierStatsCard from "../components/SupplierStatsCard";


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [foodListings, setFoodListings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchFoodListings();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/admin/users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load users.");
        }
    };

    const fetchFoodListings = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/admin/food-listings");
            const data = await res.json();
            setFoodListings(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load food listings.");
        }
    };

    const deleteUser = async (userId) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                alert("Failed to delete user.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the user.");
        }
    };

    const deleteFoodListing = async (listingId) => {
        const confirm = window.confirm("Are you sure you want to delete this listing?");
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:8080/api/admin/food-listings/${listingId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFoodListings(foodListings.filter(listing => listing.id !== listingId));
            } else {
                alert("Failed to delete listing.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the listing.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            
            <SupplierStatsCard />
            

            {error && <p className="text-danger text-center">{error}</p>}

            <h4 className="mt-5">Registered Users</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.userType}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h4 className="mt-5">Food Listings</h4>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Food Type</th>
                            <th>Quantity</th>
                            <th>Location</th>
                            <th>Prepared</th>
                            <th>Expires</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodListings.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.foodType}</td>
                                <td>{item.quantity}</td>
                                <td>{item.location}</td>
                                <td>{new Date(item.preparedTime).toLocaleString()}</td>
                                <td>{new Date(item.expirationTime).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteFoodListing(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
