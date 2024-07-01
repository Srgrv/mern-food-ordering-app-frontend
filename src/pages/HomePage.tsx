import React from "react";
import { useNavigate } from "react-router-dom";

//images
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

// components and types
import SearchBar, { SearchForm } from "@/components/SearchBar";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Эта функция принимает данные формы (searchFormValues), которые автоматически передаются из компонента SearchBar при отправке формы. Она использует navigate для перенаправления пользователя на страницу поиска с указанным поисковым запросом.
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    //  Навигация к новому URL
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-500">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Поиск по городу"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tight">
            Order takeway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
