import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { getProducts, createProduct } from "../forStorage";
import Icon from "@mdi/react";
import { mdiPlusBox } from "@mdi/js";
import { Component } from "react";

export async function loader() {
  const products = await getProducts();
  return { products };
}

export async function action() {
  const product = await createProduct();
  return redirect(`/products/${product.id}/edit`);
}

function Root() {
  const { products } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div id="main">
      <div id="menu">
        <Form method="post">
          <button type="submit">
            <Icon path={mdiPlusBox} size={1} />
            Добавить пункт
          </button>
        </Form>
        {products.length ? (
          <nav>
            {products.map((product) => (
              <NavLink
                key={product.id}
                to={`products/${product.id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "loading" : ""
                }
              >
                {product.name ? product.name : <i>Не заполнено</i>}
              </NavLink>
            ))}
          </nav>
        ) : (
          <p>
            <i>нет пунктов ...</i>
          </p>
        )}
      </div>

      <div
        id="product"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
