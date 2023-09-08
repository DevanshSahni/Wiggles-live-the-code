require("dotenv").config();
const QrModel = require("../models/QRMessage");

module.exports.QrCode = async(req,res) =>{
    try {
        const { message,contactNumber,alternateNumber } = req.body;
        //   const userID = req.cookies.userID;
      const Qrmessage = new QrModel({ message,contactNumber,alternateNumber
        // id: userID, 
    });
      await Qrmessage.save();
      res.status(201).json({ message: 'Message saved successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving message' });
    }
  }
  
  module.exports.UpdateMessage = async(req,res) =>{
    try {
      const { objectId } = req.params;
      const { text } = req.body;
      const message = await QrModel.findOneAndUpdate({ objectId }, { text }, { new: true });
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ message: 'Message updated successfully', updatedMessage: message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating message' });
    }
  }