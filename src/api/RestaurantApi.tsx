import { useQuery } from "react-query";

// types
import { RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/SearchPage";

// contants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    // Метод join(",") объединяет все элементы массива в одну строку, разделяя их запятыми.
    // Например, если searchState.selectedCuisins равен ["Italian", "Chinese", "Mexican"], результат будет "Italian,Chinese,Mexican".
    params.set("selectedCuisins", searchState.selectedCuisins.join(","));

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Ошибка при получении ресторана");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
