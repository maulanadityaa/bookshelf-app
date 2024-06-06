import {
  Button,
  Container,
  Heading,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import BookForm from "./components/BookForm";

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <VStack>
      <Container maxW="container.xl" marginTop={4}>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Heading as="h3" size="lg">
            Books
          </Heading>
          <Link>
            <Button colorScheme="blue" onClick={openModal}>
              <IconPlus size={23} /> Add Book
            </Button>
          </Link>
        </HStack>
        <Divider />
        <Outlet />
      </Container>
      <BookForm isOpen={isOpen} onClose={closeModal} />
    </VStack>
  );
};

export default Book;
