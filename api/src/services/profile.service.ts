import { prisma } from "../lib/prisma.js";

export class ProfileService {
  static async getProfile() {
    return prisma.profile.findFirst();
  }
}
