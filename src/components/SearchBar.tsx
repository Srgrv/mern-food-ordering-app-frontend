import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// components
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

//icons
import { Search } from "lucide-react";

// Схема формы определяет одно поле, searchQuery, которое является строкой и имеет сообщение об ошибке валидации, если это поле не заполнено.
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Название ресторана обязательно",
  }),
});

// используется типизация для формы, которая создается на основе схемы formSchema.
export type SearchForm = z.infer<typeof formSchema>;

// Компонент принимает три пропса:
//onSubmit: функция, которая вызывается при отправке формы.
// placeHolder: строка, используемая как текст подсказки в поле ввода.
// onReset (необязательный): функция, которая вызывается при сбросе формы.
type TProps = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar: React.FC<TProps> = ({ onSubmit, placeHolder, onReset }) => {
  // useForm используется для управления состоянием формы и валидацией.
  // zodResolver связывает схему zod с react-hook-form.
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  // handleReset сбрасывает поле ввода searchQuery и вызывает функцию onReset, если она передана в пропсах.
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    // Компонент Form используется для оборачивания формы и передачи необходимых свойств из useForm.
    <Form {...form}>
      <form
        // В форме обрабатывается отправка через form.handleSubmit(onSubmit).
        onSubmit={form.handleSubmit(onSubmit)}
        // Если валидация не пройдена, применяется класс border-red-500.
        className={`flex items-center flex-1  gap-1 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  // Поле ввода Input используется для ввода поискового запроса с текстом подсказки placeHolder.
                  {...field}
                  placeholder={placeHolder}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            Очистить
          </Button>
        )}
        <Button type="submit" className="rounded-full bg-orange-500">
          Поиск
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
