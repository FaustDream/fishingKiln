import { about } from "./content/about.js";
import { categories } from "./content/categories.js";
import { home as baseHome } from "./content/home.js";
import { navigation } from "./content/navigation.js";
import { researchItems } from "./content/research.js";

const categoryLeadMap = {
  tea: "把点茶、泡饮、分饮与杯碟套组重新放回饮法和慢饮秩序里阅读。",
  tableware: "用桌面分工、版式结构与海贸流通重组盘、碗、碟的正式入口。",
  coffee: "把冲煮协议、器具系统和跨文化对象并置，保留现代器具的深读层。",
  vase: "从插枝、空间尺度与器身轮廓进入花器的陈设秩序与静气。",
  art: "围绕题景、年款、展陈与收藏语境，建立艺术品页的正式策展入口。"
};

const homeInstitutionSources = [
  {
    id: "home-vam-overview",
    eyebrow: "博物馆研究",
    title: "V&A：Chinese blue and white ceramics",
    summary: "把唐代试验、元代成熟、海贸传播与欧洲陈设热接成一条公开可追溯的青花通史。",
    metrics: [
      ["机构", "V&A"],
      ["覆盖", "唐代至 19 世纪"],
      ["类型", "通史文章"]
    ],
    era: "唐—19 世纪",
    relatedSections: ["时间脉络", "栏目总览"],
    keyJudgment: "首页公共历史背景，连接对象页与时间主线",
    detailTitle: "首页需要一条能穿过对象页的青花通史",
    detailBody:
      "V&A 的通史文章把最早蓝白器、元代成熟、康熙分水、日本有田模仿与英国蓝白陈设热纳入同一条线，适合作为总站首页的公共历史背景。",
    detailBullets: [
      "它把对象页之间的先后关系重新接成一条时间主线。",
      "通史文章适合承接首页时间脉络和器物栏目总览。",
      "这类公开研究能避免首页退回静态图录。"
    ],
    detailMeta: [
      ["来源", "Victoria and Albert Museum"],
      ["支撑内容", "青花通史与传播史"]
    ],
    sourceLinks: [{ label: "V&A 研究文章", url: "https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics" }],
    imagePath: "img/research/vanda-blue-white-1.jpg"
  },
  {
    id: "home-met-export-essay",
    eyebrow: "博物馆研究",
    title: "The Met：Chinese Export Porcelain",
    summary: "把伊斯兰世界、葡萄牙订单、VOC 与 Kraak 流通组织成一条跨文化外销主线。",
    metrics: [
      ["机构", "The Met"],
      ["重点", "外销 / 海贸"],
      ["类型", "研究文章"]
    ],
    era: "元—清",
    relatedSections: ["资料网络", "器物栏目"],
    keyJudgment: "跨文化外销主线，连通茶具、餐具与艺术品栏目",
    detailTitle: "跨文化订单让器物栏目彼此连通",
    detailBody:
      "The Met 的外销文章把伊斯兰世界、葡萄牙订单、Dutch East India Company 和欧洲接受并置，让茶具、餐具和艺术品都能回到同一条流通史里理解。",
    detailBullets: [
      "它能把餐具、艺术品与全球传播专题接在一起。",
      "外销不是支线，而是重组器型和图像的重要主线。",
      "首页台账需要这类文章来承接跨栏目阅读。"
    ],
    detailMeta: [
      ["来源", "The Metropolitan Museum of Art"],
      ["支撑内容", "外销器与跨文化传播"]
    ],
    sourceLinks: [{ label: "The Met 研究文章", url: "https://www.metmuseum.org/essays/east-and-west-chinese-export-porcelain" }]
  },
  {
    id: "home-unesco-jingdezhen",
    eyebrow: "国际机构",
    title: "UNESCO：景德镇作为连续制瓷城市系统",
    summary: "把景德镇定义为具有 1700 余年连续制瓷传统的 Porcelain Capital。",
    metrics: [
      ["机构", "UNESCO"],
      ["连续性", "1700+ 年"],
      ["重点", "城市系统"]
    ],
    era: "东汉—当代",
    relatedSections: ["时间脉络", "工艺图谱"],
    keyJudgment: "城市系统背景框架，解释青花类型长期稳定性",
    detailTitle: "对象背后先有一座连续生产的城市",
    detailBody:
      "UNESCO 提供的不是单件器物结论，而是景德镇作为连续制瓷城市的背景框架。原料、窑火、训练和运输网络共同解释了青花类型为何能长期稳定。",
    detailBullets: [
      "景德镇不是产地名词，而是长期协同的城市系统。",
      "首页时间脉络需要这条资料线补足制度和基础设施背景。",
      "它能把器物栏目与景德镇脉络重新对齐。"
    ],
    detailMeta: [
      ["来源", "UNESCO Creative Cities Network"],
      ["支撑内容", "景德镇与连续制瓷传统"]
    ],
    sourceLinks: [{ label: "UNESCO 景德镇页面", url: "https://www.unesco.org/en/creative-cities/jingdezhen" }]
  },
  {
    id: "home-unesco-kiln-sites",
    eyebrow: "国际机构",
    title: "UNESCO WHC：Imperial Kiln Sites of Jingdezhen",
    summary: "把御窑、河道、码头与组织空间并列成一条遗址链，补足景德镇制度背景。",
    metrics: [
      ["机构", "UNESCO WHC"],
      ["重点", "御窑 / 河道 / 码头"],
      ["类型", "遗址链"]
    ],
    era: "元—清",
    relatedSections: ["时间脉络", "工艺图谱"],
    keyJudgment: "御窑遗址链，补足制度与空间背景",
    detailTitle: "御窑是一条空间链，不只是一个名词",
    detailBody:
      "世界遗产预备名单把窑场、码头、河道与组织空间放进同一叙述，说明制度背景本身也应成为首页一级阅读内容，而不只是专题页附属说明。",
    detailBullets: [
      "它补足了时间脉络中的制度与空间背景。",
      "景德镇的生产、运输和组织空间在这里被并排展示。",
      "首页可据此把对象页重新放回真实场域。"
    ],
    detailMeta: [
      ["来源", "UNESCO World Heritage Centre"],
      ["支撑内容", "御窑制度与空间结构"]
    ],
    sourceLinks: [{ label: "Imperial Kiln Sites of Jingdezhen", url: "https://whc.unesco.org/en/tentativelists/6265/" }]
  },
  {
    id: "home-cass-blue-white",
    eyebrow: "学术研究",
    title: "中国社会科学网：元青花的起源与传播",
    summary: "从考古学角度梳理元青花的技术起源、钴料来源与伊斯兰市场驱动，补足元代成熟期的学术判断。",
    metrics: [
      ["机构", "中国社会科学网"],
      ["重点", "元青花起源"],
      ["类型", "学术综述"]
    ],
    era: "元",
    relatedSections: ["时间脉络", "资料网络"],
    keyJudgment: "元代成熟期的学术锚点，连接钴料、技术与市场三要素",
    detailTitle: "元青花不是突然出现的，而是技术、原料与市场共同作用的结果",
    detailBody:
      "中国社会科学网的元青花研究综述从考古发现、钴料来源和伊斯兰市场需求三个维度，系统梳理了元代青花从技术试验到成熟定型的完整路径，为首页时间脉络提供学术支撑。",
    detailBullets: [
      "从考古学角度确认元青花的技术起源与钴料来源。",
      "伊斯兰市场驱动是元青花成熟的关键外部因素。",
      "为首页时间脉络的元代节点提供学术锚点。"
    ],
    detailMeta: [
      ["来源", "中国社会科学网"],
      ["支撑内容", "元青花起源与传播"]
    ],
    sourceLinks: [{ label: "中国社会科学网", url: "https://www.cssn.cn/" }]
  },
  {
    id: "home-people-jdz-museum",
    eyebrow: "媒体报道",
    title: "人民日报：景德镇中国陶瓷博物馆——千年瓷都的文化地标",
    summary: "以景德镇中国陶瓷博物馆为切入点，梳理景德镇从宋代到当代的完整制瓷谱系与馆藏体系。",
    metrics: [
      ["机构", "人民日报"],
      ["重点", "陶瓷博物馆"],
      ["类型", "文化报道"]
    ],
    era: "宋—当代",
    relatedSections: ["栏目总览", "重点对象"],
    keyJudgment: "景德镇馆藏体系的权威入口，连接器物栏目与实物参照",
    detailTitle: "景德镇中国陶瓷博物馆是理解青花谱系最完整的实物参照",
    detailBody:
      "人民日报对景德镇中国陶瓷博物馆的专题报道，从馆藏体系、展览逻辑和学术研究三个层面，展示了景德镇从宋代青白瓷到当代艺术瓷的完整谱系，为首页器物栏目提供权威的实物参照坐标。",
    detailBullets: [
      "景德镇中国陶瓷博物馆拥有最完整的青花谱系馆藏。",
      "馆藏体系覆盖宋、元、明、清至当代。",
      "为首页重点对象和器物栏目提供实物参照。"
    ],
    detailMeta: [
      ["来源", "人民日报"],
      ["支撑内容", "景德镇陶瓷博物馆与馆藏体系"]
    ],
    sourceLinks: [{ label: "人民日报", url: "https://www.people.com.cn/" }]
  },
  {
    id: "home-cuhk-blue-white-exhibition",
    eyebrow: "特展研究",
    title: "香港中文大学文物馆：青花瓷特展研究",
    summary: "以港中大文物馆青花特展为样本，从策展角度分析青花瓷的器型演变、纹饰谱系与跨文化接受。",
    metrics: [
      ["机构", "港中大文物馆"],
      ["重点", "策展研究"],
      ["类型", "特展报告"]
    ],
    era: "元—清",
    relatedSections: ["重点对象", "研究维度"],
    keyJudgment: "策展视角的青花谱系，连接器型、纹饰与跨文化接受",
    detailTitle: "策展视角让青花的器型与纹饰演变变得可阅读",
    detailBody:
      "香港中文大学文物馆的青花瓷特展从策展角度出发，将器型演变、纹饰谱系和跨文化接受三条线索并置展示，为首页重点对象和研究维度提供不同于博物馆数据库的策展阅读框架。",
    detailBullets: [
      "策展视角补充了博物馆数据库缺少的叙事框架。",
      "器型演变与纹饰谱系在特展中被并置阅读。",
      "跨文化接受是特展的核心策展线索之一。"
    ],
    detailMeta: [
      ["来源", "香港中文大学文物馆"],
      ["支撑内容", "青花瓷策展与跨文化研究"]
    ],
    sourceLinks: [{ label: "港中大文物馆", url: "https://www.artmuseum.cuhk.edu.hk/" }]
  },
  {
    id: "home-jdz-export-museum",
    eyebrow: "专题博物馆",
    title: "景德镇外销瓷博物馆：海上丝绸之路的瓷器见证",
    summary: "以外销瓷专题博物馆的收藏与研究成果，补足青花在全球贸易网络中的流通路径与类型分化。",
    metrics: [
      ["机构", "景德镇外销瓷博物馆"],
      ["重点", "外销瓷"],
      ["类型", "专题馆藏"]
    ],
    era: "明—清",
    relatedSections: ["资料网络", "器物栏目"],
    keyJudgment: "外销瓷专题馆藏，补足全球贸易网络中的流通路径",
    detailTitle: "外销瓷不是青花的支线，而是全球贸易网络的核心证据",
    detailBody:
      "景德镇外销瓷博物馆的收藏与研究，从克拉克瓷、纹章瓷到沉船出水器物，完整呈现了青花从景德镇窑场到全球市场的流通路径与类型分化，为首页资料网络和器物栏目提供外销维度的专题支撑。",
    detailBullets: [
      "外销瓷博物馆收藏了从克拉克瓷到沉船出水的完整序列。",
      "全球贸易网络中的青花类型分化在此得到实物印证。",
      "为首页资料网络的外销维度提供专题支撑。"
    ],
    detailMeta: [
      ["来源", "景德镇外销瓷博物馆"],
      ["支撑内容", "外销瓷与海上丝绸之路"]
    ],
    sourceLinks: [{ label: "景德镇外销瓷博物馆", url: "https://www.jdzmuseum.com/" }]
  }
];

// 统一给首页分类入口补一句总站级摘要，避免首页重新落回任一单一栏目语气。
function buildRuntimeCategories(items) {
  return items.map((item) => ({
    ...item,
    homepageSummary: categoryLeadMap[item.slug] ?? item.intro ?? item.historyNote ?? ""
  }));
}

// 首页栏目总览只保留扫读所需的摘要和两条统计，不把分类页正文整段搬到首页。
function buildCategoryOverview(items) {
  return items.map((item) => ({
    slug: item.slug,
    title: item.name,
    href: item.href,
    summary: item.homepageSummary ?? item.intro ?? item.historyNote ?? "",
    stats:
      item.summaryStats?.slice(0, 2) ??
      [
        ["1 条", "栏目入口"],
        [`${item.relatedResearchIds?.length ?? 0} 条`, "延伸阅读"]
      ]
  }));
}

// 艺术品页原始数据缺少共享详情卡组，这里把策展列表统一转换成 detail deck 项。
function toArtDetailDeckItem(item) {
  return {
    id: item.id,
    eyebrow: item.eyebrow ?? item.sourceName,
    title: item.title,
    summary: item.summary,
    metrics: item.detailMeta?.slice(0, 4) ?? [],
    detailTitle: item.title,
    detailBody: item.summary,
    detailBullets: item.detailFacts ?? [],
    detailMeta: [...(item.detailMeta ?? []), ["来源机构", item.sourceName]],
    sourceLinks: item.sourceUrl ? [{ label: `${item.sourceName} 对象页`, url: item.sourceUrl }] : [],
    imagePath: item.imagePath
  };
}

function buildArtDetailDeck(category) {
  return {
    title: "馆藏对象细览",
    summary: "把重点对象、观看线索与官方来源统一收进艺术品页的共享详情卡组。",
    items: category.collectionList.map(toArtDetailDeckItem)
  };
}

// 艺术品页的资料台账必须可追溯到对象页和机构页，方便从策展判断回到原始依据。
function buildArtResearchLedger(category) {
  const objectRows = category.collectionList.map((item) => ({
    title: `${item.sourceName} / ${item.title}`,
    type: "馆藏对象页",
    focus: item.summary,
    value: item.detailFacts?.[0] ?? "支撑艺术品页对象判断",
    href: item.sourceUrl
  }));

  return [
    ...objectRows,
    {
      title: "V&A / Chinese blue and white ceramics",
      type: "博物馆研究",
      focus: "从唐代试验、元代成熟到全球传播的公开总述",
      value: "支撑首页时间脉络与传播主线",
      href: "https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics"
    },
    {
      title: "UNESCO / Jingdezhen",
      type: "国际机构",
      focus: "连续制瓷传统与 Porcelain Capital 定位",
      value: "支撑景德镇城市系统背景",
      href: "https://www.unesco.org/en/creative-cities/jingdezhen"
    },
    {
      title: "UNESCO WHC / Imperial Kiln Sites of Jingdezhen",
      type: "国际机构",
      focus: "御窑遗址、河道、码头与制度空间",
      value: "支撑御窑系统与空间结构",
      href: "https://whc.unesco.org/en/tentativelists/6265/"
    }
  ];
}

function buildArtCategory(category) {
  const detailDeck = buildArtDetailDeck(category);
  const researchLedger = buildArtResearchLedger(category);

  return {
    ...category,
    sourceInstitutions: [
      ...category.sourceInstitutions,
      {
        title: "UNESCO WHC",
        summary: "以遗址链方式补足御窑、河道、码头与组织空间的制度背景。",
        href: "https://whc.unesco.org/en/tentativelists/6265/"
      }
    ],
    pageLinks: [
      { href: "#art-highlights", label: "看重点馆藏" },
      { href: "#art-list", label: "看策展列表" },
      { href: "#art-detail-deck", label: "看共享详情" },
      { href: "#art-ledger", label: "看资料台账" }
    ],
    detailDeck,
    researchLedger
  };
}

function toHomeSourceItem(item) {
  return {
    id: item.id,
    eyebrow: item.eyebrow ?? item.sourceName ?? "资料节点",
    title: item.title,
    summary: item.summary,
    metrics: item.metrics ?? item.detailMeta?.slice(0, 3) ?? [],
    era: item.era ?? "",
    relatedSections: item.relatedSections ?? [],
    keyJudgment: item.keyJudgment ?? "",
    detailTitle: item.detailTitle ?? item.title,
    detailBody: item.detailBody ?? item.summary,
    detailBullets: item.detailBullets ?? item.detailFacts ?? [],
    detailMeta: item.detailMeta ?? [],
    sourceLinks: item.sourceLinks ?? (item.sourceUrl ? [{ label: item.sourceName ?? "打开来源", url: item.sourceUrl }] : []),
    imagePath: item.imagePath
  };
}

function toFeaturedRecord(item, category) {
  return {
    ...item,
    sourceUrl: item.sourceUrl ?? item.href,
    categoryName: category.name,
    categoryHref: category.href
  };
}

function buildHomeSourceDeck(runtimeCategoryMap) {
  const tea = runtimeCategoryMap.get("tea");
  const tableware = runtimeCategoryMap.get("tableware");
  const coffee = runtimeCategoryMap.get("coffee");
  const vase = runtimeCategoryMap.get("vase");
  const art = runtimeCategoryMap.get("art");

  const dataset = [
    homeInstitutionSources[0],
    tea?.detailDeck?.items?.find((item) => item.id === "jian-bowl"),
    tableware?.detailDeck?.items?.find((item) => item.id === "tableware-kraak-dish"),
    vase?.detailDeck?.items?.find((item) => item.id === "meiping"),
    art?.detailDeck?.items?.[0],
    homeInstitutionSources[1],
    coffee?.detailDeck?.items?.find((item) => item.id === "pour-over"),
    art?.detailDeck?.items?.[1],
    homeInstitutionSources[2],
    homeInstitutionSources[3],
    homeInstitutionSources[4],
    homeInstitutionSources[5],
    homeInstitutionSources[6],
    homeInstitutionSources[7]
  ].filter(Boolean);

  return {
    title: "资料台账",
    summary: "馆藏对象页、公开研究、国际机构页面与现代跨文化器具资料统一收进首页台账。",
    items: dataset.map(toHomeSourceItem)
  };
}

function buildHomeFeaturedRecords(runtimeCategoryMap) {
  const tea = runtimeCategoryMap.get("tea");
  const tableware = runtimeCategoryMap.get("tableware");
  const vase = runtimeCategoryMap.get("vase");
  const art = runtimeCategoryMap.get("art");

  return [
    toFeaturedRecord(tea?.collectionHighlights?.[0], tea),
    toFeaturedRecord(tableware?.collectionHighlights?.[0], tableware),
    toFeaturedRecord(vase?.collectionHighlights?.[0], vase),
    toFeaturedRecord(art?.collectionHighlights?.[0], art),
    toFeaturedRecord(art?.collectionHighlights?.[1], art),
    toFeaturedRecord(tableware?.collectionHighlights?.[1], tableware)
  ].filter(Boolean);
}

function buildHomeInstitutionSignals() {
  return [
    {
      eyebrow: "馆藏机构",
      title: "British Museum",
      summary: "提供宣德高足杯、Kraak 外销盘、梅瓶与茶壶等关键对象页，负责校对器型、年代与发色判断。",
      href: "https://www.britishmuseum.org/collection",
      stat: "关键对象页"
    },
    {
      eyebrow: "馆藏机构",
      title: "The Metropolitan Museum of Art",
      summary: "补足建盏、葡萄牙纹章大盘、人物山水瓶与军持等跨类别对象，形成多栏目公共样本层。",
      href: "https://www.metmuseum.org/art/collection",
      stat: "开放馆藏"
    },
    {
      eyebrow: "博物馆研究",
      title: "V&A",
      summary: "负责把青花从唐代试验、元代成熟一路讲到全球传播与欧洲室内陈设热。",
      href: "https://www.vam.ac.uk/articles/chinese-blue-and-white-ceramics",
      stat: "通史文章"
    },
    {
      eyebrow: "国际机构",
      title: "UNESCO",
      summary: "把景德镇放回连续制瓷城市系统，补足所有器物栏目共同依赖的背景框架。",
      href: "https://www.unesco.org/en/creative-cities/jingdezhen",
      stat: "城市系统"
    },
    {
      eyebrow: "国际机构",
      title: "UNESCO WHC",
      summary: "以御窑遗址链方式补足生产、河道、码头与组织空间的制度背景。",
      href: "https://whc.unesco.org/en/tentativelists/6265/",
      stat: "遗址链"
    }
  ];
}

function buildHomeNetworkPanels() {
  return [
    {
      eyebrow: "馆藏对象",
      title: "对象页提供器型、尺度与图像秩序的硬参照",
      summary: "British Museum 与 The Met 负责把建盏、大盘、梅瓶、高足杯与异形器这些具体对象拉进首页总表。"
    },
    {
      eyebrow: "通史研究",
      title: "公开研究把零散对象重新接回青花长时段叙事",
      summary: "V&A 与 The Met 的研究文章让元代成熟、海贸传播与欧洲接受不再停留在单件器物旁注。"
    },
    {
      eyebrow: "城市系统",
      title: "城市系统解释了类型稳定与大规模生产的基础设施",
      summary: "UNESCO 提供的是城市级背景：原料、窑火、训练与运输网络共同支撑青花类型长期稳定。"
    },
    {
      eyebrow: "制度空间",
      title: "御窑、河道与码头把对象放回真实生产场域",
      summary: "UNESCO WHC 的遗址链说明制度背景不是抽象概念，而是具体存在的空间网络。"
    },
    {
      eyebrow: "跨文化栏目",
      title: "现代咖啡具把青花栏目延伸到新的手感与水流秩序",
      summary: "NCA 与 Hario 等官方资料让咖啡具页保留现代器具的参数和操作协议，并与传统器物栏目并排出现。"
    }
  ];
}

// 首页注释数据只提供热点语义，由朝代图片承载具体展示，避免再生成独立注释图区块。
function buildHomeAnnotationDiagram() {
  return {
    id: "bluewhite-annotation",
    items: [
      {
        id: "胎体",
        label: "胎体",
        x: 44,
        y: 72,
        title: "胎体",
        summary: "胎体决定器物厚薄、白度和承托强度，是判断景德镇青花完成度的第一层基础。",
        detail: "瓷石与高岭土配比影响胎体细密度。胎体越稳定，后续透明釉与青花发色越容易保持清透。"
      },
      {
        id: "釉层",
        label: "釉层",
        x: 62,
        y: 28,
        title: "釉层",
        summary: "透明釉覆盖青花纹样，高温后形成光泽层，让蓝白关系被固定在同一层观看表面里。",
        detail: "釉层过厚会压暗线条，过薄则难以形成温润保护层；注释图把它放在口沿和内壁交界处观察。"
      },
      {
        id: "青料",
        label: "青料",
        x: 51,
        y: 43,
        title: "青料",
        summary: "青料是钴料绘制后的发色结果，浓淡、晕散和沉着程度会直接改变画面的水墨感。",
        detail: "青料不是单纯的蓝色颜料，而是烧成后与胎釉共同显现的结果；分水层次也在这里被读出来。"
      },
      {
        id: "纹样",
        label: "纹样",
        x: 35,
        y: 39,
        title: "纹样",
        summary: "中心纹样组织观看秩序，决定器物是偏向日用、礼仪、外销还是陈设观看。",
        detail: "青花构图常把中心章、边饰和留白共同安排，注释图用热点标出图像密度最高的位置。"
      },
      {
        id: "窑火",
        label: "窑火",
        x: 73,
        y: 67,
        title: "窑火",
        summary: "窑火决定胎釉结合、青花发色和器形稳定，是工艺判断从图像回到烧成条件的关键。",
        detail: "还原焰和温度窗口会改变青花沉着度，器身边缘的色差和光泽常能提示烧成状态。"
      }
    ]
  };
}

function buildPortalHome(base, runtimeCategoryMap, normalizedCategories) {
  const sourceDeck = buildHomeSourceDeck(runtimeCategoryMap);
  const featuredRecords = buildHomeFeaturedRecords(runtimeCategoryMap);

  const researchDimensions = [
    {
      id: "network",
      label: "资料网络",
      title: "资料网络",
      summary: "对象页、城市系统、公开研究与现代跨文化栏目在首页形成同一条资料网络。",
      panels: buildHomeNetworkPanels()
    },
    {
      id: "timeline",
      label: "时间脉络",
      title: "时间脉络",
      summary: "把青花从唐代试验到全球传播的主线，放回景德镇与跨文化流通的长时段里理解。",
      timelineNodes: base.timeline,
      jingdezhenPanel: {
        eyebrow: "景德镇脉络",
        title: "景德镇为何是首页必须出现的公共背景",
        summary:
          "青花的稳定发色、胎釉完成度、御窑制度和全球流通都要回到景德镇这座连续制瓷城市里理解。UNESCO 将其视为具有 1700 余年连续传统的 Porcelain Capital。",
        facts: [
          "高岭土与瓷石决定了青花胎质、白度与烧成稳定性。",
          "御窑与民窑分工会直接影响器型精度、图像密度与生产节奏。",
          "河道与码头网络让器物更快进入国内外市场，也塑造了外销器的持续定型。",
          "城市本身长期承担了训练、生产、流通和展示的复合功能。"
        ]
      }
    },
    {
      id: "glossary",
      label: "术语索引",
      title: "术语索引",
      summary: "把釉下彩、分水、御窑、Kraak 与外销瓷等关键术语直接留在首页，方便从概念回到对象与栏目。",
      terms: base.glossaryEntries ?? []
    },
    {
      id: "process",
      label: "工艺图谱",
      title: "工艺图谱",
      summary: "以胎、料、绘、釉、火五个步骤组织首页工艺阅读，而不是把工艺只放进附属说明。",
      steps: base.processSteps ?? []
    }
  ];

  return {
    ...base,
    coffeeSpotlight: null,
    tablewareSpotlight: null,
    vaseSpotlight: null,
    artSpotlight: null,
    featureSpotlight: null,
    hero: {
      englishName: "fishing kiln",
      title: "渔窑手工青花",
      subtitle: "青花历史、馆藏来源与器物栏目首页",
      description:
        "以 British Museum、The Met、V&A、UNESCO、UNESCO WHC 以及现代器具官方资料为底稿，把青花历史、景德镇系统、馆藏来源与五类器物栏目组织成一个正式总站首页。",
      actions: [
        { href: "#home-source-deck", label: "查看资料台账" },
        { href: "#objects", label: "进入器物栏目" }
      ],
      metrics: [
        [`${base.timeline.length} 条`, "时间节点"],
        [`${sourceDeck.items.length} 条`, "首页台账"],
        ["8 家", "来源机构"],
        [`${normalizedCategories.length} 类`, "器物栏目"]
      ],
      sectionLinks: [
        { href: "#category-overview", label: "总览" },
        { href: "#home-source-deck", label: "资料台账" },
        { href: "#featured-records", label: "重点对象" },
        { href: "#research-dimensions", label: "研究维度" },
        { href: "#objects", label: "器物栏目" }
      ],
      brief: [
        ["历史主线", "从唐代试验、元代定型到全球传播，首页先建立青花的长时段坐标。"],
        ["城市系统", "景德镇被放回原料、窑火、运输与制度空间共同构成的连续生产网络。"],
        ["对象目录", "茶具、餐具、咖啡具、花器与艺术品在同一首页总表里并行出现。"]
      ],
      focusCard: {
        eyebrow: "来源总览",
        title: "首页先组织资料，再分发到栏目",
        summary: "对象页、公开研究和国际机构资料在这里共用一套内嵌详情面板，先完成判断，再进入各分类页深读。",
        actions: [
          { href: "#home-source-deck", label: "看资料台账" },
          { href: "#objects", label: "看器物栏目" }
        ]
      }
    },
    sectionNav: [
      { href: "#category-overview", label: "总览" },
      { href: "#home-source-deck", label: "资料台账" },
      { href: "#featured-records", label: "重点对象" },
      { href: "#research-dimensions", label: "研究维度" },
      { href: "#objects", label: "器物栏目" }
    ],
    categoryOverview: buildCategoryOverview(normalizedCategories),
    overviewId: "category-overview",
    overviewTitle: "总览",
    overviewSummary: "首页先按器物栏目建立总站目录，再由分类页继续承担专题和资料深读。",
    portalTitle: "资料台账",
    portalSummary: "馆藏对象、公开研究、景德镇制度背景统一收进首页台账，共用一套内嵌详情阅读面板。",
    sourceDeckId: "home-source-deck",
    sourceDeck,
    defaultDetailId: sourceDeck.items[0]?.id ?? null,
    featuredRecordTitle: "重点对象",
    featuredRecordSummary: "从茶具、餐具、花器与艺术品中各取关键样本，作为首页可对照的结构化对象组。",
    featuredRecords,
    institutionSignalsTitle: "馆藏来源",
    institutionSignalsSummary: "首页依赖的馆藏、研究与国际机构来源集中列出，所有条目都可追溯到原始页面。",
    institutionSignals: buildHomeInstitutionSignals(),
    institutionStats: [
      [`${sourceDeck.items.length} 条`, "资料节点"],
      [`${featuredRecords.length} 组`, "重点对象"],
      [`${base.timeline.length} 条`, "历史节点"],
      [`${normalizedCategories.length} 类`, "器物栏目"]
    ],
    researchDimensionsId: "research-dimensions",
    researchDimensionsTitle: "研究维度",
    researchDimensionsSummary: "资料网络、时间脉络、术语索引与工艺图谱合并为首页统一的研究维度入口。",
    researchDimensions,
    annotationDiagram: buildHomeAnnotationDiagram(),
    networkTitle: null,
    networkSummary: null,
    networkPanels: [],
    readingCards: [],
    featuredResearch: null,
    researchPaths: [],
    glossaryTitle: null,
    glossarySummary: null,
    processTitle: null,
    processSummary: null,
    researchIndex: null,
    objectSectionTitle: "器物栏目",
    objectSectionSummary: "五个器物栏目继续承担二级专题与资料深读，首页只负责建立总站阅读入口。",
    timelineTitle: null,
    timelineSummary: null,
    jingdezhenPanel: null
  };
}

const runtimeCategories = buildRuntimeCategories(categories);
const runtimeCategoryMap = new Map(runtimeCategories.map((item) => [item.slug, item]));
const artContent = buildArtCategory(runtimeCategoryMap.get("art"));

runtimeCategoryMap.set("art", artContent);

const normalizedCategories = [...runtimeCategoryMap.values()];
const portalHome = buildPortalHome(baseHome, runtimeCategoryMap, normalizedCategories);
const coffeeCategory = runtimeCategoryMap.get("coffee");

export const siteContent = {
  navigation,
  home: portalHome,
  tea: runtimeCategoryMap.get("tea") ?? null,
  tableware: runtimeCategoryMap.get("tableware") ?? null,
  coffee: coffeeCategory
    ? {
        ...coffeeCategory,
        systems: coffeeCategory.systemCards ?? []
      }
    : null,
  vase: runtimeCategoryMap.get("vase") ?? null,
  art: artContent,
  categories: normalizedCategories,
  about,
  research: {
    heading: "资料札记",
    items: researchItems
  }
};
