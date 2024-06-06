import { createBrowserRouter } from "react-router-dom";
import Book from "../pages/Book/Book";
import BookForm from "../pages/Book/components/BookForm";
import BookList from "../pages/Book/components/BookList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Book />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
    ],
  },
]);

export default router;
