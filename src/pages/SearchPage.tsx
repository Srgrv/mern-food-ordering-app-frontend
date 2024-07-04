import React, { useState } from "react";
import { useParams } from "react-router-dom";

// components
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";

// api hook
import { useSearchRestaurants } from "@/api/RestaurantApi";
import SortOptionDropdown from "@/components/SortOptionDropdown";

// Тип SearchState определяет структуру состояния поиска, содержащего единственное свойство searchQuery, которое является строкой
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisins: string[];
  sortOption: string;
};

const SearchPage: React.FC = () => {
  const { city } = useParams();

  // Используется useState для управления состоянием searchState, которое содержит строку запроса searchQuery.
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisins: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  // Хук useSearchRestaurants теперь использует searchState в качестве одного из своих аргументов. Это позволяет хуку реагировать на изменения поискового запроса и выполнять запрос к API с обновленными данными.
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSelectedCuisins = (selected: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisins: selected,
      page: 1,
    }));
  };

  // Функция для изменения номера текущей страницы в состоянии поиска
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Функция setSearchState вызывается с функцией, которая получает prevState (предыдущее состояние) и возвращает новый объект состояния. Спред-оператор ...prevState используется для сохранения всех предыдущих полей состояния, чтобы не потерять остальные данные.
  const setSearchQuery = (searchFromData: SearchForm) => {
    setSearchState((prevState) => ({
      // Возвращаемый объект содержит все предыдущие поля состояния (...prevState) и обновляет searchQuery значением из searchFromData.searchQuery. Таким образом, функция обновляет только часть состояния, связанную с поисковым запросом.
      ...prevState,
      searchQuery: searchFromData.searchQuery,
      page: 1,
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
      <div id="cuisins-list">
        <CuisineFilter
          selectedCuisins={searchState.selectedCuisins}
          onChange={setSelectedCuisins}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/*Добавлен компонент SearchBar и в него переданы свойства */}
        <SearchBar
          onSubmit={setSearchQuery}
          placeHolder="Поиск по кухне или названию ресторана"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, index) => (
          <SearchResultCard
            restaurant={restaurant}
            key={`${restaurant}${index}`}
          />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
