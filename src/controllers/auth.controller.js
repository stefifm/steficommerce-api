import { User } from '../models'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

export const login = async (req, res) => {
    const user = new User(req.body)

    /* Match password */

    const userFound = await User.findOne({email: user.email})
    if (!userFound) {
        res.statusMessage = "User not found"
        return res.status(400).json({message: "User not found"})
    }

    const isMatch = await userFound.validPassword(user.password)
    
    if (!isMatch) {
        return res.status(401).json({message: "Invalid Password"})
    }

    jwt.sign({id: userFound._id}, SECRET, (err, token) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(token)
        }
    })
}

export const register = async (req, res) => {
    
    const user = new User(req.body)
    user.password = await user.generateHash(user.password)

    const userFound = await User.findOne({email: user.email})
    if (userFound) {
        res.statusMessage = "User already exists"
        return res.status(400).json({message: "User already exists"})
    }

    const newUser = await user.save()

    jwt.sign({id: newUser._id}, SECRET, (err, token) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(token)
        }
    })
    
}

export const profile = async (req, res) => {

    const user = await User.findOne({_id: req.userId}).select("-password")
    
    if (!user) return res.status(401).json({message: "User not found"})
    
    res.json(user)
}