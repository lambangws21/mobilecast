import { ToastContainer } from "react-toastify";
import MobileView from "@/components/mobile/Dashboard";

export default function Home() {
  return (
    <div className="mt-10 w-full font-[family-name:var(--font-geist-sans)]">
      <main className="flex min-h-screen items-center justify-center">
        <ToastContainer />
        <MobileView />
      </main>
    </div>
  );
}
