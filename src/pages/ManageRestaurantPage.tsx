import React from "react";

//api
import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";

//components
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage: React.FC = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();

  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    </div>
  );
};

export default ManageRestaurantPage;
