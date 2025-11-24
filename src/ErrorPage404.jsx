import { useRouteError, Link } from "react-router-dom";

function ErrorPage404() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>Такой страницы не существует!!!</h1>
      <h2>404 Not Found Error</h2>
      <p>
        <i>{error.statusText}</i>
      </p>
      <p>
        <i>{error.data}</i>
      </p>
      <Link to="/">Вернуться на главную</Link>
    </>
  );
}

export default ErrorPage404;
