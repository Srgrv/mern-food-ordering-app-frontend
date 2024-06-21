import React from "react";

//api
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";

//components
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage: React.FC = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  return (
    <div>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={createRestaurant}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ManageRestaurantPage;
