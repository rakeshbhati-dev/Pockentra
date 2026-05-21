const mongoose=require('mongoose');
const databaseURL=process.env.DB_URL

const connectDB=async()=>{
    try {
        await mongoose.connect(databaseURL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Failed to connect to Database: ',error)
        process.exit(1)
    }
}

module.exports=connectDB