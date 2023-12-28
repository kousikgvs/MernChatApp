import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  ModalCloseButton,
  FormControl,
  Input,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    } 
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(`Error Occurred: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        closeButton: true,
        className: 'my-toast',
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast.warning('Please Fill All the Fields', {
        position: 'top-right',
        autoClose: 5000,
        closeButton: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      }, config);

      setChats([...chats, data]);
      onClose();
      toast.success('Group Chat Created Successfully', {
        position: 'top-right',
        autoClose: 5000,
        closeButton: true,
        className: 'my-toast',
      });
    } catch (error) {
      toast.error(`Error Occurred: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        closeButton: true,
        className: 'my-toast',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((user) => user._id === userToAdd._id)) {
      toast.warning('User already added', {
        position: 'top-right',
        autoClose: 5000,
        closeButton: true,
        className: 'my-toast',
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'35px'} fontFamily={'Work sans'} display={'flex'} justifyContent={'center'}>
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir={'column'} alignItems={'center'}>
            <FormControl>
              <Input placeholder="Chat name" mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users name" mb={1} onChange={(e) => handleSearch(e.target.value)} />
              <Box w="100%" display={'flex'} flexWrap={'wrap'}>
                {selectedUsers.map((u) => (
                  <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                ))}
              </Box>
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                ))
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}; 

export default GroupChatModel;
