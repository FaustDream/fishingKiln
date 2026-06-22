export const home = {
  hero: {
    englishName: "fishing kiln",
    title: "渔窑手工青花",
    subtitle: "餐具、海贸与景德镇资料首页",
    description:
      "以景德镇城市系统、国际馆藏对象页、公开研究文章和经典饮食文献为基础，把青花餐具的时间线、对象样本、来源网络与器类入口组织成一个正式的机构型首页。",
    actions: [
      { href: "#tableware-focus", label: "进入餐具专题" },
      { href: "#research-index", label: "浏览研究索引" }
    ],
    metrics: [
      ["6 组", "桌面样本"],
      ["5 条", "对象台账"],
      ["4 段", "资料网络"],
      ["5 类", "器物栏目入口"]
    ],
    sectionLinks: [
      { href: "#tableware-focus", label: "餐具专题" },
      { href: "#featured-records", label: "桌面谱系" },
      { href: "#home-source-deck", label: "馆藏与餐桌档案" },
      { href: "#network", label: "资料网络" },
      { href: "#timeline", label: "时间轴" },
      { href: "#featured-research", label: "研究路径" },
      { href: "#objects", label: "器类入口" }
    ],
    brief: [
      ["专题范围", "五类器物并行，餐具是当前重点整理对象。"],
      ["资料来源", "国际公开馆藏与经典饮食文献交叉校读。"],
      ["阅读方式", "先看餐具专题，再进入桌面谱系、内嵌详情和研究索引。"]
    ],
    focusCard: {
      eyebrow: "当期专题导览",
      title: "餐具页已升级为专题研究页",
      summary:
        "新版餐具页把桌面谱系、馆藏样本、研究判断和资料台账并排呈现，不再停留在普通分类页层级。",
      actions: [
        { href: "tableware.html#tableware-roster", label: "看桌面谱系" },
        { href: "tableware.html#tableware-ledger", label: "看资料台账" }
      ]
    }
  },
  tablewareSpotlight: {
    sectionClass: "tableware-focus-section",
    sectionId: "tableware-focus",
    eyebrow: "餐具专题",
    heading: "桌面谱系",
    title: "餐具专题",
    summary:
      "以宴饮尺度、盘面版式和成组陈设为三条线，重建餐具的分类逻辑：先看桌面位置，再看器物比例，最后才进入题景、边饰和跨文化适配。",
    stats: [
      ["6 组", "桌面样本"],
      ["4 条", "研究判断"],
      ["4 家", "机构来源"],
      ["2 端", "首页与分类页共用详情面板"]
    ],
    bands: [
      {
        eyebrow: "桌面位置",
        title: "主盘 / 深碗 / 佐碟",
        text: "餐具不先按年代看，而先按桌面分工看。主盘负责中心题景，深碗负责容积，佐碟负责边缘节奏。"
      },
      {
        eyebrow: "版式",
        title: "边饰 / 中心章 / 留白圈",
        text: "餐具最容易暴露装饰秩序。边饰决定观看边界，中心章决定主题密度，留白圈决定呼吸。"
      },
      {
        eyebrow: "流通",
        title: "外销订单 / 欧洲陈设 / 海贸适配",
        text: "盘、碗、碟的比例和题景分布，会随着外销市场和长途运输需求一起变化。"
      }
    ]
  },
  sourceDeck: {
    title: "馆藏与餐桌档案",
    summary: "首页内嵌详情统一按馆藏对象、公开研究和城市系统整理，用来承接餐具专题、历史时间线和来源网络。",
    items: [
      {
        id: "met-portuguese-dish",
        eyebrow: "馆藏对象",
        title: "葡萄牙王室纹章大盘：外销超大尺度",
        summary: "1520-1540 年之间的景德镇外销大盘直径超过 52 厘米，说明早期远洋订单已经要求盘面具备强烈的中心识别和远距陈设性。",
        metrics: [
          ["时期", "ca. 1520-40"],
          ["尺寸", "52.7 cm"],
          ["重点", "王室徽章 / 中心章"]
        ],
        detailTitle: "大盘先服务远距识别，再服务盛放",
        detailBody:
          "这件大盘的关键不在图案本身，而是景德镇已能为海外订单稳定生产超大尺度盘面——中心章、外圈边饰和器壁深度共同服务于展示与远途运输。",
        detailBullets: [
          "超大直径要求边饰与中心章层级非常清楚。",
          "葡萄牙王室纹章说明餐具早已被定制到跨洋订单里。",
          "餐具页可以据此把“陈设性”列为独立判断维度。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏"],
          ["支撑内容", "早期外销大盘与远距识别"]
        ],
        sourceLinks: [{ label: "博物馆对象页", url: "https://www.metmuseum.org/art/collection/search/204716" }]
      },
      {
        id: "met-burghley-bowl",
        eyebrow: "馆藏对象",
        title: "Burghley House 双耳碗：跨文化再定义",
        summary: "1573-1585 年的双耳碗证明餐具在进入欧洲之后，不只是被使用，也会被加上银鎏金构件重新定义身份和陈设方式。",
        metrics: [
          ["时期", "1573-1585"],
          ["宽度", "31.8 cm"],
          ["重点", "双耳 / 英国加装"]
        ],
        detailTitle: "餐具会在海外语境里被二次改装",
        detailBody:
          "这件碗最值得看的地方，是中国瓷胎与英国金属构件的组合关系。它提醒我们：餐具页不能只看原始窑口，还要看对象如何在跨文化环境里被重新使用、重新展示。",
        detailBullets: [
          "双耳扩大了端持和展示时的横向体量。",
          "金属加装说明餐具能从桌面器转成陈设器。",
          "这类对象最适合放进“海外接受”判断条目。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏"],
          ["支撑内容", "跨文化改装与陈设接受"]
        ],
        sourceLinks: [{ label: "博物馆对象页", url: "https://www.metmuseum.org/art/collection/search/199405" }]
      },
      {
        id: "bm-kraak-dish",
        eyebrow: "馆藏对象",
        title: "Kraak 外销盘：晚明海贸版式",
        summary: "这件 Kraak 盘直径约 30.8 厘米，是晚明外销餐具如何把边饰分区、中心章和运输陈设语法压缩进一件器物里的代表案例。",
        metrics: [
          ["时期", "late Ming"],
          ["尺寸", "30.8 cm"],
          ["重点", "分区边饰 / 中心章"]
        ],
        detailTitle: "Kraak 盘把版式结构写在器面上",
        detailBody:
          "Kraak 盘最适合拿来解释餐具页的版式逻辑：边饰像边框，中心章像标题图，盘壁深度则决定运输和盛放时的稳定性。它是“桌面秩序”最直观的对象样本之一。",
        detailBullets: [
          "边饰与中心章之间的留白区能显著影响题景密度。",
          "器物被海外市场长期接受，说明这套版式具有很强的可读性。",
          "餐具页的“边饰 / 中心章 / 留白圈”判断直接由此展开。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏"],
          ["支撑内容", "Kraak 版式与外销盘面"]
        ],
        sourceLinks: [{ label: "博物馆对象页", url: "https://www.britishmuseum.org/collection/object/A_1984-0202-33" }]
      },
      {
        id: "met-export-essay",
        eyebrow: "馆藏研究",
        title: "中国外销瓷：跨洋贸易主线",
        summary: "从伊斯兰世界、葡萄牙订单到 Dutch East India Company 与 Kraak 流通，外销瓷的研究主线已相当清晰，适合作为餐具页的传播背景。",
        metrics: [
          ["机构", "国际馆藏"],
          ["重点", "Islamic world / VOC / Kraak"],
          ["对象", "外销通史"]
        ],
        detailTitle: "外销餐具不是支线，而是一条完整研究主线",
        detailBody:
          "这篇文章的价值在于它把餐具对象页背后的市场链讲清楚了。用户在餐具页里看到的大盘、碗、佐碟，并不是孤立样本，而是海贸体系和消费习惯共同塑造出来的类型。",
        detailBullets: [
          "伊斯兰世界是早期海外市场的重要节点。",
          "葡萄牙订单与 VOC 贸易共同推动了外销类型定型。",
          "Kraak 盘的欧洲接受说明餐具也在塑造室内陈设。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏"],
          ["支撑内容", "海贸、出口与市场适配"]
        ],
        sourceLinks: [{ label: "研究综述文章", url: "https://www.metmuseum.org/essays/east-and-west-chinese-export-porcelain" }]
      },
      {
        id: "unesco-jingdezhen",
        eyebrow: "机构",
        title: "景德镇：连续制瓷城市系统",
        summary: "景德镇作为连续制瓷城市系统，提示器物分类不能只看器身，还要看其背后的原料、窑火与运输协作体系。",
        metrics: [
          ["机构", "国际资料"],
          ["重点", "1700 余年制瓷连续性"],
          ["对象", "城市系统"]
        ],
        detailTitle: "餐具分类也要回到城市系统",
        detailBody:
          "餐具的尺度、盘壁、釉色和成组稳定性，不是孤立的审美趣味，而是景德镇长期原料、窑火、作坊与运输网络共同形成的结果。",
        detailBullets: [
          "城市系统决定了餐具能否长期稳定成组生产。",
          "御窑与民窑分工会影响餐具尺寸与做工精度。",
          "把餐具放回城市系统里看，页面的分类深度才足够。"
        ],
        detailMeta: [
          ["来源", "国际公开资料"],
          ["支撑内容", "景德镇与成组稳定性"]
        ],
        sourceLinks: [
          { label: "景德镇城市系统", url: "https://www.unesco.org/en/creative-cities/jingdezhen" }
        ]
      },
      {
        id: "vam-overview",
        eyebrow: "馆藏研究",
        title: "中国青花瓷综述：从唐代试验到全球流通",
        summary: "从唐代早期样本、元代成熟、康熙分水到日本有田模仿和英国蓝白陈设热，青花的全球传播已形成清晰的研究主线。",
        metrics: [
          ["机构", "国际馆藏"],
          ["重点", "Tang / Yuan / global spread"],
          ["对象", "公开总述"]
        ],
        detailTitle: "综述：把零散对象串联成完整叙事",
        detailBody:
          "这篇综述把青花从唐代试验、元代成熟一路讲到 19 世纪欧洲室内陈设，让餐具页的传播背景和时间轴保持连续。",
        detailBullets: [
          "最早中国蓝白器可追溯到唐代。",
          "元代被明确放在成熟与定型的关键位置。",
          "文章还把蓝白陈设热与跨文化模仿纳入传播史。"
        ],
        detailMeta: [
          ["来源", "Victoria and Albert Museum"],
          ["支撑内容", "青花通史与传播主线"]
        ],
        sourceLinks: [{ label: "研究综述文章", url: "https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics" }]
      }
    ]
  },
  institutionSignals: [
    {
      eyebrow: "馆藏",
      title: "国际馆藏对象页",
      summary: "提供 Kraak 外销盘等对象页，用来校对餐具版式、年代和外销背景。",
      href: "https://www.metmuseum.org/art/collection",
      stat: "对象页样本"
    },
    {
      eyebrow: "馆藏",
      title: "开放馆藏精选",
      summary: "补足大盘、双耳碗、出口盘和小碟样本，让餐具页不只停留在单一类型。",
      href: "https://www.metmuseum.org/art/collection",
      stat: "开放馆藏"
    },
    {
      eyebrow: "研究综述",
      title: "青花全球传播总述",
      summary: "用公开总述把唐代、元代、海贸传播与英国室内陈设热压缩成首页可用的主线资料。",
      href: "https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics",
      stat: "公开总述"
    },
    {
      eyebrow: "城市系统",
      title: "景德镇制瓷传统",
      summary: "把景德镇从单件器物拉回连续制瓷城市系统，解释餐具稳定生产背后的基础设施。",
      href: "https://www.unesco.org/en/creative-cities/jingdezhen",
      stat: "城市系统"
    }
  ],
  institutionStats: [
    ["1700+ 年", "连续制瓷传统"],
    ["8 段", "历史时间节点"],
    ["4 组", "核心来源资料"],
    ["4 组", "桌面对象样本"]
  ],
  networkPanels: [
    {
      eyebrow: "馆藏对象",
      title: "对象页提供盘面比例、容积与装饰秩序的硬参照",
      summary: "国际馆藏把外销盘、双耳碗和出口小碟这些具体对象拉进首页和餐具页。"
    },
    {
      eyebrow: "研究文章",
      title: "传播背景与室内接受史由公开文章补足",
      summary: "公开研究把海贸、Kraak 流通和英国蓝白陈设热连成可追溯的背景主线。"
    },
    {
      eyebrow: "城市系统",
      title: "景德镇作为生产基础设施持续影响餐具稳定性",
      summary: "城市系统研究把器物放回原料、窑火、运输与作坊协作的长期语境中。"
    }
  ],
  featuredRecordTitle: "桌面谱系",
  featuredRecordSummary: "馆藏来源、对象页和陈设判断在这里共用一套内嵌详情面板，首页可以直接展开阅读。",
  featuredRecords: [
    {
      id: "kraak-dish-record",
      eyebrow: "馆藏样本",
      title: "Kraak 外销盘",
      summary: "Kraak 盘的边饰分区、中心章展示了晚明海贸如何重塑餐具版式语言。",
      imagePath: "https://images.metmuseum.org/CRDImages/es/web-large/ES5502.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.britishmuseum.org/collection/object/A_1984-0202-33",
      detailMeta: [
        ["年代", "late Ming"],
        ["机构", "国际馆藏"],
        ["类别", "外销盘"],
        ["观看重点", "边饰分区 / 中心章"]
      ],
      detailFacts: ["边饰像边框，中心章像主图。", "盘面留白圈直接影响题景呼吸。", "海贸流通让这套版式被长期放大。", "非常适合作为餐具页的首个判断样本。"]
    },
    {
      id: "portuguese-arms-record",
      eyebrow: "馆藏样本",
      title: "葡萄牙王室纹章大盘",
      summary: "超大尺度餐具如何先服务远距识别再服务盛放与陈设。",
      imagePath: "https://images.metmuseum.org/CRDImages/es/web-large/DP349125.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/204716",
      detailMeta: [
        ["年代", "ca. 1520-40"],
        ["机构", "国际馆藏"],
        ["材质", "Jingdezhen export porcelain"],
        ["观看重点", "王室徽章 / 超大盘面"]
      ],
      detailFacts: ["超大直径要求中心章与边饰层级清楚。", "海外订单会直接改写盘面主题。", "这件器物把餐具和陈设的边界拉得很近。", "最适合作为首页第二个桌面样本。"]
    },
    {
      id: "burghley-bowl-record",
      eyebrow: "馆藏样本",
      title: "Burghley House 双耳碗",
      summary: "双耳碗的案例说明餐具在跨文化环境中会被加装、再定义并进入新的观看体系。",
      imagePath: "https://images.metmuseum.org/CRDImages/es/web-large/DP266966.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/199405",
      detailMeta: [
        ["年代", "1573-1585"],
        ["机构", "国际馆藏"],
        ["材质", "Porcelain with gilded silver"],
        ["观看重点", "双耳 / 海外加装"]
      ],
      detailFacts: ["双耳扩大了端持与展示时的横向存在感。", "银鎏金加装说明餐具会被重新定义身份。", "它非常适合支撑“海外接受”这条判断线。", "同时也是跨文化餐具陈设的关键样本。"]
    },
    {
      id: "late-export-dish-record",
      eyebrow: "馆藏样本",
      title: "late 17th century export dish",
      summary: "17 世纪末出口盘直径约 28.6 厘米，展示了外销餐具如何在标准化尺寸里平衡题景与盛放空间。",
      imagePath: "https://images.metmuseum.org/CRDImages/es/web-large/DT3892.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/208218",
      detailMeta: [
        ["年代", "late 17th century"],
        ["机构", "国际馆藏"],
        ["类别", "出口盘"],
        ["观看重点", "标准化直径 / 鸟花题景"]
      ],
      detailFacts: ["标准化尺寸让它适合成组摆放和日常桌面服务。", "鸟花题景说明中心章依然承担主要叙事。", "它有助于解释餐具如何从大盘过渡到常用盘。", "也是页面里最适合承接列表台账的对象之一。"]
    }
  ],
  storyTabs: [
    ["brand", "品牌", "渔窑不是一页静态海报，而是一种把器物、火候、手感和生活节奏重新放回日常的方式。"],
    ["craft", "工艺", "青花真正迷人的地方不只在蓝白对比，也在拉坯、绘料、上釉、入窑之后留下的层层变化。"],
    ["landscape", "水墨", "页面里的水墨感不通过模糊背景获得，而是通过留白、局部点染和节制的蓝色层次来建立。"]
  ],
  // 首页首屏的时间线节点，顺序即默认阅读顺序；每个节点都提供焦点面板所需的说明与跳转。
  timeline: [
    {
      id: "tang-beginnings",
      era: "唐代",
      title: "唐代初现",
      summary: "最早的蓝白器已经出现，但胎体与发色都还没有进入后来的成熟状态。",
      detail:
        "唐代已出现早期蓝白器实例，器身偏灰、胎质尚粗，是一次方向明确的试验而非成熟体系。",
      facts: ["唐代早期蓝白器说明“蓝白组合”先于元代成熟。", "真正稳定的白胎与高温效果还要等到后续景德镇系统逐步建立。"],
      relatedCategories: ["art", "tableware"],
      researchId: "tang-beginnings",
      imagePath: "img/era-tang-sancai.jpg"
    },
    {
      id: "tang-sancai-tableware",
      era: "唐代",
      title: "三彩器用",
      summary: "唐代三彩和白瓷并行发展，桌面器、俑塑与陈设器共同构成早期器物谱系。",
      detail:
        "三彩釉色说明唐代器物已经具备强烈的装饰意识；它和早期蓝白试验并置，可以看出颜色、胎体和观看用途在唐代还处于多线探索状态。",
      facts: ["三彩器强调釉色流动和陈设感。", "白瓷与三彩并行，让后续蓝白器有了更复杂的材料背景。"],
      relatedCategories: ["tea", "tableware", "vase", "art"],
      researchId: "tang-beginnings",
      imagePath: "img/dynasty-pages/tang-sancai.JPG"
    },
    {
      id: "tang-teaware-forms",
      era: "唐代",
      title: "煎茶器形",
      summary: "唐代饮茶方式推动碗、盏、执壶等器型分工，器物开始围绕使用动作形成组合。",
      detail:
        "唐代茶事不是单件器物的孤立出现，而是煎煮、分饮、盛装与陈设共同推动器形变化。首页把茶具、餐具、花器与艺术品都纳入唐代入口，能更准确承接子页数量。",
      facts: ["饮茶动作会推动碗盏和壶类分工。", "器形组合比单件器物更适合解释唐代分类入口。"],
      relatedCategories: ["tea", "tableware", "vase", "art"],
      researchId: "tang-beginnings",
      imagePath: "img/dynasty-pages/tang-teaware.jpg"
    },
    {
      id: "qingbai-bridge",
      era: "宋元",
      title: "青白过渡",
      summary: "景德镇的青白瓷为后来的青花成熟打下了胎釉与烧成基础。",
      detail:
        "宋元之际的景德镇青白瓷已经具备透明偏蓝白的釉感与轻薄器体，为后来的青花成熟打下了胎釉与烧成基础。",
      facts: ["景德镇青白瓷说明当地早已具备高质量白瓷生产基础。", "倒烧与支圈等做法反映出器物成批烧造的成熟经验。"],
      relatedCategories: ["tea", "vase"],
      researchId: "qingbai-bridge",
      imagePath: "img/era-song-qingbai.jpg"
    },
    {
      id: "song-jian-tea",
      era: "宋代",
      title: "建盏与点茶",
      summary: "宋代点茶让盏形、釉色和茶汤泡沫成为共同判断点，茶具从器形进入使用方法。",
      detail:
        "建盏的黑釉、深腹和执握尺度都服务于点茶观看。它与景德镇青白瓷并行出现，说明宋代器物不是单一路径，而是在茶事、白瓷和陈设之间形成多重坐标。",
      facts: ["点茶要求盏内能衬出汤花。", "建盏和青白瓷共同撑起宋代器物差异。"],
      relatedCategories: ["tea", "tableware", "vase", "art"],
      researchId: "qingbai-bridge",
      imagePath: "img/dynasty-pages/song-jian.jpg"
    },
    {
      id: "song-qingbai-vase",
      era: "宋代",
      title: "青白花器",
      summary: "宋代青白瓷把轻薄胎、透明釉和收束轮廓推向稳定，花器与陈设器因此获得清简气质。",
      detail:
        "青白花器适合解释宋代器物的安静比例：它不依赖密集纹样，而依赖胎釉、轮廓和光泽让空间变得可读。",
      facts: ["透明偏青白釉让轮廓成为观看重点。", "花器入口能把宋代清简审美从茶盏扩展到陈设空间。"],
      relatedCategories: ["tea", "tableware", "vase", "art"],
      researchId: "qingbai-bridge",
      imagePath: "img/dynasty-pages/song-vase.jpg"
    },
    {
      id: "yuan-origins",
      era: "元代",
      title: "元代定型",
      summary: "景德镇开始建立稳定的蓝白语言，让青花从实验走向成熟。",
      detail:
        "元代的重要性在于把蓝白对比、胎釉关系与烧成控制逐步固定下来，后来的明清高峰都建立在这一步的稳定性上。",
      facts: ["青花在这一阶段从零散试验转向可重复生产。", "景德镇逐渐形成更成熟的瓷胎与发色控制。"],
      relatedCategories: ["tea", "art"],
      researchId: "yuan-origins",
      imagePath: "img/artworks/met-vase-landscape-49862.jpg"
    },
    {
      id: "yuan-large-vessels",
      era: "元代",
      title: "大器与图像",
      summary: "元代大罐、大盘和梅瓶让青花从局部装饰转向完整画面组织。",
      detail:
        "大体量器物给青花提供了更完整的叙事空间，中心章、边饰、肩部和胫部纹样开始形成分区秩序。",
      facts: ["大器让纹样组织从单点图案转向整器布局。", "梅瓶与大盘能同时连接花器、餐具和艺术品分类。"],
      relatedCategories: ["tea", "tableware", "coffee", "vase", "art"],
      researchId: "yuan-origins",
      imagePath: "img/dynasty-pages/yuan-bluewhite.jpg"
    },
    {
      id: "yuan-trade-forms",
      era: "元代",
      title: "贸易器形",
      summary: "元代青花面对更广市场，执壶、盘、瓶等器型开始承接跨文化使用需求。",
      detail:
        "贸易需求让青花不只服务本地使用，也进入更复杂的饮食、陈设和交流场景。咖啡具在元代导航里已有入口，首页也需要同步显示。",
      facts: ["器型会受市场和使用对象反向塑造。", "元代入口应同时承接茶具、餐具、咖啡具、花器与艺术品。"],
      relatedCategories: ["tea", "tableware", "coffee", "vase", "art"],
      researchId: "global-export",
      imagePath: "img/era-yuan-flask.jpg"
    },
    {
      id: "tianbai-yongle",
      era: "永乐",
      title: "甜白精进",
      summary: "永乐时期的甜白瓷把高岭土比例、薄胎与柔光白釉推向更高完成度。",
      detail:
        "永乐甜白器通过较高高岭土比例与轻薄胎体实现纯白釉面，服务于宫廷礼仪场景。“白”本身成为一种高度控制的工艺语言。",
      facts: ["甜白不是缺少装饰，而是让胎釉控制本身成为主角。", "永乐甜白说明景德镇在明初已经能稳定处理更轻更薄的白瓷表达。"],
      relatedCategories: ["tea", "vase"],
      researchId: "tianbai-yongle",
      imagePath: "img/era-ming-dragon.jpg"
    },
    {
      id: "xuande-stem-cup",
      era: "宣德",
      title: "宣德青花",
      summary: "宣德器把年款、钴料层次和宫廷图像要求结合成更精密的青花范式。",
      detail:
        "宣德高足杯上的五爪龙、海水纹与多层次青花被严密组织在一件小器里，说明青花已进入高度控制的宫廷表达阶段。",
      facts: ["宣德器常把年款、图像权威和发色层次同时放进作品。", "青花不再只是蓝白对比，而开始承担更复杂的宫廷视觉秩序。"],
      relatedCategories: ["tea", "art"],
      researchId: "xuande-stem-cup",
      imagePath: "img/主界面-2.png"
    },
    {
      id: "porcelain-capital",
      era: "景德镇",
      title: "瓷都景德镇",
      summary: "原料、窑火、运输与手工业网络在一座城市里完成汇合。",
      detail:
        "景德镇之所以关键，不在于单一工艺名词，而在于城市把原料、师徒训练、水陆运输和市场连接成了持续运行的器物生态。",
      facts: ["连续的制瓷传统让城市本身成为生产基础设施。", "青花在这里既是风格语言，也是产业系统的一部分。"],
      relatedCategories: ["tea", "vase"],
      researchId: "porcelain-capital",
      imagePath: "img/era-ming-bowl.jpg"
    },
    {
      id: "ming-doucai-wucai",
      era: "明代",
      title: "斗彩与五彩",
      summary: "明代青花体系继续分化，斗彩、五彩让釉下蓝和釉上彩形成更复杂的层次关系。",
      detail:
        "青花在明代已经不是单一风格，而是成为多种彩瓷系统的底层骨架。斗彩与五彩说明器物图像从线条、填彩到烧成顺序都更加复杂。",
      facts: ["青花轮廓能成为釉上彩的结构基础。", "彩瓷分化说明明代工艺不止一条蓝白路线。"],
      relatedCategories: ["tea", "tableware", "coffee", "vase", "art"],
      researchId: "underglaze-definition",
      imagePath: "img/dynasty-pages/ming-doucai.jpg"
    },
    {
      id: "kraak-export",
      era: "晚明",
      title: "克拉克外销",
      summary: "Kraak 瓷让青花在面向欧洲的贸易链里形成更鲜明的器型与边饰语法。",
      detail:
        "Kraak 盘从欧洲贸易与海难出水的考古语境可以看出，青花为适应跨洋运输和海外陈设发展出了分区边饰、中心章等新板式。",
      facts: ["Kraak 瓷说明晚明青花已经能针对海外市场形成稳定品类。", "分区边饰、盘面比例和流通路线在这一阶段紧密相连。"],
      relatedCategories: ["tableware", "coffee"],
      researchId: "kraak-export",
      imagePath: "img/背景图-餐具.png"
    },
    {
      id: "qing-kangxi-fenshui",
      era: "清代",
      title: "康熙分水",
      summary: "清代分水让同一种青料产生多层浓淡，青花画面更接近水墨的层次组织。",
      detail:
        "分水技术把青花从勾线与填色推进到浓淡递进。器物图像开始承担更强的空间感，茶具、花器、艺术品与咖啡具都能从这里获得观看线索。",
      facts: ["分水让青花出现多层蓝色。", "康熙时期的水墨感是清代青花的重要判断点。"],
      relatedCategories: ["tea", "tableware", "coffee", "vase", "art"],
      researchId: "ink-painting-effect",
      imagePath: "img/era-qing-dragon.jpg"
    },
    {
      id: "qing-famille-export",
      era: "清代",
      title: "粉彩与外销",
      summary: "清代外销体系继续扩大，粉彩、青花和成套餐具共同进入全球陈设与桌面场景。",
      detail:
        "清代器物需要同时看国内审美、宫廷要求和海外订单。粉彩和青花并行，使餐具、茶具、咖啡具和艺术品在同一贸易网络里被重新组织。",
      facts: ["海外订单推动成套餐具和陈设器稳定化。", "粉彩与青花并行说明清代不再只有单一蓝白表达。"],
      relatedCategories: ["tea", "tableware", "coffee", "vase", "art"],
      researchId: "chinamania-interior",
      imagePath: "img/dynasty-pages/qing-famille.jpg"
    },
    {
      id: "global-export",
      era: "海贸",
      title: "全球传播",
      summary: "青花借由海陆贸易进入更大的世界流通体系。",
      detail:
        "外销并不是简单的输出，而是一场持续的适配过程。市场口味、器型需求和运输条件都会反过来改写青花的观看方式。",
      facts: ["贸易网络推动了题材、器型和装饰密度的变化。", "青花的国际辨识度是在长期跨文化流通中被塑造出来的。"],
      relatedCategories: ["tableware", "coffee"],
      researchId: "global-export",
      imagePath: "img/era-qing-dragon.jpg"
    }
  ],
  jingdezhenPanel: {
    eyebrow: "瓷都脉络",
    title: "景德镇为何成为青花的关键坐标",
    summary:
      "景德镇的重要性在于原料、运输、作坊协作与制度化生产同时出现，具有超过 1700 年的连续制瓷传统。",
    facts: [
      "高岭土与瓷石决定了胎质和烧成稳定性。",
      "御窑系统把工序、分工与质量控制拉进同一条生产链。",
      "水陆运输网络让器物更快进入国内外市场。",
      "城市本身长期承担了训练、生产、流通和展示的复合功能。"
    ]
  },
  process: [
    ["选土", "以瓷石和高岭土配比为基础，决定器物胎质。"],
    ["成型", "拉坯与修坯控制器物比例，也决定手握时的重心。"],
    ["绘青花", "纹样以钴料落笔，线条和分水层次在这一环节建立。"],
    ["上釉", "透明釉保护画面，也让烧成后的青花更通透。"],
    ["入窑", "高温还原焰让蓝色真正沉下来，器物也在此完成气质。"]
  ],
  readingCards: [
    ["手冲滤泡协议", "用 NCA 的温度、时间与粉水比范围建立手冲参数基线。", "manual-brewing-protocol"],
    ["法压浸泡协议", "4 分钟接触时间与粗研磨规则决定了法压壶的口感框架。", "french-press-protocol"],
    ["压力萃取工作流", "把 espresso 的接触时间、投粉量和设备规格放回同一条工作流里。", "espresso-pressure-workflow"],
    ["冷萃浓缩系统", "从低温长时接触和浓缩逻辑理解冷萃器具为什么需要独立分类。", "cold-brew-concentrate"],
    ["外销咖啡壶", "日本外销咖啡壶的器型随欧洲市场需求而演变，展示了跨文化设计适应。", "export-coffee-pot"],
    ["英式咖啡壶", "Worcester coffee-pot 把 18 世纪英国咖啡饮用转成可量产的器用类型。", "worcester-coffee-pot"],
    ["批量滴滤", "Moccamaster 的 1.25L 批量滴滤机把大容量冲煮稳定在 4-6 分钟。", "batch-drip-workflow"],
    ["奥斯曼咖啡杯文化", "咖啡具首先是一套社交器物，器型、容量和装饰都服务于共饮礼仪。", "ottoman-coffee-culture"]
  ],
  featuredResearch: {
    title: "专题选读",
    summary: "从咖啡器具、冲煮协议与跨文化器物史里选出适合继续深读的专题。",
    ids: [
      "manual-brewing-protocol",
      "french-press-protocol",
      "espresso-pressure-workflow",
      "export-coffee-pot"
    ]
  },
  researchIndex: {
    title: "研究索引",
    summary: "按器具、冲煮或跨文化传播主题切换专题，首页直接提供检索与筛选。",
    filters: [
      { id: "all", label: "全部", tag: "" },
      { id: "history", label: "历史", tag: "历史" },
      { id: "jingdezhen", label: "景德镇", tag: "景德镇" },
      { id: "craft", label: "工艺", tag: "工艺" },
      { id: "trade", label: "海贸", tag: "海贸" },
      { id: "coffee", label: "咖啡", tag: "咖啡" },
      { id: "brewing", label: "冲煮", tag: "冲煮" }
    ],
    periods: [
      { id: "all-periods", label: "全部时段", period: "" },
      { id: "tang-song", label: "唐宋", period: "唐宋" },
      { id: "yuan", label: "元代", period: "元代" },
      { id: "ming-qing", label: "明清", period: "明清" },
      { id: "modern", label: "近现代", period: "近现代" },
      { id: "overview", label: "通识", period: "通识" }
    ],
    sources: [
      { id: "all-sources", label: "全部来源", sourceType: "" },
      { id: "museum", label: "博物馆研究", sourceType: "博物馆研究" },
      { id: "collection", label: "博物馆馆藏", sourceType: "博物馆馆藏" },
      { id: "international", label: "国际机构", sourceType: "国际机构" },
      { id: "association", label: "行业组织", sourceType: "行业组织" },
      { id: "brand", label: "品牌资料", sourceType: "品牌资料" }
    ]
  },
  // 研究路径为首页和专题页提供连续阅读顺序，避免内容只停留在单张卡片。
  researchPaths: [
    {
      id: "origin-route",
      title: "起源读法",
      summary: "从唐代试验、青白过渡到元代定型，先看青花怎样一步步长出来。",
      stops: ["tang-beginnings", "qingbai-bridge", "yuan-origins"]
    },
    {
      id: "entry-route",
      title: "入门读法",
      summary: "先建立时间线，再理解景德镇，最后回到器物使用场景。",
      stops: ["yuan-origins", "porcelain-capital", "global-export"]
    },
    {
      id: "craft-route",
      title: "工艺读法",
      summary: "从釉下彩、甜白、宣德青花到分水，重点看工艺如何变成视觉效果。",
      stops: ["underglaze-definition", "tianbai-yongle", "xuande-stem-cup", "ink-painting-effect"]
    },
    {
      id: "object-route",
      title: "器物读法",
      summary: "把专题重新拉回茶具、餐具、花器和艺术品的观看顺序里。",
      stops: ["porcelain-capital", "global-export", "imperial-kiln-system"]
    },
    {
      id: "global-route",
      title: "全球读法",
      summary: "从 Kraak 外销、日本有田模仿到全球传播，追踪青花如何穿越市场和文化边界。",
      stops: ["kraak-export", "arita-imitation", "global-export"]
    }
  ],
  glossary: [
    {
      id: "fenshui",
      title: "分水",
      summary: "用浓淡层次让青花呈现近似水墨的渗化效果。",
      relatedResearchIds: ["ink-painting-effect"]
    },
    {
      id: "youxia-cai",
      title: "釉下彩",
      summary: "在坯体上绘饰后罩透明釉高温烧成，是青花最稳定的识别方式。",
      relatedResearchIds: ["underglaze-definition"]
    },
    {
      id: "yuyao",
      title: "御窑",
      summary: "围绕皇家需求建立的生产与分工系统，直接影响器型和质量标准。",
      relatedResearchIds: ["imperial-kiln-system"]
    },
    {
      id: "waixiao-ci",
      title: "外销瓷",
      summary: "面向海外市场的器物形态与纹样选择，让青花进入跨文化流通。",
      relatedResearchIds: ["global-export"]
    },
    {
      id: "gaolingtu",
      title: "高岭土",
      summary: "与瓷石共同决定胎体细腻度和烧成稳定性，是景德镇工艺基础的一部分。",
      relatedResearchIds: ["porcelain-capital"]
    },
    {
      id: "qingliao",
      title: "青料",
      summary: "绘制青花纹样所用的钴料来源与纯度，会直接影响发色层次和晕散效果。",
      relatedResearchIds: ["underglaze-definition", "ink-painting-effect"]
    },
    {
      id: "qingbai",
      title: "青白瓷",
      summary: "宋元景德镇的重要白瓷类型，透明釉里带微青感，是后来青花成熟前的重要过渡层。",
      relatedResearchIds: ["qingbai-bridge"]
    },
    {
      id: "tianbai",
      title: "甜白",
      summary: "明永乐时期著名白釉类型，强调高岭土比例、轻薄胎体与柔和乳白光感。",
      relatedResearchIds: ["tianbai-yongle"]
    },
    {
      id: "nianhao",
      title: "年款",
      summary: "器物上的朝代款识，不只用于断代，也会强化宫廷器的身份与标准化意识。",
      relatedResearchIds: ["xuande-stem-cup"]
    },
    {
      id: "fushao",
      title: "覆烧",
      summary: "为控制器形与釉面效果而采用的倒烧方式，常借助支圈等辅助结构完成。",
      relatedResearchIds: ["qingbai-bridge"]
    },
    {
      id: "kraak",
      title: "Kraak",
      summary: "晚明面向海外贸易的大宗青花类型，常见分区边饰与便于远途流通的盘类器形。",
      relatedResearchIds: ["kraak-export"]
    }
  ]
};

// 首页当前以茶具专题为准。这里集中覆盖首屏、焦点专题、馆藏样本和资料台账，
// 保留前面已经可用的时间线与术语结构，同时把首页叙事统一收束到茶事与茶具系统。
Object.assign(home, {
  hero: {
    englishName: "fishing kiln",
    title: "渔窑手工青花",
    subtitle: "茶具、馆藏与茶事资料首页",
    description:
      "以《茶经》《大观茶论》、国际公开对象页与景德镇制瓷资料为基础，把茶具体系、历史时间线、来源网络与器类入口组织成一个正式的机构型首页。",
    actions: [
      { href: "#tea-focus", label: "进入茶具专题" },
      { href: "#home-source-deck", label: "查看资料台账" }
    ],
    metrics: [
      ["1700+ 年", "连续制瓷传统"],
      ["8 段", "历史时间节点"],
      ["4 组", "核心来源资料"],
      ["5 组", "茶具对象样本"]
    ],
    sectionLinks: [
      { href: "#tea-focus", label: "茶具专题" },
      { href: "#featured-records", label: "馆藏样本" },
      { href: "#home-source-deck", label: "资料台账" },
      { href: "#network", label: "资料网络" },
      { href: "#timeline", label: "时间轴" },
      { href: "#featured-research", label: "研究路径" },
      { href: "#objects", label: "器类入口" }
    ],
    brief: [
      ["专题范围", "本轮首页把茶具专题、时间线、资料台账、馆藏样本和研究路径并列呈现。"],
      ["来源体系", "国际公开馆藏与 Wikisource 共同提供对象、古籍与城市系统背景。"],
      ["阅读方式", "先看茶具主线，再回到时间线、资料网络和器类入口。"]
    ],
    focusCard: {
      eyebrow: "当期专题导览",
      title: "茶具页已升级为专题研究页",
      summary: "新版茶具页把器型卡、文献规则、馆藏样本和资料台账并排展开，不再停留在普通分类页层级。",
      actions: [
        { href: "tea.html#tea-typology", label: "看茶具体系" },
        { href: "tea.html#tea-ledger", label: "看资料台账" }
      ]
    }
  },
  institutionStats: [
    ["1700+ 年", "连续制瓷传统"],
    ["8 段", "历史时间节点"],
    ["4 组", "核心来源资料"],
    ["5 组", "茶具对象样本"]
  ],
  tablewareSpotlight: {
    sectionClass: "feature-focus-section",
    sectionId: "tea-focus",
    eyebrow: "茶具专题",
    heading: "茶具专题",
    title: "茶具专题",
    summary: "以点茶、泡饮与外销分饮三条线，重建盏、壶、盖碗与杯碟的阅读顺序：先看饮法，再看器型，再看成套服务与流通。",
    stats: [
      ["6 组", "核心器型"],
      ["6 条", "资料节点"],
      ["4 家", "机构来源"],
      ["2 端", "首页与分类页共用详情"]
    ],
    bands: [
      {
        eyebrow: "点茶",
        title: "盏色、腹深与观汤先于纹样",
        text: "从《大观茶论》到宋代建盏，点茶系统先要求茶盏能衬出汤色、留住热量，再谈图案和器表趣味。"
      },
      {
        eyebrow: "泡饮",
        title: "壶嘴、把位与出汤路径决定泡饮节奏",
        text: "进入明清以后，茶壶与小型注器让出汤路径、把位稳定和容量控制成为第一层分类条件。"
      },
      {
        eyebrow: "分饮",
        title: "盖碗、杯碟和外销服务把茶带进套组阅读",
        text: "从盖碗到外销杯碟，茶具开始按成组服务被观看，器物之间的搭配关系和市场流通同样重要。"
      }
    ]
  },
  featuredRecordTitle: "馆藏样本",
  featuredRecordSummary: "把茶盏、注器、茶壶与外销杯碟并排展示，首页可以直接展开细读和比对。",
  // 首页资料台账继续复用共享 detail deck，避免来源只能跳转离站阅读。
  sourceDeck: {
    title: "茶具资料台账",
    summary: "首页内嵌详情统一按古籍规则、馆藏对象与国际机构整理，用来承接茶具专题、历史时间线和来源网络。",
    items: [
      {
        id: "tea-classic-tools",
        eyebrow: "典籍",
        title: "《茶经·四之器》：茶事先是一套器物工作流",
        summary: "《茶经·四之器》把茶事拆成二十四事，说明茶具不是单件器物，而是一整套分工明确的工作流。",
        metrics: [
          ["对象", "二十四事"],
          ["重点", "器用分工"],
          ["用法", "煮 / 贮 / 分 / 饮"]
        ],
        detailTitle: "茶具先按步骤协作，再按单件器形判断",
        detailBody:
          "《茶经》把风炉、鍑、夹、碗等器具排成连续工序，提醒我们：茶具页如果只列单件器物，就会丢掉真正的茶事结构。首页资料台账要先把器用如何协作交代清楚。",
        detailBullets: [
          "茶具系统从一开始就是组合，不是单件器物陈列。",
          "器具名称本身已经预示储茶、煮水、分饮和啜饮的不同环节。",
          "这种分工很适合翻译成正式网站里的结构化栏目。"
        ],
        detailMeta: [
          ["来源", "Wikisource《茶经·四之器》"],
          ["支撑内容", "茶具系统与器用分工"]
        ],
        sourceLinks: [{ label: "《茶经·四之器》", url: "https://zh.wikisource.org/zh-hans/%E8%8C%B6%E7%B6%93/%E5%9B%9B%E4%B9%8B%E5%99%A8" }]
      },
      {
        id: "daguan-zhan",
        eyebrow: "典籍",
        title: "《大观茶论》：盏色与玉毫先决定点茶观看",
        summary: "《大观茶论》把茶盏的青黑底色和玉毫纹理放在前面讨论，说明茶盏的首要功能是衬色与观汤。",
        metrics: [
          ["对象", "茶盏"],
          ["重点", "青黑 / 玉毫"],
          ["用法", "点茶 / 观色"]
        ],
        detailTitle: "盏色不是装饰，而是茶汤显示器",
        detailBody:
          "《大观茶论》并不把茶盏当普通容器来讲，而是先讲黑釉底色如何映出汤花。这条规则说明茶盏的分类逻辑首先来自饮法，其次才是图案与纹样。",
        detailBullets: [
          "茶盏先服务观看，再服务装饰。",
          "点茶器更强调腹深、口沿和保温性。",
          "这套判断标准能把茶盏和后起的杯碟、盖碗区分开。"
        ],
        detailMeta: [
          ["来源", "Wikisource《大观茶论》"],
          ["支撑内容", "茶盏观察标准"]
        ],
        sourceLinks: [{ label: "《大观茶论》", url: "https://zh.wikisource.org/zh-hans/%E5%A4%A7%E8%A7%80%E8%8C%B6%E8%AB%96" }]
      },
      {
        id: "met-jian-bowl",
        eyebrow: "馆藏",
        title: "宋代建盏：点茶的阅读终点在盏心",
        summary: "宋代建盏高约 7.5 厘米、口径约 12.4 厘米，说明点茶器的重点是腹深、黑釉和近身观汤。",
        metrics: [
          ["时代", "11th–12th century"],
          ["器高", "7.5 cm"],
          ["口径", "12.4 cm"]
        ],
        detailTitle: "点茶盏先用黑釉托住汤色",
        detailBody:
          "这件建盏和《大观茶论》的判断能互相印证：盏色、腹深和口沿结构共同服务于点茶观看。它不是依靠花纹成立，而是依靠器形和釉色让汤色更清楚。",
        detailBullets: [
          "黑釉底色有利于观察茶汤与泡沫。",
          "腹深和口径平衡了留温与击拂空间。",
          "这是茶具页判断盏系器的基准样本。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏"],
          ["支撑内容", "点茶盏尺度与釉色"]
        ],
        sourceLinks: [
          { label: "博物馆对象页", url: "https://www.metmuseum.org/art/collection/search/48112" },
          { label: "《大观茶论》", url: "https://zh.wikisource.org/zh-hans/%E5%A4%A7%E8%A7%80%E8%8C%B6%E8%AB%96" }
        ]
      },
      {
        id: "bm-teapot",
        eyebrow: "馆藏",
        title: "明末青花茶壶：泡饮路径的定型",
        summary: "1643 年青花茶壶高约 13 厘米、宽约 19 厘米，说明明清泡饮已需要稳定的出汤路径和握持关系。",
        metrics: [
          ["时代", "1643"],
          ["器高", "13 cm"],
          ["器宽", "19 cm"]
        ],
        detailTitle: "泡饮器先看壶嘴、把位和容量控制",
        detailBody:
          "元末明初之后，用壶浸泡茶叶逐渐成为最常见的饮法。茶壶不是装饰加法，而是饮法变化的结果。",
        detailBullets: [
          "壶嘴和把手共同决定出汤路线。",
          "小型壶体更适合桌面泡饮与分杯。",
          "鸟纹与花枝说明茶壶在实用之外仍承担审美表达。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏 1984,0303.3"],
          ["支撑内容", "泡饮壶系与明清饮法"]
        ],
        sourceLinks: [{ label: "博物馆对象页", url: "https://www.britishmuseum.org/collection/object/A_1984-0303-3" }]
      },
      {
        id: "bm-gaiwan",
        eyebrow: "馆藏",
        title: "盖碗：碗、盖、托的三位一体",
        summary: "盖碗（gaiwan）是带盖与托的茶碗，尺寸和盖形为断代提供重要线索。",
        metrics: [
          ["时期", "1900–1975"],
          ["构成", "碗 / 盖 / 托"],
          ["重点", "盖形与比例"]
        ],
        detailTitle: "盖碗让茶具开始按套组而不是单杯阅读",
        detailBody:
          "盖碗最重要的不是多了一只盖，而是把留温、闻香、分饮和承接动作都集中在一组器物里。它提示我们：晚近茶具要同时看组合关系和单件造型。",
        detailBullets: [
          "碗、盖、托三件组合定义了新的用手路径。",
          "尺寸和盖形变化本身可以成为时间线线索。",
          "它适合说明茶具如何从单件走向套组阅读。"
        ],
        detailMeta: [
          ["来源", "国际公开馆藏 1985,1024.39.1-9"],
          ["支撑内容", "盖碗构成与晚近饮茶"]
        ],
        sourceLinks: [{ label: "博物馆对象页", url: "https://www.britishmuseum.org/collection/object/A_1985-1024-39-1-9" }]
      },
      {
        id: "unesco-tea-ich",
        eyebrow: "国际机构",
        title: "茶：从饮品到一整套社会实践",
        summary: "中国传统制茶及相关社会实践提醒我们，茶具必须放回待客、共饮和地方习俗里理解。",
        metrics: [
          ["机构", "国际资料"],
          ["重点", "社会实践"],
          ["对象", "制茶 / 待客 / 传承"]
        ],
        detailTitle: "茶具页要同时呈现器型和场景",
        detailBody:
          "如果只看器型，茶具会沦为一张表；茶具真正的意义来自社交、待客和地方实践。首页资料网络必须把这一层放进去。",
        detailBullets: [
          "茶具的差异来自饮法，也来自社交场景。",
          "茶与器的关系不是静态陈列，而是持续实践。",
          "这条机构来源让首页避免只剩器物目录。"
        ],
        detailMeta: [
          ["来源", "国际公开资料"],
          ["支撑内容", "茶具与社会实践"]
        ],
        sourceLinks: [
          {
            label: "茶社会实践条目",
            url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884"
          }
        ]
      }
    ]
  },
  institutionSignalsTitle: "机构来源",
  institutionSignalsSummary: "首页保留馆藏、典籍与国际机构来源，便于从专题阅读直接回到原始对象页和公开资料。",
  institutionSignals: [
    {
      eyebrow: "馆藏",
      title: "国际馆藏对象页",
      summary: "提供明末茶壶、盖碗等对象页，用来校对茶具的年代、尺寸与饮法语义。",
      href: "https://www.britishmuseum.org/collection",
      stat: "对象页样本"
    },
    {
      eyebrow: "馆藏",
      title: "国际馆藏精选",
      summary: "补足建盏、注器、茶壶、执壶和外销杯碟样本，让茶具页不只停留在单一年代或单一器种。",
      href: "https://www.metmuseum.org/art/collection",
      stat: "开放馆藏"
    },
    {
      eyebrow: "国际机构",
      title: "非遗与社会实践",
      summary: "把茶事从单件器物拉回社会实践、景德镇城市系统与窑业背景中。",
      href: "https://www.unesco.org/en/creative-cities/jingdezhen",
      stat: "茶与城市系统"
    },
    {
      eyebrow: "典籍",
      title: "Wikisource",
      summary: "承接《茶经》《大观茶论》原文，提供茶具分工、盏色判断与饮法背景。",
      href: "https://zh.wikisource.org/",
      stat: "典籍原文"
    }
  ],
  networkTitle: "资料网络",
  networkSummary: "把馆藏对象、古籍规则、社会实践与城市系统并排展示，让首页读法更接近正式资料门户。",
  networkPanels: [
    {
      eyebrow: "馆藏对象",
      title: "对象页提供尺寸、器型和成套关系的硬参照",
      summary: "国际馆藏把茶盏、茶壶、盖碗和杯碟这些具体器物拉进首页和茶具页。"
    },
    {
      eyebrow: "国际机构",
      title: "社会实践与城市系统",
      summary: "把茶具放回待客、共饮和景德镇制瓷网络中，避免页面只剩器物图录。"
    },
    {
      eyebrow: "典籍规则",
      title: "古籍判断把饮法和器型重新接上",
      summary: "《茶经》提供器具分工，《大观茶论》提供茶盏判断，研究专题页负责把规则拉回具体器物。"
    }
  ],
  storySectionTitle: "专题叙事",
  storySectionSummary: "从茶事秩序、青花工艺与景德镇网络三个角度切入首页，保持正式站点的连续阅读感。",
  storyTabs: [
    ["tea-order", "茶事秩序", "茶具不先按器名堆叠，而先按点茶、泡饮与分饮的动作顺序排列，页面结构也遵循这条阅读主线。"],
    ["craft", "工艺背景", "盏色、腹深、壶流、盖形和杯碟比例都不是孤立审美，它们来自制瓷工艺与饮茶动作的共同约束。"],
    ["network", "城市与流通", "景德镇与国际公开资料共同说明茶具既是器物，也是社会实践和城市网络的一部分。"]
  ],
  timelineTitle: "茶事与景德镇时间线",
  timelineSummary: "把青白瓷基础、元代定型、明清饮法变化和全球流通放回同一条长时段主线，解释茶具为何会持续改形。",
  jingdezhenPanel: {
    eyebrow: "瓷都脉络",
    title: "景德镇为何能长期承接茶具变化",
    summary:
      "茶盏、壶、杯碟与外销服务的变化，背后是景德镇对胎釉、成型、运输和市场的长期协调，延续超过 1700 年的制瓷传统使其成为当之无愧的瓷都。",
    facts: [
      "高岭土与瓷石决定了盏、壶、杯等器形的胎质和烧成稳定性。",
      "御窑与民窑分工会影响器型尺寸、釉色完成度与生产节奏。",
      "水陆运输网络让茶具更快进入国内外市场，也促成成套服务的流通。",
      "城市本身长期承担了训练、生产、流通和展示的复合功能。"
    ]
  },
  featuredRecords: [
    {
      id: "jian-bowl-record",
      eyebrow: "馆藏样本",
      title: "宋代建盏",
      summary: "建盏让首页能把点茶、黑釉和近身观汤放回同一件器物里理解。",
      imagePath: "https://images.metmuseum.org/CRDImages/as/web-large/DP-15452-025.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/48112",
      detailMeta: [
        ["年代", "11th–12th century"],
        ["机构", "国际馆藏"],
        ["类别", "点茶盏"],
        ["观看重点", "腹深、黑釉与汤色"]
      ],
      detailFacts: [
        "黑釉能更清楚地衬出茶汤与泡沫。",
        "腹深和口径共同决定点茶的击拂空间。",
        "它说明茶具分类首先来自饮法，不是来自题材。",
        "非常适合作为茶具页盏系入口。"
      ]
    },
    {
      id: "covered-pot-record",
      eyebrow: "馆藏样本",
      title: "Covered wine pot or teapot",
      summary: "小型有盖注器把注汤、留温和桌面分配压缩成一条清晰的动作路径。",
      imagePath: "https://images.metmuseum.org/CRDImages/rl/web-large/1701_31.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/461213",
      detailMeta: [
        ["年代", "1662–1722"],
        ["机构", "国际馆藏"],
        ["材质", "Porcelain painted in underglaze blue"],
        ["观看重点", "盖、壶嘴和出汤路径"]
      ],
      detailFacts: [
        "盖与壶嘴共同决定留温和出汤方式。",
        "小体量更接近桌面分饮场景。",
        "它处在酒器与茶壶之间的过渡地带，很适合解释器类迁移。",
        "青花装饰在这里服务的首先是动作秩序。"
      ]
    },
    {
      id: "teapot-record",
      eyebrow: "馆藏样本",
      title: "十八世纪中国瓷茶壶",
      summary: "瓷茶壶的壶体、流口和把位构成三角关系，说明泡饮器如何先以功能稳定成立。",
      imagePath: "https://images.metmuseum.org/CRDImages/as/web-large/28350.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/47545",
      detailMeta: [
        ["年代", "18th century"],
        ["机构", "国际馆藏"],
        ["材质", "Jingdezhen ware"],
        ["观看重点", "壶嘴、把位与持握角度"]
      ],
      detailFacts: [
        "壶嘴和把位会直接决定手部路线。",
        "小壶体让浓缩泡饮更可控。",
        "这类器物说明青花茶具不只靠器面图像成立。",
        "它非常适合作为茶具页壶系卡的视觉样本。"
      ]
    },
    {
      id: "cup-saucer-record",
      eyebrow: "馆藏样本",
      title: "外销杯碟",
      summary: "中国制杯碟为美国市场而作，把杯与碟拆成一组服务器，适合解释茶具如何进入国际礼仪。",
      imagePath: "https://images.metmuseum.org/CRDImages/ad/web-large/DP260305.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/8299",
      detailMeta: [
        ["年代", "ca. 1860–66"],
        ["机构", "国际馆藏"],
        ["类别", "分饮套组"],
        ["观看重点", "杯高、碟径与桌面服务"]
      ],
      detailFacts: [
        "杯与碟分离意味着握持和承接被拆成两步。",
        "器物开始按成套服务而不是单杯被定义。",
        "外销市场会反过来改变中国瓷器的阅读方式。",
        "它是理解近代茶具流通的实物切口。"
      ]
    },
    {
      id: "ewer-record",
      eyebrow: "馆藏样本",
      title: "Burghley House Ewer",
      summary: "执壶样本让首页能把注器前史接回茶壶系统，说明出汤器并不是一夜之间出现的。",
      imagePath: "https://images.metmuseum.org/CRDImages/es/web-large/DT568.jpg",
      sourceName: "国际公开馆藏",
      sourceUrl: "https://www.metmuseum.org/art/collection/search/199404",
      detailMeta: [
        ["年代", "1573–ca. 1585"],
        ["机构", "国际馆藏"],
        ["材质", "Chinese porcelain, British mounts"],
        ["观看重点", "注器前史与跨区域流通"]
      ],
      detailFacts: [
        "执壶说明注器逻辑早于成熟茶壶而存在。",
        "英国加装金属件说明对象会在流通中继续改造。",
        "它能把茶具页接回更长的注器演变线。",
        "跨区域改装也解释了茶具为何常常成套变化。"
      ]
    }
  ],
  readingSectionTitle: "档案选读",
  readingSectionSummary: "把首页中的研究档案进一步拉回连续阅读，避免数据只停留在索引卡层面。",
  readingCards: [
    ["青白过渡", "青白瓷让景德镇先建立白瓷基础，再把蓝白推进成熟。", "qingbai-bridge"],
    ["元代定型", "青花从实验走向成熟，景德镇开始形成稳定的蓝白语言。", "yuan-origins"],
    ["永乐甜白", "白釉本身在明初就被推到极高完成度。", "tianbai-yongle"],
    ["宣德高足杯", "宫廷小器如何把年款、图像和发色层次压进单件器物。", "xuande-stem-cup"],
    ["瓷都景德镇", "一座城市如何围绕窑火、原料和运输形成完整产业系统。", "porcelain-capital"],
    ["分水如水墨", "单一蓝色如何在器面上长出水墨层次和空间感。", "ink-painting-effect"],
    ["克拉克外销", "晚明外销盘如何把青花带进跨洋贸易网络。", "kraak-export"],
    ["全球传播", "青花为什么会成为世界范围内最容易识别的中国器物。", "global-export"]
  ],
  featuredResearch: {
    title: "专题选读",
    summary: "从茶具、景德镇和青花工艺里选出适合继续深读的专题，保持首页到专题页的阅读连续性。",
    ids: ["qingbai-bridge", "yuan-origins", "tianbai-yongle", "xuande-stem-cup"]
  },
  researchPaths: [
    {
      id: "tea-origin-route",
      title: "茶具起点读法",
      summary: "从青白过渡、元代定型到永乐甜白，先看茶具赖以成立的白瓷和青花基础。",
      stops: ["qingbai-bridge", "yuan-origins", "tianbai-yongle"]
    },
    {
      id: "tea-vessel-route",
      title: "器型演变读法",
      summary: "从宣德高足杯、景德镇系统到全球传播，追踪茶具如何从单件器走向成套服务。",
      stops: ["xuande-stem-cup", "porcelain-capital", "global-export"]
    },
    {
      id: "tea-network-route",
      title: "流通网络读法",
      summary: "从景德镇、Kraak 外销到全球传播，看茶具如何在不同市场与社交场景里被改写。",
      stops: ["porcelain-capital", "kraak-export", "global-export"]
    },
    {
      id: "tea-craft-route",
      title: "工艺判断读法",
      summary: "从釉下彩、甜白和分水关系切入，回看茶具为何既服务饮法也服务青花视觉。",
      stops: ["underglaze-definition", "tianbai-yongle", "ink-painting-effect"]
    }
  ],
  glossaryTitle: "术语卡",
  glossarySummary: "把釉下彩、甜白、御窑和外销瓷等概念继续留在首页，方便从概念再跳回专题与对象。",
  processTitle: "制瓷工序",
  processSummary: "用可切换步骤解释茶具背后的制瓷过程，而不是只留一段静态说明。",
  researchIndex: {
    title: "研究索引",
    summary: "按历史、景德镇、工艺、海贸与收藏主题切换专题，首页直接提供检索与筛选。",
    filters: [
      { id: "all", label: "全部", tag: "" },
      { id: "history", label: "历史", tag: "历史" },
      { id: "jingdezhen", label: "景德镇", tag: "景德镇" },
      { id: "craft", label: "工艺", tag: "工艺" },
      { id: "trade", label: "海贸", tag: "海贸" },
      { id: "collection", label: "收藏", tag: "收藏" }
    ],
    periods: [
      { id: "all-periods", label: "全部时段", period: "" },
      { id: "tang-song", label: "唐宋", period: "唐宋" },
      { id: "yuan", label: "元代", period: "元代" },
      { id: "ming-qing", label: "明清", period: "明清" },
      { id: "modern", label: "近现代", period: "近现代" },
      { id: "overview", label: "通识", period: "通识" }
    ],
    sources: [
      { id: "all-sources", label: "全部来源", sourceType: "" },
      { id: "museum", label: "博物馆研究", sourceType: "博物馆研究" },
      { id: "collection", label: "博物馆馆藏", sourceType: "博物馆馆藏" },
      { id: "international", label: "国际机构", sourceType: "国际机构" },
      { id: "association", label: "行业组织", sourceType: "行业组织" },
      { id: "brand", label: "品牌资料", sourceType: "品牌资料" }
    ],
    emptyHint: "可先清空条件，再从茶具、工艺、景德镇或海贸主题重新进入。"
  }
});
