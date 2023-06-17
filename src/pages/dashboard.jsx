import { Inter } from "next/font/google";
import Button from "./component/shared/Button";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { Plus, Trash } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });
import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceSSR from "@/lib/axiosInstanceSSR";
import { destroyCookie } from "nookies";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/lib/httpMethods";
import { toast } from "react-toastify";
import Table from "./component/Dashboard/Table";
import ManageCategory from "./component/Dashboard/ManageCategory";
import ProductForm from "./component/Dashboard/ProductForm";

const fetchAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

const dashboard = (props) => {
  const [{ selectedDeleteProductsId }, dispatch] = useStateProvider();

  useQuery({ queryKey: ["fetch-categories"], queryFn: fetchAllCategories, initialData: props.data.categoriesOptions });

  const handleDelete = async () => {
    const selectedIds = Array.from(selectedDeleteProductsId);
    let stringIds = selectedIds.join(",");

    if (selectedIds.length > 0) {
      const response = await deleteRequest(`/products?productIds=${stringIds}`);
      toast(response?.message);
    }
  };

  const queryClient = useQueryClient();

  const deleteProductsMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: (res) => {
      dispatch({ type: ACTIONS.CLEAR_SELECTED_PRODUCTS });
      queryClient.invalidateQueries({ queryKey: ["fetch-products"] });
    },
  });

  return (
    <main className={`${inter.className} h-screen pt-5 px-2 relative`}>
      <div className="flex gap-5 justify-between">
        {/* delete Button */}
        <button
          className={`p-3 flex gap-1 rounded-md ${
            selectedDeleteProductsId.size > 0 ? "bg-primary-700 text-white cursor-pointer" : "bg-gray-100 text-gray-400"
          }`}
          disabled={false}
          onClick={() => deleteProductsMutation.mutate()}
        >
          <Trash /> {`Products (${selectedDeleteProductsId.size})`}
        </button>
        <div className="flex gap-5">
          {" "}
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
            Product
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
            Manage Category
          </Button>
        </div>
      </div>
      <Table />
      <ProductForm />
      <ManageCategory />
    </main>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies["access-token"];
  let clientData = {};

  if (!token) {
    // If the authentication cookie is not found, redirect to the homepage
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    const res = await axiosInstanceSSR.get("/auth/isAuthenticated", {
      headers: { Cookie: `access-token=${token}` },
    });
  } catch (error) {
    destroyCookie({ res }, "access-token");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const res = await axiosInstanceSSR.get("/categories", {
      headers: { Cookie: `access-token=${token}` },
    });

    clientData["categoriesOptions"] = res.data.data;
  } catch (error) {
    destroyCookie({ res }, "access-token");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: { ...clientData },
    },
  };
}

export default dashboard;
