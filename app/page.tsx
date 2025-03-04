"use client";

import Home from "@/components/Home";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main>
      <Toaster position="bottom-center" />
      <Home />
    </main>
  );
}
