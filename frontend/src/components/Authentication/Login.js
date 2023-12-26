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


const Login = () => {
  const [email, setemail] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
    const toast = useToast();
  const [password, setPassword] = useState();

  const history = useHistory();

const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} color={"black"}>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
        value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        {" "}
        <FormLabel>Enter password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={((e) => setPassword(e.target.value))}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Submit
      </Button>
      <Button
        colorScheme="red"
        color={"white"}
        width={"100%"}
        onClick={() => {
          setemail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
