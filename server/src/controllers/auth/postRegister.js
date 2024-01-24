import User from "../../models/User.js";

export const postRegister = async (req, res) => {
    const user = await User.create({
        username: "Arizala",
        email: "arizala@gmail.com",
        password: "password123",
    });

    return res.send("Awesome... User added to database");
};