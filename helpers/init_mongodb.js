const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    dbName: process.env.DB_NAME,

})

.then(() =>{
    console.log('connected to mongoDB')
})
.catch((err)=> console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo DB')
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('disconnected from mongoDB')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})
