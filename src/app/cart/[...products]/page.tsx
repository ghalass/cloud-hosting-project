import React from "react";

interface ProductsPageProps {
  params?: { products: string[] };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  console.log(params);
  return (
    <div className="fix-heigth text-3xl font-bold p-5">
      ProductsPage
      <ul className="mt-7">
        {params?.products.map((route) => (
          <li key={route} className="font-normal text-xl text-gray-600">
            {route}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
