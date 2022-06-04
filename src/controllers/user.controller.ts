import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const create = async (req: Request, res: Response) => {
  try {
    const user = new User();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.username = req.body.username;
    user.isActive = true;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.email = req.body.email;
    const newUser = await user.save();
    res.status(201).json({ message: 'success', user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log('Server error: ', error);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({ where: { isActive: true } });
    res.status(200).json({ users });
  } catch (error: any) {
    console.log('Server error: ', error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: Number(id), isActive: true } });
    if (user) res.status(200).json({ user });
    else res.status(404).json({ message: 'Usuario no encontrado...' });
  } catch (error: any) {
    console.log('Server error: ', error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: Number(id) } });
    if (user) {
      user.isActive = false;
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else res.status(404).json({ message: 'Usuario no existe...' });
  } catch (error) {
    console.log('Server error: ', error);
  }
};
