import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import React from "react";
import { useFormContext } from "react-hook-form";

//options
import { cuisineList } from "@/config/restaurant-option-config";

//components
import CuisineCheckBox from "./CuisineCheckBox";

const CoisinesSection: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisins"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem, index) => (
                <CuisineCheckBox
                  key={`${cuisineItem}+${index}`}
                  cuisine={cuisineItem}
                  field={field}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CoisinesSection;
