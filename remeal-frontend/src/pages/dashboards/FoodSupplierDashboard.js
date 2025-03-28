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

  useEffect(() => {
    fetchFoodListings();

  }, []);



  const fetchFoodListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
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

  const handleAddFood = async (e) => {
    e.preventDefault();

    
    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const userId = userData?.id;

    if (!userId) {
      console.error("User ID is missing. Please log in.");
      alert("User ID is missing. Please log in.");
      return;
    }

    const payload = {
      storeName: newFood.storeName,
      storeAddress: newFood.storeAddress,
      foodType: newFood.foodType,
      quantity: parseInt(newFood.quantity, 10),
      expireTime: new Date(newFood.expireTime).toISOString(),
      supplier: { id: userId },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/list-food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add food");
      fetchFoodListings();
    } catch (error) {
      console.error("Error: Failed to add food", error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`${API_BASE_URL}/delete-listing/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
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
        <h4 className="mb-3">Add New Food</h4>
        <form onSubmit={handleAddFood}>
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
          <button type="submit" className="btn btn-primary w-100">
            Post Food
          </button>
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
                {food.foodType} - {food.quantity} pcs
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFood(food.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodSupplierDashboard;
