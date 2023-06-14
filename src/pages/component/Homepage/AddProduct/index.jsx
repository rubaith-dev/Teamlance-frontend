import React from "react";
import { Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { useForm, Controller } from "react-hook-form";
import SelectInput from "./Select";
import Select from "react-select";
import Input from "./Input";

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
];

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
  { value: "discontinued", label: "Discontinued" },
];

// This is the form to add new product
const AddProductForm = () => {
  const [{ showAddProductModal }, dispatch] = useStateProvider();
  //Using react hook form
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      price: "",
      category: "",
      availability: "",
      availableSince: new Date(),
    },
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    // Wrapped with Modal wrapper
    <Modal isOpen={showAddProductModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-gray-100 p-5 rounded-md shadow-lg flex flex-col gap-5"
        noValidate
      >
        <Input
          register={register}
          name="productName"
          placeholder="Product Name"
          errorMessage={errors?.productName?.message}
        />

        <Input
          register={register}
          name="price"
          placeholder="Price"
          type="number"
          errorMessage={errors?.price?.message}
        />

        <SelectInput
          control={control}
          name="category"
          options={categoryOptions}
          placeholder={"Select Category"}
          errorMessage={errors?.category?.message}
        />

        <SelectInput
          control={control}
          name="availability"
          options={statusOptions}
          placeholder={"Select Availability"}
          errorMessage={errors?.availability?.message}
        />

        <input
          {...register("availableSince", { valueAsDate: true })}
          id="availableSince"
          type="date"
        />

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default AddProductForm;
