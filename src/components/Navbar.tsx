
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#faf9f6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link
          to="/products"
          className="flex items-center gap-2 text-lg font-bold tracking-tight shadow-md p-2 rounded-lg"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#285b39] text-white">
            <Sparkles size={18} />
          </span>
          <span>crystal.</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-medium uppercase tracking-wider text-stone-600 lg:flex">
          <Link className="hover:text-[#285b39] shadow-md p-2 rounded-lg" to="/products">Shop</Link>
          <a className="hover:text-[#285b39] shadow-md p-2 rounded-lg" href="#categories">Collections</a>
          <a className="hover:text-[#285b39] shadow-md p-2 rounded-lg" href="#footer">Contact</a>
          <a className="hover:text-[#285b39] shadow-md p-2 rounded-lg" href="#about">About</a>
        </nav>

        <form onSubmit={handleSearch} className="flex min-w-0 flex-1 gap-2 lg:max-w-lg">
          <div className="relative min-w-0 flex-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-10 rounded-xl border-stone-200 bg-white pr-9 text-sm"
              aria-label="Search products"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
            >
              <Search size={16} />
            </button>
          </div>

          <Button
            type="button"
            className="h-10 rounded-xl bg-[#2B662D] px-3 text-xs hover:bg-[#20492d] sm:px-4"
            onClick={() => navigate("/products")}
          >
            <ShoppingBag size={15} className="mr-2 text-white" />
            <span className="hidden sm:inline text-white">View Shop</span>
            <span className="sm:hidden">Shop</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
