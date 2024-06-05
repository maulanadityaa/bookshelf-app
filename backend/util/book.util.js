const formatBook = (book) => {
  return {
    id: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    yearPublished: book.yearPublished,
    isRead: book.read,
    imageUrl: book.imageUrl,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
  };
};

module.exports = { formatBook };
