import { Inter } from "next/font/google";
import { Table } from "./component/Homepage";
import { Button, Modal } from "./component/shared";
import { useStateProvider } from "@/context/StateContext";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, dispatch] = useStateProvider();

  console.log(state);

  return (
    
      <main className={`${inter.className} h-screen pt-5 px-2`}>
        <div className="flex justify-end gap-5">
          <Button title="Add Product"/>
          <Button title="Delete" />
          <Modal />
        </div>

        <Table />
      </main>

  );
}
