import { User } from "../../../DB/models/user.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendEmails } from "../../utils/sendEmails.js";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";


export const signUp = asyncHandler(async (req, res, next) => {

    if (req.body.password !== req.body.confirmPassword) {
        return next(new Error("Passwords must match !!"))
    }

    const isUser = await User.findOne({ email: req.body.email })

    if (isUser) {
        return next(new Error("User already existed !!"))
    }
    // hashSync issue {windows}
    const hashPassword = bcryptjs.hashSync(req.body.password, parseInt(process.env.SALT_ROUND))

    const userName = (req.body.firstName + req.body.lastName).toLowerCase();

    const user = await User.create({ ...req.body, password: hashPassword })

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY)

    const Sent = await sendEmails({
        to: user.email,
        subject: "Account Activation ",
        html: `<a href='http://localhost:4000/user/ActivateAccount/${token}'>Click to Activate</a>`,

    })
    if (!Sent) return next(new Error("Email is invalid !!"))

    return res.json({ success: true, message: "Sign Up successfully", results: { user } })
})

export const signIn = asyncHandler(async (req, res, next) => {



    const isUser = await User.findOne({ email: req.body.email })

    if (!isUser) {
        return next(new Error("You have entered a wrong E-mail"))
    }

    if (!isUser.isConfirmed) {
        return next(new Error("Please activate your account "))
    }
    const match = bcryptjs.compareSync(req.body.password, isUser.password)

    if (!match) {
        return next(new Error("Password is incorrect"))
    }
    const token = jwt.sign({ id: isUser._id, email: isUser.email }, process.env.SECRET_KEY)

    await Token.create({ token, user: isUser._id, agent: req.headers["user-agent"] })
   
    return res.json({ success: true, message: "login successfully !!", token })



});


export const changePassword = asyncHandler(async (req, res, next) => {


    const isUser = await User.findById(req.payload.id);

    const match = bcryptjs.compareSync(req.body.password, isUser.password)
    if (!match) {
        return next(new Error("Current password is incorrect."));
    }
    const hashedPassword = await bcryptjs.hash(req.body.newPassword, parseInt(process.env.SALT_ROUND))

    isUser.password = hashedPassword;
    await isUser.save();
    return res.json({ success: true, message: "Password Updated successfully !!", results: { isUser } })

})

export const updateAccount = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.payload.id);

    user.mobileNumber = req.body.mobileNumber
    await user.save();

    return res.json({ success: true, message: "Account Updated successfully !!", results: { user } })


});

export const deleteUser = asyncHandler(async (req, res, next) => {

    const user = req.payload.id;
    const isUser = await User.findByIdAndDelete(user)

    return res.json({ success: true, message: "User Deleted successfully !!" })


});

export const softDelete = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.payload.id)
    user.deleted = true
    await user.save();
    return res.json({ success: true, message: "User soft-deleted successfully!" });


})

export const logout = asyncHandler(async (req, res, next) => {

    const { token } = req.headers

    await Token.findOneAndUpdate({ token }, { isValid: false })

    return res.json({ success: true, message: "Logged Out!!" })


})

export const ActivateAccount = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOneAndUpdate({ email: payload.email }, { isConfirmed: true }, { new: true })

    return res.json("Account Activated successfully !")
})


export const sendForgetCode = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new Error("User not Found!!"))
    }
    if (!user.isConfirmed) {
        return next(new Error("Account is not activated!!"))
    }
    const code = randomstring.generate({ length: 5, charset: 'alphanumeric' })

    user.forgetCode = code;
    await user.save()

    const Sent = sendEmails({ to: user.email, subject: "Reset Code", html: `<d>${code}</d>` })

    if (!Sent) return next(new Error("Email is invalid !!"))
    return res.json({ success: true, message: "You can use the code to reset your password !!" })

})

export const resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return next(new Error("User not found !!"))

    if (user.forgetCode !== req.body.code)
        return next(new Error("invalid Code !!"))

    await User.findOneAndUpdate({ email: req.body.email }, { $unset: { forgetCode: 1 } })

    user.password = bcryptjs.hashSync(req.body.password, parseInt(process.env.SALT_ROUND))
    await user.save();

    const token = await Token.find({ user: user._id })

    token.forEach(async (token) => {
        token.isValid = false
        await token.save()
    })
    return res.json({ success: true, message: "Password Reset Successfully !! " })
})

export const getAccount = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.payload.id)

    if (!user) return next(new Error("user Not found!!"))

    return res.json({ success: true, results: { user } })

})

export const getProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const user = await User.findById(id).select('firstName lastName email DOB gender mobileNumber')

    if (!user) return next(new Error("User Not found !"))

    return res.json({ success: true, results: { user } })


})

export const findByRecoveryEmail = asyncHandler(async (req, res, next) => {
    const recoveryEmail = req.query.recoveryEmail

    const users = await User.find({ recoveryEmail })

    if (!users || users.length === 0) return next(new Error("No accounts found for this recovery email"))
    return res.json({ success: true, results: { users } })

})
