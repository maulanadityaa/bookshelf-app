import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading-animation.json";

const LoadingAnimation = () => {
  return (
    <Flex justify="center" my={5}>
      <Box width={200}>
        <Lottie animationData={loadingAnimation} />
      </Box>
    </Flex>
  );
};

export default LoadingAnimation;
