import { Request, Response } from 'express';
import { Client } from '../models/Client';

export const create = async (req: Request, res: Response) => {
  try {
    const client = new Client();
    const { name, cedula, phone, address, email, nickname, companyName, rnc, companyPhone, companyEmail, companyAddress, factDays, factAuto, sendFact, sendNotification, hasCompanyInfo, hasInfoCopied } = req.body;
    client.name = name;
    client.nickname = nickname;
    client.cedula = cedula;
    client.phone = phone;
    client.email = email;
    client.address = address;
    client.companyName = companyName;
    client.rnc = rnc;
    client.companyPhone = companyPhone;
    client.companyEmail = companyEmail;
    client.companyAddress = companyAddress;
    client.hasCompanyInfo = hasCompanyInfo;
    client.hasInfoCopied = hasInfoCopied;
    client.factDays = factDays;
    client.factAuto = factAuto;
    client.sendFact = sendFact;
    client.sendNotification = sendNotification;
    client.isActive = true;
    const newClient = await client.save();
    res.status(201).json({ currentId: newClient.id });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on client.create' });
    console.log('Server error: ', error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ where: { id: Number(id), isActive: true } });
    if (client) { Client.update({ id: parseInt(id) }, req.body); res.sendStatus(204); } else res.status(404).json({ message: 'findOne Function Error' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on client.update' });
    console.log('Server error: ', error);
  }
};

export const fetch = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find({ where: { isActive: true } });
    if (clients.length > 0) { res.status(200).json(clients); } else { res.status(404).json({ message: 'No Client Active Error' }); }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on client.fecth' });
    console.log('Server error: ', error);
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ where: { id: Number(id), isActive: true } });
    if (client) {
      client.isActive = false;
      await Client.save(client);
      res.sendStatus(204);
    } else res.status(404).json({ message: 'Usuario no encontrado...' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error on client.delete' });
    console.log('Server error: ', error);
  }
};
