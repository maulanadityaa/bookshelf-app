import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  createBookAction,
  updateBookAction,
} from "../../../store/slices/bookSlice";
import Select from "react-select";
import bookAxiosInstance from "../../../api/bookAxiosInstance";
import { useState } from "react";

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

  const { book, isLoading } = useSelector((state) => state.book);
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
  }, [book]);

  const handleUploadImage = async (image) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", image);

    const res = await bookAxiosInstance.post("/upload-cover", data);

    if (res.status == 200) {
      toast({
        title: "Success",
        description: "Profile picture uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setValue("image", res.data.imageUrl);
      setLoading(false);
      return res.data.imageUrl;
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid image file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const onSubmit = async (data) => {
    if (pic != null) {
      data.image = await handleUploadImage(pic);
    } else {
      setValue("image", null);
      data.image =
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    if (book != null) {
      data.imageUrl = data.image;
      const res = await dispatch(updateBookAction(data));
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Book updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update book",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      reset();
    } else {
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
        if (res.status == 200) {
          toast({
            title: "Success",
            description: "Book added successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (e) {
        toast({
          title: "Error",
          description: "Failed to add book",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    setOldGenre([]);
    setReaded(false);
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
            <FormControl isInvalid={errors.isRead} mt={3}>
              <Checkbox
                colorScheme="blue"
                {...register("read")}
                // isChecked={readed}
                defaultValue={readed}
              >
                Read
              </Checkbox>
              <FormErrorMessage>
                {errors.isRead && errors.isRead.message}
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
              type="reset"
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
