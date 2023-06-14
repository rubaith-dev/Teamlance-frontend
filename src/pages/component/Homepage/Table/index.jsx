import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { products } from "./dummyProducts";

const index = () => {
  return (
    <section className="mt-5 rounded-md overflow-hidden">
      <div className="">
        <TableHeader />
        {products.map((product, index) => {
          return <TableRow key={index} id={index} {...product} />;
        })}
      </div>
    </section>
  );
};

export default index;
