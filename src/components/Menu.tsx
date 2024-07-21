import React from "react";

//type
import { MenuItem } from "@/types";

//components
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TProps = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const Menu: React.FC<TProps> = ({ menuItem, addToCart }) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default Menu;
