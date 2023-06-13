import { Inter } from "next/font/google";
import { Table } from "./component/Homepage";
import { Button, Modal } from "./component/shared";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} h-screen pt-5 px-2`}
    >
      <div className="flex justify-end gap-5">
        <Button title="Add Product" />
        <Button title="Delete" />
        <Modal/>
      </div>

      <Table />
    </main>
  );
}
