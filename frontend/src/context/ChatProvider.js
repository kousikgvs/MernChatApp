import {createContext, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const history = useHistory();
    const [chats , setChats] = useState([])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo)

        if (!userInfo) {
            history.push("/")
        }
    },[history])
 
    return (
        <ChatContext.Provider value={{user , setuser , selectedChat , setSelectedChat , chats , setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}
 
export default ChatProvider 