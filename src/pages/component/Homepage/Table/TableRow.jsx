import React from "react";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableRow = ({ id }) => {
  let isIdODD = (id + 1) % 2 === 0;
  return (
    <div className="">
      {/* <Skeleton
        className="p-5"
        baseColor={`${isIdODD ? "#d1d5db" : ""}`}
        highlightColor={`${isIdODD ? "#e5e7eb" : ""}`}
      /> */}
      <div
        className={`flex p-4 justify-between ${
          isIdODD ? "bg-white" : "bg-gray-100"
        }`}
      >
        <p className={styles.table_row}>Baking Pan</p>
        <p className={styles.table_row}>3</p>
        <p className={styles.table_row}>Kitchen</p>
        <p className={styles.table_row}>$10.99</p>
        <p className={styles.table_row}>Available</p>
        <p className={styles.table_row}>07/11/2016</p>
      </div>
    </div>
  );
};

export default TableRow;
