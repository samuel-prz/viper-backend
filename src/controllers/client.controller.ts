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
    client.companyName = req.body.companyData.companyName;
    client.rnc = req.body.companyData.rnc;
    client.companyPhone = req.body.companyData.companyPhone;
    client.companyEmail = req.body.companyData.companyEmail;
    client.companyAddress = req.body.companyData.companyAddress;
    client.hasCompanyInfo = req.body.hasCompanyInfo;
    client.hasInfoCopied = req.body.hasInfoCopied;
    client.factDays = req.body.config.factDays;
    client.factAuto = req.body.config.factAuto;
    client.sendFact = req.body.config.sendFact;
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
