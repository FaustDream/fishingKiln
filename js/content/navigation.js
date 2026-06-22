export const navigation = [
  { slug: "home", label: "首页", href: "index.html" },
  {
    slug: "tea", label: "茶具", href: "tea.html",
    children: [
      { slug: "tang-tea", label: "唐", href: "tang-tea.html" },
      { slug: "song-tea", label: "宋", href: "song-tea.html" },
      { slug: "yuan-tea", label: "元", href: "yuan-tea.html" },
      { slug: "ming-tea", label: "明", href: "ming-tea.html" },
      { slug: "qing-tea", label: "清", href: "qing-tea.html" }
    ]
  },
  {
    slug: "tableware", label: "餐具", href: "tableware.html",
    children: [
      { slug: "tang-tableware", label: "唐", href: "tang-tableware.html" },
      { slug: "song-tableware", label: "宋", href: "song-tableware.html" },
      { slug: "yuan-tableware", label: "元", href: "yuan-tableware.html" },
      { slug: "ming-tableware", label: "明", href: "ming-tableware.html" },
      { slug: "qing-tableware", label: "清", href: "qing-tableware.html" }
    ]
  },
  {
    slug: "coffee", label: "咖啡具", href: "coffee.html",
    children: [
      { slug: "yuan-coffee", label: "元", href: "yuan-coffee.html" },
      { slug: "ming-coffee", label: "明", href: "ming-coffee.html" },
      { slug: "qing-coffee", label: "清", href: "qing-coffee.html" }
    ]
  },
  {
    slug: "vase", label: "花器", href: "vase.html",
    children: [
      { slug: "tang-vase", label: "唐", href: "tang-vase.html" },
      { slug: "song-vase", label: "宋", href: "song-vase.html" },
      { slug: "yuan-vase", label: "元", href: "yuan-vase.html" },
      { slug: "ming-vase", label: "明", href: "ming-vase.html" },
      { slug: "qing-vase", label: "清", href: "qing-vase.html" }
    ]
  },
  {
    slug: "art", label: "艺术品", href: "art.html",
    children: [
      { slug: "tang-art", label: "唐", href: "tang-art.html" },
      { slug: "song-art", label: "宋", href: "song-art.html" },
      { slug: "yuan-art", label: "元", href: "yuan-art.html" },
      { slug: "ming-art", label: "明", href: "ming-art.html" },
      { slug: "qing-art", label: "清", href: "qing-art.html" }
    ]
  }
];

