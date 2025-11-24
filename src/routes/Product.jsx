import { Form, Link, useLoaderData } from "react-router-dom";
import { getProduct } from "../forStorage";

export async function loader({ params }) {
  const product = await getProduct(params.productId);
  return { product };
}

function Product() {
  const { product } = useLoaderData();

  return (
    <>
      <div id="control">
        <Form action="edit">
          <button type="submit">редактировать</button>
        </Form>

        <Form
          method="post"
          action="delete"
          onSubmit={(event) => {
            if (!confirm("Do you want delete this product?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">удалить</button>
        </Form>
      </div>

      <div>
        <h2>Страница пункта ${product.id}</h2>
        <p>Name: {product.name ? product.name : <i>не заполнено</i>}</p>
        <p>Cost: {product.cost ? product.cost : <i>не заполнено</i>}</p>
        <p>Amount: {product.amount ? product.amount : <i>не заполнено</i>}</p>
        <Link to={"/"}>на главную</Link>
      </div>
    </>
  );
}

export default Product;
