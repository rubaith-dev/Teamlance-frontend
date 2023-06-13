import React from "react";
import { Modal } from "../../shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";

const AddProductForm = () => {
  const [{ showAddProductModal }, dispatch] = useStateProvider();
  return (
    <Modal isOpen={showAddProductModal}>
      <div
        className="bg-gray-100 border rounded-lg w-96 h-96 p-3 flex flex-col gap-3 shadow-2xl"
        // onClick={() =>
        //   dispatch({ type: ACTIONS.TOGGLE_ADD_PRODUCT_MODAL, payload: false })
        // }
      >
        <input className="w-full px-4 py-2 rounded-md shadow-md focus:outline-primary-700" placeholder="Product Name"/>
        <input className="w-full px-4 py-2 rounded-md shadow-md" placeholder="Unit Price" type="number"/>
      </div>
    </Modal>
  );
};

export default AddProductForm;
