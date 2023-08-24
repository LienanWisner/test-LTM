import Message from "../models/Message.js";

const SaveMessages = async (req,res)=>{    
        try {
          const { content, sender } = req.body;
          if(content && sender){
              const newMessage = new Message({ content, sender });
              await newMessage.save();
              res.status(201).json(newMessage);
          } else return res.status(400).send("One field missing")
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });
        }
      }

export default SaveMessages