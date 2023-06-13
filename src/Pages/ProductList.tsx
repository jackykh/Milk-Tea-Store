import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductItem from "../Components/uiComponents/ProductItem";
import Search from "../Components/uiComponents/Search";
import LoadingSpinner from "../Components/uiComponents/LoadingSpinner";

const ProductList: React.FC = () => {
  const [params] = useSearchParams();
  const page = params.get("page") || "1";
  const [order, setOrder] = useState("likes");
  const [productsData, setProductsData] = useState<{
    totalItems: number;
    products: Array<{
      id: string;
      name: string;
      photo: string;
      price: number;
    }>;
  }>({
    totalItems: 0,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchProductsData = useCallback(async () => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_SERVER}/api/products/get_products`
      );
      url.searchParams.append("page", page);
      url.searchParams.append("order", order);
      if (searchRef.current?.value) {
        url.searchParams.append("search", searchRef.current.value);
      }
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Unknown Error");
        throw error;
      }
      setProductsData(result);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message || "Unknown Error");
    }
  }, [order, page]);

  useEffect(() => {
    setIsLoading(true);
    fetchProductsData();
  }, [page, order, fetchProductsData]);

  const isKeyHandled = useRef<boolean>(false);

  const enterKeyDownHandler = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    fetchProductsData();
    isKeyHandled.current = true;
  }, []);

  const enterKeyUpHandler = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    isKeyHandled.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", enterKeyDownHandler);
    document.addEventListener("keyup", enterKeyUpHandler);

    return () => {
      document.removeEventListener("keydown", enterKeyDownHandler);
      document.removeEventListener("keyup", enterKeyUpHandler);
    };
  }, []);

  const productList =
    productsData.totalItems === 0 ? (
      <h1 className="text-3xl">沒有符合條件的產品</h1>
    ) : (
      productsData.products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            img={product.photo}
            id={product.id}
            caption={product.name}
            caption2={"$" + product.price}
          />
        );
      })
    );

  const pagination = (currentPage: number) => {
    const itemsPerPage = 6;
    const pageNumber = Math.ceil(+productsData.totalItems / itemsPerPage);
    const pageButton: React.ReactElement[] = [];
    const currentPageButton = (page: number) => {
      return (
        <Link
          to={`?page=${page}`}
          key={page}
          className={`w-16 h-16 rounded-xl ${
            currentPage === page && "bg-purple-300"
          } border-slate-900 border flex justify-center items-center hover:bg-purple-300`}
        >
          {page}
        </Link>
      );
    };
    const ellipsis = (
      <div className="w-16 h-16 rounded-xl border-slate-900 border flex justify-center items-center hover:bg-purple-300">
        <span>...</span>
      </div>
    );

    if (pageNumber > 7) {
      if (currentPage === 1) {
        pageButton.push(
          currentPageButton(1),
          currentPageButton(2),
          ellipsis,
          currentPageButton(pageNumber)
        );
      } else if (currentPage === 2) {
        pageButton.push(
          currentPageButton(1),
          currentPageButton(2),
          currentPageButton(3),
          ellipsis,
          currentPageButton(pageNumber)
        );
      } else if (currentPage === 3) {
        pageButton.push(
          currentPageButton(1),
          currentPageButton(2),
          currentPageButton(3),
          currentPageButton(4),
          ellipsis,
          currentPageButton(pageNumber)
        );
      } else if (currentPage === pageNumber) {
        pageButton.push(
          currentPageButton(1),
          ellipsis,
          currentPageButton(pageNumber - 1),
          currentPageButton(pageNumber)
        );
      } else if (currentPage === pageNumber - 1) {
        pageButton.push(
          currentPageButton(1),
          ellipsis,
          currentPageButton(currentPage - 1),
          currentPageButton(currentPage),
          currentPageButton(pageNumber)
        );
      } else if (currentPage === pageNumber - 2) {
        pageButton.push(
          currentPageButton(1),
          ellipsis,
          currentPageButton(currentPage - 1),
          currentPageButton(currentPage),
          currentPageButton(currentPage + 1),
          currentPageButton(pageNumber)
        );
      } else {
        pageButton.push(
          currentPageButton(1),
          ellipsis,
          currentPageButton(currentPage - 1),
          currentPageButton(currentPage),
          currentPageButton(currentPage + 1),
          ellipsis,
          currentPageButton(pageNumber)
        );
      }
    } else {
      for (let i = 1; i < pageNumber + 1; i++) {
        pageButton.push(currentPageButton(i));
      }
    }
    return <div className="flex justify-center [&>*]:mr-3 ">{pageButton}</div>;
  };

  const orderChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setOrder(e.currentTarget.value);
  };

  return (
    <div className="w-full bg-slate-100 p-32 flex flex-col justify-center items-center [&>*]:mb-20">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <div className="pb-10 border-b flex justify-center">
            <h3 className="text-4xl font-medium">產品列表</h3>
          </div>
          <div className="flex justify-end ml-auto [&>*]:mr-6">
            <Search
              placeholder="搜索"
              ref={searchRef}
              onClick={fetchProductsData}
            />
            <select
              className="rounded-md p-4 text-2xl bg-white border-none outline outline-gray-200 cursor-pointer"
              onChange={orderChangeHandler}
              value={order}
            >
              <option value="likes">以讚數排序</option>
              <option value="price">以價格排序</option>
            </select>
          </div>
          <div className="w-full grid grid-cols-autofit-30 grid-rows-1 gap-16">
            {productList}
          </div>
          {pagination(+page)}
        </>
      )}
    </div>
  );
};

export default ProductList;
