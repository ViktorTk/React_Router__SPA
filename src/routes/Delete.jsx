import { redirect } from "react-router-dom";
import { deleteProduct } from "../forStorage";

export async function action({ params }) {
  // throw new Error("error"); // ТЕСТ выбрасывания ошибки при удалении пункта
  await deleteProduct(params.productId);
  return redirect("/");
}
