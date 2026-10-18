
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, RefreshCw, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import ProductCard from "../components/ProductCard";
import {
  getCategories,
  getProducts,
} from "../lib/api";

const PAGE_SIZE = 12;

export default function Products() {
  const [params, setParams] = useSearchParams();
  const urlSearch = params.get("q") ?? "";
  const [search, setSearch] = useState(urlSearch);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setSearch(urlSearch);
    setPage(0);
  }, [urlSearch]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
  });

  const productsQuery = useQuery({
    queryKey: ["products", search.trim(), category, page],
    queryFn: () =>
      getProducts({
        search: search.trim(),
        category,
        limit: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(0);
    setCategory("");
    setParams(search.trim() ? { q: search.trim() } : {});
  }

  function selectCategory(value: string) {
    setCategory(value);
    setPage(0);
    setSearch("");
    setParams({});
  }

  const data = productsQuery.data;
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div>
      {/* Hero */}
      <section
        id="about"
        className="relative mt-5 overflow-hidden rounded-3xl border border-stone-100 bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-14"
      >
        <div className="pointer-events-none absolute -right-5 -top-10 text-[170px] font-extralight leading-none text-stone-100">
          ✳
        </div>
        <div className="pointer-events-none absolute bottom-0 right-24 text-7xl text-stone-100">
          ✧
        </div>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#47734f]">
          Discover something special
        </p>
        <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
          Explore Our Shop
        </h1>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:items-end">
          <p className="max-w-md text-sm leading-6 text-stone-500">
            Discover everyday essentials and unique finds.
            Browse our collection and find something you’ll love.
          </p>
          <p className="max-w-md text-xs leading-5 text-stone-400 sm:justify-self-end">
            Thoughtfully selected products, beautiful details,
            and a shopping experience made simple.
          </p>
        </div>
      </section>

      {/* Search and category filters */}
      <section id="categories" className="pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={!category ? "default" : "outline"}
              onClick={() => selectCategory("")}
              className={`rounded-full text-xs ${
                !category ? "text-white bg-[#20492d] hover:bg-[#20492d]" : "bg-white"
              }`}
            >
              All Products
            </Button>

            {(categoriesQuery.data ?? []).map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => selectCategory(item)}
                className={`rounded-full text-xs capitalize ${
                  category === item
                    ? "text-white bg-[#20492d] hover:bg-[#20492d]"
                    : "bg-white"
                }`}
              >
                {item.replaceAll("-", " ")}
              </Button>
            ))}
          </div>

          <form onSubmit={submitSearch} className="flex w-full gap-2 sm:max-w-xs">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-10 rounded-xl border-stone-200 bg-white"
              aria-label="Search products"
            />
            <Button
              type="submit"
              aria-label="Search"
              className="h-10 rounded-xl bg-[#20492d] text-white hover:bg-[#20492d]"
            >
              <Search size={16} />
            </Button>
          </form>
        </div>

        <div className="mb-4 mt-7 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {category
                ? category.replaceAll("-", " ")
                : urlSearch
                  ? `Results for "${urlSearch}"`
                  : "Our Collection"}
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              {data ? `${data.total} products found` : "Discover our collection"}
            </p>
          </div>
          {productsQuery.isFetching && !productsQuery.isPending && (
            <span className="text-xs text-stone-400">Updating...</span>
          )}
        </div>

        {/* Loading */}
        {productsQuery.isPending && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl bg-white"
              >
                <div className="aspect-[4/3] bg-stone-200" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 rounded bg-stone-200" />
                  <div className="h-4 w-4/5 rounded bg-stone-200" />
                  <div className="h-4 w-1/4 rounded bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {productsQuery.isError && (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
            <p className="font-medium text-red-700">
              Couldn’t load products
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Check your connection and try again.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => productsQuery.refetch()}
            >
              <RefreshCw size={14} className="mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!productsQuery.isPending &&
          !productsQuery.isError &&
          data?.products.length === 0 && (
            <div className="rounded-2xl bg-white px-6 py-16 text-center">
              <Search className="mx-auto mb-4 text-stone-300" size={32} />
              <h3 className="font-semibold">No products found</h3>
              <p className="mt-2 text-sm text-stone-500">
                Try another keyword or browse all products.
              </p>
              <Button
                className="mt-5 rounded-xl bg-[#285b39]"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setPage(0);
                  setParams({});
                }}
              >
                Show All Products
              </Button>
            </div>
          )}

        {/* Product grid */}
        {data && data.products.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="rounded-xl bg-white"
                  disabled={page === 0 || productsQuery.isFetching}
                  onClick={() => {
                    setPage((current) => current - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ArrowLeft size={15} className="mr-2" />
                  Previous
                </Button>

                <span className="text-sm text-stone-500">
                  Page {page + 1} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  className="rounded-xl bg-white"
                  disabled={
                    page >= totalPages - 1 || productsQuery.isFetching
                  }
                  onClick={() => {
                    setPage((current) => current + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Next
                  <ArrowRight size={15} className="ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <footer id="footer" className="mt-14 border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        Discover your next favorite thing.
      </footer>
    </div>
  );
}
