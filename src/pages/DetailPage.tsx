import { useGetRestaurant } from "@/api/RestaurantApi";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

//components
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import RestaurantInto from "@/components/RestaurantInto";
import Menu from "@/components/Menu";
import OrderSummary from "@/components/OrderSummary";
import { Card } from "@/components/ui/card";

//types
import { MenuItem } from "@/types";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage: React.FC = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem): void => {
    setCartItems((prevCartItems) => {
      // 1. Поиск существующего элемента в корзине:
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      // 2. Обновление состояния корзины:

      if (existingCartItem) {
        // Если existingCartItem определен (т.е. товар уже есть в корзине), мы используем метод массива map, чтобы создать новый массив updatedCartItems. В этом новом массиве мы проверяем каждый элемент:
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? // Если _id элемента cartItem совпадает с _id товара menuItem, то мы создаем новый объект { ...cartItem, quantity: cartItem.quantity + 1 }, который представляет собой копию текущего элемента с увеличенным на 1 количеством (quantity).
              { ...cartItem, quantity: cartItem.quantity + 1 }
            : // Если _id не совпадает, мы просто добавляем текущий cartItem без изменений в новый массив.
              cartItem
        );
      } else {
        // Если existingCartItem не найден (т.е. товара еще нет в корзине), мы создаем новый массив updatedCartItems, который включает все элементы из prevCartItems, а также добавляем новый объект для menuItem с начальным количеством quantity равным 1.
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // Функция setCartItems, предположительно, используется в контексте хуков React для обновления состояния cartItems. Мы возвращаем updatedCartItems из колбэк-функции, переданной setCartItems. Это обновленное состояние cartItems будет затем использовано для отображения или дальнейшей обработки в вашем приложении.
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItems = prevCartItem.filter(
        (item) => cartItem._id !== item._id
      );

      return updatedCartItems;
    });
  };

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
            <Menu
              key={`${menuItem}_${index}`}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
