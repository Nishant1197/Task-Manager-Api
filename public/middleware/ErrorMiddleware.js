const { CustomApiError } = require("../errors/CustomError")


const errorMiddleware=(err,req,res,next)=>{
   if(err instanceof CustomApiError){
       res.status(err.status).json({error:err.message})
   }
    
res.status(500).json({error:'Something went wrong!'})
}

module.exports=errorMiddleware