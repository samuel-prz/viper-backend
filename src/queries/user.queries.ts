import { getRepository } from "typeorm";
import { User } from '../models/User';

export const getUserByEmail= async (email: string) => {
    try {
        return await getRepository(User)
            .createQueryBuilder("user")
            .select("user")
            .addSelect("user.password") 
            .where("user.email = :email AND user.isActive = TRUE", { email })
            .getOne();
    } catch (error: any) {
        console.log(error)
    }
}    