import { Code2, Wrench } from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiDart,
  SiFlutter,
  SiPhp,
  SiC,
  SiLinux,
  SiMarkdown,
  SiTailwindcss,
  SiNodedotjs,
  SiCplusplus,
} from "react-icons/si";

export interface SkillIconResult {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
}

export function getSkillIcon(skillName: string): SkillIconResult {
  const name = skillName.toLowerCase();

  // Frontend
  if (name.includes("html")) return { icon: SiHtml5, color: "text-orange-500" };
  if (name.includes("css")) return { icon: SiCss3, color: "text-blue-500" };
  if (name.includes("tailwind"))
    return { icon: SiTailwindcss, color: "text-cyan-400" };
  if (name.includes("javascript") || name.includes("js"))
    return { icon: SiJavascript, color: "text-yellow-400" };
  if (name.includes("typescript") || name.includes("ts"))
    return { icon: SiTypescript, color: "text-blue-400" };
  if (name.includes("react")) return { icon: SiReact, color: "text-cyan-400" };
  if (name.includes("next")) return { icon: SiNextdotjs, color: "text-white" };

  // Backend
  if (name.includes("node")) return { icon: SiNodedotjs, color: "text-green-500" };
  if (name.includes("express"))
    return { icon: SiExpress, color: "text-gray-300" };
  if (name.includes("prisma")) return { icon: SiPrisma, color: "text-white" };
  if (name.includes("postgresql") || name.includes("postgres"))
    return { icon: SiPostgresql, color: "text-blue-400" };
  if (name.includes("mongodb") || name.includes("mongo"))
    return { icon: SiMongodb, color: "text-green-500" };

  // Mobile
  if (name.includes("flutter"))
    return { icon: SiFlutter, color: "text-blue-400" };
  if (name.includes("dart")) return { icon: SiDart, color: "text-cyan-400" };

  // Tools & Others
  if (name.includes("docker")) return { icon: SiDocker, color: "text-blue-500" };
  if (name.includes("linux")) return { icon: SiLinux, color: "text-gray-300" };
  if (name.includes("markdown"))
    return { icon: SiMarkdown, color: "text-white" };
  if (name.includes("php")) return { icon: SiPhp, color: "text-indigo-400" };
  if (name.includes("java")) return { icon: Code2, color: "text-red-500" };
  if (name.includes("c++")) return { icon: SiCplusplus, color: "text-blue-500" };
  if (name === "c") return { icon: SiC, color: "text-blue-600" };

  // Default fallback
  return { icon: Wrench, color: "text-green-400" };
}
