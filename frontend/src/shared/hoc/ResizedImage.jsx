import React from "react";
import { Box, Image } from "@chakra-ui/react";

const ResizedImage = ({ src, alt }) => {
  return (
    <Box
      width="300px"
      height="200px"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={src}
        alt={alt}
        objectFit="contain"
        width="100%"
        height="100%"
      />
    </Box>
  );
};

export default ResizedImage;
