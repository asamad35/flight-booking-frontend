"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Home from "@/components/Home";
import FlightSearch from "@/components/FlightSearch";
import HeroSection from "@/components/HeroSection";

function App() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchSectionRef = useRef<HTMLElement>(null);

  const scrollToSearch = () => {
    if (searchSectionRef.current) {
      const headerOffset = 80;
      const elementPosition =
        searchSectionRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (searchParams.get("scroll") === "search") {
      setTimeout(() => {
        scrollToSearch();

        const url = new URL(window.location.href);
        url.searchParams.delete("scroll");
        window.history.replaceState({}, "", url);
      }, 100);
    }
  }, [searchParams]);

  return (
    <div>
      <Toaster position="bottom-center" />
      <Home />
    </div>
  );
}
export default App;
