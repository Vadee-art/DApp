import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppProvider } from "./providers/app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
