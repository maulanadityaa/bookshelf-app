import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
    <Container maxW="container.xl" centerContent>
      <Box
        d="flex"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        minHeight="90vh"
      >
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
      </Box>
    </Container>
  );
};

export default Book;
