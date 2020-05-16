const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../models/user")

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error("User exists already")
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      })

      const result = await user.save()
      return { ...result._doc, password: null }
    } catch (error) {
      throw error
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error("User does not exist")
      }
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error("Password is incorrect")
      }
      const token = jwt.sign(
        { userId: (await user).id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )
      return { userId: user.id, token: token, tokenExpiration: 1 }
    } catch (error) {
      throw error
    }
  },
}
