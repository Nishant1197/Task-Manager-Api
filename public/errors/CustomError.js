class CustomApiError extends Error{
    constructor(message,status){
super(message)
this.status=status
    }
}


const createCustomError=(message,status)=>{
return new CustomApiError(message,status)
}

module.exports={createCustomError,CustomApiError}