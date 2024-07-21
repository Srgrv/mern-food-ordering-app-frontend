import { useGetRestaurant } from "@/api/RestaurantApi";
import React from "react";
import { useParams } from "react-router-dom";

//components
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import RestaurantInto from "@/components/RestaurantInto";
import Menu from "@/components/Menu";

const DetailPage: React.FC = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading || !restaurant) {
    return "Загрузка...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInto restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <Menu key={`${menuItem}_${index}`} menuItem={menuItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
