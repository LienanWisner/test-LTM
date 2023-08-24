import mongoose from "mongoose"

let Schema = mongoose.Schema

const MessageSchema = new Schema({
        content: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          required: true,
        }
      }, {
        versionKey: false
      },
      );

export default mongoose.model("Message", MessageSchema, "messages")