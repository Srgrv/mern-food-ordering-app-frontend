import React from "react";
import { Link } from "react-router-dom";
import plural from "plural-ru";

//types
type TProps = {
  total: number;
  city: string;
};

// Функция для выбора правильного окончания глагола: getCorrectEnding: Эта функция принимает число и возвращает правильную форму глагола "найден" в зависимости от числа (найден, найдена, найдено).
const getCorrectEnding = (count: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["найден", "найдена", "найдено"];
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];
};

const SearchResultInfo: React.FC<TProps> = ({ total, city }) => {
  const correctFormOfRestaurant = plural(
    total,
    "ресторан",
    "ресторана",
    "ресторанов"
  );

  return (
    <div className="text-xl font-bold flex  flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} {correctFormOfRestaurant} {getCorrectEnding(total)} в {city}
        <br />
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Изменить местоположение
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
