import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./components/pages/Main";
import RootLayout from "./components/pages/RootLayout";
import ProductDetails from "./components/pages/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
