import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8080/api/food-listing";

const FoodSupplierDashboard = () => {
  const [foodListings, setFoodListings] = useState([]);
  const [newFood, setNewFood] = useState({
    storeName: "",
    storeAddress: "",
    foodType: "",
    quantity: 1,
    expireTime: "",
  });
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    fetchFoodListings();

  }, []);



  const fetchFoodListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch food listings");
      const data = await response.json();
      setFoodListings(data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateFood = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const userId = userData?.id;

    if (!userId) {
      console.error("User ID is missing. Please log in.");
      alert("User ID is missing. Please log in.");
      return;
    }

    const payload = {
      ...newFood,
      quantity: parseInt(newFood.quantity, 10),
      expireTime: new Date(newFood.expireTime).toISOString(),
      supplier: { id: userId },
    };

    try {
      const url = editingId
        ? `${API_BASE_URL}/update-listing/${editingId}`
        : `${API_BASE_URL}/list-food`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save food listing");
      setNewFood({
        storeName: "",
        storeAddress: "",
        foodType: "",
        quantity: 1,
        expireTime: "",
      });
      setEditingId(null);
      fetchFoodListings();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (food) => {
    setNewFood({
      storeName: food.storeName,
      storeAddress: food.storeAddress,
      foodType: food.foodType,
      quantity: food.quantity,
      expireTime: food.expireTime.slice(0, 16), 
    });
    setEditingId(food.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewFood({
      storeName: "",
      storeAddress: "",
      foodType: "",
      quantity: 1,
      expireTime: "",
    });
  };

  const handleDeleteFood = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/delete-listing/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete food");
      setFoodListings(foodListings.filter((food) => food.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Food Supplier Dashboard</h2>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">{editingId ? "Edit Food" : "Add New Food"}</h4>
        <form onSubmit={handleAddOrUpdateFood}>
          <div className="mb-3">
            <input type="text" name="storeName" className="form-control" placeholder="Store Name" value={newFood.storeName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="storeAddress" className="form-control" placeholder="Store Address" value={newFood.storeAddress} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" name="foodType" className="form-control" placeholder="Food Type" value={newFood.foodType} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" name="quantity" className="form-control" placeholder="Quantity" value={newFood.quantity} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="datetime-local" name="expireTime" className="form-control" value={newFood.expireTime} onChange={handleChange} required />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-100 me-2">
              {editingId ? "Update Food" : "Post Food"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary w-100 ms-2" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3">My Food Listings</h4>
        {foodListings.length === 0 ? (
          <p className="text-muted">No food listings found.</p>
        ) : (
          <ul className="list-group">
            {foodListings.map((food) => (
              <li key={food.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{food.foodType} - {food.quantity} pcs</div>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(food)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteFood(food.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodSupplierDashboard;
