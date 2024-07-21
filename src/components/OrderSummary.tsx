import React from "react";

//icons
import { Trash } from "lucide-react";

//types
import { Restaurant } from "@/types";
import { CartItem } from "@/pages/DetailPage";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type TProps = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary: React.FC<TProps> = ({
  restaurant,
  cartItems,
  removeFromCart,
}) => {
  // Функция для вычисления общей стоимости заказа
  const getTotalCost = () => {
    // Суммирование стоимости всех позиций в корзине
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    // Добавление стоимости доставки ресторана к общей сумме
    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    // Возвращение общей стоимости в долларах с двумя знаками после запятой
    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight flex justify-between">
          <span>Твой заказ</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={`${item}_${index}`}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Доставка</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
