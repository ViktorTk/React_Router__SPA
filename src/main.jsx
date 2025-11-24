import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Product, { loader as productLoader } from "./routes/Product";
import EditProduct, {
  loader as editProductLoader,
  action as editAction,
} from "./routes/EditProduct";
import { action as deleteAction } from "./routes/Delete";
import Index from "./routes/Index";
import ErrorPage404 from "./ErrorPage404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage404 />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage404 />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "products/:productId",
            element: <Product />,
            loader: productLoader,
          },
          {
            path: "products/:productId/edit",
            element: <EditProduct />,
            loader: editProductLoader,
            action: editAction,
          },
          {
            path: "products/:productId/delete",
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
