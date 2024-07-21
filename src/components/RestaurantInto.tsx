import React from "react";

//components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

//icon
import { Dot } from "lucide-react";

//type
import { Restaurant } from "@/types";

type TProps = {
  restaurant: Restaurant;
};

const RestaurantInto: React.FC<TProps> = ({ restaurant }) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisins.map((item, index) => (
          <span className="flex" key={`${item}_${index}`}>
            <span>{item}</span>
            {index < restaurant.cuisins.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInto;
