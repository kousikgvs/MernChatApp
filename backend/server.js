const express = require("express")
const chats = require("./data/data")
const app = express();
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatroutes = require("./routes/chatRoutes");
dotenv.config();

app.use(express.json());

app.get("/" , (req , res) => {
    res.send("API is Running");
})


app.use("/api/user", userRoutes);
app.use("/api/chat" , chatroutes)
app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server started at ${port}`)
)

connectDB();