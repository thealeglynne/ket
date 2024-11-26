import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  isModerator: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
