import type { Locale } from "./config";
import { profile, experience, education, skills, externalPosts, projects } from "@/lib/data";

// Lazy-load locale overlays
async function loadDataOverlay(locale: Locale) {
  if (locale === "en") return null;
  if (locale === "zh") return import("./data/zh");
  return import("./data/ja");
}

async function loadPostOverlay(locale: Locale) {
  if (locale === "en") return null;
  if (locale === "zh") return import("./posts/zh");
  return import("./posts/ja");
}

async function loadProjectOverlay(locale: Locale) {
  if (locale === "en") return null;
  if (locale === "zh") return import("./projects/zh");
  return import("./projects/ja");
}

export async function getLocalizedProfile(locale: Locale) {
  const overlay = await loadDataOverlay(locale);
  if (!overlay) return profile;
  return { ...profile, ...overlay.profileOverlay };
}

export async function getLocalizedExperience(locale: Locale) {
  const overlay = await loadDataOverlay(locale);
  if (!overlay) return experience;
  return experience.map((exp, i) => ({
    ...exp,
    roles: exp.roles.map((role, j) => ({
      ...role,
      ...(overlay.experienceOverlay[i]?.roles[j] ?? {}),
    })),
  }));
}

export async function getLocalizedEducation(locale: Locale) {
  const overlay = await loadDataOverlay(locale);
  if (!overlay) return education;
  return education.map((edu, i) => ({
    ...edu,
    ...(overlay.educationOverlay[i] ?? {}),
  }));
}

export async function getLocalizedSkills(locale: Locale) {
  const overlay = await loadDataOverlay(locale);
  if (!overlay) return skills;
  const result: Record<string, string[]> = {};
  for (const [category, items] of Object.entries(skills)) {
    const translatedCategory = overlay.skillCategoryOverlay[category] ?? category;
    result[translatedCategory] = items;
  }
  return result;
}

export async function getLocalizedPosts(locale: Locale) {
  const overlay = await loadPostOverlay(locale);
  if (!overlay) return externalPosts;
  return externalPosts.map((post, i) => ({
    ...post,
    ...(overlay.postOverlays[i] ?? {}),
  }));
}

export async function getLocalizedProjects(locale: Locale) {
  const overlay = await loadProjectOverlay(locale);
  if (!overlay) return projects;
  return projects.map((project, i) => {
    const po = overlay.projectOverlays[i];
    if (!po) return project;
    return {
      ...project,
      tagline: po.tagline ?? project.tagline,
      description: po.description ?? project.description,
      problemStatement: {
        ...project.problemStatement,
        title: po.problemStatement?.title ?? project.problemStatement.title,
        subtitle: po.problemStatement?.subtitle ?? project.problemStatement.subtitle,
        areas: project.problemStatement.areas.map((area, j) => ({
          ...area,
          ...(po.problemStatement?.areas?.[j] ?? {}),
        })),
      },
      personas: project.personas.map((persona, j) => ({
        ...persona,
        ...(po.personas?.[j] ?? {}),
        goals: po.personas?.[j]?.goals ?? persona.goals,
      })),
      journey: {
        title: po.journey?.title ?? project.journey.title,
        steps: project.journey.steps.map((step, j) => ({
          ...step,
          ...(po.journey?.steps?.[j] ?? {}),
        })),
      },
      userStories: project.userStories.map((story, j) => ({
        ...story,
        ...(po.userStories?.[j] ?? {}),
      })),
      features: project.features.map((feature, j) => ({
        ...feature,
        ...(po.features?.[j] ?? {}),
      })),
      architecture: {
        ...project.architecture,
        insights: project.architecture.insights.map((insight, j) => ({
          ...insight,
          ...(po.architecture?.insights?.[j] ?? {}),
        })),
      },
    };
  });
}
