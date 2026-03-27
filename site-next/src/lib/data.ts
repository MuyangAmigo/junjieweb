export const profile = {
  name: "Junjie Li",
  title: "Senior Product Manager",
  company: "Microsoft",
  team: "CoreAI",
  email: "junjieli0909@foxmail.com",
  github: "https://github.com/MuyangAmigo",
  linkedin: "https://www.linkedin.com/in/junjieli0909/",
  bio: "Senior Product Manager at Microsoft with a computer science background from Northwestern University and engineering roots at Apple. From building scalable web services to leading flight booking platforms at Trip.com, I now shape AI developer tooling in CoreAI — turning complex AI capabilities into tools developers love.",
  location: "Shanghai, China",
};

export const experience = [
  {
    company: "Microsoft",
    logo: "M",
    roles: [
      {
        title: "Senior Product Manager — CoreAI",
        period: "Mar 2024 — Present",
        current: true,
        bullets: [
          "Lead AI Toolkit product strategy, scaling MAU from 15K to 60K (300% growth in 6 months)",
          "Delivered agent developer experiences and translated AI research into developer-friendly tools",
        ],
      },
      {
        title: "Product Manager — Cloud & AI Developer Division",
        period: "Sep 2020 — Mar 2024",
        current: false,
        bullets: [
          "Drove developer toolchain strategy for Microsoft 365 platform, serving 20K+ monthly active developers",
          "Led Teams Toolkit CLI tools, authentication SDKs, and cross-timezone feature delivery",
        ],
      },
    ],
  },
  {
    company: "Trip.com Group",
    logo: "T",
    roles: [
      {
        title: "Product Manager — Flight Business Unit",
        period: "Aug 2018 — Sep 2020",
        current: false,
        bullets: [
          "Led flight booking platform serving 400M+ annual users, improving refund/exchange automation",
          "Launched GDS ancillary services and supplier partner portal for 200+ airline partners",
        ],
      },
    ],
  },
  {
    company: "Apple",
    logo: "A",
    roles: [
      {
        title: "Software Development Engineer — Online Store",
        period: "Jun 2017 — Jun 2018",
        current: false,
        bullets: [
          "Contributed to Apple Online Store Checkout Redesign, optimizing API calls by 40%",
          "Built scalable web services in Scala with CI/CD pipelines",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "Northwestern University",
    location: "Evanston, IL",
    degree: "M.S. Computer Science",
    gpa: "3.86/4.00",
    period: "2015 — 2016",
  },
  {
    school: "Nanjing University of Posts & Telecommunications",
    location: "Nanjing, China",
    degree: "B.E. Communication Engineering",
    gpa: "3.84/5.00",
    period: "2011 — 2015",
    dualDegree: "B.S. Electrical & Electronics Engineering — New York Institute of Technology (Dual Degree)",
    publication: "\"Personal Access Control System Using Moving Object Detection and Face Recognition\" — IEEE Journal",
  },
];

export const skills = {
  "Product Management": [
    "Agile / Scrum",
    "Roadmap Planning",
    "Stakeholder Management",
    "Data Analytics",
    "User Research",
  ],
  Technical: [
    "Python",
    "TypeScript",
    "Java",
    "Scala",
    "SQL",
    "Azure",
    "VS Code Extensions",
    "REST APIs",
    "Node.js",
  ],
  "Design & Communication": [
    "Figma",
    "UX Design",
    "Storytelling",
    "Demo Video Creation",
  ],
  Platforms: [
    "Microsoft 365",
    "Teams Platform",
    "AI Developer Tools",
    "E-commerce",
    "GDS Integration",
  ],
};

export interface ExternalPost {
  title: string;
  date: string;
  url: string;
  source: "Microsoft 365 Developer Blog" | "Microsoft Tech Community";
}

export const externalPosts: ExternalPost[] = [
  {
    title: "🚀 AI Toolkit for VS Code — March 2026 Update",
    date: "2026-03-16",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/%F0%9F%9A%80-ai-toolkit-for-vs-code-%E2%80%94-march-2026-update/4502517",
    source: "Microsoft Tech Community",
  },
  {
    title: "🚀 AI Toolkit for VS Code — February 2026 Update",
    date: "2026-02-13",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/%F0%9F%9A%80-ai-toolkit-for-vs-code-%E2%80%94-february-2026-update/4493673",
    source: "Microsoft Tech Community",
  },
  {
    title: "🚀 AI Toolkit for VS Code: January 2026 Update",
    date: "2026-01-13",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/%F0%9F%9A%80-ai-toolkit-for-vs-code-january-2026-update/4485205",
    source: "Microsoft Tech Community",
  },
  {
    title: "AI Toolkit for VS Code October Update",
    date: "2025-10-24",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/ai-toolkit-for-vs-code-october-update/4463365",
    source: "Microsoft Tech Community",
  },
  {
    title: "GPT-5 Family of Models & GPT OSS Are Now Available in AI Toolkit for VS Code",
    date: "2025-08-09",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/gpt-5-family-of-models--gpt-oss-are-now-available-in-ai-toolkit-for-vs-code/4441394",
    source: "Microsoft Tech Community",
  },
  {
    title: "AI Toolkit for VS Code July Update",
    date: "2025-07-11",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/ai-toolkit-for-vs-code-july-update/4431548",
    source: "Microsoft Tech Community",
  },
  {
    title: "AI Toolkit for VS Code June Update",
    date: "2025-06-10",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/ai-toolkit-for-vs-code-june-update/4422079",
    source: "Microsoft Tech Community",
  },
  {
    title: "Build AI Agents with MCP Tool Use in Minutes with AI Toolkit for VSCode",
    date: "2025-04-29",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/build-ai-agents-with-mcp-tool-use-in-minutes-with-ai-toolkit-for-vscode/4407959",
    source: "Microsoft Tech Community",
  },
  {
    title: "AI Toolkit for VS Code March Update",
    date: "2025-03-31",
    url: "https://techcommunity.microsoft.com/blog/azuredevcommunityblog/ai-toolkit-for-vs-code-march-update/4396880",
    source: "Microsoft Tech Community",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – January 2025",
    date: "2025-01-08",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-january-2025/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – November 2024",
    date: "2024-11-26",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-november-2024/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Streamline your workflow: Embracing Adaptive Cards Templating",
    date: "2024-08-27",
    url: "https://devblogs.microsoft.com/microsoft365dev/streamline-your-workflow-embracing-adaptive-cards-templating/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code prerelease update – August 2024",
    date: "2024-08-14",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-august-2024/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – July 2024",
    date: "2024-07-22",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-july-2024/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Build intelligent apps for Microsoft 365 with Teams Toolkit",
    date: "2024-06-02",
    url: "https://devblogs.microsoft.com/microsoft365dev/build-intelligent-apps-for-microsoft-365-with-teams-toolkit/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – March 2024",
    date: "2024-03-20",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-march-2024/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – January 2024",
    date: "2024-01-24",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-january-2024/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Introducing Teams App Test Tool",
    date: "2023-11-29",
    url: "https://devblogs.microsoft.com/microsoft365dev/introducing-teams-app-test-tool/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – November 2023",
    date: "2023-11-27",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-november-2023/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Announcing public preview for Microsoft Adaptive Card Previewer",
    date: "2023-11-01",
    url: "https://devblogs.microsoft.com/microsoft365dev/announcing-public-preview-for-microsoft-adaptive-card-previewer/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update with new AI chat bot template",
    date: "2023-08-20",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-with-new-ai-chat-bot-template/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – July 2023",
    date: "2023-07-19",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-july-2023/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code Update – April 2023",
    date: "2023-04-18",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-april-2023/",
    source: "Microsoft 365 Developer Blog",
  },
  {
    title: "Teams Toolkit for Visual Studio Code update – March 2023",
    date: "2023-03-21",
    url: "https://devblogs.microsoft.com/microsoft365dev/teams-toolkit-for-visual-studio-code-update-march-2023/",
    source: "Microsoft 365 Developer Blog",
  },
];

export const highlights = [
  { stat: "300%", label: "MAU growth in 6 months", icon: "rocket" },
  { stat: "20K+", label: "Monthly active developers", icon: "code" },
  { stat: "400M+", label: "Annual users served", icon: "globe" },
  { stat: "M.S.", label: "CS from Northwestern", icon: "graduation" },
];
