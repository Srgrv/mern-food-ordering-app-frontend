import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//forms
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CousinsSection from "./CousinsSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

// Этот код использует библиотеку zod для определения схемы данных и валидации значений формы согласно этой схеме. Он помогает обеспечить правильный ввод данных пользователем и предотвращает отправку некорректных данных на сервер.

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city name is required",
    }),
    country: z.string({
      required_error: "country name is required",
    }),
    // метод z.coerce.number используется для преобразования значения в число.
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisins: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    // imageUrl: z.instanceof(File, { message: "image is required" }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

// types

// formSchema - это переменная, которая содержит схему данных, описывающую форму для ресторана. Эта схема определяет, какие поля могут быть в форме и их типы данных.
// typeof formSchema - это TypeScript выражение, которое возвращает тип переменной formSchema
// z.infer - это метод библиотеки Zod, который используется для вывода (инференции) типа на основе переданной схемы данных

// другими словати, мы с помощью библиотеки zod описали схему и определили валидации значений форм согласно этой схеме, далее c помощью z.infer мы можем получить тип автоматически на основании схемы валидации
type RestaurantFormData = z.infer<typeof formSchema>;

type TProps = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm: React.FC<TProps> = ({ onSave, isLoading }) => {
  // useForm<restaurantFormData> - Эта функция useForm используется для создания экземпляра формы. restaurantFormData представляет тип данных, который используется для типизации данных формы. Это позволяет библиотеке лучше управлять типами данных, связанными с формой.
  const form = useForm<RestaurantFormData>({
    // resolver: zodResolver(formSchema) - Это свойство resolver определяет, как будет происходить валидация данных формы. В данном случае, zodResolver используется для создания резолвера, который использует схему данных formSchema, определенную с помощью библиотеки Zod, для валидации данных формы.
    resolver: zodResolver(formSchema),
    // defaultValues - Это свойство определяет значения по умолчанию для полей формы. В данном случае, заданы значения по умолчанию для полей cuisins и menuItems.
    defaultValues: {
      cuisins: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // TODO - convert formDataJson to a new FormData object

    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);

    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisins.forEach((cuisine, index) => {
      formData.append(`cuisins[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    // formData.append(`imageUrl`, formDataJson.imageUrl);

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />

        <CousinsSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
