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

// ============================================
// Projects (Work section)
// ============================================

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProblemArea {
  icon: string;
  title: string;
  description: string;
}

export interface Persona {
  type: "primary" | "secondary" | "extended";
  title: string;
  description: string;
  goals: string[];
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  painPoint: string;
}

export interface UserStory {
  as: string;
  want: string;
  soThat: string;
}

export interface Feature {
  badge: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
}

export interface ArchitectureLayer {
  label: string;
  boxes: { name: string; detail: string }[];
  connectorLabel?: string;
}

export interface ArchitectureInsight {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  team: string;
  period: string;
  current: boolean;
  heroImage?: string;
  stats: ProjectStat[];
  marketplaceUrl?: string;
  githubUrl?: string;
  problemStatement: {
    title: string;
    subtitle: string;
    areas: ProblemArea[];
  };
  personas: Persona[];
  journey: {
    title: string;
    steps: JourneyStep[];
  };
  userStories: UserStory[];
  features: Feature[];
  architecture: {
    layers: ArchitectureLayer[];
    techBadges: string[];
    insights: ArchitectureInsight[];
  };
}

export const projects: Project[] = [
  {
    slug: "ai-toolkit",
    title: "AI Toolkit for VS Code",
    shortTitle: "AI Toolkit",
    tagline: "Making AI agent development fast and delightful",
    description:
      "An end-to-end VS Code extension pack that lets developers discover models, build AI agents, evaluate performance, and deploy to cloud — all without leaving their editor.",
    team: "CoreAI",
    period: "Mar 2024 — Present",
    current: true,
    heroImage: "https://junjieblob.blob.core.windows.net/images/ai-toolkit-hero.png",
    stats: [
      { value: "1M+", label: "Installs" },
      { value: "9+", label: "Model Providers" },
      { value: "9", label: "Core Features" },
      { value: "30+", label: "Contributors" },
    ],
    marketplaceUrl:
      "https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio",
    githubUrl: "https://github.com/microsoft/vscode-ai-toolkit",
    problemStatement: {
      title: "AI development is fragmented and slow",
      subtitle:
        "Building production AI agents requires juggling multiple tools, platforms, and workflows. Developers waste hours context-switching between model providers, testing environments, and deployment pipelines.",
      areas: [
        {
          icon: "\u{1F50D}",
          title: "Model Discovery",
          description:
            "Finding the right model means navigating dozens of separate provider portals, comparing specs across different formats, and manually testing each candidate.",
        },
        {
          icon: "\u26A1",
          title: "Tool Fragmentation",
          description:
            "Developers context-switch between web UIs for prompting, separate IDEs for coding, terminal tools for deployment, and standalone dashboards for evaluation.",
        },
        {
          icon: "\u{1F6E0}",
          title: "Agent Debugging",
          description:
            "Multi-step agent workflows are opaque black boxes. When an agent fails, there's no way to set breakpoints, inspect intermediate states, or trace the execution flow.",
        },
        {
          icon: "\u{1F680}",
          title: "Deploy Friction",
          description:
            "Moving from a working prototype to production requires manual configuration of infrastructure, separate CI/CD pipelines, and deep cloud platform expertise.",
        },
      ],
    },
    personas: [
      {
        type: "primary",
        title: "The AI Application Developer",
        description:
          "A full-stack developer integrating AI capabilities into production applications. Comfortable with code but needs to iterate quickly on prompts, evaluate model quality, and ship reliable agents.",
        goals: [
          "Test models from multiple providers in one place",
          "Build and debug agents without leaving VS Code",
          "Deploy to cloud with minimal configuration",
        ],
      },
      {
        type: "secondary",
        title: "The ML Engineer",
        description:
          "Specializes in model optimization and fine-tuning. Needs tools to customize open models for domain-specific tasks and benchmark performance across hardware targets (CPU, GPU, NPU).",
        goals: [
          "Fine-tune models with QLoRA on local GPU or cloud",
          "Convert and quantize models for edge deployment",
          "Profile inference performance across execution providers",
        ],
      },
      {
        type: "extended",
        title: "The Citizen Developer",
        description:
          "A product manager, designer, or domain expert who wants to prototype AI-powered features without writing code. Needs visual, low-barrier tools to validate ideas quickly.",
        goals: [
          "Create prompt-based agents with a no-code builder",
          "Iterate on prompts using natural language feedback",
          "Export production-ready code for handoff to engineering",
        ],
      },
    ],
    journey: {
      title: "From idea to deployed AI agent",
      steps: [
        {
          step: 1,
          title: "Discover",
          description:
            "Browse the Model Catalog to find models from 9+ providers. Compare capabilities, pricing, and latency side-by-side.",
          painPoint: "Visiting each provider portal separately",
        },
        {
          step: 2,
          title: "Prototype",
          description:
            "Test models in the Playground with multi-modal inputs. Use Agent Builder to craft prompts and wire up MCP tools.",
          painPoint: "No unified place to iterate on prompts + tools",
        },
        {
          step: 3,
          title: "Build & Debug",
          description:
            "Write agent code with full IntelliSense. Press F5 to launch Agent Inspector with breakpoints and workflow visualization.",
          painPoint: "Agent workflows are opaque and hard to debug",
        },
        {
          step: 4,
          title: "Evaluate & Deploy",
          description:
            "Run bulk evaluations with built-in metrics. One-click deploy to Microsoft Foundry with tracing enabled.",
          painPoint: "Separate toolchains for testing vs. deployment",
        },
      ],
    },
    userStories: [
      {
        as: "an AI application developer",
        want: "compare models from OpenAI, Anthropic, and open-source providers in a single interface",
        soThat:
          "I can choose the best model for my use case without switching between provider portals.",
      },
      {
        as: "a product manager",
        want: "build and test a prompt-based agent using a visual no-code builder",
        soThat:
          "I can validate an AI feature idea before committing engineering resources.",
      },
      {
        as: "an ML engineer",
        want: "fine-tune an open model on my domain-specific dataset with QLoRA",
        soThat:
          "I can improve accuracy for my enterprise's specialized vocabulary and workflows.",
      },
      {
        as: "a platform engineer",
        want: "debug multi-agent workflows with breakpoints and execution tracing",
        soThat:
          "I can identify where agents fail and fix issues before they reach production.",
      },
      {
        as: "a Windows developer",
        want: "convert and optimize models for NPU acceleration on Copilot+ PCs",
        soThat:
          "I can deliver fast, offline AI experiences without cloud dependency.",
      },
    ],
    features: [
      {
        badge: "Core",
        icon: "\u{1F4CB}",
        title: "Model Catalog",
        description:
          "Unified model discovery across Microsoft Foundry, GitHub, Hugging Face, ONNX, Ollama, OpenAI, Anthropic, Google, and NVIDIA NIM. Side-by-side comparison and one-click playground access.",
        metric: "9+ integrated model providers",
      },
      {
        badge: "AI",
        icon: "\u{1F916}",
        title: "Agent Builder",
        description:
          'No-code visual interface for creating prompt agents. Natural language prompt engineering with "Inspire Me" generation, MCP tool integration, and structured output support.',
        metric: "Zero-to-agent in minutes",
      },
      {
        badge: "Core",
        icon: "\u{1F50E}",
        title: "Agent Inspector",
        description:
          "Full F5 debugging for AI agents with breakpoints, real-time streaming visualization, multi-agent workflow graphs, and one-click code navigation.",
        metric: "First-class debugger integration",
      },
      {
        badge: "Performance",
        icon: "\u{1F4CA}",
        title: "Model Evaluation",
        description:
          'Batch evaluation with built-in metrics (F1, relevance, similarity, coherence) and custom evaluators. "Evaluation as Tests" for CI-style quality gates.',
        metric: "Quantified model quality",
      },
      {
        badge: "AI",
        icon: "\u2699",
        title: "Fine-Tuning",
        description:
          "Customize models with QLoRA on local GPU or cloud via Azure Container Apps. Supports Phi, Llama, Mistral, DeepSeek, and NPU-optimized variants for Copilot+ PCs.",
        metric: "Local GPU + cloud training",
      },
      {
        badge: "UX",
        icon: "\u{1F310}",
        title: "One-Click Deploy",
        description:
          "Deploy agents directly to Microsoft Foundry from VS Code. Built-in tracing and profiling for production monitoring across CPU, GPU, and NPU.",
        metric: "VS Code to production in one click",
      },
    ],
    architecture: {
      layers: [
        {
          label: "User Interface",
          boxes: [
            { name: "VS Code Extension", detail: "TypeScript + React" },
            { name: "Webview UI", detail: "React Components" },
            { name: "Extension Tree View", detail: "VS Code API" },
          ],
          connectorLabel: "Commands, events, state",
        },
        {
          label: "Application Services",
          boxes: [
            { name: "Agent Builder", detail: "Prompt Engineering" },
            { name: "Agent Inspector", detail: "F5 Debugger" },
            { name: "Model Playground", detail: "Interactive Chat" },
          ],
          connectorLabel: "API calls, inference requests",
        },
        {
          label: "Backend Agents",
          boxes: [
            { name: "Inference Agent", detail: "C# / .NET 8+" },
            { name: "Workspace Agent", detail: "C# / .NET 8+" },
            { name: "MCP Server", detail: "Tool Integration" },
          ],
          connectorLabel: "Model requests, tool calls",
        },
        {
          label: "Model Providers",
          boxes: [
            { name: "Microsoft Foundry", detail: "Cloud Models" },
            { name: "GitHub Models", detail: "Open Source" },
            { name: "Ollama / ONNX", detail: "Local Inference" },
            { name: "OpenAI / Anthropic", detail: "3rd Party APIs" },
          ],
          connectorLabel: "Deployment, monitoring",
        },
        {
          label: "Infrastructure",
          boxes: [
            { name: "Microsoft Foundry", detail: "Cloud Deploy" },
            { name: "Azure Container Apps", detail: "Fine-Tuning" },
            { name: "Windows ML / NPU", detail: "Edge Runtime" },
          ],
        },
      ],
      techBadges: [
        "TypeScript",
        "React",
        "C# / .NET 8+",
        "ONNX Runtime",
        "CUDA / NPU",
        "MCP Protocol",
        "QLoRA",
        "Docker / WSL2",
        "Azure",
        "VS Code API",
      ],
      insights: [
        {
          title: "Cross-Platform Reach",
          description:
            "Runs on Windows, macOS, and Linux via VS Code. Local inference supports CPU, GPU (CUDA), and NPU hardware acceleration for Copilot+ PCs, enabling offline AI scenarios.",
        },
        {
          title: "Provider Agnostic",
          description:
            "Single interface abstracts 9+ model providers. Developers can swap between cloud and local models without changing their agent code, reducing vendor lock-in.",
        },
        {
          title: "Full Lifecycle Coverage",
          description:
            "From model discovery through fine-tuning, evaluation, debugging, and cloud deployment — the entire AI development lifecycle lives inside the editor developers already use.",
        },
      ],
    },
  },
  {
    slug: "m365-agents-toolkit",
    title: "Microsoft 365 Agents Toolkit",
    shortTitle: "M365 Agents Toolkit",
    tagline: "The pro-code toolset for building AI agents across Microsoft 365",
    description:
      "An end-to-end development experience — scaffold, debug, test, deploy, and publish AI agents and apps for Microsoft 365 Copilot, Teams, Outlook, and Office — all from your IDE.",
    team: "Cloud & AI",
    period: "Sep 2020 — Mar 2024",
    current: false,
    heroImage: "https://junjieblob.blob.core.windows.net/images/agent-toolkit-hero.png",
    stats: [
      { value: "443K+", label: "Installs" },
      { value: "40+", label: "Templates" },
      { value: "4", label: "Languages" },
      { value: "5+", label: "Years Evolving" },
    ],
    marketplaceUrl:
      "https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension",
    githubUrl: "https://github.com/OfficeDev/microsoft-365-agents-toolkit",
    problemStatement: {
      title: "Building for M365 requires too much glue",
      subtitle:
        "Professional developers building agents and apps for the Microsoft 365 ecosystem face a fragmented landscape of SDKs, auth configurations, cloud provisioning, and multi-surface deployment targets.",
      areas: [
        {
          icon: "\u{1F512}",
          title: "Auth Complexity",
          description:
            "Configuring Microsoft Entra ID for SSO across Teams, Outlook, and Copilot requires deep identity expertise. A single misconfiguration blocks the entire app.",
        },
        {
          icon: "\u{1F9E9}",
          title: "Surface Sprawl",
          description:
            "Agents must work across Copilot, Teams, Outlook, Office Add-ins, and external channels. Each surface has different manifest formats, APIs, and testing requirements.",
        },
        {
          icon: "\u2601",
          title: "Cloud Provisioning",
          description:
            "Deploying an agent requires creating Azure Bot Service, Functions, storage accounts, and app registrations — manual steps that differ between dev, staging, and production.",
        },
        {
          icon: "\u{1F527}",
          title: "Boilerplate Overhead",
          description:
            "Every new project starts from scratch: wiring SDKs, configuring manifests, setting up CI/CD pipelines, and implementing error handling patterns that are the same every time.",
        },
      ],
    },
    personas: [
      {
        type: "primary",
        title: "The Enterprise App Developer",
        description:
          "A professional developer building line-of-business agents and apps that integrate with Microsoft 365. Works in TypeScript or C#, needs full source control and CI/CD integration, and ships to enterprise tenants.",
        goals: [
          "Scaffold a new agent project in minutes, not days",
          "Debug locally with hot reload and secure tunneling",
          "Deploy to Azure with automated resource provisioning",
        ],
      },
      {
        type: "secondary",
        title: "The AI Agent Builder",
        description:
          "A developer creating declarative or custom engine agents for Microsoft 365 Copilot. Needs to define agent instructions, connect knowledge sources, wire up MCP tools, and publish to users.",
        goals: [
          "Build Copilot declarative agents with custom actions",
          "Integrate MCP servers as agent tool sources",
          "Share agents with specific users or the entire tenant",
        ],
      },
      {
        type: "extended",
        title: "The Platform Engineer",
        description:
          "Responsible for CI/CD pipelines, environment management, and governance for M365 agent deployments across dev, staging, and production. Needs CLI tooling and pipeline templates.",
        goals: [
          "Automate deployments with GitHub Actions or Azure DevOps",
          "Manage environment-specific configurations at scale",
          "Support government cloud (GCC-M) requirements",
        ],
      },
    ],
    journey: {
      title: "From idea to published agent",
      steps: [
        {
          step: 1,
          title: "Scaffold",
          description:
            "Choose from 40+ templates across JS, TS, Python, or C#. The toolkit generates project structure, manifest, auth config, and SDK wiring.",
          painPoint: "Days of boilerplate setup for every new project",
        },
        {
          step: 2,
          title: "Build & Debug",
          description:
            "Develop locally with hot reload, secure tunneling for bot endpoints, and the Agents Playground for interactive testing without deploying.",
          painPoint: "No way to test bots locally without deploying",
        },
        {
          step: 3,
          title: "Provision & Deploy",
          description:
            "One-click Azure resource provisioning creates Bot Service, Functions, and storage. Deploy to cloud with environment-specific configs.",
          painPoint: "Manual Azure portal work for each environment",
        },
        {
          step: 4,
          title: "Publish & Share",
          description:
            "Publish to Teams app store or share declarative agents with specific users. Generate CI/CD pipelines for automated releases.",
          painPoint: "Complex store submission and tenant distribution",
        },
      ],
    },
    userStories: [
      {
        as: "an enterprise app developer",
        want: "scaffold a Teams bot with SSO authentication in a single command",
        soThat:
          "I can focus on business logic instead of spending days on auth configuration and boilerplate.",
      },
      {
        as: "an AI agent builder",
        want: "create a declarative agent for Microsoft 365 Copilot that connects to my company's APIs via MCP",
        soThat:
          "employees can ask Copilot questions that are answered using our proprietary data and services.",
      },
      {
        as: "a platform engineer",
        want: "generate GitHub Actions pipelines for multi-environment agent deployments",
        soThat:
          "our team can ship agent updates through a governed, automated release process.",
      },
      {
        as: "a Python developer",
        want: "build a custom engine agent with my own LLM orchestration using Azure OpenAI",
        soThat:
          "I can deliver an AI-powered assistant in Teams without being limited to declarative prompts.",
      },
      {
        as: "a government contractor",
        want: "deploy agents to a GCC-M tenant with compliant Azure resources",
        soThat:
          "my agency can use AI agents while meeting federal security and compliance requirements.",
      },
    ],
    features: [
      {
        badge: "Core",
        icon: "\u{1F4C1}",
        title: "40+ Project Templates",
        description:
          "Declarative agents, custom engine agents, Teams bots, tabs, message extensions, Office Add-ins, and Copilot connectors — in TypeScript, JavaScript, Python, and C#.",
        metric: "4 languages \u00D7 10+ scenarios",
      },
      {
        badge: "AI",
        icon: "\u{1F916}",
        title: "MCP Server Integration",
        description:
          "Connect Model Context Protocol servers to declarative agents as tool sources. Agents can call external APIs, databases, and services through a standardized tool interface.",
        metric: "GA since v6.6.0",
      },
      {
        badge: "UX",
        icon: "\u{1F3AE}",
        title: "Agents Playground",
        description:
          "Local testing environment for interactive bot debugging with hot reload and secure tunneling. Test agents without deploying to Azure or sideloading into Teams.",
        metric: "Zero-deploy local testing",
      },
      {
        badge: "Infra",
        icon: "\u2601",
        title: "Azure Provisioning",
        description:
          "One-click creation of Azure Bot Service, Functions, storage accounts, and app registrations. Environment-specific configurations for dev, staging, and production.",
        metric: "IDE to cloud in one click",
      },
      {
        badge: "Core",
        icon: "\u{1F512}",
        title: "Simplified SSO Auth",
        description:
          "Zero-config Microsoft Entra ID integration for single sign-on across Teams, Outlook, and Copilot. Handles token exchange, consent flows, and multi-tenant scenarios.",
        metric: "Auth setup reduced from days to minutes",
      },
      {
        badge: "Infra",
        icon: "\u{1F504}",
        title: "CI/CD Pipelines",
        description:
          "Generate GitHub Actions and Azure DevOps pipeline templates for automated builds, tests, and deployments. CLI (atk) enables headless execution for pipeline scripts.",
        metric: "GitHub Actions + Azure DevOps",
      },
    ],
    architecture: {
      layers: [
        {
          label: "Developer Interface",
          boxes: [
            { name: "VS Code Extension", detail: "vscode-extension" },
            { name: "Visual Studio", detail: "dotnet-sdk" },
            { name: "CLI (atk)", detail: "cli package" },
          ],
          connectorLabel: "Commands, scaffolding, provisioning requests",
        },
        {
          label: "Shared Core",
          boxes: [
            { name: "fx-core", detail: "Business Logic" },
            { name: "Spec Parser", detail: "OpenAPI \u2192 Extensions" },
            { name: "MCP Server", detail: "Tool Integration" },
          ],
          connectorLabel: "Templates, SDK wiring, manifest generation",
        },
        {
          label: "Agent Runtimes",
          boxes: [
            { name: "Microsoft Agents SDK", detail: "Multi-Channel" },
            { name: "Teams AI Library V2", detail: "Teams Bots" },
            { name: "Azure OpenAI", detail: "LLM Orchestration" },
          ],
          connectorLabel: "Agent deployment, bot registration",
        },
        {
          label: "Cloud Infrastructure",
          boxes: [
            { name: "Azure Bot Service", detail: "Bot Registration" },
            { name: "Azure Functions", detail: "Compute" },
            { name: "Azure Storage", detail: "State & Assets" },
            { name: "Microsoft Entra ID", detail: "Auth & SSO" },
          ],
          connectorLabel: "Published agents & apps",
        },
        {
          label: "Microsoft 365 Surfaces",
          boxes: [
            { name: "M365 Copilot", detail: "Declarative Agents" },
            { name: "Microsoft Teams", detail: "Bots, Tabs, Extensions" },
            { name: "Outlook", detail: "Add-ins, Agents" },
            { name: "Office Apps", detail: "Add-ins" },
          ],
        },
      ],
      techBadges: [
        "TypeScript",
        "C# / .NET",
        "Python",
        "JavaScript",
        "pnpm Monorepo",
        "MCP Protocol",
        "Azure Bot Service",
        "Azure Functions",
        "Microsoft Entra ID",
        "GitHub Actions",
      ],
      insights: [
        {
          title: "Multi-Surface Reach",
          description:
            "A single agent can be published to Microsoft 365 Copilot, Teams, Outlook, Office Add-ins, and external channels like web, email, and SMS — all from one codebase and unified manifest.",
        },
        {
          title: "Pro-Code Positioning",
          description:
            "Fills the gap between no-code (Agent Builder) and low-code (Copilot Studio) by giving professional developers full IDE integration, source control, and CI/CD — the only Microsoft tool to do so for M365 agents.",
        },
        {
          title: "5-Year Evolution",
          description:
            "Born as Teams Toolkit in 2021, rebranded at Build 2025 to reflect its expanded scope. The monorepo architecture (fx-core shared across VS Code, Visual Studio, and CLI) enables consistent behavior across all developer surfaces.",
        },
      ],
    },
  },
];
