import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.scss";
import { store } from "./redux/Store";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";

// Check if user is logged in before rendering
const loaderHandler = () => {
  const userId = sessionStorage.getItem("loginId");

  if (!userId){
    return redirect("/login");
  }

  return redirect("/feed");
}

const router = createBrowserRouter([
  { path: "*", loader: loaderHandler },
  { path: "/login", element: <Login /> },
  { path: "/feed", element: <Feed />}
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
