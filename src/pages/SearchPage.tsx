import React from "react";
import { useParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const { city } = useParams();

  return <span>По {city} ничего не найдено</span>;
};

export default SearchPage;
