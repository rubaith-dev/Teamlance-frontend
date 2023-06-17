import React from "react";
import styles from "./styles.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import ACTIONS from "@/context/Actions";
import { useStateProvider } from "@/context/StateContext";
import Checkbox from "rc-checkbox";

// Reusable component for table

const TableRow = ({ orderId, name, price, category, availability, createdAt, id: productId }) => {
  let isIdODD = (orderId + 1) % 2 === 0;
  const [{ selectedDeleteProductsId }, dispatch] = useStateProvider();
  const isSelectedForDelete = selectedDeleteProductsId.has(productId);

  const handleSelectProduct = () => {
    dispatch({
      type: ACTIONS.SET_SELECTED_PRODUCTED,
      payload: {
        productName: name,
        price,
        category,
        availability,
        createdAt,
        productId,
      },
    });
  };

  return (
    <div className="">
      <section className="flex">
        <div className={`w-12 grid place-items-center cursor-pointer ${isIdODD ? "bg-white " : "bg-gray-100"}`}>
          <Checkbox
            onClick={() => dispatch({ type: ACTIONS.SET_DELETED_PRODUCT_ID, payload: productId })}
            checked={isSelectedForDelete}
          />
        </div>

        <div
          className={`flex p-4 justify-between cursor-pointer  hover:bg-primary-600 hover:text-white flex-grow duration-300 ${
            isIdODD ? "bg-white" : " bg-gray-100"
          }  ${isSelectedForDelete ? "!bg-primary-200 !text-gray-600" : ""} `}
          onClick={handleSelectProduct}
        >
          <p className={styles.table_row}>{name}</p>
          <p className={styles.table_row}>{category?.value}</p>
          <p className={styles.table_row}>{category?.label}</p>
          <p className={styles.table_row}>${price}</p>
          <p className={styles.table_row}>{availability?.label}</p>
          <p className={styles.table_row}>{createdAt?.split("T")[0]}</p>
        </div>
      </section>
    </div>
  );
};

export default TableRow;
