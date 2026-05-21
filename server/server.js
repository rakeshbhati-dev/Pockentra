const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')

const PORT = process.env.PORT
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log('Server is running.')
        })
    } catch (error) {
        console.log('Failed to start server.', error)
    }
}

startServer()