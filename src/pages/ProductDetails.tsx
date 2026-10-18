
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, Package, Tag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { getProduct } from "../lib/api";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });

  if (productQuery.isPending) {
    return (
      <div className="mt-8 grid animate-pulse gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-stone-200" />
        <div className="space-y-5 py-8">
          <div className="h-5 w-1/3 rounded bg-stone-200" />
          <div className="h-10 w-3/4 rounded bg-stone-200" />
          <div className="h-24 rounded bg-stone-200" />
        </div>
      </div>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-semibold">Unable to load this product</h2>
        <p className="mt-2 text-sm text-stone-500">
          Please try again or return to the shop.
        </p>
        <Button
          onClick={() => productQuery.refetch()}
          variant="outline"
          className="mt-5 mr-2 rounded-xl"
        >
          Try Again
        </Button>
        <Button asChild className="mt-5 rounded-xl bg-[#285b39]">
          <Link to="/products">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const product = productQuery.data;

  return (
    <div className="py-7 sm:py-10">
      <Button asChild variant="ghost" className="mb-6 rounded-xl text-stone-600">
        <Link to="/products">
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-white p-8 sm:min-h-[480px] sm:p-12">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="max-h-[440px] w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#47734f]">
            {product.brand || product.category}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-amber-500">
              <Star size={16} className="fill-amber-400" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-stone-400">
              · {product.stock} in stock
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-semibold">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                {product.discountPercentage.toFixed(0)}% off
              </span>
            )}
          </div>

          <p className="mt-6 max-w-xl text-sm leading-7 text-stone-500">
            {product.description}
          </p>

          <Card className="mt-7 rounded-2xl border-stone-200 shadow-none">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3 text-sm">
                <Package size={18} className="text-[#47734f]" />
                <span className="text-stone-600">Availability</span>
                <span className="ml-auto font-medium">
                  {product.stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Tag size={18} className="text-[#47734f]" />
                <span className="text-stone-600">Category</span>
                <span className="ml-auto capitalize">
                  {product.category.replaceAll("-", " ")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button
            asChild
            className="mt-6 h-12 rounded-xl bg-[#285b39] hover:bg-[#20492d]"
          >
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
