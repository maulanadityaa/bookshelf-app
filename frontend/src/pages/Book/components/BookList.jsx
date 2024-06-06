import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Button,
  Tag,
  useToast,
} from "@chakra-ui/react";
import {
  deleteBookAction,
  getAllBooksAction,
  getBookByIdAction,
} from "../../../store/slices/bookSlice";
import { useState } from "react";
import BookForm from "./BookForm";

const BookList = () => {
  const { books, isLoading } = useSelector((state) => state.book);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleViewBook = async (id) => {
    await dispatch(getBookByIdAction(id));
    openModal();
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteBookAction(id));
    await dispatch(getAllBooksAction());

    console.log(res);

    // if (res.status === 200) {
    //   toast({
    //     title: "Success",
    //     description: "Book deleted successfully",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete book",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  };

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  return (
    <div>
      <TableContainer py={4}>
        <Table variant="simple">
          <Thead>
            <Tr justifyContent="center" alignItems="center" flexDir="row">
              <Th fontWeight="bold" textAlign="center" fontSize={18}>
                No
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Title
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Author
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Year
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Genre
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Read
              </Th>
              <Th fontWeight="bold" fontSize={18} textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan="5">Loading...</Td>
              </Tr>
            ) : (
              books?.map((book, idx) => (
                <Tr key={book.id} alignItems="center" justifyContent="center">
                  <Td textAlign="center">{++idx}</Td>
                  <Td textAlign="center">{book.title}</Td>
                  <Td textAlign="center">{book.author}</Td>
                  <Td textAlign="center">{book.yearPublished}</Td>
                  <Td textAlign="center">
                    {book.genre.map((genre, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        colorScheme="gray"
                        variant="solid"
                        mr={2}
                      >
                        {genre}
                      </Tag>
                    ))}
                  </Td>
                  <Td textAlign="center">
                    {book.isRead ? (
                      <Badge variant="solid" colorScheme="success">
                        Finished
                      </Badge>
                    ) : (
                      <Badge variant="solid" colorScheme="error">
                        Not Yet
                      </Badge>
                    )}
                  </Td>
                  <Td textAlign="center">
                    <Button
                      onClick={() => handleViewBook(book.id)}
                      colorScheme="secondary"
                      marginRight={3}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleDelete(book.id)}
                      colorScheme="error"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <BookForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default BookList;
