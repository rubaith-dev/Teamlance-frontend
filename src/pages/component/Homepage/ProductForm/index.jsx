import React, { useEffect } from "react";
import { Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { useForm } from "react-hook-form";
import SelectInput from "./Select";
import Input from "./Input";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "@/lib/httpMethods";

const statusOptions = [
  { value: "AVAILABLE", label: "Available" },
  { value: "UNAVAILABLE", label: "Unavailable" },
  { value: "DISCONTINUED", label: "Discontinued" },
];

// This is the form to add new product or edit product
const ProductForm = () => {
  const [{ showAddProductModal, showEditProductModal, selectedProduct }, dispatch] = useStateProvider();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ selectedProduct });

  //Add Product Handler
  const addProduct = async (data) => {
    const { productName, category, availability, price } = data;
    const requestData = {
      productName,
      price,
      availability: availability.value,
      categoryId: category.value,
    };

    await postRequest("/products/add-product", requestData);
  };

  const addProductMutation = useMutation({
    mutationFn: (variables) => addProduct(variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fetch-products"] }),
  });

  useEffect(() => {
    if (selectedProduct) {
      const { productName, price, category, availability, availableSince } = selectedProduct;
      setValue("productName", productName);
      setValue("price", price);
      setValue("category", category);
      setValue("availability", availability);
      setValue("availableSince", availableSince);
    }
  }, [selectedProduct]);

  // Fetch All the category

  const closeModal = () => {
    dispatch({
      type:
        (showAddProductModal && ACTIONS.TOGGLE_ADD_PRODUCT_MODAL) ||
        (showEditProductModal && ACTIONS.TOGGLE_EDIT_PRODUCT_MODAL),
      payload: false,
    });
    reset();
  };

  const queryClient = useQueryClient();
  const { data: categoryOptions } = queryClient.getQueryData(["fetch-categories"]);

  return (
    // Wrapped with Modal wrapper
    <Modal isOpen={showAddProductModal || showEditProductModal}>
      <form
        onSubmit={handleSubmit((data) => addProductMutation.mutate(data))}
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

        <button type="submit" className="bg-primary-700 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ProductForm;
