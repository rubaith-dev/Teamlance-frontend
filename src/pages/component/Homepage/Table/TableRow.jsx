import React from "react";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ACTIONS from "@/context/Actions";
import { useStateProvider } from "@/context/StateContext";
import { ProductForm } from "..";

const TableRow = ({
  id,
  productName,
  price,
  category,
  availability,
  availableSince,
}) => {
  let isIdODD = (id + 1) % 2 === 0;
  const [{ showAddProductModal }, dispatch] = useStateProvider();
  return (
    <div className="">
      {/* <Skeleton
        className="p-5"
        baseColor={`${isIdODD ? "#d1d5db" : ""}`}
        highlightColor={`${isIdODD ? "#e5e7eb" : ""}`}
      /> */}
      <div
        className={`flex p-4 justify-between cursor-pointer  ${
          isIdODD ? "bg-white " : "bg-gray-100"
        } hover:bg-primary-200`}
        onClick={() => {
          dispatch({
            type: ACTIONS.SET_SELECTED_PRODUCTED,
            payload: {
              productName,
              price,
              category,
              availability,
              availableSince,
            },
          });
        }}
      >
        <p className={styles.table_row}>{productName}</p>
        <p className={styles.table_row}>{category?.value}</p>
        <p className={styles.table_row}>{category?.label}</p>
        <p className={styles.table_row}>${price}</p>
        <p className={styles.table_row}>{availability?.label}</p>
        <p className={styles.table_row}>{availableSince}</p>
      </div>
    </div>
  );
};

export default TableRow;
