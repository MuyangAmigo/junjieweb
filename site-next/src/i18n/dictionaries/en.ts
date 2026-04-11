const dict = {
  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    posts: "Posts",
  },
  home: {
    heroHeading: "Building developer tools that empower millions.",
    heroSubtitle:
      "Senior Product Manager at Microsoft. Bridging my engineering roots with product strategy to turn complex AI capabilities into tools developers love.",
    currentFocus:
      "Currently building: AI agents powered by GitHub Copilot in AI Toolkit",
    aboutMe: "About me",
    totalInstalls: "Total Installs",
    peakMau: "Peak MAU",
    toolkitsLaunched: "Toolkits Launched",
    selectedWork: "Selected Work",
    viewAll: "View all",
    viewCaseStudy: "View Case Study",
    latestWriting: "Latest Writing",
    read: "Read",
    readAllPosts: "Read all posts",
    aiToolkitSummary:
      "Reducing AI integration complexity for developers \u2014 unified model discovery, agent building, and deployment inside VS Code.",
    m365ToolkitSummary:
      "Eliminating M365 developer boilerplate \u2014 one-command scaffolding, auth, and deployment for Teams, Copilot, and Outlook agents.",
  },
  about: {
    introduction: "Introduction",
    workExperience: "Work Experience",
    education: "Education",
    technicalSkills: "Technical Skills",
  },
  work: {
    projects: "Projects",
    readCaseStudy: "Read case study",
    backToProjects: "Back to projects",
    relatedProjects: "Related projects",
    problemStatement: "Problem Statement",
    userPersonas: "User Personas",
    userJourney: "User Journey",
    userStories: "User Stories",
    features: "Features",
    technicalArchitecture: "Technical Architecture",
    primaryUser: "Primary User",
    secondaryUser: "Secondary User",
    extendedUser: "Extended User",
    painPoint: "Pain point",
    vsCodeMarketplace: "VS Code Marketplace",
    github: "GitHub",
  },
  posts: {
    title: "Posts",
    subtitle: "Published articles on Microsoft developer blogs.",
    atAGlance: "At a glance",
    readArticle: "Read article",
    tableTitle: "Title",
    tableTag: "Tag",
    tableDate: "Date",
    backToPosts: "Back to posts",
  },
  common: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    toggleTheme: "Toggle theme",
    githubProfile: "GitHub profile",
    linkedinProfile: "LinkedIn profile",
    scrollToTop: "Scroll to top",
  },
  language: {
    en: "English",
    zh: "\u4e2d\u6587",
    ja: "\u65e5\u672c\u8a9e",
  },
};

// Recursive type that preserves structure but allows any string values
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof dict>;
export default dict as Dictionary;
