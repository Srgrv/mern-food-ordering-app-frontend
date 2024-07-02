import React, { useState } from "react";
import { useParams } from "react-router-dom";

// components
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar, { SearchForm } from "@/components/SearchBar";

// api hook
import { useSearchRestaurants } from "@/api/RestaurantApi";

// Тип SearchState определяет структуру состояния поиска, содержащего единственное свойство searchQuery, которое является строкой
export type SearchState = {
  searchQuery: string;
};

const SearchPage: React.FC = () => {
  const { city } = useParams();

  // Используется useState для управления состоянием searchState, которое содержит строку запроса searchQuery.
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  // Хук useSearchRestaurants теперь использует searchState в качестве одного из своих аргументов. Это позволяет хуку реагировать на изменения поискового запроса и выполнять запрос к API с обновленными данными.
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  // Функция setSearchState вызывается с функцией, которая получает prevState (предыдущее состояние) и возвращает новый объект состояния. Спред-оператор ...prevState используется для сохранения всех предыдущих полей состояния, чтобы не потерять остальные данные.
  const setSearchQuery = (searchFromData: SearchForm) => {
    setSearchState((prevState) => ({
      // Возвращаемый объект содержит все предыдущие поля состояния (...prevState) и обновляет searchQuery значением из searchFromData.searchQuery. Таким образом, функция обновляет только часть состояния, связанную с поисковым запросом.
      ...prevState,
      searchQuery: searchFromData.searchQuery,
    }));
  };

  // Эта функция используется для сброса состояния поискового запроса в пустое значение ("").
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

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
        {/*Добавлен компонент SearchBar и в него переданы свойства */}
        <SearchBar
          onSubmit={setSearchQuery}
          placeHolder="Поиск по кухне или названию ресторана"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
