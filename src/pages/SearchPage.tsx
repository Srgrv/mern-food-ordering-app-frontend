import { useSearchRestaurants } from "@/api/RestaurantApi";
import React from "react";
import { useParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const { city } = useParams();
  const { results } = useSearchRestaurants(city);

  return (
    <span>
      Поиск по городу {city}
      <span>
        {results?.data.map((restaurant, index) => (
          <span key={`${restaurant}${index}`}>
            {" "}
            найдено - {restaurant.restaurantName}, {restaurant.city}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
