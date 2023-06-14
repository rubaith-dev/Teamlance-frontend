import { Inter } from "next/font/google";
import { ProductForm, Table } from "./component/Homepage";
import { Button, Modal } from "./component/shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { Plus, Trash } from "lucide-react";
import ManageCategory from "./component/Homepage/ManageCategory";
const inter = Inter({ subsets: ["latin"] });
import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/lib/axiosInstance";

const fetchAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export default function Home() {
  const [{}, dispatch] = useStateProvider();
  const queryClient = useQueryClient();
  const { data: categoryOptions } = useQuery(
    "fetch-categories",
    fetchAllCategories,
    { retry: false }
  );

  queryClient.setQueryData("categories", categoryOptions);

  return (
    <main
      className={`${inter.className} h-screen pt-5 px-2 overflow-hidden relative`}
    >
      <div className="flex gap-5 justify-end">
        {/* Add product Button */}
        <Button
          onClick={() => {
            dispatch({
              type: ACTIONS.TOGGLE_ADD_PRODUCT_MODAL,
              payload: true,
            });
          }}
          className={"p-3 flex gap-1 rounded-md"}
        >
          <Plus className={``} />
          <p>Product</p>
        </Button>

        {/* Manage Category Button */}
        <Button
          className={"p-3 flex gap-1 rounded-md"}
          onClick={() => {
            dispatch({
              type: ACTIONS.TOGGLE_MANAGE_CATEGORY_MODAL,
              payload: true,
            });
          }}
        >
          <p>Manage Category</p>
        </Button>
      </div>

      <Table />
      <ProductForm />
      <ManageCategory />
    </main>
  );
}
