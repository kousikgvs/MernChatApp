import React, { useState } from "react";
import { Input, InputGroup } from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  VStack,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();

  const postDetails = (pics) => {
    if (!pics) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setLoading(true);

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", process.env.UPLOAD_PRESET);
      data.append("cloud_name", process.env.CLOUD_NAME);

      fetch(process.env.CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill in all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
         "/api/user",
         { name, email, password, pic },
         config
       );

       localStorage.setItem("userInfo", JSON.stringify(data));
       setLoading(false);
          toast({
          title: "Successfully submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast({
          title: error.response.data.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else if (error.request) {
        toast({
          title: "No response received from the server",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: error.message || "An error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <VStack spacing={4} color={"black"}>
      <FormControl isRequired id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="First name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        {" "}
        <FormLabel>Enter password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          
           <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter password"
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p="1.5"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;