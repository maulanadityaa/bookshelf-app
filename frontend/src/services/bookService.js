import bookAxiosInstance from "../api/bookAxiosInstance";

function BookService() {
  const getAllBooks = async () => {
    const res = await bookAxiosInstance.get("/books");

    if (res.status !== 200) {
      console.log(res);
      throw new Error("Couldn't get all books");
    }

    return res.data;
  };

  const getBookById = async (id) => {
    const res = await bookAxiosInstance.get("/books/" + id);

    if (res.status !== 200) {
      console.log(res);
      throw new Error("Couldn't get book by id");
    }

    return res.data;
  };

  const createBook = async (book) => {
    const res = await bookAxiosInstance.post("/books", book);

    if (res.status !== 201) {
      console.log(res);
      throw new Error("Couldn't create book");
    }

    return res.data;
  };

  const updateBook = async (book) => {
    const res = await bookAxiosInstance.put("/books/" + book.id, book);

    if (res.status !== 200) {
      console.log(res);
      throw new Error("Couldn't update book");
    }

    return res.data;
  };

  const deleteBook = async (id) => {
    const res = await bookAxiosInstance.delete("/books/" + id);

    if (res.status !== 200) {
      console.log(res);
      throw new Error("Couldn't delete book");
    }

    return res.data;
  };

  return { getAllBooks, deleteBook, createBook, updateBook, getBookById };
}

export default BookService;
