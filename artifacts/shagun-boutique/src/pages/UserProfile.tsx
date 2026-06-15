import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

// Drop these inside your component
const [orderHistory, setOrderHistory] = useState<any[]>([]);
const [isLoadingOrders, setIsLoadingOrders] = useState(true);

useEffect(() => {
  const fetchMyOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      if (response.success) {
        setOrderHistory(response.orders || []);
      }
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Only fetch if the user is logged in (token exists)
  if (localStorage.getItem('token')) {
    fetchMyOrders();
  } else {
    setIsLoadingOrders(false);
  }
}, []);