export declare class ProjectService {
    static listProjects(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectName: string;
        projectSlug: string;
        projectDescription: string;
        technologiesUsed: string[];
        githubRepositoryUrl: string | null;
        liveDemoUrl: string | null;
        isFeatured: boolean;
    }[]>;
    static getProjectBySlug(projectSlug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectName: string;
        projectSlug: string;
        projectDescription: string;
        technologiesUsed: string[];
        githubRepositoryUrl: string | null;
        liveDemoUrl: string | null;
        isFeatured: boolean;
    } | null>;
}
//# sourceMappingURL=project.service.d.ts.map