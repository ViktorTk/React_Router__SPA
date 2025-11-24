import localforage from "localforage";
import { nanoid } from "nanoid";

let someCache = {};

async function someNetwork(key) {
  if (!key) {
    someCache = {};
  }

  if (someCache[key]) {
    return;
  }

  someCache[key] = true;

  return new Promise((res) => {
    setTimeout(res, Math.random() * 700);
  });
}

// ---------------------------------------------------------------------------------

export async function getProducts() {
  await someNetwork();
  let products = await localforage.getItem("products");
  if (!products) products = [];
  return products;
}

// ---------------------------------------------------------------------------------

function setProducts(products) {
  return localforage.setItem("products", products);
}

export async function createProduct() {
  await someNetwork();
  let id = nanoid(6);
  let product = { id };
  let products = await getProducts();
  products.unshift(product);
  await setProducts(products);
  return product;
}

// ---------------------------------------------------------------------------------

export async function getProduct(id) {
  await someNetwork(`product${id}`);
  let products = await localforage.getItem("products");
  let product = products.find((product) => product.id === id);
  return product ?? null;
}

// ---------------------------------------------------------------------------------

export async function updateProduct(id, updates) {
  await someNetwork();
  let products = await localforage.getItem("products");
  let product = products.find((product) => product.id === id);
  if (!product) throw new Error("No product found for this", id);
  Object.assign(product, updates);
  await setProducts(products);
  return product;
}

// ---------------------------------------------------------------------------------

export async function deleteProduct(id) {
  let products = await localforage.getItem("products");
  let index = products.findIndex((product) => product.id === id);
  if (index > -1) {
    products.splice(index, 1);
    await setProducts(products);
    return true;
  }
  return false;
}
