const ProfileModel = require("../models/Profile");

// To get data of a single profile based on userID
module.exports.profileData = async(req,res)=>{    
  const email=req.cookies.email;
  console.log(req.cookies.email);
  const foundUser=await ProfileModel.findOne({email: email});
  if(foundUser)
    res.json({status:"ok", foundUser});
  else{
    res.json({status: "fail"});
  }
}

module.exports.UpdateVaccinations= async(req,res)=>{
  const email=req.cookies.email;

  const foundUser=await ProfileModel.findOne({email:email}, {vaccinations:1});

  const userVaccinations=foundUser.vaccinations;
  userVaccinations.unshift(req.body.visit);
  const updatedProfile = await ProfileModel.updateOne(
    {email: email},
    { $set: {vaccinations: userVaccinations} },
  );

  res.json({status:"ok"});
}

module.exports.UpdateProfile = async(req,res) =>{
  try {
    const { name, dob, bio, breed, gender, address } = req.body;
    const {height, weight, allergies, conditions, vetName, vetNumber, vetAddress} = req.body;
    // const imageFilePath = req.file.path;
    // const cldRes = await handleUpload(imageFilePath);
    const email = req.cookies.email;

    const updatedFields = {
      name,
      dob,
      breed,
      gender,
      bio,
      address,
      height, 
      weight, 
      allergies, 
      conditions, 
      vetName, 
      vetNumber, 
      vetAddress,
      // image: cldRes.secure_url
    };

    const updatedProfile = await ProfileModel.updateOne(
      {email: email},
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile Data Updated", profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating profile data." });
  }
}
