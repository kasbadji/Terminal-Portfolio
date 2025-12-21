export declare function listSkills(): Promise<{
    id: string;
    createdAt: Date;
    name: string;
    category: string | null;
    level: string | null;
}[]>;
export declare function createSkills(skills: {
    name: string;
    category?: string | null;
    level?: string | null;
}[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
//# sourceMappingURL=skill.service.d.ts.map