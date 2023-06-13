import React from "react";

// Table Header contents
const headerContent = [
  "Product Name",
  "Category ID",
  "Category Name",
  "Unit Price",
  "Status",
  "Available Since",
];


// Table Header component
const TableHeader = () => {
  return (
    <div>
      <div className="flex bg-white p-5 justify-between text-gray-600">
        {headerContent.map((header, index) => {
          return (
            <p className="w-full text-center" key={index}>
              {header}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default TableHeader;
