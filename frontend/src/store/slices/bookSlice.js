import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookService from "../../services/bookService";

const bookService = BookService();

export const getAllBooksAction = createAsyncThunk(
  "book/getAllBooks",
  async () => {
    return await bookService.getAllBooks();
  }
);

export const getBookByIdAction = createAsyncThunk(
  "book/getBookById",
  async (id) => {
    return await bookService.getBookById(id);
  }
);

export const createBookAction = createAsyncThunk(
  "book/createBook",
  async (book) => {
    await bookService.createBook(book);
    return await bookService.getAllBooks();
  }
);

export const updateBookAction = createAsyncThunk(
  "book/updateBook",
  async (book) => {
    await bookService.updateBook(book);
    return await bookService.getAllBooks();
  }
);

export const deleteBookAction = createAsyncThunk(
  "book/deleteBook",
  async (id) => {
    return await bookService.deleteBook(id);
    // return await bookService.getAllBooks();
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    book: null,
    isLoading: false,
    message: "",
  },
  reducers: {
    selectedBook: (state, { payload }) => {
      state.book = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooksAction.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllBooksAction.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.isLoading = false;
      }),
      builder.addCase(getAllBooksAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getBookByIdAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getBookByIdAction.fulfilled, (state, { payload }) => {
        state.book = payload;
        state.isLoading = false;
      }),
      builder.addCase(getBookByIdAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(createBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(createBookAction.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.isLoading = false;
      }),
      builder.addCase(createBookAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(updateBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateBookAction.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.isLoading = false;
      }),
      builder.addCase(updateBookAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(deleteBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(deleteBookAction.fulfilled, (state, { payload }) => {
        // state.books = payload;
        state.isLoading = false;
      }),
      builder.addCase(deleteBookAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { selectedBook } = bookSlice.actions;

export default bookSlice;
