import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import * as yup from "yup";
import bookAxiosInstance from "../../../api/bookAxiosInstance";
import {
  createBookAction,
  getAllBooksAction,
  updateBookAction,
} from "../../../store/slices/bookSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  genre: yup.array().min(1, "Select at least one genre").of(yup.string()),
  yearPublished: yup
    .number()
    .typeError("Year Published must be a number")
    .required("Year Published is required")
    .positive("Year Published must be a positive number")
    .integer("Year Published must be an integer")
    .min(1000, "Year Published must be a 4-digit number")
    .max(9999, "Year Published must be a 4-digit number"),
  image: yup.string(),
  read: yup.boolean(),
});

const BookForm = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      author: "",
      genre: [],
      yearPublished: "",
      image: "",
    },
  });

  const options = [
    { value: "Fiction", label: "Fiction" },
    { value: "Horror", label: "Horror" },
    { value: "History", label: "History" },
    { value: "Sci-fi", label: "Sci-fi" },
    { value: "Action", label: "Action" },
    { value: "Education", label: "Education" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Drama", label: "Drama" },
    { value: "Thriller", label: "Thriller" },
    { value: "Mystery", label: "Mystery" },
  ];

  const { book } = useSelector((state) => state.book);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const [oldGenre, setOldGenre] = useState([]);
  const [readed, setReaded] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (book) {
      setValue("id", book.id);
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("genre", book.genre);
      setValue("yearPublished", book.yearPublished);
      setValue("image", book.imageUrl);
      setValue("isRead", book.isRead);
      setOldGenre(book.genre);
      setReaded(book.isRead);
    }

    return () => {
      reset();
    };
  }, [book]);

  const handleUploadImage = async (image) => {
    const data = new FormData();
    data.append("image", image);

    try {
      const res = await bookAxiosInstance.post("/upload-cover", data);
      toast({
        title: "Success",
        description: "Profile picture uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setValue("image", res.data.imageUrl);
      setLoading(false);
      return res.data.imageUrl;
    } catch (error) {
      toast({
        title: "Error",
        description: "Please upload a valid image file",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // if (pic != null) {
    //   data.image = await handleUploadImage(pic);
    // } else {
    //   setValue("image", null);
    //   data.image =
    //     "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // }

    if (book != null) {
      try {
        if (pic != null) {
          data.image = await handleUploadImage(pic);
        } else {
          data.image = book.imageUrl;
        }

        const res = await dispatch(updateBookAction(data));
        toast({
          title: "Success",
          description: res.payload.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update book",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        return;
      }
      reset();
    } else {
      if (pic != null) {
        data.image = await handleUploadImage(pic);
      } else {
        data.image =
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      }

      const book = {
        title: data.title,
        author: data.author,
        genre: data.genre,
        yearPublished: data.yearPublished,
        imageUrl: data.image,
        read: data.read,
      };

      try {
        const res = await dispatch(createBookAction(book));

        toast({
          title: "Success",
          description: res.payload.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } catch (e) {
        toast({
          title: "Error",
          description: "Failed to add book",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        return;
      }
    }
    await dispatch(getAllBooksAction());
    setOldGenre([]);
    setReaded(false);
    setLoading(false);

    reset();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {book && (
              <Box>
                <Image src={book.imageUrl} alt="Book Cover" />
              </Box>
            )}
            <FormControl isInvalid={errors.title} mt={3}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Input title"
                name="title"
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.author} mt={3}>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Input author name"
                name="author"
                type="text"
                id="author"
                {...register("author")}
              />
              <FormErrorMessage>
                {errors.author && errors.author.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.yearPublished} mt={3}>
              <FormLabel>Year Published</FormLabel>
              <Input
                placeholder="Input year published"
                name="yearPublished"
                type="number"
                id="yearPublished"
                {...register("yearPublished")}
              />
              <FormErrorMessage>
                {errors.yearPublished && errors.yearPublished.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.genre} mt={3}>
              <FormLabel>Genres</FormLabel>
              <Controller
                name="genre"
                control={control}
                defaultValue={[]}
                render={({ field: { onBlur, value, onChange } }) => (
                  <Select
                    id="genre"
                    name="genre"
                    onBlur={onBlur}
                    {...register("genre")}
                    onChange={(options) => {
                      onChange(
                        options ? options.map((options) => options.value) : []
                      );
                    }}
                    isMulti
                    options={options}
                    defaultValue={
                      oldGenre.length > 0
                        ? oldGenre.map((genre) => {
                            return {
                              value: genre,
                              label: genre,
                            };
                          })
                        : []
                    }
                  />
                )}
              />
              <FormErrorMessage>
                {errors.genre && errors.genre.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.image} mt={3}>
              <FormLabel>Cover Image</FormLabel>
              <Controller
                name="image"
                control={control}
                defaultValue={null}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    type="file"
                    onBlur={onBlur}
                    {...register("image")}
                    onChange={(e) => {
                      setPic(e.target.files[0]);
                    }}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.read} mt={3}>
              <Checkbox
                colorScheme="blue"
                {...register("read")}
                defaultChecked={readed}
              >
                Read
              </Checkbox>
              <FormErrorMessage>
                {errors.read && errors.read.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit(onSubmit)}
              isLoading={loading}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookForm;
