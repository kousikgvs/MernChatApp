import React, { useEffect } from 'react'; // Import useEffect directly
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = React.useState([]); // State to store fetched chats

  useEffect(() => {
    const fetchChats = async () => {
      const data = await axios.get("/api/chat");
      setChats(data.data); // Update state with fetched data
      console.log(data)
    };

    fetchChats();
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      ChatPage
      {/* Render fetched chats here */}
      {chats.map((chat) => (
        <div key={chat.id}>{chat.chatName}</div> // Example rendering
      ))}
    </div>
  );
};

export default ChatPage;
