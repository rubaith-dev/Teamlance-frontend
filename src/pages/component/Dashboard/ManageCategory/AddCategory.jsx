import { postRequest } from "@/lib/httpMethods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddCategory = ({ closeModal }) => {
  // use hook form to manage adding category form management
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ categoryName: "" });

  

  // call to action when user click add category button
  const addCategory = async ({ categoryName }) => {
    const response = await postRequest("/categories/add-category", {
      name: categoryName,
    });
    reset();
    toast(response?.message);
  };

  // After adding product update the list
  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-categories"] });
      closeModal()
    },
  });

  return (
    <div>
      {/* Form to add category */}
      <form onSubmit={handleSubmit((data) => addCategoryMutation.mutate(data))} noValidate>
        <input
          type="text"
          className="w-full p-2 focus:outline-primary-600 bg-white shadow-lg rounded-md"
          placeholder="Add a Category"
          {...register("categoryName", {
            required: "Category name is required",
          })}
        />
        <p className="text-red-800 mt-2">{errors?.categoryName?.message}</p>
        <button type="submit" className="bg-primary-700 text-white p-2 rounded-md w-full mt-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
