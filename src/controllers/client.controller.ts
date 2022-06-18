import { Request, Response } from 'express';
import { Client } from '../models/Client';

export const create = async (req: Request, res: Response) => {
  try {
    const client = new Client();
    client.name = req.body.name;
    client.nickname = req.body.nickname;
    client.cedula = req.body.cedula;
    client.phone = req.body.phone;
    client.email = req.body.email;
    client.address = req.body.address;
    client.companyName = req.body.companyName;
    client.rnc = req.body.rnc;
    client.companyPhone = req.body.companyPhone;
    client.companyEmail = req.body.companyEmail;
    client.companyAddress = req.body.companyAddress;
    client.hasCompanyInfo = req.body.hasCompanyInfo;
    client.hasInfoCopied = req.body.hasInfoCopied;
    client.factDays = req.body.factDays;
    client.factAuto = req.body.factAuto;
    client.sendFact = req.body.sendFact;
    client.sendNotification = req.body.sendNotification;
    client.isActive = true;
    const newClient = await client.save();
    res.status(201).json({ message: 'success', client: newClient });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log('Server error: ', error);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    console.log('getAll');
    const clients = await Client.find({ where: { isActive: true } });
    res.status(200).json({ clients });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log('Server error: ', error);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ where: { id: Number(id), isActive: true } });
    if (client) res.status(200).json({ client });
    else res.status(404).json({ message: 'Usuario no encontrado...' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log('Server error: ', error);
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ where: { id: Number(id) } });
    if (client) {
      client.isActive = false;
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else res.status(404).json({ message: 'Usuario no existe...' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log('Server error: ', error);
  }
};
