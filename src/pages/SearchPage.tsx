import React from "react";
import { useParams } from "react-router-dom";

// components
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";

// api hook
import { useSearchRestaurants } from "@/api/RestaurantApi";

const SearchPage: React.FC = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  // Обработка состояния загрузки: Если данные еще загружаются, отображается сообщение "Загрузка...".
  if (isLoading) {
    <span>Загрузка...</span>;
  }

  // Обработка отсутствия результатов: Если данные не найдены или параметр city отсутствует, отображается сообщение "Результатов не найдено".
  if (!results?.data || !city) {
    return <span>Результатов не найдено</span>;
  }

  // Отображение результатов поиска: Если данные найдены, отображается информация о результатах поиска с помощью компонента SearchResultInfo.

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisins-list">Вставьте сюда кухни</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
