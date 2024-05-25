import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

//components
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

//types
type TProps = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisins">;
};

//Здесь field.value предполагается быть массивом, так как мы используем метод .includes() для него. Мы проверяем, содержит ли массив field.value значение cuisine.

// Если cuisine присутствует в массиве field.value, то выражение field.value.includes(cuisine) вернет true, и соответственно, компонент Checkbox будет отмечен как выбранный (checked={true}). Если cuisine отсутствует в массиве field.value, выражение вернет false, и Checkbox будет неотмеченным (checked={false}).

const CuisineCheckBox: React.FC<TProps> = ({ cuisine, field }) => {
  //   console.log(field);
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          //   checked={true}
          onCheckedChange={(checked: boolean) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckBox;
