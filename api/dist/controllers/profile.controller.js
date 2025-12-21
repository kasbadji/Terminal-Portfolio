import { ProfileService } from "../services/profile.service.js";
export class ProfileController {
    static async getProfile(_req, res) {
        try {
            const profile = await ProfileService.getProfile();
            return res.json(profile);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to fetch profile" });
        }
    }
}
//# sourceMappingURL=profile.controller.js.map