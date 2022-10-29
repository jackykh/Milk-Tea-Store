import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductItem from "../Components/uiComponents/ProductItem";

const ProductList: React.FC = () => {
  const [params] = useSearchParams();
  const page = params.get("page") || "1";
  const [productsData, setProductsData] = useState<{
    totalItems: Number;
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

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const url = new URL(
          `${process.env.REACT_APP_SERVER}/api/products/get_products`
        );
        url.searchParams.append("page", page);
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
          const error = new Error(result.message || "Unknown Error");
          throw error;
        }
        setProductsData(result);
      } catch (error: any) {
        alert(error.message);
      }
    };
    fetchProductsData();
  }, [page]);

  const productList = productsData.products.map((product) => {
    return (
      <ProductItem
        key={product.id}
        img={product.photo}
        id={product.id}
        caption={product.name}
        caption2={"$" + product.price}
      />
    );
  });

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

  return (
    <div className="w-full bg-slate-100 p-32 flex flex-col [&>*]:mb-20">
      <div className="pb-10 border-b flex justify-center">
        <h3 className="text-4xl font-medium">產品列表</h3>
      </div>
      <div className="w-full grid grid-cols-autofit-30 grid-rows-1 gap-16">
        {productList}
      </div>
      {pagination(+page)}
    </div>
  );
};

export default ProductList;
