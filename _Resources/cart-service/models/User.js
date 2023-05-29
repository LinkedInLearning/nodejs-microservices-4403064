const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = mongoose.Schema(
  {
    email: {
      // Trim and lowercase
      type: String,
      required: true,
      index: { unique: true },
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    salt: {
      type: String
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function preSave(next) {
  const user = this;

  if (user.isModified("password")) {
    // Generating a random salt for each user
    return crypto.randomBytes(16, (err, salt) => {
      if (err) return next(err);

      const saltHex = salt.toString("hex");
      user.salt = saltHex;

      // Using PBKDF2 to hash the password
      return crypto.pbkdf2(
        user.password,
        salt,
        100000,
        64,
        "sha512",
        (pkerr, derivedKey) => {
          if (pkerr) return next(pkerr);
          user.password = derivedKey.toString("hex");
          return next();
        }
      );
    });
  }
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  // Using PBKDF2 to hash the candidate password and then compare it with the stored hash
  crypto.pbkdf2(
    candidatePassword,
    this.salt,
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
      if (err) return callback(err);
      return callback(null, derivedKey.toString("hex") === this.password);
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
