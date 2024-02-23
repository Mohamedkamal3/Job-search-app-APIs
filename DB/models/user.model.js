import mongoose, { Schema, Types, model } from "mongoose";

export const userSchema = new Schema({
  firstName: { type: String, required: true, select: false },
  lastName: { type: String, required: true, select: false },
  userName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  recoveryEmail: String,
  DOB: Date,
  gender: String,
  mobileNumber: { type: String, unique: true },
  role: { type: String, enum: ["User", "Company_HR"], default: "User", required: true },
  online: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  isConfirmed: { type: Boolean, default: false },
  forgetCode: { type: String,unique: true},  
  companyID: { type: Types.ObjectId, ref: "Company" },
},

  {
    timestamps: true
  }

)
userSchema.pre('save', function (next) {
  // Check if both firstName and lastName are present before setting userName
  if (this.firstName && this.lastName) {
    // Ensure that firstName and lastName are strings
    const firstName = String(this.firstName);
    const lastName = String(this.lastName);

    // Concatenate and set userName to lowercase
    this.userName = (firstName + "_" + lastName).toLowerCase();
  }

  next();
});


export const User = mongoose.model("User", userSchema);

