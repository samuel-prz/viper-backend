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
    res.status(201).json(newUser.id);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on user.create' });
    console.log('Server error: ', error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: Number(id) } });
    if (user) { User.update({ id: parseInt(id) }, req.body); res.sendStatus(204); } else res.status(404).json({ message: 'findOne Function Error' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on user.update' });
    console.log('Server error: ', error);
  }
};

export const fetch = async (_req: Request, res: Response) => {
  try {
    const all = await User.find();
    if (all.length > 0) {
      const onlyActives = all.filter(all => all.isActive);
      res.status(200).json({ all, onlyActives });
    } else res.status(204).json();
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on user.get' });
    console.log('Server error: ', error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: Number(id), isActive: true } });
    if (user) {
      user.isActive = false;
      await User.save(user);
      res.status(204).json();
    } else res.status(404).json({ message: 'Usuario no encontrado...' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on user.delete' });
    console.log('Server error: ', error);
  }
};
