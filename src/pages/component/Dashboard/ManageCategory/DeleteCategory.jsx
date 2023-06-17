import { deleteRequest } from "@/lib/httpMethods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const DeleteCategory = ({ closeModal }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const queryClient = useQueryClient();
  const categoriesOptions = queryClient.getQueryData(["fetch-categories"]);

  // call to action when user click delete category button
  const deleteCategory = async () => {
    const response = await deleteRequest(`/categories/${selectedCategory.value}`);

    toast(response?.message);
    setSelectedCategory(null);
  };

  // After delete update the the categories list
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-categories"] });
      closeModal();
    },
  });

  return (
    <div>
      {/* Section to delete category */}
      <p className="text-gray-500 mt-6 mb-2">Select Category to Delete</p>
      <Select
        options={categoriesOptions}
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
          selectedCategory === null ? "bg-gray-300 text-gray-400" : "bg-primary-700"
        } text-white duration-500`}
        disabled={selectedCategory === null}
        onClick={() => deleteCategoryMutation.mutate()}
      >
        Delete Category
      </button>
    </div>
  );
};

export default DeleteCategory;
