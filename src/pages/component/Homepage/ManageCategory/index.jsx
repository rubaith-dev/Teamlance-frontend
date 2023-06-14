import React, { useState } from "react";
import { Button, Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import { useQueryClient } from "react-query";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import ACTIONS from "@/context/Actions";
import { deleteRequest, postRequest } from "@/lib/httpMethods";

// Manage Category Modal, add and delete category
const ManageCategory = () => {
  // fetch the global state to dispatch actions and get states
  const [{ showManageCategoryModal }, dispatch] = useStateProvider();

  // useQuery client will be used to caching data and handle smooth api calls
  const queryClient = useQueryClient();
  const categoryOptions = queryClient.getQueryData("categories");

  // manage state of selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // use hook form to manage adding category form management
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ categoryName: "" });

  // call to action when user click add category button
  const addCategory = async ({ categoryName }) => {
    // calling reusable post request from httpMethods
    const response = await postRequest("/categories/add-category", {
      name: categoryName,
    });
    // if success show toast
    toast(response?.message);

    // invalidate previous "fetch-categories" query to get updated categories with added category
    queryClient.invalidateQueries("fetch-categories");
  };

  // call to action when user click delete category button
  const deleteCategory = async () => {
    // calling reusable delete request from httpMethods
    const response = await deleteRequest(
      `/categories/${selectedCategory.value}`
    );

    // if success show toast
    toast(response?.message);

    // invalidate previous "fetch-categories" query to get updated categories with deleted category
    queryClient.invalidateQueries("fetch-categories");

    // clear the selected category
    setSelectedCategory(null);
  };

  // call to action to close modal
  const closeModal = () => {
    // dispatch action to reset
    dispatch({
      type: ACTIONS.RESET,
    });

    //reset hook form
    reset();

    // clear selected category
    setSelectedCategory(null);
  };

  return (
    <Modal isOpen={showManageCategoryModal}>
      <div className="w-[450px] rounded-md p-5 bg-gray-100 shadow-2xl">
        {/* title and close button */}
        <div className="flex w-full justify-end mb-3">
          <p className="w-full text-center text-gray-500">Manage Categories</p>
          <X className="cursor-pointer" onClick={() => closeModal()} />
        </div>

        {/* Form to add category */}
        <form onSubmit={handleSubmit(addCategory)} noValidate>
          <input
            type="text"
            className="w-full p-2 focus:outline-primary-600 bg-white shadow-lg rounded-md"
            placeholder="Add a Category"
            {...register("categoryName", {
              required: "Category name is required",
            })}
          />
          <p className="text-red-800 mt-2">{errors?.categoryName?.message}</p>
          <button
            type="submit"
            className="bg-primary-700 text-white p-2 rounded-md w-full mt-2"
          >
            Add
          </button>
        </form>
        
        {/* Section to delete category */}
        <p className="text-gray-500 mt-6 mb-2">Select Category to Delete</p>
        <Select
          options={categoryOptions?.data}
          instanceId={"hello"}
          styles={{
            control: (baseStyle, state) => ({
              ...baseStyle,
              border: state.isFocused ? "2px solid #0369a1" : 0,
              padding: "2px 3px",
              borderRadius: "6px",
              boxShadow: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`,
              "&:hover": {
                border: state.isFocused ? "2px solid #0369a1" : 0,
              },
            }),
          }}
          isClearable
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e)}
        />
        <button
          className={`p-2 rounded-md w-full mt-4 ${
            selectedCategory === null
              ? "bg-gray-300 text-gray-400"
              : "bg-primary-700"
          } text-white duration-500`}
          disabled={selectedCategory === null}
          onClick={() => deleteCategory()}
        >
          Delete Category
        </button>
      </div>
    </Modal>
  );
};

export default ManageCategory;
