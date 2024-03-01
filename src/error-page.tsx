import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "Sorry, an unexpected error has occurred.";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{errorMessage}</p>
    </div>
  );
}