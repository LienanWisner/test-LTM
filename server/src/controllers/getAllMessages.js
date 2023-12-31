import Message from "../models/Message.js";

const getAllMessages = async(req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export default getAllMessages