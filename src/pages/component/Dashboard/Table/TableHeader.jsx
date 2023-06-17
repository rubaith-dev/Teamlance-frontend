import ACTIONS from "@/context/Actions";
import { useStateProvider } from "@/context/StateContext";
import { useQueryClient } from "@tanstack/react-query";
import Checkbox from "rc-checkbox";
import React from "react";

// Table Header contents
const headerContent = ["Product Name", "Category ID", "Category Name", "Unit Price", "Status", "Available Since"];

// Table Header component
const TableHeader = () => {
  const queryClient = useQueryClient();
  const products = queryClient.getQueryData(["fetch-products"]);
  const [{ selectedDeleteProductsId }, dispatch] = useStateProvider();

  const allProductsId = products?.map((product) => {
    const { id, ...rest } = product;
    return id;
  });

  const isAllSelected = selectedDeleteProductsId.size === allProductsId?.length;

  return (
    <section>
      <div className="flex border-b-2 border-primary-700 ">
        <div className={`w-12 grid place-items-center bg-white`}>
          <Checkbox
            className=""
            onClick={() =>
              isAllSelected
                ? dispatch({ type: ACTIONS.CLEAR_SELECTED_PRODUCTS })
                : dispatch({ type: ACTIONS.SELECT_ALL_PRODUCTS_ID, payload: allProductsId })
            }
            checked={isAllSelected && products?.length > 0}
          />
        </div>

        <div className="p-4 flex bg-white justify-between text-gray-600 w-full">
          {headerContent.map((header, index) => {
            return (
              <p className="w-full text-center" key={index}>
                {header}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TableHeader;
