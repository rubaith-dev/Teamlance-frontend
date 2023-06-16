import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { products } from "./dummyProducts";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/httpMethods";

const fetchAllProducts = async () => {
  const response = await getRequest("/products");
  return response.data;
};

const index = () => {
  const { data: products, isLoading, isError } = useQuery({ queryKey: ["fetch-products"], queryFn: fetchAllProducts });

  return (
    <section className="mt-5 rounded-md max-h-[80vh] overflow-scroll">
      <div className="">
        <TableHeader />
        {products?.map((product, index) => {
          return <TableRow key={index} orderId={index} {...product} isLoading={isLoading} />;
        })}
      </div>
    </section>
  );
};

export default index;
