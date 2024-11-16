const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const router = express.Router();
const { User } = require("../db");
const { Account } = require("../db");
const { JWT_SECRET } = require("../config"); 
const authMiddleware = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email Id Already Exists / Invalid Inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email Id already Exists / Invalid Inputs"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName // fixed `lastName` instead of `LastName`
    });

    const userId = user._id;

    const account = await Account.create({
        userId: userId, // associate account with the user
        balance: 1 + Math.random() * 10000 // fixed `Math.Random()` to `Math.random()`
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "Success",
        token: token
    });
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Please input your correct username and password"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            token: token
        });
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid inputs, please try again."
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.status(200).json({
        message: "User details updated."
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } }, // case-insensitive search
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username, // fixed to match schema `username` instead of `userName`
            firstname: user.firstName,
            lastname: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;