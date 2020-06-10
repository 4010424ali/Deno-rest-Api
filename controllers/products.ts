import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Products One",
    description: "This is products one",
    price: 12.99,
  },
  {
    id: "2",
    name: "Products Two",
    description: "This is products two",
    price: 13.99,
  },
  {
    id: "3",
    name: "Products Three",
    description: "This is products Three",
    price: 16.99,
  },
  {
    id: "4",
    name: "Products Four",
    description: "This is products Four",
    price: 17.99,
  },
];

/// @desc   All Products
/// @route  GET /api/v1/products
export const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

/// @desc   Single Product
/// @route  GET /api/v1/products/:id
export const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

/// @desc   Add Product
/// @route  POST /api/v1/products/
export const AddProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data",
    };
  } else {
    try {
      const product: Product = body.value;

      const res = await products.push(product);

      response.status = 201;

      response.body = {
        success: true,
        data: res,
      };
    } catch (err) {
      response.status = 500;

      response.body = {
        success: false,
        msg: "Invalid Data",
      };
    }
  }
};

/// @desc   Update Product
/// @route  PUT /api/v1/products/:id
export const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;

    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

/// @desc   Delete Product
/// @route  DELETE /api/v1/products/:id
export const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);

  response.status = 200;

  response.body = {
    success: true,
    msg: "Product Delete successfully",
  };
};
