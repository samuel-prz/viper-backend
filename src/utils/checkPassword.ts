import bcrypt from 'bcryptjs';

const checkPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default checkPassword;
