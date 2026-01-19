import { safeParse, pipe, string, number, transform, parse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price),
    });
    if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/products`;
        const {data} = await  axios.post(url, {
            name: result.output.name,
            price: result.output.price
        })
        return data;
    } else {
        throw new Error('Invalid data');
    }
  } catch (error) {
    console.log(error);
  }
}


export async function getProducts() {
    try{
        const url = `${import.meta.env.VITE_API_URL}/products`;
        const {data} = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if(!result.success){
            throw new Error('Invalid data');
        }
        return result.output;
    }catch(error){
        console.log(error);
    }
}

export async function getProductByID(id: Product['id']) {
    try{
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
        const {data} = await axios.get(url);
        const result = safeParse(ProductSchema, data.data);
        if(!result.success){
            throw new Error('Invalid data');
        }
        return result.output;
    }catch(error){
        console.log(error);
    }
}


export async function updateProduct(id: Product['id'], data: ProductData) {
  try{
    const NumberSchema = pipe(string(), transform(Number), number());

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    });

    if(result.success){
       const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
       await axios.put(url, result.output);
    }
  }catch(error){
    console.log(error);
  }
}

export async function deleteProduct(id: Product['id']) {
  try{
     const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
     await axios.delete(url);
  }catch(error){
    console.log(error);
  }
}


export async function updateAvailability(id: Product['id']) {
  try{
     const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
     await axios.patch(url);
  }catch(error){
    console.log(error);
  }
}