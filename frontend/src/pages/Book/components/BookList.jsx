import {
  Badge,
  Button,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookAction,
  getAllBooksAction,
  getBookByIdAction,
} from "../../../store/slices/bookSlice";
import BookForm from "./BookForm";
import { IconEye } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import LoadingAnimation from "../../../shared/hoc/LoadingAnimation";

const BookList = () => {
  const { books, isLoading } = useSelector((state) => state.book);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewBook = async (id) => {
    await dispatch(getBookByIdAction(id));
    openModal();
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    onOpen();
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteBookAction(id));
    await dispatch(getAllBooksAction());

    if (res.payload.statusCode == 200) {
      toast({
        title: "Success",
        description: "Book deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete book",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

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
            {books?.map((book, idx) => (
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
                    <IconEye /> View
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(book)}
                    colorScheme="error"
                  >
                    <IconTrash /> Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <BookForm isOpen={isModalOpen} onClose={() => closeModal()} />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{selectedBook?.title}"? This
              action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(selectedBook.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default BookList;
