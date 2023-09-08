const ProfileModel = require("../models/Profile");

// To get data of a single profile based on userID
module.exports.profileData = async(req,res)=>{    
  const userID=req.body.userID;

  const foundUser=await ProfileModel.findOne({_id:userID});
  if(foundUser)
    res.json({status:"ok", foundUser});
  else{
    res.json({status: "fail"});
  }
}


module.exports.UpdateProfile = async(req,res) =>{
  try {
    const { name, dob, bio, breed, gender, address } = req.body;
    const {height, weight, allergies, conditions, vetName, vetNumber, vetaddress} = req.body;
    // const imageFilePath = req.file.path;
    // const cldRes = await handleUpload(imageFilePath);
    const userID = req.cookies.userID;

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
      vetaddress
      // image: cldRes.secure_url
    };

    const updatedProfile = await ProfileModel.updateOne(
      {_id: userID},
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
