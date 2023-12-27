import React, { useState } from 'react'
import { Avatar, Box, Button, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Tooltip , useDisclosure } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import ProfileModal from './profileModel'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'
const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingchat, setLoadingchat] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const history = useHistory();

  const LogoutHandler = () => {
    localStorage.removeItem("userInfo")
    history.push("/");
  }

  const handleSearch = async() => {
    if (!search) {
      // Getting error in the run time shall fix it
      toast('The Search field is Empty !', {
      type: 'warning', 
      position: 'top-right', 
      autoClose: 5000, 
      closeButton: true,
      className: 'my-toast'
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast(`Failed to Load`, {
      type: 'warning', 
      position: 'top-right',  
      autoClose: 5000, 
      closeButton: true,
      className: 'my-toast'
      });
    }

  }

const accessChat = async (userId) => {
  try {
    setLoadingchat(true);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
    };

    const { data } = await Axios.post('/api/chat', { userId }, config);
  //  if chats already present append it to our chat
    if (!chats.find((c) => c._id === data._id))
    {
      setChats([data , ...chats])
    }  
    setSelectedChat(data);
    setLoadingchat(false); 

    onClose(); 
  } catch (error) {
    console.error("Error accessing chat:", error);
    toast(`Error Fetching the Chats to Load`, {
      type: 'warning', 
      position: 'top-right',  
      autoClose: 5000, 
      closeButton: true,
      className: 'my-toast'
      });
  }
};

  const { user , setSelectedChat , chats , setChats } = ChatState();
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          label="Search Users to Chat"
          hasArrow
          placement="bottom-end"
        >
          <Button           ref={btnRef} colorScheme='teal' onClick={onOpen}
 variant={"ghost"} display={"flex"} gap={2}><i class="fa-solid fa-magnifying-glass"></i>            <Text display={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"} fontFamily={"Work sans"}>
          Talk-A-Tive
        </Text>

        <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
          <Menu>
            <MenuButton p={1}>
              <i class="fa-regular fa-bell"  style={{ fontSize: 25 }}></i>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button}>
              <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , gap:"5px"}}>
                <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                <>
                <i class="fa-solid fa-angle-down"></i>
                </>
              </div>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My profile</MenuItem>
               </ProfileModal>
              <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div> 

      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users to Chat</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
              >Go</Button>
            </Box>
            {loading ? 
              <>
                <ChatLoading />
              </>
              :
              (
                searchResult?.map(user =>
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}                  
                  />
                )
            ) 
            }
            {loadingchat && <Spinner ml="auto" display={"flex"}/>}
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
        <ToastContainer />
      </Drawer>
    </div>
  )
}

export default SideDrawer