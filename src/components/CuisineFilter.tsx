import React, { ChangeEvent } from "react";

// Массив кухонь
import { cuisineList } from "@/config/restaurant-option-config";

// components
import { Label } from "./ui/label";
import { Button } from "./ui/button";

// icons
import { Check, ChevronDown, ChevronUp } from "lucide-react";

// types
type TProps = {
  onChange: (cuisins: string[]) => void;
  selectedCuisins: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter: React.FC<TProps> = ({
  onChange,
  selectedCuisins,
  isExpanded,
  onExpandedClick,
}) => {
  // Обработчик изменения состояния кухонь
  const handleCuinsinChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Получаем значение и статус (выбран/не выбран) элемента.
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    // создает новый список кухонь (newCuisinsList), добавляя или удаляя выбранную кухню в зависимости от isChecked.
    const newCuisinsList = isChecked
      ? [...selectedCuisins, clickedCuisine]
      : selectedCuisins.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinsList);
  };

  // Обработчик сброса фильтра:
  const handleCuisinsReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Фильтрация по кухне</div>
        <div
          onClick={handleCuisinsReset}
          className="text-sm font-semibold mb-2 underline  cursor-pointer text-blue-500"
        >
          Сбросить фильтр
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          // Если isExpanded истинно, отображаем все кухни, иначе только первые 7.
          // возвращает новый массив, содержащий элементы от начального до конечного индекса
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const isSelected = selectedCuisins.includes(cuisine);
            return (
              <div className="flex" key={`cuisine_${index}`}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuinsinChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              Показать меньше <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              Показать больше <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
