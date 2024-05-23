const Signup = require ('../models/user/signup');

const signup= (req,res)=>{
    res.render('user/signup');
}
const login = (req,res)=>{
    res.render('user/login');
}
const index = (req,res)=>{
    res.render('user/index')
 }
 const dashBoard = (req,rse) =>{
    res.render('user/adminDashboard');
}

const saveSignup = async (req,res)=>{
    const {email, username,password} = req.body;
    

try{
   const signupCheck = await Signup.findOne({Email: email});
   if(signupCheck){
    return res.render('user/signup', { error: 'Email already exists. Please use a different email.' });
    }
    const newSignup = new Signup({
        Email: email,
        Username:username,
        Password: password,

    });
    await newSignup.save();
    console.log('User successfully signed up:', newSignup);
    res.redirect('/login');
   
}
catch (error) {
    console.log('Error login:', error);
    res.status(500).json({ error: 'Error saving signup data' });
}
}




const checkLogin = async (req,res)=>{
    const admin='admin@123';
    const adminPassword='admin123';
   const {email,password} =req.body;
   try{
    const user = await Signup.findOne({Email:email,Password:password})
    if(user){
        res.redirect('/home');
        return;
    }
     if(email==admin && password==adminPassword){
        return res.render('user/adminDashboard');
      
    }
    res.redirect('/'); 
   }
   catch (error) {
    console.log('Error verifying login:', error);
    res.status(500).json({ error: 'Error verifying login' });

   }


} 



module.exports = {
    login,
    index,
    saveSignup,
    signup,
    checkLogin,
    dashBoard
};
