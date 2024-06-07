import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookService from "../../services/bookService";

const bookService = BookService();

export const getAllBooksAction = createAsyncThunk(
  "book/getAllBooks",
  async () => {
    return await bookService.getAllBooks();
  }
);

export const createBookAction = createAsyncThunk(
  "book/createBook",
  async (book) => {
    await bookService.getAllBooks();
    return await bookService.createBook(book);
  }
);

export const updateBookAction = createAsyncThunk(
  "book/updateBook",
  async (book) => {
    await bookService.getAllBooks();
    return await bookService.updateBook(book);
  }
);

export const deleteBookAction = createAsyncThunk(
  "book/deleteBook",
  async (id) => {
    const result = await bookService.deleteBook(id);
    return result;
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
    getBook: (state, { payload }) => {
      state.book = payload;
    },
    removeCurrentBook: (state, { payload }) => {
      state.book = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooksAction.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllBooksAction.fulfilled, (state, { payload }) => {
        state.books = payload.data;
        state.isLoading = false;
      }),
      builder.addCase(getAllBooksAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(createBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(createBookAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      }),
      builder.addCase(createBookAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(updateBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateBookAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      }),
      builder.addCase(updateBookAction.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(deleteBookAction.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(deleteBookAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      }),
      builder.addCase(deleteBookAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { getBook, removeCurrentBook } = bookSlice.actions;

export default bookSlice;
