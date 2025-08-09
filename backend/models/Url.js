import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_code: {
    type: String,
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated_at field before saving
urlSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
