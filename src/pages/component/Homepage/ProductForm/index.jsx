import React, { useEffect, useRef } from "react";
import { Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { useForm } from "react-hook-form";
import SelectInput from "./Select";
import Input from "./Input";
import { X } from "lucide-react";

const categoryOptions = [
  { value: 1, label: "Electronics" },
  { value: 2, label: "Footwear" },
  { value: 3, label: "Gaming" },
];

const statusOptions = [
  { value: "AVAILABLE", label: "Available" },
  { value: "UNAVAILABLE", label: "Unavailable" },
  { value: "DISCONTINUED", label: "Discontinued" },
];

// This is the form to add new product
const ProductForm = () => {
  const [
    { showAddProductModal, showEditProductModal, selectedProduct },
    dispatch,
  ] = useStateProvider();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ selectedProduct });

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (selectedProduct) {
      const { productName, price, category, availability, availableSince } =
        selectedProduct;
      setValue("productName", productName);
      setValue("price", price);
      setValue("category", category);
      setValue("availability", availability);
      setValue("availableSince", availableSince);
    }
  }, [selectedProduct]);

  const closeModal = () => {
    dispatch({
      type: ACTIONS.RESET,
    });
    reset();
  };

  return (
    // Wrapped with Modal wrapper
    <Modal isOpen={showAddProductModal || showEditProductModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-gray-100 p-5 rounded-md shadow-lg flex flex-col gap-5"
        noValidate
      >
        <div className="text-gray-600 text-lg flex justify-between">
          <p className="w-full text-center">
            {showAddProductModal && "Add Product"} 
            {showEditProductModal && "Edit Product"} 
          </p>
          <X className="cursor-pointer" onClick={() => closeModal()} />
        </div>

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

        {/* <input
          {...register("availableSince", { valueAsDate: true })}
          id="availableSince"
          type="date"
        /> */}

        <button
          type="submit"
          className="bg-primary-700 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ProductForm;
