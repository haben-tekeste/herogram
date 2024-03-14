import mongoose, { Schema } from "mongoose";
const FileSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  }
});


export  const FileData = mongoose.model("File", FileSchema);