import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/httpMethods";

const fetchAllProducts = async () => {
  const response = await getRequest("/products");
  return response.data;
};

const Table = () => {
  const { data: products } = useQuery({ queryKey: ["fetch-products"], queryFn: fetchAllProducts });

  return (
    <section className="mt-5 rounded-md h-[85vh]  overflow-scroll">
      <div className="w-full">
        <TableHeader />

        {/* Product List Data */}
        {products.length > 0 ? (
          products?.map((product, index) => {
            return <TableRow key={index} orderId={index} {...product} />;
          })
        ) : (
          <div className="text-gray-600 text-center p-10">
         
            <p>
              You haven't created any product yet !! <br/> please add product first !!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Table;
