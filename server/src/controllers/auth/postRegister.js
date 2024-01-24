import User from "../../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        /** Make sure password is unique before saving to database */
        const emailExists = await User.exists({ email });
        const usernameExists = await User.exists({ username });

        if (emailExists) {
            return res.status(409).send("Email already exist");
        } else if (usernameExists) {
            return res.status(409).send("Username already exist");
        }

        /** Encrypt password before saving to database */
        const encryptedPassword = await bycrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        /** create JWT token */

        const token = jwt.sign(
            //user details to encrypt
            {
                userId: user._id,
                email,

            },

            //secret 
            process.env.TOKEN_KEY,
            // additional config
            {
                expiresIn: "8h",
            }
        );

        return res.status(201).json({
            userDetails: {
                email: user.email,
                username,
                token,
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occured. Pleas try again");
    }
};