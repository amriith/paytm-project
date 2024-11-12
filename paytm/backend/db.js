const mongoose= require ("mongoose");

mongoose.connect('mongodb://localhost:27017/paytm');


const userSchema = mongoose.schema({

    username : String,
    password : String,
    firstName : String,
    lastName : String

})

const accountSchema = new mongoose.schema({

    userId: {
        type: mongoose.Schemas.Type.ObjectId,
        ref: 'User',
        required:true
        
    },
    balance: {
         type:number,
         required:true
    }
})

const User = mongoose.model ("User", userSchema )
const Account = mongoose.model ("Account", accountSchema)
module.exports ={
    User,
    Account
}