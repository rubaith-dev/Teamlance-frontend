import { Inter } from "next/font/google";
import { ProductForm, Table, ManageCategory } from "./component/Homepage";
import { Button } from "./component/shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { CircleDollarSign, Plus, Trash } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });
import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceSSR from "@/lib/axiosInstanceSSR";
import { destroyCookie } from "nookies";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

const dashboard = (props) => {
  const [{}, dispatch] = useStateProvider();

  useQuery({ queryKey: ["fetch-categories"], queryFn: fetchAllCategories, initialData: props.data.categoriesOptions });

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
    console.log(error);
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
