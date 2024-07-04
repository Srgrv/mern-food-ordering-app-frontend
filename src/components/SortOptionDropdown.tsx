import React from "react";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

// types
type TProps = {
  onChange: (value: string) => void;
  sortOption: string;
};

// Определяем опции сортировкb
const SORT_OPTIONS = [
  {
    label: "Популярное",
    value: "bestMatch",
  },
  {
    label: "Цена",
    value: "deliveryPrice",
  },
  {
    label: "Время доставки",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown: React.FC<TProps> = ({ onChange, sortOption }) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="outline" className="w-56">
          Сортировка по: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={`${option.value}${index}`}
            className="cursor-pointer "
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
