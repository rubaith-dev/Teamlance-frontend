import Modal from "../../shared/Modal";
import { useStateProvider } from "@/context/StateContext";
import { X } from "lucide-react";
import ACTIONS from "@/context/Actions";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

// Manage Category Modal, add and delete category
const ManageCategory = () => {
  const [{ showManageCategoryModal }, dispatch] = useStateProvider();

  // call to action to close modal
  const closeModal = () => {
    dispatch({
      type: ACTIONS.TOGGLE_MANAGE_CATEGORY_MODAL,
      payload: false,
    });
  };

  return (
    <Modal isOpen={showManageCategoryModal}>
      <div className="w-[450px] rounded-md p-5 bg-gray-100 shadow-2xl">
        {/* title and close button */}
        <div className="flex w-full justify-end mb-3">
          <p className="w-full text-center text-gray-500 text-xl">Manage Categories</p>

          <X className="cursor-pointer" onClick={() => closeModal()} />
        </div>

        <AddCategory closeModal={closeModal} />
        <DeleteCategory closeModal={closeModal} />
        <div className="bg-red-200 text-sm text-gray-500 mt-4 p-2 rounded-md">
          <p className="mb-1">** Keep in mind that category is not private to you **</p>
          <p className="">*** People can see your created category too !! ***</p>
        </div>
      </div>
    </Modal>
  );
};

export default ManageCategory;
