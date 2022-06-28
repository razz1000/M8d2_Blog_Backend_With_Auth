import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    /* readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    }, */
    content: {
      type: String,
      required: true,
    },
    comments: [{ text: String, rate: Number }],

    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
    likes: [{ userId: String }],
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
