import React from "react";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { terminalTheme, terminalAnimations } from "../../styles/terminal-theme";
import { getSkillIcon } from "../../lib/terminal/icons";
import { groupSkillsByCategory, sortCategories, parseLevel } from "../../lib/terminal/utils";
import type { Skill } from "../../lib/terminal/types";

interface SkillsOutputProps {
  skills: Skill[];
}

export function SkillsOutput({ skills }: SkillsOutputProps) {
  const groups = groupSkillsByCategory(skills);
  const orderedCategories = sortCategories(groups);

  return (
    <div className={terminalTheme.skills.container}>
      {orderedCategories.map((category, catIdx) => {
        const Icon = Code2;
        return (
          <motion.div
            key={category}
            {...terminalAnimations.skillCategory(catIdx)}
            className={terminalTheme.skills.categoryContainer}
          >
            {/* Category Header */}
            <div className={terminalTheme.skills.categoryHeader}>
              <Icon
                className={terminalTheme.skills.categoryIcon}
                style={{ color: "var(--term-accent, #06b6d4)" }}
              />
              <h3
                className={terminalTheme.skills.categoryTitle}
                style={{ color: "var(--term-accent, #06b6d4)" }}
              >
                {category}
              </h3>
            </div>

            {/* Skills in this category */}
            <div className={terminalTheme.skills.skillsContainer}>
              {groups[category].map((skill, skillIdx) => {
                const { icon: SkillIcon, color } = getSkillIcon(skill.name);
                const levelNum = parseLevel(skill.level);

                return (
                  <motion.div
                    key={skill.name}
                    {...terminalAnimations.skillRow(catIdx, skillIdx)}
                    className={terminalTheme.skills.skillRow}
                  >
                    {/* Skill Icon */}
                    <SkillIcon
                      className={`w-4 h-4 shrink-0 ${color}`}
                      size={16}
                    />

                    {/* Skill Name */}
                    <span
                      className={terminalTheme.skills.skillName}
                      style={{ color: "var(--term-fg, #e5e7eb)" }}
                    >
                      {skill.name}
                    </span>

                    {/* Level Badge & Progress Bar */}
                    {levelNum !== null ? (
                      <div className={terminalTheme.skills.skillLevelContainer}>
                        {/* Badge */}
                        <span
                          className={terminalTheme.skills.skillBadge}
                          style={{
                            backgroundColor:
                              "rgba(var(--term-accent-rgb, 6, 182, 212), 0.2)",
                            color: "var(--term-accent, #06b6d4)",
                            border:
                              "1px solid rgba(var(--term-accent-rgb, 6, 182, 212), 0.3)",
                          }}
                        >
                          {skill.level}
                        </span>

                        {/* Progress Bar */}
                        <div
                          className={terminalTheme.skills.progressBarContainer}
                          style={{
                            background:
                              "var(--term-bar-bg, rgba(55, 65, 81, 0.5))",
                          }}
                        >
                          <motion.div
                            {...terminalAnimations.skillProgressBar(
                              catIdx,
                              skillIdx,
                              levelNum
                            )}
                            className={terminalTheme.skills.progressBar}
                            style={{
                              background:
                                "var(--term-bar-fill, linear-gradient(to right, #10b981, #06b6d4))",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span
                        className={terminalTheme.skills.noLevel}
                        style={{ color: "var(--term-muted, #9ca3af)" }}
                      >
                        —
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
