import { GetProducts } from "@/data/GetProducts";
import { formatter } from "@/lib/utils";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/addToCartButton";
import ProductSkelton from "./ProductSkelton";

export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    color: string;
    size: string;
    SuitableFor: string;
};
const ProductsGrid = async ({ searchParams }: { searchParams: any }) => {
    // const searchParams = useSearchParams();
    // const params = useMemo(
    //     () => new URLSearchParams(searchParams.toString()),
    //     [searchParams]
    // );

    const types = searchParams.types;
    const categories = searchParams.categories;
    const sizes = searchParams.sizes;
    const colors = searchParams.colors;
    const priceRange = searchParams.priceRange;
    const sort = searchParams.sort;

    // const { data: products, isLoading: loading } = useQuery({
    //     queryKey: [
    //         "products",
    //         types,
    //         categories,
    //         sizes,
    //         colors,
    //         priceRange,
    //         sort,
    //     ],
    //     queryFn: () =>
    //         GetProducts({
    //             types,
    //             categories,
    //             sizes,
    //             colors,
    //             priceRange,
    //             sort,
    //         }),
    // });

    const products = await GetProducts({
        types,
        categories,
        sizes,
        colors,
        priceRange,
        sort,
    });
    return (
        <div className="flex w-full  justify-center items-start h-full  flex-wrap gap-2 flex-1">
            {false
                ? new Array(10)
                      .fill(null)
                      .map((_, i) => <ProductSkelton key={i} />)
                : products &&
                  products.length > 0 &&
                  products?.map((product) => (
                      <div
                          className=" sm:w-[265px] w-[160px]   group group/parent  flex items-start flex-col gap-1  border border-transparent      hover:border-sky-400  duration-500  "
                          key={product.id}
                      >
                          <div className=" group  w-full sm:h-[260px] h-[170px] overflow-hidden  bg-[#f8f8f8]  relative  ">
                              <Image
                                  src={product.image}
                                  fill
                                  alt={""}
                                  className=" object-fill duration-1000 animate-in mx-auto"
                              />
                              <div className="hidden sm:flex  items-center justify-center absolute -bottom-3 group-hover/parent:bottom-3 opacity-0  group-hover/parent:opacity-100 w-full gap-3 duration-300">
                                  <Link
                                      href={`/shop/${product.id}`}
                                      className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300"
                                  >
                                      <Eye />
                                  </Link>
                                  <AddToCartButton
                                      product={{
                                          id: product.id,
                                          image: product.image,
                                          name: product.name,
                                          price: parseInt(
                                              product.price.toString()
                                          ),
                                          category: product.category,
                                          color: product.color,
                                          quantity: 1,
                                      }}
                                      mode="desktop"
                                  />
                                  <button className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300">
                                      <Heart />
                                  </button>
                              </div>
                              <div className="sm:hidden absolute -bottom-20 opacity-0 group-hover/parent:opacity-100 group-hover/parent:bottom-0 flex flex-col inset-x-0 duration-300 bg-cyan-500/60 backdrop-blur-lg text-white">
                                  <Link
                                      href={`/shop/${product.id}`}
                                      className="flex items-center justify-center   duration-300"
                                  >
                                      show product
                                  </Link>
                                  <AddToCartButton
                                      product={{
                                          id: product.id,
                                          image: product.image,
                                          name: product.name,
                                          price: parseInt(
                                              product.price.toString()
                                          ),
                                          category: product.category,
                                          color: product.color,
                                          quantity: 1,
                                      }}
                                      mode="mobile"
                                  />
                              </div>
                          </div>
                          <div className=" flex flex-col gap-1 w-full text-gray-700 font-semibold justify-center items-center">
                              <p className=" text-sm  overflow-hidden ">
                                  {product.name}
                              </p>

                              <p className=" text-sm  overflow-hidden  mt-auto">
                                  {formatter.format(product.price)}
                              </p>
                          </div>
                      </div>
                  ))}
        </div>
    );
};

export default ProductsGrid;
