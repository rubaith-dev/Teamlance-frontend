import { Inter } from "next/font/google";
import { AddProductForm, Table } from "./component/Homepage";
import { Button, Modal } from "./component/shared";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { Plus } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [{ showAddProductModal }, dispatch] = useStateProvider();

  return (
    <main
      className={`${inter.className} h-screen pt-5 px-2 overflow-hidden relative`}
    >
      <div className="flex gap-5 justify-end">
        <Button
          onClick={() => {
            dispatch({
              type: ACTIONS.TOGGLE_ADD_PRODUCT_MODAL,
              payload: !showAddProductModal,
            });
          }}
          className={"p-3 flex gap-1 rounded-md"}
        >
          <Plus className={``} />
          <p>Product</p>
        </Button>
        {/* <Button title="Delete" /> */}
        <AddProductForm/>
      </div>

      <Table />
    </main>
  );
}
