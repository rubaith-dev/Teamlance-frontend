import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const index = () => {
  return (
    <section className="mt-5 rounded-md overflow-hidden">
      <div className="">
        <TableHeader />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
          return <TableRow key={index} id={index} />;
        })}
      </div>
    </section>
  );
};

export default index;
