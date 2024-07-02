import React from "react";
import { Link } from "react-router-dom";

// icons
import { Banknote, Clock, Dot } from "lucide-react";

// components
import { AspectRatio } from "./ui/aspect-ratio";

// types
import { Restaurant } from "@/types";

type TProps = {
  restaurant: Restaurant;
};

const SearchResultCard: React.FC<TProps> = ({ restaurant }) => {
  return (
    // Ссылка на детальную страницу ресторана: Весь компонент обернут в компонент Link, который перенаправляет пользователя на детальную страницу ресторана по пути /detail/${restaurant._id}.
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      {/* Используется компонент AspectRatio для корректного отображения изображения с соотношением сторон 16:6. Внутри этого компонента отображается изображение ресторана с URL, переданным через restaurant.imageUrl.*/}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        {/*Название ресторана: Название ресторана отображается в элементе h3 с классами для стилизации. При наведении на карточку название подчеркивается. */}
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        {/*Внутри контейнера div используется сетка для разделения информации о типах кухни и данных о доставке. */}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisins.map((item, index) => (
              <span className="flex" key={`${item}${index}`}>
                {/*Типы кухни ресторана отображаются с использованием элемента span для каждого типа кухни. Между элементами типа кухни добавляется иконка Dot, кроме последнего элемента. */}
                <span>{item}</span>
                {index < restaurant.cuisins.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          {/*Данные о доставке включают оценочное время доставки (в минутах) с иконкой Clock и стоимость доставки (в рублях) с иконкой Banknote */}
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} минут
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Доставка от ₽{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
