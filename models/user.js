const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  // If the password is not modified, proceed to the next middleware
  if (!this.isModified("password")) return next();

  try {
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Instance method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
