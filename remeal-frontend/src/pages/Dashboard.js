import React, { useState, useEffect } from "react";
import FoodSupplierDashboard from "./dashboards/FoodSupplierDashboard";
import DeliveryPersonDashboard from "./dashboards/DeliveryPersonDashboard";
import FoodRequesterDashboard from "./dashboards/FoodRequesterDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user"); 
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);
    

    if (!user) return <p>No Data...</p>;

    switch (user.userType) {
        case "FOOD_SUPPLIER":
            return <FoodSupplierDashboard />;
        case "DELIVERY_PERSON":
            return <DeliveryPersonDashboard />;
        case "FOOD_REQUESTER":
            return <FoodRequesterDashboard />;
        case "ADMIN":
            return <AdminDashboard />;
        default:
            return <p>Unknown user type</p>;
    }
};



export default Dashboard;
