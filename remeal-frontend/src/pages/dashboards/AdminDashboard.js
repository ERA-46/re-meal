import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [foodListings, setFoodListings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchFoodListings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchFoodListings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/food-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFoodListings(data);
    } catch (error) {
      console.error("Failed to fetch food listings:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const deleteFoodListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food listing?")) return;
    try {
      await fetch(`http://localhost:8080/api/admin/food-listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoodListings(foodListings.filter((food) => food.id !== id));
    } catch (error) {
      console.error("Failed to delete food listing:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {/* Users Section */}
      <div className="card p-3 mb-4">
        <h4 className="mb-3">Registered Users</h4>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.userType}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Food Listings Section */}
      <div className="card p-3">
        <h4 className="mb-3">Food Listings</h4>
        {foodListings.length === 0 ? (
          <p>No food listings found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Food Type</th>
                <th>Quantity</th>
                <th>Expire Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodListings.map((food) => (
                <tr key={food.id}>
                  <td>{food.storeName}</td>
                  <td>{food.foodType}</td>
                  <td>{food.quantity}</td>
                  <td>{new Date(food.expireTime).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteFoodListing(food.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
