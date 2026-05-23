const userModel = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailVerificationModel = require("../model/otpModel");
const sendEmail = require("../utils/sendEmail");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, phone, role } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "user already exist",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const userData = new userModel({
        name,
        email,
        password: hashPassword,
        phone,
        role,
      });
      const result = await userData.save();
      await sendEmail(req, result);
      if (result) {
        return res.status(httpStatusCode.CREATED).json({
          success: true,
          message: "User Added successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkUser = await userModel.findOne({ email });
      if (!checkUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "invalid credential",
        });
      }
      const checkPassowrd = await bcrypt.compare(password, checkUser.password);
      if (!checkPassowrd) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "wrong password",
        });
      }
      if (!checkUser.isVarified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User not varified",
        });
      }

      const accessToken = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5m" },
      );
      const refreshToken = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );
      checkUser.refreshToken = refreshToken;
      await checkUser.save();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User Logedin Successfully",
        data: {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      if (!refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token missing",
        });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }
      if (user.refreshToken !== refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          newAccessToken: newAccessToken,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "All fields are required",
        });
      }
      const checkUser = await userModel.findOne({ email });
      if (!checkUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "invalid credential",
        });
      }
      if (checkUser.isVarified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already varified",
        });
      }
      const emailVerification = await emailVerificationModel.findOne({
        userId: checkUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!checkUser.isVarified) {
          await sendEmail(req, checkUser);
          return res.status(httpStatusCode.BAD_REQUEST).json({
            status: false,
            message: "Invalid OTP, new OTP sent to your email",
          });
        }
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ status: false, message: "Invalid OTP" });
      }
      const currentTime = new Date();
      const expireTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000,
      );
      if (currentTime > expireTime) {
        await sendEmail(req, checkUser);
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: "failed",
          message: "OTP expired, new OTP sent to your email",
        });
      }
      checkUser.isVarified = true;
      await checkUser.save();
      await emailVerificationModel.deleteMany({ userId: checkUser._id });
      return res
        .status(httpStatusCode.OK)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async dashboard(req, res) {
    try {
      const result = await userModel.find();
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "dashboard opened successfully",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async profile(req, res) {
    try {
      const user = await userModel.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Profile fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AuthController();
