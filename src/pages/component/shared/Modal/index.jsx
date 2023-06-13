import { useStateProvider } from "@/context/StateContext";

function index({ isOpen, dispatchId, children }) {
  const [state, dispatch] = useStateProvider();
  return (
    <section
      className={`${
        isOpen ? "opacity-100 z-50 bg-black bg-opacity-20" : "opacity-0 -z-50"
      } absolute top-0 left-0 w-full h-full p-2 duration-500 grid place-items-center`}
    >
      {children}
    </section>
  );
}

export default index;
