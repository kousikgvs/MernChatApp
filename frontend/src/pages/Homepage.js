import React from "react";
import { Container, Box, Text , Tab , Tabs , TabPanels , TabPanel , TabList} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"center"}
        m="40px 0 15px 0"
        p={3}
        w="100%"
        background={"white"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"3xl"} fontFamily={"Work Sans"} color={"black"}>
          Talk-A-Tive
        </Text>
      </Box>
      <Box
      background={"white"}
      padding={4}
      width={"100%"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      color={"black"}
      >
      <Tabs variant='soft-rounded' >
  <TabList mb={"1em"} display={"flex"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
