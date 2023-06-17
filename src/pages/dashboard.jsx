import { Inter } from "next/font/google";
import Button from "./component/shared/Button";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { Plus, Trash } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });
import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceSSR from "@/lib/axiosInstanceSSR";
import { destroyCookie } from "nookies";
import { QueryClient, dehydrate, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest } from "@/lib/httpMethods";
import { toast } from "react-toastify";
import Table from "./component/Dashboard/Table";
import ManageCategory from "./component/Dashboard/ManageCategory";
import ProductForm from "./component/Dashboard/ProductModifyForm";
import checkAuthSSR from "@/lib/checkAuthSSR";

const fetchAllCategories = async () => {
  const response = await getRequest("/categories");
  return response.data;
};

const dashboard = () => {
  const [{ selectedDeleteProductsId }, dispatch] = useStateProvider();
  useQuery({ queryKey: ["fetch-categories"], queryFn: fetchAllCategories });

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

  const authenticated = await checkAuthSSR(token);
  if (!authenticated) {
    destroyCookie({ res }, "access-token");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["fetch-categories"],
    queryFn: () => fetchSSR(token, "/categories"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["fetch-products"],
    queryFn: () => fetchSSR(token, "/products"),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      authenticated,
    },
  };
}

const fetchSSR = async (token, url) => {
  try {
    const res = await axiosInstanceSSR.get(url, {
      headers: { Cookie: `access-token=${token}` },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};



export default dashboard;
