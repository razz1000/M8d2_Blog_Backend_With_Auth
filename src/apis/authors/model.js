import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const AuthorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  {
    timestamps: true,
  }
);

AuthorSchema.pre("save", async function (next) {
  // BEFORE saving the user in db, execute a function (in this case hash the password)
  // I am NOT using arrow functions here because of "this"

  const currentAuthor = this; // "this" here represents the current user I am trying to save in db
  const plainPW = this.password;

  if (currentAuthor.isModified("password")) {
    // only if the user is modifying the password I will use some CPU cycles to calculate the hash, otherwise they would be just wasetd
    const hash = await bcrypt.hash(plainPW, 11);
    currentAuthor.password = hash;
  }

  next();
});

AuthorSchema.methods.toJSON = function () {
  // this toJSON method will be used EVERY TIME Express does a res.send(user/s)
  // we could override the behaviour of this method to remove the password from the user and then return him/her

  const authorDocument = this;
  const authorObject = authorDocument.toObject();

  delete authorObject.password;
  delete authorObject.__v;

  return authorObject;
};

// Custom Mongoose method --> Check Credentials

AuthorSchema.static("checkCredentials", async function (email, plainPW) {
  // This is a custom method that given email and password will return the User if credentials are fine or null if they are not

  // 1. Find the user by email
  const author = await this.findOne({ email }); // "this" here refers to the authorsModel

  if (author) {
    // 2. If the email is found --> compare plainPW with the hashed one
    const isMatch = await bcrypt.compare(plainPW, author.password);
    if (isMatch) {
      // 3. If they do match --> return the author
      return author;
    } else {
      return null;
    }
  } else {
    // 4. In case of either email not found or password not correct --> return null
    return null;
  }
});

export default model("Author", AuthorSchema);
