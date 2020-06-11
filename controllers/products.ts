import { Product } from "../types.ts";
import { Product as Pd } from "../config/dbconect.ts";

/// @desc   All Products
/// @route  GET /api/v1/products
export const getProducts = async ({ response }: { response: any }) => {
  // Get all the data from database
  const products: Product[] = await Pd.all();
  response.body = {
    success: true,
    data: products,
  };
};

/// @desc   Single Product
/// @route  GET /api/v1/products/:id
export const getProduct = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  // Get the single document from database
  const product: Product = await Pd.find(params.id);

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
      const { name, description, price } = body.value;

      // Insert the data into database
      const res = await Pd.create({ name, description, price });

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
  // find the data
  const product = await Pd.find(params.id);
  if (product) {
    const body = await request.body();

    const { name, description, price } = body.value;

    // update the data into database
    await Pd.where("_id", params.id).update(
      { name, description, price },
    );

    // get the updated data
    const prod = await Pd.find(params.id);

    response.status = 200;

    response.body = {
      success: true,
      data: prod,
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
export const deleteProduct = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  // Delete the data from database
  await Pd.deleteById(params.id);

  response.status = 200;

  response.body = {
    success: true,
    msg: "Product Delete successfully",
  };
};
