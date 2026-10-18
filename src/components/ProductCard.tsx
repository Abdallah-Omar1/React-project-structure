
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import type { Product } from "../lib/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
      <Link
        to={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        className="block"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f5f4f1] p-5 sm:p-7">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] capitalize text-stone-600">
            {product.category.replaceAll("-", " ")}
          </span>
        </div>
      </Link>

      <CardContent className="p-4 sm:p-5">
        <p className="mb-1 truncate text-[10px] uppercase tracking-[0.14em] text-stone-400">
          {product.brand || product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h2 className="min-h-10 line-clamp-2 text-sm font-semibold leading-5 text-stone-800 transition-colors group-hover:text-[#285b39]">
            {product.title}
          </h2>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-semibold text-stone-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Button
          asChild
          variant="outline"
          className="mt-4 h-9 w-full rounded-xl border-stone-200 text-xs hover:border-[#285b39] hover:bg-[#285b39] hover:text-white"
        >
          <Link to={`/products/${product.id}`}>
            View Details <ArrowUpRight size={14} className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
