const exprees=require('express')
require('dotenv').config()
const connectDb = require('./public/db/connect')
const notFound = require('./public/middleware/NotFound')
const app=exprees()
const tasksRoutes=require('./public/routes/tasks')
const errorMiddleware=require('./public/middleware/ErrorMiddleware')

//middleware
app.use(exprees.json())


//routes

app.use('/api/v1/tasks',tasksRoutes)

app.use(notFound)
app.use(errorMiddleware)

const start=async()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(7000,()=>{
            console.log(" Connected to db: Server is listeining to port number 7000");
        } )
    }
    catch(err){
        console.log("err while connecting to db ::",err);
    }
  
}

start()


  


