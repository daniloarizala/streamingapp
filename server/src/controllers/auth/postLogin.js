import User from "../../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (user && (await bycrypt.compare(password, user.password))) {
            /** create JWT token */

            const token = jwt.sign(
                //user details to encrypt
                {
                    userId: user._id,
                    email: user.email,

                },

                //secret 
                process.env.TOKEN_KEY,
                // additional config
                {
                    expiresIn: "8h",
                }
            );
                
            return res.status(200).json({
                userDetails: {
                    email: user.email,
                    token,
                    username: user.username,
                },
            });
        }

        return res.status(400).send("Invalid credentials. Please Try again");

    } catch(err) {
        return res.status(500).send("Something went wrong. Please try again.");
    }
};