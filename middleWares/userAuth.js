const User=require('/models/userSchema')

const verifyUser=async(req,res)=>{
    if(req.session.logged){
        const email=req.session.EMAIL
        const userData=await User.findOne({email:email})
        if(userData&&userData.Status=== false ){
            req.session.loggedin=false
           return res.redirect('/')
        }

    }
}