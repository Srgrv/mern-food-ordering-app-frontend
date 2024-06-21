import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created");
  }

  if (isError) {
    toast.error("Unable to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};
