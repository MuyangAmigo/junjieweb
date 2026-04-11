export const projectOverlays = [
  {
    // ai-toolkit
    tagline: "让 AI 智能体开发快速且愉悦",
    description:
      "AI 开发者过去不得不在数十个模型提供商门户、独立的测试工具和手动部署流水线之间频繁切换。AI Toolkit 将整个工作流 -- 发现、构建、评估和部署 -- 统一到 VS Code 中，安装量突破 100 万，成为 AI 智能体开发的首选扩展。",
    problemStatement: {
      title: "AI 开发碎片化且效率低下",
      subtitle:
        "构建生产级 AI 智能体需要在多种工具、平台和工作流之间来回切换。开发者在模型提供商、测试环境和部署流水线之间浪费了大量时间。",
      areas: [
        {
          title: "模型发现",
          description:
            "找到合适的模型意味着要浏览数十个独立的提供商门户，在不同格式间比较规格，并手动测试每个候选模型。",
        },
        {
          title: "工具碎片化",
          description:
            "开发者需要在用于提示的 Web UI、用于编码的独立 IDE、用于部署的终端工具和用于评估的独立仪表板之间来回切换。",
        },
        {
          title: "智能体调试",
          description:
            "多步骤智能体工作流如同黑盒。当智能体失败时，无法设置断点、检查中间状态或追踪执行流程。",
        },
        {
          title: "部署阻力",
          description:
            "从可用原型到生产环境需要手动配置基础设施、独立的 CI/CD 流水线以及深厚的云平台专业知识。",
        },
      ],
    },
    personas: [
      {
        title: "AI 应用开发者",
        description:
          "将 AI 能力集成到生产应用中的全栈开发者。熟悉编码，但需要快速迭代提示词、评估模型质量并交付可靠的智能体。",
        goals: [
          "在一个地方测试来自多个提供商的模型",
          "不离开 VS Code 即可构建和调试智能体",
          "以最少的配置部署到云端",
        ],
      },
      {
        title: "机器学习工程师",
        description:
          "专注于模型优化和微调。需要工具来为特定领域任务定制开源模型，并在不同硬件目标（CPU、GPU、NPU）上进行性能基准测试。",
        goals: [
          "使用 QLoRA 在本地 GPU 或云端微调模型",
          "转换和量化模型以便边缘部署",
          "在不同执行提供程序间分析推理性能",
        ],
      },
      {
        title: "公民开发者",
        description:
          "产品经理、设计师或领域专家，希望在不编写代码的情况下快速原型化 AI 功能。需要可视化、低门槛的工具来快速验证想法。",
        goals: [
          "使用无代码构建器创建基于提示词的智能体",
          "使用自然语言反馈迭代提示词",
          "导出生产就绪代码交付给工程团队",
        ],
      },
    ],
    journey: {
      title: "从创意到已部署的 AI 智能体",
      steps: [
        {
          title: "发现",
          description:
            "浏览模型目录，从 9 个以上的提供商中查找模型。并排比较能力、定价和延迟。",
          painPoint: "需要逐一访问每个提供商门户",
        },
        {
          title: "原型",
          description:
            "在 Playground 中使用多模态输入测试模型。使用 Agent Builder 编写提示词并接入 MCP 工具。",
          painPoint: "没有统一的地方来迭代提示词和工具",
        },
        {
          title: "构建与调试",
          description:
            "使用完整的 IntelliSense 编写智能体代码。按 F5 启动 Agent Inspector，支持断点和工作流可视化。",
          painPoint: "智能体工作流不透明且难以调试",
        },
        {
          title: "评估与部署",
          description:
            "使用内置指标运行批量评估。一键部署到 Microsoft Foundry 并启用追踪。",
          painPoint: "测试和部署使用不同的工具链",
        },
      ],
    },
    userStories: [
      {
        as: "AI 应用开发者",
        want: "在单一界面中比较来自 OpenAI、Anthropic 和开源提供商的模型",
        soThat: "无需在提供商门户之间切换即可为我的场景选择最佳模型。",
      },
      {
        as: "产品经理",
        want: "使用可视化无代码构建器构建和测试基于提示词的智能体",
        soThat: "在投入工程资源之前验证 AI 功能创意。",
      },
      {
        as: "机器学习工程师",
        want: "使用 QLoRA 在我的领域数据集上微调开源模型",
        soThat: "提高企业专有词汇和工作流的准确率。",
      },
      {
        as: "平台工程师",
        want: "使用断点和执行追踪调试多智能体工作流",
        soThat: "在问题到达生产环境之前定位智能体失败原因并修复。",
      },
      {
        as: "Windows 开发者",
        want: "转换和优化模型以便在 Copilot+ PC 上实现 NPU 加速",
        soThat: "无需依赖云即可提供快速的离线 AI 体验。",
      },
    ],
    features: [
      {
        title: "模型目录",
        description:
          "跨 Microsoft Foundry、GitHub、Hugging Face、ONNX、Ollama、OpenAI、Anthropic、Google 和 NVIDIA NIM 的统一模型发现。并排比较和一键进入 Playground。",
        metric: "9 个以上集成的模型提供商",
      },
      {
        title: "Agent Builder",
        description:
          "用于创建提示词智能体的无代码可视化界面。支持自然语言提示工程、\"Inspire Me\" 生成、MCP 工具集成和结构化输出。",
        metric: "几分钟内从零到智能体",
      },
      {
        title: "Agent Inspector",
        description:
          "AI 智能体的完整 F5 调试，支持断点、实时流式可视化、多智能体工作流图和一键代码导航。",
        metric: "一流的调试器集成",
      },
      {
        title: "模型评估",
        description:
          "使用内置指标（F1、相关性、相似度、连贯性）和自定义评估器进行批量评估。\"评估即测试\"，实现 CI 风格的质量关卡。",
        metric: "量化的模型质量",
      },
      {
        title: "微调",
        description:
          "通过 Azure Container Apps 使用 QLoRA 在本地 GPU 或云端自定义模型。支持 Phi、Llama、Mistral、DeepSeek 及面向 Copilot+ PC 的 NPU 优化变体。",
        metric: "本地 GPU + 云端训练",
      },
      {
        title: "一键部署",
        description:
          "从 VS Code 直接将智能体部署到 Microsoft Foundry。内置追踪和性能分析，支持跨 CPU、GPU 和 NPU 的生产环境监控。",
        metric: "从 VS Code 到生产环境一键完成",
      },
    ],
    architecture: {
      insights: [
        {
          title: "跨平台覆盖",
          description:
            "通过 VS Code 在 Windows、macOS 和 Linux 上运行。本地推理支持 CPU、GPU (CUDA) 和 NPU 硬件加速，适用于 Copilot+ PC，支持离线 AI 场景。",
        },
        {
          title: "提供商无关",
          description:
            "单一界面抽象了 9 个以上的模型提供商。开发者可以在云端模型和本地模型之间切换而无需修改智能体代码，减少供应商锁定。",
        },
        {
          title: "全生命周期覆盖",
          description:
            "从模型发现到微调、评估、调试和云部署 -- 整个 AI 开发生命周期都在开发者日常使用的编辑器中完成。",
        },
      ],
    },
  },
  {
    // m365-agents-toolkit
    tagline: "用于在 Microsoft 365 中构建 AI 智能体的专业开发工具集",
    description:
      "面向 Microsoft 365 构建的企业开发者面临着碎片化的 SDK、复杂的认证配置以及每个新项目的手动云端配置。Agents Toolkit 简化了整个生命周期 -- 脚手架、调试、部署和发布 -- 服务于 Teams、Copilot 和 Outlook 上超过 2 万名月活跃开发者。",
    problemStatement: {
      title: "为 M365 构建需要太多胶水代码",
      subtitle:
        "为 Microsoft 365 生态系统构建智能体和应用的专业开发者面临着碎片化的 SDK、认证配置、云端配置和多目标表面部署的复杂局面。",
      areas: [
        {
          title: "认证复杂性",
          description:
            "为 Teams、Outlook 和 Copilot 跨平台配置 Microsoft Entra ID 单点登录需要深厚的身份认证专业知识。一个错误配置就会阻塞整个应用。",
        },
        {
          title: "多表面扩散",
          description:
            "智能体必须在 Copilot、Teams、Outlook、Office 加载项和外部渠道上运行。每个表面都有不同的清单格式、API 和测试要求。",
        },
        {
          title: "云端配置",
          description:
            "部署智能体需要创建 Azure Bot Service、Functions、存储账户和应用注册 -- 在开发、预发布和生产环境之间各不相同的手动步骤。",
        },
        {
          title: "样板代码开销",
          description:
            "每个新项目都从零开始：接入 SDK、配置清单、设置 CI/CD 流水线，以及实现每次都相同的错误处理模式。",
        },
      ],
    },
    personas: [
      {
        title: "企业应用开发者",
        description:
          "构建与 Microsoft 365 集成的业务线智能体和应用的专业开发者。使用 TypeScript 或 C# 开发，需要完整的源代码控制和 CI/CD 集成，交付到企业租户。",
        goals: [
          "几分钟内搭建新智能体项目，而非数天",
          "使用热重载和安全隧道在本地调试",
          "通过自动化资源配置部署到 Azure",
        ],
      },
      {
        title: "AI 智能体构建者",
        description:
          "为 Microsoft 365 Copilot 创建声明式或自定义引擎智能体的开发者。需要定义智能体指令、连接知识源、接入 MCP 工具并发布给用户。",
        goals: [
          "构建带自定义操作的 Copilot 声明式智能体",
          "将 MCP 服务器集成为智能体工具源",
          "与特定用户或整个租户共享智能体",
        ],
      },
      {
        title: "平台工程师",
        description:
          "负责 M365 智能体在开发、预发布和生产环境部署的 CI/CD 流水线、环境管理和治理。需要 CLI 工具和流水线模板。",
        goals: [
          "使用 GitHub Actions 或 Azure DevOps 自动化部署",
          "大规模管理特定环境配置",
          "支持政府云 (GCC-M) 要求",
        ],
      },
    ],
    journey: {
      title: "从创意到已发布的智能体",
      steps: [
        {
          title: "脚手架",
          description:
            "从 40 多个 JS、TS、Python 或 C# 模板中选择。工具包生成项目结构、清单、认证配置和 SDK 接入。",
          painPoint: "每个新项目都需要数天的样板搭建",
        },
        {
          title: "构建与调试",
          description:
            "使用热重载在本地开发，通过安全隧道连接 Bot 端点，使用 Agents Playground 进行交互式测试，无需部署。",
          painPoint: "不部署就无法在本地测试 Bot",
        },
        {
          title: "配置与部署",
          description:
            "一键 Azure 资源配置，创建 Bot Service、Functions 和存储。使用特定环境配置部署到云端。",
          painPoint: "每个环境都需要在 Azure 门户中手动操作",
        },
        {
          title: "发布与共享",
          description:
            "发布到 Teams 应用商店或与特定用户共享声明式智能体。生成 CI/CD 流水线实现自动化发布。",
          painPoint: "复杂的应用商店提交和租户分发",
        },
      ],
    },
    userStories: [
      {
        as: "企业应用开发者",
        want: "用一条命令搭建带 SSO 认证的 Teams Bot",
        soThat:
          "可以专注于业务逻辑，而不是花数天在认证配置和样板代码上。",
      },
      {
        as: "AI 智能体构建者",
        want: "为 Microsoft 365 Copilot 创建一个通过 MCP 连接公司 API 的声明式智能体",
        soThat:
          "员工可以向 Copilot 提问，并获得基于我们专有数据和服务的回答。",
      },
      {
        as: "平台工程师",
        want: "为多环境智能体部署生成 GitHub Actions 流水线",
        soThat:
          "团队可以通过受治理的自动化发布流程交付智能体更新。",
      },
      {
        as: "Python 开发者",
        want: "使用 Azure OpenAI 构建带自定义 LLM 编排的自定义引擎智能体",
        soThat:
          "可以在 Teams 中提供 AI 驱动的助手，而不受限于声明式提示。",
      },
      {
        as: "政府承包商",
        want: "将智能体部署到使用合规 Azure 资源的 GCC-M 租户",
        soThat:
          "我的机构可以使用 AI 智能体，同时满足联邦安全和合规要求。",
      },
    ],
    features: [
      {
        title: "40+ 项目模板",
        description:
          "声明式智能体、自定义引擎智能体、Teams Bot、选项卡、消息扩展、Office 加载项和 Copilot 连接器 -- 支持 TypeScript、JavaScript、Python 和 C#。",
        metric: "4 种语言 x 10+ 场景",
      },
      {
        title: "MCP Server 集成",
        description:
          "将 Model Context Protocol 服务器作为工具源连接到声明式智能体。智能体可以通过标准化工具接口调用外部 API、数据库和服务。",
        metric: "自 v6.6.0 正式发布",
      },
      {
        title: "Agents Playground",
        description:
          "用于交互式 Bot 调试的本地测试环境，支持热重载和安全隧道。无需部署到 Azure 或旁加载到 Teams 即可测试智能体。",
        metric: "零部署本地测试",
      },
      {
        title: "Azure 资源配置",
        description:
          "一键创建 Azure Bot Service、Functions、存储账户和应用注册。支持开发、预发布和生产环境的特定配置。",
        metric: "从 IDE 到云端一键完成",
      },
      {
        title: "简化 SSO 认证",
        description:
          "零配置的 Microsoft Entra ID 集成，支持 Teams、Outlook 和 Copilot 跨平台单点登录。处理令牌交换、同意流程和多租户场景。",
        metric: "认证配置从数天缩短到几分钟",
      },
      {
        title: "CI/CD 流水线",
        description:
          "生成 GitHub Actions 和 Azure DevOps 流水线模板，实现自动化构建、测试和部署。CLI (atk) 支持流水线脚本的无头执行。",
        metric: "GitHub Actions + Azure DevOps",
      },
    ],
    architecture: {
      insights: [
        {
          title: "多表面覆盖",
          description:
            "单个智能体可以发布到 Microsoft 365 Copilot、Teams、Outlook、Office 加载项以及 Web、邮件和短信等外部渠道 -- 全部基于一个代码库和统一清单。",
        },
        {
          title: "专业代码定位",
          description:
            "填补了无代码（Agent Builder）和低代码（Copilot Studio）之间的空白，为专业开发者提供完整的 IDE 集成、源代码控制和 CI/CD -- 是微软唯一为 M365 智能体提供此类能力的工具。",
        },
        {
          title: "五年演进",
          description:
            "2021 年以 Teams Toolkit 的名称诞生，在 Build 2025 大会上更名以反映其扩展范围。单体仓库架构（fx-core 在 VS Code、Visual Studio 和 CLI 之间共享）确保了所有开发者界面的行为一致性。",
        },
      ],
    },
  },
];
