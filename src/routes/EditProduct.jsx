import { Form, useLoaderData, redirect } from "react-router-dom";
import { getProduct, updateProduct } from "../forStorage";
import Icon from "@mdi/react";
import { mdiContentSaveOutline } from "@mdi/js";

export async function loader({ params }) {
  const product = await getProduct(params.productId);
  return { product };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateProduct(params.productId, updates);
  return redirect(`/products/${params.productId}`);
}

function EditProduct() {
  const { product } = useLoaderData();

  return (
    <Form method="post" id="product-form">
      <div>
        <span>Наименование:</span>
        <input
          placeholder="name"
          type="text"
          name="name"
          defaultValue={product.name}
        />
      </div>
      <div>
        <span>Цена:</span>
        <input
          placeholder="cost"
          type="text"
          name="cost"
          defaultValue={product.cost}
        />
      </div>
      <div>
        <span>Кол-во:</span>
        <input
          placeholder="amount"
          type="text"
          name="amount"
          defaultValue={product.amount}
        />
      </div>
      <p>
        <button type="submit">
          <Icon path={mdiContentSaveOutline} size={1} />
          сохранить изменения
        </button>
      </p>
    </Form>
  );
}

export default EditProduct;
