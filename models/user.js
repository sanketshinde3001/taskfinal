// // import mongoose, { Schema, models } from "mongoose";

// // const userSchema = new Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: true,
// //     },
// //     email: {
// //       type: String,
// //       required: true,
// //       unique : true
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //     },
// //     role: {
// //       type: String,
// //       enum: ['admin', 'user'],
// //       default: 'user', // Default role is user
// //     },
// //   },
// //   { timestamps: true }
// // );

// // const User = models.User || mongoose.model("User", userSchema);
// // export default User; 




// import mongoose, { Schema, models } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique : true
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['admin', 'user'],
//       default: 'user', // Default role is user
//     },
//   },
//   { timestamps: true }
// );

// const User = models.User || mongoose.model("User", userSchema);
// export default User; 



import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user', // Default role is user
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User; 