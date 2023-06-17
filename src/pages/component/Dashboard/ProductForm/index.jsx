import React, { useEffect } from "react";
import Modal from "../../shared/Modal";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRequest, postRequest } from "@/lib/httpMethods";
import { toast } from "react-toastify";
import SelectInput from "./Select";

const statusOptions = [
  { value: "AVAILABLE", label: "AVAILABLE" },
  { value: "UNAVAILABLE", label: "UNAVAILABLE" },
  { value: "DISCONTINUED", label: "DISCONTINUED" },
];

// This is the form to add new product or edit product
const ProductForm = () => {
  const [{ showAddProductModal, showEditProductModal, selectedProduct }, dispatch] = useStateProvider();

  const methods = useForm({ selectedProduct });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    register,
    formState: { errors },
  } = methods;

  const closeModal = () => {
    dispatch({
      type:
        (showAddProductModal && ACTIONS.TOGGLE_ADD_PRODUCT_MODAL) ||
        (showEditProductModal && ACTIONS.TOGGLE_EDIT_PRODUCT_MODAL),
      payload: false,
    });
    reset();
  };

  //Add or Edit Product Handler
  const manageProduct = async (data) => {
    const { productName, category, availability, price } = data;
    const requestData = {
      productName,
      price: parseFloat(price),
      availability: availability.value,
      categoryId: category.value,
    };
    let response = {};

    if (showAddProductModal) {
      response = await postRequest("/products/add-product", requestData);
    }
    if (showEditProductModal) {
      response = await patchRequest(`/products/${selectedProduct.productId}`, requestData);
    }
    closeModal();
    toast(response?.message);
  };

  const manageProductMutation = useMutation({
    mutationFn: (variables) => manageProduct(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-products"] });
      setValue("category", "");
      setValue("availability", "");
    },
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

  const queryClient = useQueryClient();
  const categoriesOptions = queryClient.getQueryData(["fetch-categories"]);

  return (
    // Wrapped with Modal wrapper
    <Modal isOpen={showAddProductModal || showEditProductModal}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => manageProductMutation.mutate(data))}
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

          <input
            className="w-full px-4 py-2 rounded-md shadow-lg focus:outline-primary-700 placeholder:text-gray-500"
            placeholder={"Name"}
            {...register("productName", { required: { value: true, message: "Product name is required" } })}
          />
          <ErrorMessage message={errors?.productName?.message} />

          <input
            className="w-full px-4 py-2 rounded-md shadow-lg focus:outline-primary-700 placeholder:text-gray-500"
            placeholder={"Price"}
            type="number"
            {...register("price", { required: { value: true, message: "Product price is required" } })}
          />
          <ErrorMessage message={errors?.price?.message} />

          <Controller
            control={control}
            name={"category"}
            rules={{ required: `You need to select a category` }}
            render={({ field }) => (
              <SelectInput
                field={field}
                name="category"
                options={categoriesOptions}
                placeholder={"Select a Category"}
              />
            )}
          />
          <ErrorMessage message={errors?.category?.message} />

          <Controller
            control={control}
            name={"availability"}
            rules={{ required: `You need to select an availability` }}
            render={({ field }) => (
              <SelectInput
                field={field}
                name="availability"
                options={statusOptions}
                placeholder={"Select an Availability"}
              />
            )}
          />
          <ErrorMessage message={errors?.availability?.message} />

          <button type="submit" className="bg-primary-700 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

const ErrorMessage = ({ message }) => {
  return message ? <p className="text-sm text-red-700">{message}</p> : null;
};

export default ProductForm;
