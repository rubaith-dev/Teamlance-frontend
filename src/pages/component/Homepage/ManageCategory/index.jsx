import React, { useState } from "react";
import { Button, Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import { useQueryClient } from "react-query";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import ACTIONS from "@/context/Actions";

// Manage Category Modal, add and delete category
const ManageCategory = () => {
  const [{ showManageCategoryModal }, dispatch] = useStateProvider();
  const queryClient = useQueryClient();
  const categoryOptions = queryClient.getQueryData("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ categoryName: "" });

  const addCategory = async ({ categoryName }) => {
    try {
      const response = await axiosInstance.post("/categories/add-category", {
        name: categoryName,
      });
      toast(response.data.message);
      queryClient.invalidateQueries("fetch-categories");
      reset();
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await axiosInstance.delete(
        `/categories/${selectedCategory.value}`
      );
      toast(response.data.message);
      queryClient.invalidateQueries("fetch-categories");
      setSelectedCategory(null);
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  const closeModal = () => {
    dispatch({
      type: ACTIONS.RESET,
    });
    reset();
  };

  return (
    <Modal isOpen={showManageCategoryModal}>
      <div className="w-[450px] rounded-md p-5 bg-gray-100 shadow-2xl">
        <div className="flex w-full justify-end mb-3">
            <p className="w-full text-center text-gray-500">Manage Categories</p>
          <X className="cursor-pointer" onClick={() => closeModal()} />
        </div>

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
