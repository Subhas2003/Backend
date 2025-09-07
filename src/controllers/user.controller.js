import { asyncHandeler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloundinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandeler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exists:username,email
  //check for imahes, check for avater
  //upload them to cloudinary ,avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;
  console.log(email);

  //   if(fullName===""){
  //     throw new ApiError(400,"fullname is required ")
  //   }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUser=User.findOne({
    $or: [{ username }, { email }],
  });
  if(existedUser){
    throw new ApiError(409,"User with email or username")
  }

const avatarLocalPath=  req.files?.avatar[0]?.path
const coverImageLocalPath=req.files?.coverImage[0]?.path

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}

const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
        throw new ApiError(400,"Avatar file is required")
}

const user=await User.create(
   {
     fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
   }
)

const createduser=User.findById(user._id).select(
    " -password -refreshToken"
)
if(!createduser){
    throw new ApiError(500,"Something went wrong")
}
return res.status(201).json(
    new ApiResponse(200,createduser,"user register successfully")
)
});

export { registerUser };
