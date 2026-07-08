const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const assets = {
  dashboard: "./assets/dashboard.png",
  knowledge: "./assets/knowledge.png",
  notes: "./assets/notes.png",
  community: "./assets/community.png",
  profile: "./assets/profile.png",
  admin: "./assets/admin.png"
};

const state = {
  route: "dashboard",
  query: "",
  role: "student",
  user: localStorage.getItem("hmf_user_id") || "",
  selected: { type: "note", id: "note-2" },
  noteFilter: "all",
  communityFilter: "all",
  adminTab: "queue",
  knowledgeFilter: "all",
  modal: null,
  masked: true,
  authMode: "login",
  campusFeedFilter: "all",
  friendQuery: "",
  activeChatId: "student-2",
  voiceCall: null
};

const runtime = {
  apiBase: window.API_BASE || (["5180", "5190"].includes(window.location.port) ? "http://127.0.0.1:8000" : window.location.origin),
  useApi: Boolean(window.API_BASE) || !window.location.hostname.endsWith(".github.io"),
  lastBootstrapAt: null,
  authenticated: Boolean(localStorage.getItem("hmf_user_id"))
};

const db = {
  users: [
    {
      id: "student-1",
      name: "林同学",
      role: "student",
      roleText: "校内学生",
      avatar: "林",
      phone: "13810246248",
      studentId: "2026120317",
      realName: "林一舟",
      banned: false,
      progressDone: 18,
      progressTotal: 24,
      collections: ["note-2", "q-2"],
      likes: ["note-2"]
    },
    {
      id: "admin-1",
      name: "管理员",
      role: "admin",
      roleText: "内容管理员",
      avatar: "管",
      phone: "13900006666",
      studentId: "ADMIN001",
      realName: "陈老师",
      banned: false,
      progressDone: 24,
      progressTotal: 24,
      collections: [],
      likes: []
    },
    {
      id: "student-2",
      name: "周同学",
      role: "student",
      roleText: "校内学生",
      avatar: "周",
      phone: "13677889900",
      studentId: "2026120421",
      realName: "周明溪",
      banned: false,
      progressDone: 16,
      progressTotal: 24,
      collections: ["note-1"],
      likes: ["note-4"]
    },
    {
      id: "student-3",
      name: "陈同学",
      role: "student",
      roleText: "校内学生",
      avatar: "陈",
      phone: "13766778899",
      studentId: "2026120588",
      realName: "陈知远",
      banned: false,
      progressDone: 21,
      progressTotal: 24,
      collections: ["note-2"],
      likes: ["note-2"]
    },
    {
      id: "student-4",
      name: "许同学",
      role: "student",
      roleText: "校内学生",
      avatar: "许",
      phone: "13555667788",
      studentId: "2026120660",
      realName: "许清禾",
      banned: false,
      progressDone: 13,
      progressTotal: 24,
      collections: [],
      likes: ["q-2"]
    },
    {
      id: "guest",
      name: "游客",
      role: "guest",
      roleText: "游客浏览",
      avatar: "访",
      phone: "",
      studentId: "",
      realName: "",
      banned: false,
      progressDone: 0,
      progressTotal: 24,
      collections: [],
      likes: []
    }
  ],
  chapters: [
    {
      id: "c1",
      title: "第六章 · 多元函数微分法",
      open: true,
      sections: [
        {
          id: "s1",
          title: "偏导与全微分",
          points: [
            {
              id: "p1",
              title: "偏导存在与可微",
              tags: ["hot", "weak"],
              completed: true,
              summary: "偏导存在不一定可微，可微需要用定义、连续性或全微分表达式判断。",
              facts: [
                ["高频考点", "判断偏导存在、偏导连续、可微之间的关系。"],
                ["易错点", "把两个偏导都存在误认为函数一定可微。"],
                ["学习方法", "用条件关系图配合反例记忆。"]
              ]
            },
            {
              id: "p2",
              title: "方向导数与梯度",
              tags: ["hot"],
              completed: false,
              summary: "梯度方向是函数增长最快方向，方向导数是梯度与单位方向向量的点积。",
              facts: [
                ["高频考点", "根据梯度计算给定方向上的变化率。"],
                ["易错点", "方向向量没有单位化就直接代入。"],
                ["学习方法", "先单位化，再点乘，最后看几何含义。"]
              ]
            },
            {
              id: "p3",
              title: "多元函数极值",
              tags: ["hot", "weak"],
              completed: false,
              summary: "先求驻点，再结合 Hessian 或约束条件判断极值类型。",
              facts: [
                ["高频考点", "驻点、Hessian 判别、条件极值。"],
                ["易错点", "驻点不等于极值，二阶判别失败时要继续分析。"],
                ["学习方法", "把无约束与约束极值分成两条流程背。"]
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c2",
      title: "第七章 · 重积分",
      open: true,
      sections: [
        {
          id: "s2",
          title: "二重积分",
          points: [
            {
              id: "p4",
              title: "二重积分换序",
              tags: ["weak"],
              completed: false,
              summary: "先画区域，再确定投影与上下边界，最后改写积分次序。",
              facts: [
                ["高频考点", "由先 y 后 x 改成先 x 后 y。"],
                ["易错点", "没有画区域就硬写上下限。"],
                ["学习方法", "固定一个变量，看另一变量的活动范围。"]
              ]
            },
            {
              id: "p5",
              title: "极坐标换元",
              tags: ["hot"],
              completed: true,
              summary: "圆、扇形、旋转对称区域优先考虑极坐标，别忘记雅可比因子 r。",
              facts: [
                ["高频考点", "圆域、环域、扇形区域积分。"],
                ["易错点", "换元后漏乘 r。"],
                ["学习方法", "先判断区域形状，再决定是否换元。"]
              ]
            }
          ]
        }
      ]
    },
    {
      id: "c3",
      title: "第八章 · 微分方程",
      open: false,
      sections: [
        {
          id: "s3",
          title: "一阶微分方程",
          points: [
            {
              id: "p6",
              title: "可分离变量方程",
              tags: ["hot"],
              completed: false,
              summary: "把 x、y 变量分别移到等式两边，再积分并回代初值条件。",
              facts: [
                ["高频考点", "通解、特解、初值问题。"],
                ["易错点", "移项时遗漏零解或积分常数。"],
                ["学习方法", "每次求完通解都代回原方程检查。"]
              ]
            }
          ]
        }
      ]
    }
  ],
  notes: [
    {
      id: "note-1",
      title: "偏导与全微分一页通",
      author: "林同学",
      pointId: "p1",
      status: "审核中",
      quality: false,
      image: assets.notes,
      likes: 42,
      comments: [
        { author: "周同学", text: "条件关系图很清楚，建议补一个极限路径反例。" }
      ],
      summary: "把可微、偏导存在、偏导连续之间的关系做成一张考前速查图。",
      body: "核心思路：先判断函数是否可微，再区分偏导存在、偏导连续与全微分存在的关系。"
    },
    {
      id: "note-2",
      title: "拉格朗日乘数法错题归档",
      author: "周同学",
      pointId: "p3",
      status: "已发布",
      quality: true,
      image: assets.knowledge,
      likes: 67,
      comments: [
        { author: "陈同学", text: "约束条件漏写这个坑太真实了。" },
        { author: "管理员", text: "已设为优质笔记，建议关联到极值知识点。" }
      ],
      summary: "把约束漏写、驻点判断不全、符号错位三类错误拆开整理。",
      body: "每种错法都配了标准修正步骤，并附带课堂例题和自拟变式题。"
    },
    {
      id: "note-3",
      title: "二重积分换元法速记卡",
      author: "陈同学",
      pointId: "p5",
      status: "草稿",
      quality: false,
      image: assets.dashboard,
      likes: 21,
      comments: [],
      summary: "把极坐标换元和区域判断浓缩成三步流程，适合移动端碎片回顾。",
      body: "先看区域是否接近圆域或扇形，再决定是否使用极坐标。换元后不要漏乘 r。"
    },
    {
      id: "note-4",
      title: "隐函数求导易错清单",
      author: "许同学",
      pointId: "p2",
      status: "已发布",
      quality: true,
      image: assets.community,
      likes: 58,
      comments: [{ author: "林同学", text: "变量依赖关系这一段很有用。" }],
      summary: "用追问式整理变量依赖关系，解决“为什么不能直接约掉”的问题。",
      body: "每一步旁边标明变量依赖关系，避免把 y 当成常量处理。"
    }
  ],
  posts: [
    {
      id: "exp-1",
      type: "experience",
      title: "考前 48 小时如何排复习顺序",
      author: "李同学",
      status: "精选",
      image: assets.community,
      likes: 34,
      comments: [{ author: "林同学", text: "这个时间表很适合最后冲刺。" }],
      summary: "先抓高频考点，再处理自己的错题清单，最后回看定义题模板。",
      body: "第一天上午补知识树空缺，下午刷错题。第二天只看错因和定义题，不再大范围开新题。"
    },
    {
      id: "q-1",
      type: "question",
      title: "为什么这个极值点要继续看 Hessian？",
      author: "林同学",
      status: "待回答",
      image: assets.knowledge,
      likes: 12,
      comments: [{ author: "周同学", text: "因为驻点不等于极值，要继续判别。" }],
      summary: "楼主已经算出驻点，但不确定是否需要继续判断正定性。",
      body: "题目中已经求出两个驻点，但老师说还要看 Hessian，我不确定这里的逻辑。"
    },
    {
      id: "q-2",
      type: "question",
      title: "二重积分换序时边界总写乱，怎么稳一点？",
      author: "陈同学",
      status: "已解答",
      image: assets.dashboard,
      likes: 25,
      comments: [
        { author: "管理员", text: "先画区域，再看投影，最后写活动范围。" }
      ],
      summary: "同学们给出了画区域、固定变量、再看投影的三步法。",
      body: "每次换序都容易把上下限写反，尤其是有两条曲线夹出来的区域。"
    },
    {
      id: "q-3",
      type: "question",
      title: "隐函数求导里这一项为什么不能直接约掉？",
      author: "许同学",
      status: "讨论中",
      image: assets.notes,
      likes: 18,
      comments: [],
      summary: "帖子中已经有人指出变量依赖关系，但楼主还没完全理解。",
      body: "我知道 y 是 x 的函数，但写到中间步骤时总会下意识约掉。"
    }
  ],
  friendships: [
    { userId: "student-1", friendId: "student-2", status: "accepted", createdAt: "今天 09:18" },
    { userId: "student-1", friendId: "student-3", status: "accepted", createdAt: "昨天 20:40" },
    { userId: "student-2", friendId: "student-1", status: "accepted", createdAt: "今天 09:18" },
    { userId: "student-3", friendId: "student-1", status: "accepted", createdAt: "昨天 20:40" }
  ],
  campusPosts: [
    {
      id: "campus-1",
      authorId: "student-2",
      type: "study",
      title: "图书馆三楼有人一起刷二重积分吗？",
      body: "我整理了换序题型清单，想找同学互相讲一遍，顺便把区域图画熟。",
      image: assets.knowledge,
      createdAt: "10 分钟前",
      likes: 18,
      comments: [
        { author: "林同学", text: "我下午三点过去，可以一起对一下答案。" },
        { author: "陈同学", text: "能不能带上极坐标那部分？" }
      ]
    },
    {
      id: "campus-2",
      authorId: "student-3",
      type: "life",
      title: "今晚自习后操场散步约一下",
      body: "复习太久脑子发热，晚上九点半在东操集合，走两圈再回去看错题。",
      image: assets.community,
      createdAt: "32 分钟前",
      likes: 25,
      comments: [{ author: "许同学", text: "我带水，顺便聊一下隐函数。" }]
    },
    {
      id: "campus-3",
      authorId: "student-4",
      type: "lost",
      title: "捡到一本高数错题本",
      body: "封面写着 23 级数媒，里面夹了积分换元速记卡。失主可以手机号联系我。",
      image: assets.notes,
      createdAt: "1 小时前",
      likes: 9,
      comments: []
    }
  ],
  campusMessages: [
    {
      id: "msg-1",
      roomId: "student-2",
      from: "student-2",
      type: "text",
      body: "你昨天那张极值流程图能发我一份吗？",
      createdAt: "09:42"
    },
    {
      id: "msg-2",
      roomId: "student-2",
      from: "student-1",
      type: "image",
      body: assets.notes,
      caption: "这版我把 Hessian 判别补上了。",
      createdAt: "09:45"
    },
    {
      id: "msg-3",
      roomId: "student-2",
      from: "student-2",
      type: "voice",
      body: "语音消息 00:18",
      createdAt: "09:46"
    },
    {
      id: "msg-4",
      roomId: "student-3",
      from: "student-3",
      type: "text",
      body: "今晚校园圈那个刷题局你去吗？",
      createdAt: "昨天 21:10"
    }
  ],
  campusRoomMessages: [
    { id: "room-1", authorId: "student-2", body: "今晚 7 点有人在 A204 讲二重积分换序，我占了后排两个位。", createdAt: "09:30" },
    { id: "room-2", authorId: "student-3", body: "刚整理完极坐标换元模板，需要的可以来校园圈找我。", createdAt: "09:36" },
    { id: "room-3", authorId: "student-1", body: "大家今天复习别忘了先单位化方向向量。", createdAt: "09:42" }
  ],
  auditQueue: [
    {
      id: "audit-1",
      type: "笔记审核",
      targetType: "note",
      targetId: "note-1",
      title: "偏导与全微分一页通",
      status: "待审核",
      reason: "新发布笔记，等待管理员确认。"
    },
    {
      id: "audit-2",
      type: "举报处理",
      targetType: "post",
      targetId: "q-3",
      title: "隐函数求导里这一项为什么不能直接约掉？",
      status: "已自动隐藏",
      reason: "被举报 3 次，需确认是否恢复或删除。"
    },
    {
      id: "audit-3",
      type: "纠错反馈",
      targetType: "point",
      targetId: "p3",
      title: "Hessian 判别例题符号疑似写反",
      status: "待处理",
      reason: "学生提交知识点纠错反馈。"
    }
  ],
  systemLogs: [
    "学生发布笔记后进入待审核。",
    "举报达到阈值时内容自动隐藏。",
    "AI 内容仅作为管理员草稿，不直接公开。"
  ]
};

function guestUser() {
  return db.users.find((user) => user.id === "guest") || {
    id: "guest",
    name: "游客",
    role: "guest",
    roleText: "游客浏览",
    avatar: "访",
    phone: "",
    studentId: "",
    realName: "",
    banned: false,
    progressDone: 0,
    progressTotal: 24,
    collections: [],
    likes: []
  };
}

function currentUser() {
  if (!runtime.authenticated || !state.user) return guestUser();
  return db.users.find((user) => user.id === state.user) || guestUser();
}

function ensureCampusMockData() {
  const campusUsers = [
    {
      id: "student-2",
      name: "周同学",
      role: "student",
      roleText: "校内学生",
      avatar: "周",
      phone: "13677889900",
      studentId: "2026120421",
      realName: "周明溪",
      banned: false,
      progressDone: 16,
      progressTotal: 24,
      collections: ["note-1"],
      likes: ["note-4"]
    },
    {
      id: "student-3",
      name: "陈同学",
      role: "student",
      roleText: "校内学生",
      avatar: "陈",
      phone: "13766778899",
      studentId: "2026120588",
      realName: "陈知远",
      banned: false,
      progressDone: 21,
      progressTotal: 24,
      collections: ["note-2"],
      likes: ["note-2"]
    },
    {
      id: "student-4",
      name: "许同学",
      role: "student",
      roleText: "校内学生",
      avatar: "许",
      phone: "13555667788",
      studentId: "2026120660",
      realName: "许清禾",
      banned: false,
      progressDone: 13,
      progressTotal: 24,
      collections: [],
      likes: ["q-2"]
    }
  ];
  campusUsers.forEach((mockUser) => {
    if (!db.users.some((user) => user.id === mockUser.id)) db.users.push(mockUser);
  });
}

function pointById(id) {
  for (const chapter of db.chapters) {
    for (const section of chapter.sections) {
      const point = section.points.find((item) => item.id === id);
      if (point) return point;
    }
  }
  return null;
}

function noteById(id) {
  return db.notes.find((note) => note.id === id);
}

function postById(id) {
  return db.posts.find((post) => post.id === id);
}

function auditById(id) {
  return db.auditQueue.find((item) => item.id === id);
}

function userById(id) {
  return db.users.find((user) => user.id === id) || guestUser();
}

function isFriend(userId, friendId) {
  return db.friendships.some((item) => item.status === "accepted" && item.userId === userId && item.friendId === friendId);
}

function currentFriendIds() {
  const user = currentUser();
  return db.friendships
    .filter((item) => item.status === "accepted" && item.userId === user.id)
    .map((item) => item.friendId);
}

function campusAuthor(id) {
  const user = userById(id);
  return { ...user, displayPhone: mask(user.phone) };
}

function activeChatUser() {
  const friendIds = currentFriendIds();
  if (!friendIds.includes(state.activeChatId)) state.activeChatId = friendIds[0] || "";
  return state.activeChatId ? userById(state.activeChatId) : null;
}

function messagesForActiveChat() {
  const friend = activeChatUser();
  if (!friend) return [];
  return db.campusMessages.filter((message) => message.roomId === friend.id);
}

function searchCampusUsers() {
  const query = state.friendQuery.trim();
  if (!query) return [];
  const user = currentUser();
  return db.users.filter((item) => {
    if (item.id === user.id || item.role === "guest" || item.role === "admin") return false;
    return item.phone.includes(query) || item.name.includes(query) || item.studentId.includes(query);
  });
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${runtime.apiBase}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": state.user,
      ...(options.headers || {})
    }
  });
  let payload = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.detail || "接口请求失败");
  }
  return payload;
}

function applyBootstrap(payload) {
  if (!payload?.db) return;
  if (payload.assets) Object.assign(assets, payload.assets);
  Object.assign(db, payload.db);
  ensureCampusMockData();
  runtime.lastBootstrapAt = Date.now();
  if (state.user && !db.users.some((user) => user.id === state.user)) {
    state.user = "";
    localStorage.removeItem("hmf_user_id");
    runtime.authenticated = false;
  }
  state.role = currentUser().role;
}

async function refreshFromApi({ silent = false } = {}) {
  if (!runtime.useApi) return false;
  try {
    const payload = await apiRequest("/api/bootstrap");
    applyBootstrap(payload);
    return true;
  } catch (error) {
    runtime.useApi = false;
    if (!silent) toast(`后端暂未连接，已切回本地 mock：${error.message}`);
    return false;
  }
}

async function syncAfterMutation(result = {}) {
  const ok = await refreshFromApi({ silent: true });
  if (result.selected) state.selected = result.selected;
  if (result.route) state.route = result.route;
  if (result.message) toast(result.message);
  render();
  return ok;
}

function allSearchable() {
  return [
    ...db.notes,
    ...db.posts,
    ...db.auditQueue,
    ...db.campusPosts,
    ...db.campusRoomMessages,
    ...db.users.filter((user) => user.role === "student"),
    ...db.chapters.flatMap((chapter) => chapter.sections.flatMap((section) => section.points))
  ];
}

function textMatches(item) {
  if (!state.query) return true;
  return JSON.stringify(item).toLowerCase().includes(state.query.toLowerCase());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statusClass(status) {
  if (["已发布", "已解答", "精选", "已通过", "已采纳"].includes(status)) return "success";
  if (["审核中", "待回答", "讨论中", "待审核", "待处理", "草稿"].includes(status)) return "warning";
  if (["已自动隐藏", "已删除", "已封禁", "已驳回"].includes(status)) return "danger";
  return "";
}

const iconMap = {
  account_circle: "circle-user-round",
  account_tree: "network",
  add: "plus",
  add_notes: "notebook-pen",
  admin_panel_settings: "shield-check",
  bookmark: "bookmark-check",
  bookmark_add: "bookmark-plus",
  check: "check",
  check_circle: "circle-check",
  close: "x",
  dashboard: "layout-dashboard",
  delete: "trash-2",
  edit_note: "notebook-pen",
  edit_square: "square-pen",
  expand_less: "chevron-up",
  expand_more: "chevron-down",
  flag: "flag",
  forum: "messages-square",
  image: "image",
  mic: "mic",
  phone_call: "phone-call",
  phone_off: "phone-off",
  help: "circle-help",
  lock: "lock-keyhole",
  person: "user-round",
  plus_user: "user-plus",
  report: "badge-alert",
  search: "search",
  send: "send",
  switch_account: "refresh-cw",
  thumb_up: "thumbs-up",
  thumb_up_off_alt: "thumbs-up",
  unfold_more: "chevrons-up-down",
  visibility: "eye",
  visibility_off: "eye-off"
};

function icon(name) {
  const lucideName = iconMap[name] || name;
  return `<i class="local-icon" data-lucide="${lucideName}" aria-hidden="true"></i>`;
}

function renderIcons(root = document) {
  if (!window.lucide) return;
  window.lucide.createIcons({
    attrs: { "stroke-width": 2.2 },
    nameAttr: "data-lucide",
    icons: window.lucide.icons
  });
}

function canMotion() {
  return Boolean(window.gsap) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function animateAuthGate(root = document) {
  if (!canMotion()) return;
  const stage = $(".auth-stage", root);
  if (!stage) return;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(stage, { autoAlpha: 0, y: 18, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.46 })
    .fromTo($$("[data-auth-copy] > *", stage), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055 }, "-=0.22")
    .fromTo($("[data-auth-panel]", stage), { autoAlpha: 0, x: 24, scale: 0.98 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.48 }, "-=0.36")
    .fromTo($$(".auth-form label, .auth-submit, .auth-switch", stage), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.045 }, "-=0.26");
}

function animateAuthModeSwitch(callback) {
  const panel = $("[data-auth-panel]");
  if (!canMotion() || !panel) {
    callback();
    return;
  }
  gsap.to(panel, {
    autoAlpha: 0,
    y: 10,
    scale: 0.985,
    duration: 0.18,
    ease: "power2.in",
    onComplete: callback
  });
}

function animateViewEntry(root = $("#view")) {
  if (!canMotion() || !root) return;
  const items = [root, ...$$(":scope > *", root).slice(0, 7)];
  gsap.fromTo(items, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.035, ease: "power3.out", overwrite: "auto" });
}

function animateDetailEntry(root = $("#detailPanel")) {
  if (!canMotion() || !root) return;
  gsap.fromTo(root, { autoAlpha: 0.72, x: 12 }, { autoAlpha: 1, x: 0, duration: 0.34, ease: "power2.out", overwrite: "auto" });
}

function animateRouteSwitch(callback) {
  const view = $("#view");
  const detail = $("#detailPanel");
  if (!canMotion() || !view) {
    callback();
    return;
  }
  gsap.to([view, detail].filter(Boolean), {
    autoAlpha: 0,
    y: 8,
    duration: 0.18,
    ease: "power2.in",
    overwrite: "auto",
    onComplete: callback
  });
}

function animateAppShellEntry() {
  if (!canMotion()) return;
  gsap.fromTo([".app-header", ".side-rail", "#view", "#detailPanel"], {
    autoAlpha: 0,
    y: 18
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: "power3.out",
    overwrite: "auto"
  });
}

function enterAuthenticatedApp(message) {
  const screen = $(".auth-screen");
  const commit = () => {
    setAuthenticated(true);
    toast(message);
    render();
    animateAppShellEntry();
  };
  if (!canMotion() || !screen) {
    commit();
    return;
  }
  gsap.to(screen, {
    autoAlpha: 0,
    y: -14,
    scale: 0.99,
    duration: 0.26,
    ease: "power2.in",
    onComplete: commit
  });
}

function setAuthenticated(value) {
  runtime.authenticated = value;
  document.body.classList.toggle("auth-active", !value);
  renderAuthGate();
}

function setAuthMode(mode) {
  if (!["login", "register"].includes(mode) || state.authMode === mode) return;
  animateAuthModeSwitch(() => {
    state.authMode = mode;
    renderAuthGate();
  });
}

function authModeMeta() {
  return state.authMode === "register"
    ? {
        title: "创建你的校内账号，进入高数复习平台。",
        intro: "完成注册后即可同步个人进度、发布笔记与提问，并参与校内互助讨论。",
        submit: "完成注册",
        form: "entrance-register",
        asideTitle: "已有账号",
        asideAction: "立即登录",
        asideMode: "login",
        badge: "新用户注册"
      }
    : {
        title: "先确认校内身份，再进入你的复习驾驶舱。",
        intro: "登录后可以发布笔记、发起求助、收藏内容，并把知识树进度同步到个人中心。",
        submit: "进入平台",
        form: "entrance-login",
        asideTitle: "第一次来这里",
        asideAction: "新用户注册",
        asideMode: "register",
        badge: "校内身份登录"
      };
}

function renderAuthGate() {
  const root = $("#authRoot");
  if (!root) return;
  if (runtime.authenticated) {
    root.innerHTML = "";
    return;
  }
  const meta = authModeMeta();
  root.innerHTML = `
    <section class="auth-screen" aria-label="平台登录">
      <div class="auth-visual glass-panel auth-stage" data-auth-stage="${state.authMode}">
        <div class="auth-copy" data-auth-copy>
          <div class="brand-lockup">
            <span class="brand-mark auth-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <path class="brand-curve" d="M29 9c-8 1-8 8-7 15l1 7c1 7-2 10-8 10" />
                <path class="brand-axis" d="M14 29h20" />
                <circle class="brand-dot" cx="32" cy="18" r="3.2" />
              </svg>
            </span>
            <div>
              <strong>高数复习论坛</strong>
              <span>校内智慧复习与互助社区</span>
            </div>
          </div>
          <div class="auth-kicker">${meta.badge}</div>
          <h1>${meta.title}</h1>
          <p>${meta.intro}</p>
          <div class="auth-points">
            <div class="auth-point"><strong>知识树导航</strong><span>章节、知识点与相关笔记联动浏览</span></div>
            <div class="auth-point"><strong>互助问答</strong><span>提问、回复、收藏与审核全链路可见</span></div>
            <div class="auth-point"><strong>复习进度</strong><span>个人完成度与关键内容同步更新</span></div>
          </div>
        </div>
        <div class="auth-panel auth-panel-card" data-auth-panel>
          <div class="segmented auth-segmented" role="tablist" aria-label="登录方式切换">
            <button type="button" class="${state.authMode === "login" ? "is-active" : ""}" data-action="set-auth-mode" data-mode="login">登录</button>
            <button type="button" class="${state.authMode === "register" ? "is-active" : ""}" data-action="set-auth-mode" data-mode="register">注册</button>
          </div>
          <form class="auth-form" data-form="${meta.form}">
            <label><span>姓名</span><input name="name" autocomplete="name" placeholder="请输入真实姓名" required /></label>
            <label><span>学号</span><input name="studentId" inputmode="numeric" autocomplete="off" placeholder="例如 2026120317" required /></label>
            <label><span>手机号</span><input name="phone" inputmode="tel" autocomplete="tel" placeholder="请输入 11 位手机号" required /></label>
            <button class="primary-action auth-submit" type="submit">${icon(state.authMode === "register" ? "person" : "send")}${meta.submit}</button>
          </form>
          <div class="auth-switch">
            <span>${meta.asideTitle}</span>
            <button type="button" class="secondary-action auth-switch-button" data-action="set-auth-mode" data-mode="${meta.asideMode}">
              ${meta.asideAction}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
  renderIcons(root);
  animateAuthGate(root);
}

async function submitEntranceLogin(data) {
  const payload = {
    name: data.name?.trim(),
    studentId: data.studentId?.trim(),
    phone: data.phone?.trim()
  };
  if (!payload.name || !payload.studentId || !payload.phone) {
    toast("请填写姓名、学号和手机号。");
    return;
  }
  if (runtime.useApi) {
    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "X-User-Id": "guest" }
      });
      state.user = result.userId;
      localStorage.setItem("hmf_user_id", state.user);
      await refreshFromApi({ silent: true });
      enterAuthenticatedApp(result.message || "登录成功。");
      return;
    } catch (error) {
      toast(error.message);
      return;
    }
  }

  const localUser = db.users.find((user) => user.studentId === payload.studentId && user.phone === payload.phone);
  if (!localUser) {
    toast("该学号尚未注册，请先完成新用户注册。");
    setAuthMode("register");
    return;
  }
  localUser.name = payload.name;
  localUser.realName = payload.name;
  localUser.studentId = payload.studentId;
  localUser.phone = payload.phone;
  localUser.avatar = payload.name.slice(0, 1);
  state.user = localUser.id;
  localStorage.setItem("hmf_user_id", state.user);
  enterAuthenticatedApp("登录成功。");
}

async function submitEntranceRegister(data) {
  const payload = {
    name: data.name?.trim(),
    studentId: data.studentId?.trim(),
    phone: data.phone?.trim()
  };
  if (!payload.name || !payload.studentId || !payload.phone) {
    toast("请填写姓名、学号和手机号。");
    return;
  }
  if (runtime.useApi) {
    try {
      const result = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "X-User-Id": "guest" }
      });
      state.user = result.userId;
      localStorage.setItem("hmf_user_id", state.user);
      await refreshFromApi({ silent: true });
      enterAuthenticatedApp(result.message || "注册成功。");
      return;
    } catch (error) {
      toast(error.message);
      return;
    }
  }

  const localUser = {
    id: `student-${payload.studentId}`,
    name: payload.name,
    role: "student",
    roleText: "校内学生",
    avatar: payload.name.slice(0, 1),
    phone: payload.phone,
    studentId: payload.studentId,
    realName: payload.name,
    banned: false,
    progressDone: 0,
    progressTotal: 24,
    collections: [],
    likes: []
  };
  db.users.unshift(localUser);
  state.user = localUser.id;
  localStorage.setItem("hmf_user_id", state.user);
  enterAuthenticatedApp("注册成功。");
}

function logout() {
  localStorage.removeItem("hmf_user_id");
  state.user = "";
  state.role = "guest";
  state.authMode = "login";
  state.route = "dashboard";
  state.selected = { type: "note", id: "note-2" };
  state.modal = null;
  closeModal();
  setAuthenticated(false);
  toast("已退出登录。");
  renderIcons();
}

function badge(text, type = "") {
  return `<span class="status ${type || statusClass(text)}">${escapeHtml(text)}</span>`;
}

function setSelected(type, id) {
  state.selected = { type, id };
  renderDetail();
  $$(".is-selected").forEach((item) => item.classList.remove("is-selected"));
  $$(`[data-detail-type="${type}"][data-detail-id="${id}"]`).forEach((item) => item.classList.add("is-selected"));
}

function setRoute(route) {
  if (route === "admin" && currentUser().role !== "admin") {
    toast("当前不是管理员身份，已展示无权限说明。可点击右上角头像切换为管理员。");
  }
  const commit = () => {
    state.route = route;
    render();
    $("#view").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (route === state.route) {
    commit();
    return;
  }
  animateRouteSwitch(commit);
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("is-visible"), 2400);
}

function mask(value, keepStart = 3, keepEnd = 4) {
  if (!value) return "未绑定";
  if (!state.masked) return value;
  return `${value.slice(0, keepStart)}****${value.slice(-keepEnd)}`;
}

function updateChrome() {
  const user = currentUser();
  $("#avatarText").textContent = user.avatar;
  $("#userName").textContent = user.name;
  $("#userRole").textContent = user.roleText;
  $("#sideProgress").textContent = `${user.progressDone} / ${user.progressTotal}`;
  $("#sideProgressBar").style.width = `${Math.round((user.progressDone / user.progressTotal) * 100)}%`;

  $$("[data-route]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.route === state.route);
  });
}

function render() {
  updateChrome();
  const routes = {
    dashboard: renderDashboard,
    knowledge: renderKnowledge,
    notes: renderNotes,
    community: renderCommunity,
    campus: renderCampus,
    profile: renderProfile,
    admin: renderAdmin
  };
  $("#view").innerHTML = routes[state.route]();
  renderDetail();
  bindHoverLight();
  renderIcons();
  bindLogoutButtons();
  animateViewEntry();
}

function renderDashboard() {
  const publishedNotes = db.notes.filter((note) => note.status === "已发布").length;
  const qualityNotes = db.notes.filter((note) => note.quality).length;
  const activeQuestions = db.posts.filter((post) => post.type === "question" && post.status !== "已解答").length;
  const weakPoints = db.chapters.flatMap((c) => c.sections.flatMap((s) => s.points)).filter((p) => p.tags.includes("weak")).length;
  const featured = [db.notes.find((n) => n.quality), db.posts.find((p) => p.type === "question"), db.posts.find((p) => p.type === "experience")].filter(Boolean);

  return `
    <section class="hero glass-panel">
      <div class="hero-copy">
        <span class="eyebrow">首页 · 复习驾驶舱</span>
        <h1>把知识树、笔记、求助和审核状态串成一条复习路径。</h1>
        <p>这里是面向校内大一学生的高数复习与互助社区。知识树由管理员维护，学生围绕知识点发布笔记、提出问题、提交纠错反馈。</p>
        <div class="button-row">
          <button class="primary-action" data-route="knowledge">${icon("account_tree")}进入知识树</button>
          <button class="secondary-action" data-modal="note">${icon("add_notes")}发布笔记</button>
          <button class="secondary-action" data-modal="question">${icon("help")}发起求助</button>
        </div>
      </div>
      <div class="hero-visual"><img src="${assets.dashboard}" alt="复习驾驶舱界面预览" /></div>
    </section>

    <section class="metric-grid">
      ${metricCard("知识点", "96", "章节 / 小节 / 知识点三级结构", "account_tree")}
      ${metricCard("已发布笔记", publishedNotes, `其中 ${qualityNotes} 篇进入优质笔记`, "edit_note")}
      ${metricCard("活跃求助", activeQuestions, "待回答与讨论中问题", "forum")}
      ${metricCard("待审事项", db.auditQueue.length, "内容审核、举报、纠错反馈", "admin_panel_settings")}
    </section>

    <section class="dashboard-grid">
      <div class="card">
        <div class="panel-title">
          <div><span class="eyebrow">今日复习主线</span><h2>多元函数微分法</h2></div>
          <button class="ghost-action" data-route="knowledge">查看全部</button>
        </div>
        <div class="stack">
          ${["偏导存在与可微", "方向导数与梯度", "多元函数极值"].map((title, index) => `
            <article class="list-row" data-route="knowledge">
              <img src="${index === 0 ? assets.notes : assets.knowledge}" alt="${title}" />
              <div>
                <div class="row-title"><strong>${title}</strong>${badge(index === 2 ? "重点" : "进行中", index === 2 ? "warning" : "")}</div>
                <p>${index === 0 ? "先用反例理清可微和偏导存在的关系。" : index === 1 ? "方向向量先单位化，再和梯度点乘。" : "驻点不等于极值，Hessian 判别要完整。"}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="card">
        <div class="panel-title">
          <div><span class="eyebrow">本周值得先看</span><h2>精选与热门</h2></div>
          <button class="ghost-action" data-route="notes">进入笔记区</button>
        </div>
        <div class="stack">
          ${featured.map((item) => renderListItem(item, item.type ? "post" : "note")).join("")}
        </div>
      </div>
    </section>
  `;
}

function metricCard(label, value, text, iconName) {
  return `
    <article class="mini-card metric-card">
      ${icon(iconName)}
      <span class="muted">${label}</span>
      <strong>${value}</strong>
      <p>${text}</p>
    </article>
  `;
}

function renderKnowledge() {
  const points = db.chapters.flatMap((chapter) => chapter.sections.flatMap((section) => section.points));
  const activePoint = state.selected.type === "point" ? pointById(state.selected.id) : points[0];
  if (state.selected.type !== "point") state.selected = { type: "point", id: activePoint.id };

  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">知识树</span>
        <h1>章节、小节、知识点三级复习结构</h1>
        <p>点击任一知识点可查看高频考点、易错点、学习方法和相关笔记；学生可提交纠错反馈，但不能直接修改知识树。</p>
      </div>
      <div class="button-row">
        <button class="secondary-action" data-action="toggle-all-tree">${icon("unfold_more")}全部展开/收起</button>
        <button class="primary-action" data-modal="feedback">${icon("report")}提交纠错</button>
      </div>
    </section>
    <section class="knowledge-grid">
      <div class="card">
        <div class="panel-title">
          <div><span class="eyebrow">知识树筛选</span><h2>大一高数</h2></div>
          <div class="segmented">
            ${segButton("knowledgeFilter", "all", "全部")}
            ${segButton("knowledgeFilter", "hot", "高频")}
            ${segButton("knowledgeFilter", "weak", "易错")}
          </div>
        </div>
        <div class="tree-chapter-list stack">
          ${db.chapters.map(renderChapter).join("")}
        </div>
      </div>
      <div class="card">
        <div class="panel-title"><div><span class="eyebrow">知识点弹窗</span><h2>${activePoint.title}</h2></div>${badge(activePoint.completed ? "已完成" : "待复习", activePoint.completed ? "success" : "warning")}</div>
        <p>${activePoint.summary}</p>
        <div class="stack" style="margin-top:14px">
          ${activePoint.facts.map(([label, value]) => `<div class="drawer-card" style="padding:13px"><span class="field-note">${label}</span><strong>${value}</strong></div>`).join("")}
        </div>
        <div class="button-row" style="margin-top:16px">
          <button class="primary-action" data-action="complete-point" data-id="${activePoint.id}">${icon("check_circle")}标记完成</button>
          <button class="secondary-action" data-modal="feedback">${icon("report")}提交纠错</button>
        </div>
      </div>
    </section>
  `;
}

function segButton(key, value, label) {
  return `<button class="${state[key] === value ? "is-active" : ""}" data-set="${key}" data-value="${value}">${label}</button>`;
}

function renderChapter(chapter) {
  const sections = chapter.sections.map((section) => {
    const points = section.points.filter((point) => {
      const filterOk = state.knowledgeFilter === "all" || point.tags.includes(state.knowledgeFilter);
      return filterOk && textMatches(point);
    });
    if (!points.length) return "";
    return `
      <div class="tree-section">
        <span class="field-note">${section.title}</span>
        ${points.map((point) => `
          <button class="tree-node ${state.selected.type === "point" && state.selected.id === point.id ? "is-selected" : ""}" data-detail-type="point" data-detail-id="${point.id}">
            <strong>${point.title}</strong>
            ${badge(point.tags.includes("weak") ? "易错" : "高频", point.tags.includes("weak") ? "warning" : "")}
            <p>${point.summary}</p>
          </button>
        `).join("")}
      </div>
    `;
  }).join("");

  return `
    <div class="tree-chapter ${chapter.open ? "is-open" : ""}">
      <button class="chapter-button" data-action="toggle-chapter" data-id="${chapter.id}">
        <span>${chapter.title}</span>
        ${icon(chapter.open ? "expand_less" : "expand_more")}
      </button>
      <div class="tree-children">${sections || `<div class="empty">当前筛选下暂无知识点</div>`}</div>
    </div>
  `;
}

function renderNotes() {
  const filtered = db.notes.filter((note) => {
    const filterOk =
      state.noteFilter === "all" ||
      (state.noteFilter === "quality" && note.quality) ||
      (state.noteFilter === "mine" && note.author === currentUser().name) ||
      (state.noteFilter === "review" && note.status === "审核中") ||
      (state.noteFilter === "draft" && note.status === "草稿");
    return filterOk && textMatches(note);
  });

  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">笔记区 / 优质笔记</span>
        <h1>精选、高赞、草稿和审核状态都在这里</h1>
        <p>笔记必须关联知识点。管理员精选或点赞量达标后进入优质笔记列表，命中规则时进入待审核。</p>
      </div>
      <button class="primary-action" data-modal="note">${icon("add_notes")}发布笔记</button>
    </section>
    <div class="segmented">
      ${segButton("noteFilter", "all", "全部")}
      ${segButton("noteFilter", "quality", "优质")}
      ${segButton("noteFilter", "mine", "我的")}
      ${segButton("noteFilter", "review", "审核中")}
      ${segButton("noteFilter", "draft", "草稿")}
    </div>
    <section class="note-grid">
      ${filtered.length ? filtered.map(renderNoteCard).join("") : `<div class="empty">没有匹配的笔记</div>`}
    </section>
  `;
}

function renderNoteCard(note) {
  const user = currentUser();
  const liked = user.likes.includes(note.id);
  const saved = user.collections.includes(note.id);
  return `
    <article class="note-card ${state.selected.type === "note" && state.selected.id === note.id ? "is-selected" : ""}" data-detail-type="note" data-detail-id="${note.id}" tabindex="0">
      <img src="${note.image}" alt="${note.title}" />
      <div class="row-title"><strong>${note.title}</strong>${badge(note.status)}</div>
      <p>${note.summary}</p>
      <div class="chips">
        ${badge(note.quality ? "优质笔记" : "普通笔记", note.quality ? "success" : "")}
        <span class="tag">${pointById(note.pointId)?.title || "未关联"}</span>
        <span class="tag">${note.likes} 赞</span>
      </div>
      <div class="button-row">
        <button class="ghost-action" data-action="like-note" data-id="${note.id}">${icon(liked ? "thumb_up" : "thumb_up_off_alt")}${liked ? "已赞" : "点赞"}</button>
        <button class="ghost-action" data-action="save-item" data-type="note" data-id="${note.id}">${icon(saved ? "bookmark" : "bookmark_add")}${saved ? "已收藏" : "收藏"}</button>
      </div>
    </article>
  `;
}

function renderCommunity() {
  const filtered = db.posts.filter((post) => {
    const filterOk = state.communityFilter === "all" || post.type === state.communityFilter;
    return filterOk && textMatches(post);
  });
  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">互助社区</span>
        <h1>经验分享与难题求助</h1>
        <p>学生可以发布经验或求助，评论、点赞、收藏都需要登录；命中敏感规则时会进入待审核。</p>
      </div>
      <div class="button-row">
        <button class="secondary-action" data-modal="experience">${icon("edit_square")}分享经验</button>
        <button class="primary-action" data-modal="question">${icon("help")}发起求助</button>
      </div>
    </section>
    <div class="segmented">
      ${segButton("communityFilter", "all", "全部")}
      ${segButton("communityFilter", "experience", "经验分享")}
      ${segButton("communityFilter", "question", "难题求助")}
    </div>
    <section class="community-grid">
      <div class="card">
        <div class="panel-title"><h2>帖子列表</h2><span class="muted">${filtered.length} 条</span></div>
        <div class="stack">
          ${filtered.length ? filtered.map((post) => renderListItem(post, "post")).join("") : `<div class="empty">暂无匹配帖子</div>`}
        </div>
      </div>
      <div class="card">
        <div class="panel-title"><h2>互动规则</h2>${badge("先发后审", "warning")}</div>
        <div class="stack">
          <div class="drawer-card" style="padding:14px"><strong>游客限制</strong><p>游客能浏览公开内容，但点赞、收藏、评论、发布需要登录。</p></div>
          <div class="drawer-card" style="padding:14px"><strong>敏感内容</strong><p>广告引流、辱骂、涉政涉黄、联系方式引流会进入待审核。</p></div>
          <div class="drawer-card" style="padding:14px"><strong>举报阈值</strong><p>被多人举报后内容会自动隐藏，并进入管理员后台。</p></div>
        </div>
      </div>
    </section>
  `;
}

function renderCampus() {
  const user = currentUser();
  if (user.role === "guest") {
    return `
      <section class="card" style="min-height:520px;display:grid;place-items:center;text-align:center">
        <div>
          <span class="lock-mark">${icon("lock")}</span>
          <h1>登录后进入校园圈</h1>
          <p>校园圈支持公开聊天、手机号找同学、加好友、发送图片和语音通话模拟。</p>
          <div class="button-row" style="justify-content:center;margin-top:18px">
            <button class="primary-action" data-action="logout">${icon("switch_account")}去登录</button>
          </div>
        </div>
      </section>
    `;
  }

  const friends = currentFriendIds().map(userById);
  const activeFriend = activeChatUser();
  if (activeFriend) state.selected = { type: "chat", id: activeFriend.id };
  const results = searchCampusUsers();
  const feed = db.campusPosts.filter((post) => {
    const filterOk = state.campusFeedFilter === "all" || post.type === state.campusFeedFilter;
    return filterOk && textMatches({ ...post, author: campusAuthor(post.authorId).name });
  });

  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">校园圈</span>
        <h1>校内动态、公开聊天室和好友私聊</h1>
        <p>在校园圈里可以刷同学动态、用手机号搜索并添加好友，也可以在好友聊天里发送文字、图片和发起语音通话。</p>
      </div>
      <button class="primary-action" data-action="mock-campus-post">${icon("send")}发布动态</button>
    </section>

    <section class="metric-grid">
      ${metricCard("校园动态", db.campusPosts.length, "学习、生活、失物招领", "forum")}
      ${metricCard("我的好友", friends.length, "可私聊与语音通话", "person")}
      ${metricCard("公开聊天", db.campusRoomMessages.length, "校园公共聊天室消息", "messages-square")}
      ${metricCard("图片消息", db.campusMessages.filter((item) => item.type === "image").length, "好友间可发送图片", "image")}
    </section>

    <section class="campus-grid">
      <div class="card campus-feed-card">
        <div class="panel-title">
          <div><span class="eyebrow">校园动态</span><h2>同学们正在聊</h2></div>
          <div class="segmented">
            ${segButton("campusFeedFilter", "all", "全部")}
            ${segButton("campusFeedFilter", "study", "学习")}
            ${segButton("campusFeedFilter", "life", "生活")}
            ${segButton("campusFeedFilter", "lost", "失物")}
          </div>
        </div>
        <div class="stack">
          ${feed.length ? feed.map(renderCampusPost).join("") : `<div class="empty">暂无匹配动态</div>`}
        </div>
      </div>

      <div class="card campus-side-card">
        <div class="panel-title"><div><span class="eyebrow">找同学</span><h2>手机号加好友</h2></div>${icon("search")}</div>
        <form class="form-grid campus-search-form" data-form="friend-search">
          <label><span>手机号 / 姓名 / 学号</span><input name="phone" value="${escapeHtml(state.friendQuery)}" placeholder="例如 13677889900" /></label>
          <button class="primary-action" type="submit">${icon("search")}搜索同学</button>
        </form>
        <div class="stack campus-search-result">
          ${state.friendQuery ? (results.length ? results.map(renderFriendSearchResult).join("") : `<div class="empty">没有找到匹配同学</div>`) : `<div class="empty">输入手机号后可以直接加好友</div>`}
        </div>

        <div class="panel-title campus-section-title"><div><span class="eyebrow">好友</span><h2>最近联系人</h2></div><span class="muted">${friends.length} 位</span></div>
        <div class="stack">
          ${friends.length ? friends.map(renderFriendRow).join("") : `<div class="empty">还没有好友，先用手机号添加同学</div>`}
        </div>
      </div>

      <div class="card campus-room-card">
        <div class="panel-title"><div><span class="eyebrow">公共聊天室</span><h2>大家一起聊</h2></div>${badge("全校可见", "success")}</div>
        <div class="campus-room-messages">
          ${db.campusRoomMessages.map(renderCampusRoomMessage).join("")}
        </div>
        <form class="campus-room-form" data-form="campus-room-message">
          <input name="message" placeholder="发一条校园圈公共消息" />
          <button class="primary-action" type="submit">${icon("send")}发送</button>
        </form>
      </div>
    </section>
  `;
}

function renderCampusPost(post) {
  const author = campusAuthor(post.authorId);
  return `
    <article class="campus-post">
      <div class="campus-post-head">
        <span class="avatar mini-avatar">${author.avatar}</span>
        <div>
          <strong>${author.name}</strong>
          <span class="muted">${post.createdAt} · ${author.displayPhone}</span>
        </div>
        ${badge(post.type === "study" ? "学习搭子" : post.type === "lost" ? "失物招领" : "校园生活", post.type === "lost" ? "warning" : "")}
      </div>
      <img src="${post.image}" alt="${post.title}" />
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <div class="chips">
        <span class="tag">${post.likes} 赞</span>
        <span class="tag">${post.comments.length} 条评论</span>
      </div>
      <div class="campus-comments">
        ${post.comments.slice(0, 2).map((comment) => `<div><strong>${comment.author}</strong><span>${comment.text}</span></div>`).join("") || `<span class="muted">还没有评论</span>`}
      </div>
    </article>
  `;
}

function renderFriendSearchResult(friend) {
  const user = currentUser();
  const added = isFriend(user.id, friend.id);
  return `
    <article class="friend-result">
      <span class="avatar mini-avatar">${friend.avatar}</span>
      <div>
        <strong>${friend.name}</strong>
        <span class="muted">${mask(friend.phone)} · ${mask(friend.studentId, 4, 4)}</span>
      </div>
      <button class="${added ? "secondary-action" : "primary-action"}" data-action="${added ? "select-chat" : "add-friend"}" data-id="${friend.id}">
        ${icon(added ? "forum" : "plus_user")}${added ? "去聊天" : "加好友"}
      </button>
    </article>
  `;
}

function renderFriendRow(friend) {
  const latest = [...db.campusMessages].reverse().find((message) => message.roomId === friend.id);
  return `
    <button class="friend-row ${state.activeChatId === friend.id ? "is-selected" : ""}" data-action="select-chat" data-id="${friend.id}">
      <span class="avatar mini-avatar">${friend.avatar}</span>
      <span>
        <strong>${friend.name}</strong>
        <small>${latest ? latest.type === "image" ? "图片消息" : latest.body : "还没有聊天记录"}</small>
      </span>
      ${icon("forum")}
    </button>
  `;
}

function renderCampusRoomMessage(message) {
  const author = campusAuthor(message.authorId);
  return `
    <div class="room-message">
      <span class="avatar mini-avatar">${author.avatar}</span>
      <div><strong>${author.name}</strong><p>${message.body}</p></div>
      <time>${message.createdAt}</time>
    </div>
  `;
}

function renderListItem(item, type) {
  const isPost = type === "post";
  const id = item.id;
  return `
    <article class="list-row ${state.selected.type === type && state.selected.id === id ? "is-selected" : ""}" data-detail-type="${type}" data-detail-id="${id}" tabindex="0">
      <img src="${item.image || assets.notes}" alt="${item.title}" />
      <div>
        <div class="row-title"><strong>${item.title}</strong>${badge(item.status || (item.quality ? "优质" : "已发布"))}</div>
        <p>${item.summary}</p>
        <div class="chips">
          <span class="tag">${item.author || "系统"}</span>
          ${isPost ? `<span class="tag">${item.type === "question" ? "难题求助" : "经验分享"}</span>` : `<span class="tag">${pointById(item.pointId)?.title || "知识点"}</span>`}
          <span class="tag">${item.likes || 0} 赞</span>
        </div>
      </div>
    </article>
  `;
}

function renderProfile() {
  const user = currentUser();
  const myNotes = db.notes.filter((note) => note.author === user.name);
  const myPosts = db.posts.filter((post) => post.author === user.name);
  const savedItems = [...db.notes, ...db.posts].filter((item) => user.collections.includes(item.id));
  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">个人中心</span>
        <h1>我的内容、收藏与审核状态</h1>
        <p>手机号、学号、真实姓名默认脱敏。普通用户不可查看其他人的敏感信息。</p>
      </div>
      <button class="secondary-action" data-action="toggle-privacy">${icon(state.masked ? "visibility" : "visibility_off")}${state.masked ? "显示完整信息" : "恢复脱敏"}</button>
    </section>
    <section class="profile-grid">
      <div class="card">
        <div class="rail-profile" style="grid-template-columns:64px 1fr">
          <div class="avatar" style="width:64px;height:64px">${user.avatar}</div>
          <div><h2>${user.name}</h2><span class="muted">${user.roleText}</span></div>
        </div>
        <div class="stack" style="margin-top:16px">
          <div class="drawer-card" style="padding:13px"><span class="field-note">手机号</span><strong>${user.phone ? mask(user.phone) : "游客无手机号"}</strong></div>
          <div class="drawer-card" style="padding:13px"><span class="field-note">学号</span><strong>${user.studentId ? mask(user.studentId, 4, 4) : "游客无学号"}</strong></div>
          <div class="drawer-card" style="padding:13px"><span class="field-note">真实姓名</span><strong>${state.masked && user.realName ? `${user.realName[0]}**` : user.realName || "未认证"}</strong></div>
        </div>
      </div>
      <div class="card">
        <div class="panel-title"><h2>个人汇总</h2>${badge(user.banned ? "已封禁" : "正常", user.banned ? "danger" : "success")}</div>
        <section class="metric-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">
          ${metricCard("我的笔记", myNotes.length, "含草稿与审核中", "edit_note")}
          ${metricCard("我的帖子", myPosts.length, "经验与求助", "forum")}
          ${metricCard("我的收藏", savedItems.length, "笔记与求助", "bookmark")}
          ${metricCard("纠错反馈", db.auditQueue.filter((item) => item.type === "纠错反馈").length, "等待管理员处理", "report")}
        </section>
        <div class="stack" style="margin-top:16px">
          ${[...myNotes, ...myPosts, ...savedItems].slice(0, 5).map((item) => renderListItem(item, item.type ? "post" : "note")).join("") || `<div class="empty">暂无个人内容</div>`}
        </div>
      </div>
    </section>
  `;
}

function renderAdmin() {
  if (currentUser().role !== "admin") {
    return `
      <section class="card" style="min-height:520px;display:grid;place-items:center;text-align:center">
        <div>
          <span class="lock-mark">${icon("lock")}</span>
          <h1>无访问权限</h1>
          <p>管理后台仅管理员可见。点击右上角头像切换为管理员身份后，可处理审核、举报、纠错反馈和用户封禁。</p>
          <div class="button-row" style="justify-content:center;margin-top:18px">
            <button class="primary-action" data-modal="login">${icon("switch_account")}切换身份</button>
            <button class="secondary-action" data-route="dashboard">返回首页</button>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="view-head">
      <div>
        <span class="eyebrow">管理后台</span>
        <h1>知识维护、内容审核、举报与纠错闭环</h1>
        <p>管理员负责知识树维护、内容审核、举报处理、优质笔记设置、用户管理和纠错反馈处理。</p>
      </div>
      <button class="primary-action" data-modal="knowledge">${icon("add")}新增知识点</button>
    </section>
    <div class="segmented">
      ${segButton("adminTab", "queue", "待处理")}
      ${segButton("adminTab", "notes", "笔记管理")}
      ${segButton("adminTab", "users", "用户管理")}
      ${segButton("adminTab", "logs", "处理记录")}
    </div>
    <section class="admin-grid">
      <div class="card">
        ${renderAdminMain()}
      </div>
      <div class="card">
        <div class="panel-title"><h2>治理规则</h2>${badge("内容可控", "success")}</div>
        <div class="stack">
          <div class="drawer-card" style="padding:14px"><strong>AI 内容</strong><p>AI 只作为管理员草稿，公开前必须人工确认。</p></div>
          <div class="drawer-card" style="padding:14px"><strong>删除与封禁</strong><p>必须填写原因，并在个人中心展示处理状态。</p></div>
          <div class="drawer-card" style="padding:14px"><strong>优质笔记</strong><p>管理员手动设置，或点赞量达到阈值后进入优质列表。</p></div>
        </div>
      </div>
    </section>
  `;
}

function renderAdminMain() {
  if (state.adminTab === "queue") {
    return `
      <div class="panel-title"><h2>待处理事项</h2><span class="muted">${db.auditQueue.length} 条</span></div>
      <div class="stack">
        ${db.auditQueue.length ? db.auditQueue.map((item) => `
          <article class="list-row ${state.selected.type === "audit" && state.selected.id === item.id ? "is-selected" : ""}" data-detail-type="audit" data-detail-id="${item.id}" tabindex="0">
            <img src="${item.type === "纠错反馈" ? assets.knowledge : item.type === "举报处理" ? assets.community : assets.notes}" alt="${item.title}" />
            <div>
              <div class="row-title"><strong>${item.title}</strong>${badge(item.status)}</div>
              <p>${item.reason}</p>
              <div class="button-row">
                <button class="ghost-action" data-action="approve-audit" data-id="${item.id}">${icon("check")}通过</button>
                <button class="ghost-action" data-action="reject-audit" data-id="${item.id}">${icon("close")}驳回</button>
                <button class="danger-action" data-action="delete-audit" data-id="${item.id}">${icon("delete")}删除</button>
              </div>
            </div>
          </article>
        `).join("") : `<div class="empty">暂无待处理事项</div>`}
      </div>
    `;
  }

  if (state.adminTab === "notes") {
    return `
      <div class="panel-title"><h2>笔记管理</h2><span class="muted">${db.notes.length} 篇</span></div>
      <table class="admin-table">
        <thead><tr><th>标题</th><th>状态</th><th>点赞</th><th>操作</th></tr></thead>
        <tbody>
          ${db.notes.map((note) => `
            <tr>
              <td><strong>${note.title}</strong><br><span class="muted">${note.author} · ${pointById(note.pointId)?.title || ""}</span></td>
              <td>${badge(note.quality ? "优质" : note.status)}</td>
              <td>${note.likes}</td>
              <td><button class="ghost-action" data-action="quality-note" data-id="${note.id}">${note.quality ? "取消优质" : "设为优质"}</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  if (state.adminTab === "users") {
    return `
      <div class="panel-title"><h2>用户管理</h2><span class="muted">${db.users.length} 人</span></div>
      <table class="admin-table">
        <thead><tr><th>用户</th><th>身份</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          ${db.users.filter((user) => user.role !== "guest").map((user) => `
            <tr>
              <td><strong>${user.name}</strong><br><span class="muted">${mask(user.studentId, 4, 4)} · ${mask(user.phone)}</span></td>
              <td>${user.roleText}</td>
              <td>${badge(user.banned ? "已封禁" : "正常", user.banned ? "danger" : "success")}</td>
              <td><button class="${user.banned ? "ghost-action" : "danger-action"}" data-action="toggle-ban" data-id="${user.id}">${user.banned ? "解封" : "封禁"}</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  return `
    <div class="panel-title"><h2>处理记录</h2><span class="muted">${db.systemLogs.length} 条</span></div>
    <div class="stack">
      ${db.systemLogs.map((log) => `<div class="drawer-card" style="padding:14px">${log}</div>`).join("")}
    </div>
  `;
}

function renderDetail() {
  const panel = $("#detailPanel");
  const selected = state.selected;
  let item;
  let html = "";

  if (selected.type === "note") {
    item = noteById(selected.id) || db.notes[0];
    html = detailForContent(item, "note");
  } else if (selected.type === "post") {
    item = postById(selected.id) || db.posts[0];
    html = detailForContent(item, "post");
  } else if (selected.type === "point") {
    item = pointById(selected.id) || pointById("p1");
    const relatedNotes = db.notes.filter((note) => note.pointId === item.id);
    html = `
      <div class="detail-panel-inner">
        <span class="eyebrow">知识点详情</span>
        <h2>${item.title}</h2>
        ${badge(item.completed ? "已完成" : "待复习", item.completed ? "success" : "warning")}
        <p>${item.summary}</p>
        <div class="stack">
          ${item.facts.map(([label, value]) => `<div class="drawer-card" style="padding:13px"><span class="field-note">${label}</span><strong>${value}</strong></div>`).join("")}
        </div>
        <div class="button-row">
          <button class="primary-action" data-action="complete-point" data-id="${item.id}">${icon("check_circle")}标记完成</button>
          <button class="secondary-action" data-modal="feedback">${icon("report")}纠错反馈</button>
        </div>
        <div class="stack">
          <strong>相关笔记</strong>
          ${relatedNotes.length ? relatedNotes.map((note) => renderListItem(note, "note")).join("") : `<div class="empty">暂无相关笔记</div>`}
        </div>
      </div>
    `;
  } else if (selected.type === "audit") {
    item = auditById(selected.id) || db.auditQueue[0];
    html = item ? `
      <div class="detail-panel-inner">
        <span class="eyebrow">${item.type}</span>
        <h2>${item.title}</h2>
        ${badge(item.status)}
        <p>${item.reason}</p>
        <ul class="detail-list">
          <li>通过：内容公开或恢复。</li>
          <li>驳回：作者可在个人中心看到原因。</li>
          <li>删除：需要记录处理原因。</li>
        </ul>
        <div class="button-row">
          <button class="primary-action" data-action="approve-audit" data-id="${item.id}">${icon("check")}通过</button>
          <button class="secondary-action" data-action="reject-audit" data-id="${item.id}">${icon("close")}驳回</button>
          <button class="danger-action" data-action="delete-audit" data-id="${item.id}">${icon("delete")}删除</button>
        </div>
      </div>
    ` : `<div class="detail-panel-inner"><h2>没有待处理事项</h2><p>当前队列为空。</p></div>`;
  } else if (selected.type === "chat") {
    html = detailForChat(selected.id);
  }

  panel.innerHTML = html;
  bindHoverLight();
  renderIcons(panel);
  animateDetailEntry(panel);
}

function detailForChat(friendId) {
  const friend = userById(friendId);
  const messages = messagesForActiveChat();
  const calling = state.voiceCall === friend.id;
  return `
    <div class="detail-panel-inner chat-detail">
      <div class="chat-head">
        <span class="avatar">${friend.avatar}</span>
        <div>
          <span class="eyebrow">好友私聊</span>
          <h2>${friend.name}</h2>
          <p>${mask(friend.phone)} · ${friend.roleText}</p>
        </div>
      </div>
      <div class="call-panel ${calling ? "is-calling" : ""}">
        <span>${calling ? "语音通话中" : "可发起语音通话"}</span>
        <strong>${calling ? "00:23" : "点击按钮模拟呼叫"}</strong>
        <button class="${calling ? "danger-action" : "primary-action"}" data-action="${calling ? "end-voice-call" : "start-voice-call"}" data-id="${friend.id}">
          ${icon(calling ? "phone_off" : "phone_call")}${calling ? "挂断" : "打语音"}
        </button>
      </div>
      <div class="chat-messages">
        ${messages.length ? messages.map(renderChatMessage).join("") : `<div class="empty">还没有消息，发一条开启聊天</div>`}
      </div>
      <form class="chat-compose" data-form="chat-message" data-id="${friend.id}">
        <input name="message" placeholder="输入聊天内容" />
        <button type="button" class="secondary-action" data-action="send-chat-image" data-id="${friend.id}">${icon("image")}图片</button>
        <button type="button" class="secondary-action" data-action="send-chat-voice" data-id="${friend.id}">${icon("mic")}语音</button>
        <button class="primary-action" type="submit">${icon("send")}发送</button>
      </form>
    </div>
  `;
}

function renderChatMessage(message) {
  const mine = message.from === currentUser().id;
  const author = userById(message.from);
  const content = message.type === "image"
    ? `<img src="${message.body}" alt="聊天图片" /><span>${message.caption || "图片消息"}</span>`
    : message.type === "voice"
      ? `<span class="voice-bubble">${icon("mic")}${message.body}</span>`
      : `<span>${message.body}</span>`;
  return `
    <div class="chat-message ${mine ? "is-mine" : ""}">
      <span class="avatar mini-avatar">${author.avatar}</span>
      <div class="chat-bubble">
        ${content}
        <time>${message.createdAt}</time>
      </div>
    </div>
  `;
}

function detailForContent(item, type) {
  const user = currentUser();
  const isNote = type === "note";
  const saved = user.collections.includes(item.id);
  const liked = user.likes.includes(item.id);
  return `
    <div class="detail-panel-inner">
      <span class="eyebrow">${isNote ? "笔记详情" : item.type === "question" ? "求助详情" : "经验分享"}</span>
      <h2>${item.title}</h2>
      <img src="${item.image}" alt="${item.title}" />
      <div class="chips">
        ${badge(item.status || (item.quality ? "优质" : "已发布"))}
        <span class="tag">${item.author}</span>
        <span class="tag">${item.likes} 赞</span>
        ${isNote ? `<span class="tag">${pointById(item.pointId)?.title || ""}</span>` : `<span class="tag">${item.type === "question" ? "难题求助" : "经验分享"}</span>`}
      </div>
      <p>${item.body}</p>
      <div class="button-row">
        <button class="primary-action" data-action="${isNote ? "like-note" : "like-post"}" data-id="${item.id}">${icon(liked ? "thumb_up" : "thumb_up_off_alt")}${liked ? "已赞" : "点赞"}</button>
        <button class="secondary-action" data-action="save-item" data-type="${type}" data-id="${item.id}">${icon(saved ? "bookmark" : "bookmark_add")}${saved ? "已收藏" : "收藏"}</button>
        <button class="secondary-action" data-action="report-item" data-type="${type}" data-id="${item.id}">${icon("flag")}举报</button>
      </div>
      <div class="stack">
        <strong>评论 / 回答</strong>
        ${item.comments.length ? item.comments.map((comment) => `<div class="drawer-card" style="padding:13px"><strong>${comment.author}</strong><p>${comment.text}</p></div>`).join("") : `<div class="empty">还没有评论，来写第一条</div>`}
      </div>
      <form class="form-grid" data-form="comment" data-type="${type}" data-id="${item.id}">
        <label><span>${item.type === "question" ? "回答或追问" : "评论"}</span><textarea name="comment" placeholder="写下你的想法"></textarea></label>
        <button class="primary-action" type="submit">${icon("send")}提交</button>
      </form>
    </div>
  `;
}

function openModal(mode) {
  state.modal = mode;
  const root = $("#modalRoot");
  const configs = {
    login: {
      title: "切换原型身份",
      intro: "选择不同身份会改变权限、个人信息和管理后台访问状态。",
      body: `
        <label><span>身份</span><select name="user">
          ${db.users.map((user) => `<option value="${user.id}" ${user.id === state.user ? "selected" : ""}>${user.name} · ${user.roleText}</option>`).join("")}
        </select></label>
      `,
      submit: "切换身份"
    },
    note: {
      title: "发布知识笔记",
      intro: "笔记必须关联知识点，提交后进入展示或待审核流程。",
      body: `
        ${pointSelect()}
        <label><span>标题</span><input name="title" value="偏导与全微分一页通" /></label>
        <label><span>正文摘要</span><textarea name="body">先判断函数是否可微，再区分偏导存在、偏导连续与全微分存在的关系。</textarea></label>
      `,
      submit: "提交笔记"
    },
    question: {
      title: "发起难题求助",
      intro: "同学可以回答、追问、收藏，命中规则时进入待审核。",
      body: `
        ${pointSelect()}
        <label><span>问题标题</span><input name="title" value="为什么这个极值点要继续看 Hessian？" /></label>
        <label><span>题目与卡点</span><textarea name="body">我已经求出驻点，但不确定这里是否还要判断 Hessian 的正定性。</textarea></label>
      `,
      submit: "提交求助"
    },
    experience: {
      title: "分享复习经验",
      intro: "分享复习方法、错题整理和考前安排。",
      body: `
        <label><span>经验标题</span><input name="title" value="考前 48 小时如何排复习顺序" /></label>
        <label><span>正文摘要</span><textarea name="body">先抓高频考点，再处理自己的错题清单，最后回看定义题模板。</textarea></label>
      `,
      submit: "发布经验"
    },
    feedback: {
      title: "提交知识点纠错",
      intro: "纠错反馈会进入管理员后台，采纳后再影响公开知识树。",
      body: `
        ${pointSelect()}
        <label><span>反馈标题</span><input name="title" value="Hessian 判别例题符号疑似写反" /></label>
        <label><span>纠错说明</span><textarea name="body">知识点弹窗中的二阶判别示例，主子式符号似乎与结论不一致，建议管理员复核。</textarea></label>
      `,
      submit: "提交反馈"
    },
    knowledge: {
      title: "新增知识点",
      intro: "管理员维护章节、小节、知识点及其考点、易错点、学习方法。",
      body: `
        <label><span>所属章节</span><select name="chapter">${db.chapters.map((chapter) => `<option value="${chapter.id}">${chapter.title}</option>`).join("")}</select></label>
        <label><span>知识点名称</span><input name="title" value="隐函数存在定理" /></label>
        <label><span>学习说明</span><textarea name="body">掌握隐函数存在条件，并能用于判断局部函数关系。</textarea></label>
      `,
      submit: "保存知识点"
    }
  };
  const config = configs[mode];
  root.innerHTML = `
    <div class="modal-layer is-open" data-modal-layer>
      <section class="modal-card">
        <div class="modal-head">
          <div><span class="eyebrow">${mode}</span><h2>${config.title}</h2><p>${config.intro}</p></div>
          <button class="icon-button" data-action="close-modal" aria-label="关闭">${icon("close")}</button>
        </div>
        <form class="form-grid" data-form="${mode}">
          ${config.body}
          <div class="form-actions">
            <button type="button" class="secondary-action" data-action="close-modal">取消</button>
            <button type="submit" class="primary-action">${icon("send")}${config.submit}</button>
          </div>
        </form>
      </section>
    </div>
  `;
  document.body.classList.add("modal-open");
  renderIcons(root);
}

function pointSelect() {
  const points = db.chapters.flatMap((chapter) => chapter.sections.flatMap((section) => section.points));
  return `<label><span>关联知识点</span><select name="pointId">${points.map((point) => `<option value="${point.id}">${point.title}</option>`).join("")}</select></label>`;
}

function closeModal() {
  state.modal = null;
  const root = $("#modalRoot");
  if (root) root.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function ensureCanInteract() {
  const user = currentUser();
  if (user.role === "guest") {
    toast("游客只能浏览公开内容，请先切换为学生身份。");
    openModal("login");
    return false;
  }
  if (user.banned) {
    toast("当前用户已被封禁，不能发布、评论、点赞或收藏。");
    return false;
  }
  return true;
}

async function handleForm(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const mode = form.dataset.form;
  const data = Object.fromEntries(new FormData(form).entries());

  if (mode === "entrance-login") {
    await submitEntranceLogin(data);
    return;
  }

  if (mode === "entrance-register") {
    await submitEntranceRegister(data);
    return;
  }

  if (mode === "login") {
    state.user = data.user;
    await refreshFromApi({ silent: true });
    state.role = currentUser().role;
    closeModal();
    toast(`已切换为：${currentUser().name}`);
    if (state.route === "admin" && currentUser().role !== "admin") state.route = "dashboard";
    render();
    return;
  }

  if (mode === "friend-search") {
    state.friendQuery = data.phone?.trim() || "";
    state.route = "campus";
    render();
    return;
  }

  if (mode === "campus-room-message") {
    if (!ensureCanInteract()) return;
    const message = data.message?.trim();
    if (!message) return toast("先输入要发送的校园圈消息。");
    db.campusRoomMessages.push({
      id: `room-${Date.now()}`,
      authorId: currentUser().id,
      body: message,
      createdAt: "刚刚"
    });
    toast("已发送到校园圈公共聊天室。");
    render();
    return;
  }

  if (mode === "chat-message") {
    if (!ensureCanInteract()) return;
    const text = data.message?.trim();
    if (!text) return toast("先输入聊天内容。");
    state.activeChatId = form.dataset.id;
    db.campusMessages.push({
      id: `msg-${Date.now()}`,
      roomId: state.activeChatId,
      from: currentUser().id,
      type: "text",
      body: text,
      createdAt: "刚刚"
    });
    state.selected = { type: "chat", id: state.activeChatId };
    toast("消息已发送。");
    render();
    return;
  }

  if (mode === "comment") {
    if (!ensureCanInteract()) return;
    const text = data.comment?.trim();
    if (!text) return toast("请先输入内容。");
    if (runtime.useApi) {
      try {
        await apiRequest("/api/comments", {
          method: "POST",
          body: JSON.stringify({
            targetType: form.dataset.type,
            targetId: form.dataset.id,
            text
          })
        });
        await syncAfterMutation({ message: "评论已提交。" });
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const target = form.dataset.type === "note" ? noteById(form.dataset.id) : postById(form.dataset.id);
    target.comments.push({ author: currentUser().name, text });
    toast("评论已提交。");
    renderDetail();
    return;
  }

  if (!ensureCanInteract() && mode !== "knowledge") return;

  if (mode === "note") {
    if (runtime.useApi) {
      try {
        closeModal();
        await syncAfterMutation(await apiRequest("/api/notes", {
          method: "POST",
          body: JSON.stringify({ pointId: data.pointId, title: data.title, body: data.body })
        }));
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const id = `note-${Date.now()}`;
    db.notes.unshift({
      id,
      title: data.title || "未命名笔记",
      author: currentUser().name,
      pointId: data.pointId,
      status: "审核中",
      quality: false,
      image: assets.notes,
      likes: 0,
      comments: [],
      summary: data.body || "新的复习笔记摘要。",
      body: data.body || "新的复习笔记正文。"
    });
    db.auditQueue.unshift({
      id: `audit-${Date.now()}`,
      type: "笔记审核",
      targetType: "note",
      targetId: id,
      title: data.title || "未命名笔记",
      status: "待审核",
      reason: "新发布笔记，等待管理员确认。"
    });
    state.selected = { type: "note", id };
    state.route = "notes";
    closeModal();
    toast("笔记已提交，当前进入待审核。");
    render();
    return;
  }

  if (mode === "question" || mode === "experience") {
    if (runtime.useApi) {
      try {
        closeModal();
        await syncAfterMutation(await apiRequest("/api/posts", {
          method: "POST",
          body: JSON.stringify({ type: mode, title: data.title, body: data.body })
        }));
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const id = `${mode === "question" ? "q" : "exp"}-${Date.now()}`;
    db.posts.unshift({
      id,
      type: mode === "question" ? "question" : "experience",
      title: data.title || "未命名帖子",
      author: currentUser().name,
      status: mode === "question" ? "待回答" : "已发布",
      image: assets.community,
      likes: 0,
      comments: [],
      summary: data.body || "新的社区内容。",
      body: data.body || "新的社区内容。"
    });
    state.selected = { type: "post", id };
    state.route = "community";
    closeModal();
    toast(mode === "question" ? "求助已发布。" : "经验已发布。");
    render();
    return;
  }

  if (mode === "feedback") {
    if (runtime.useApi) {
      try {
        closeModal();
        await syncAfterMutation(await apiRequest("/api/feedback", {
          method: "POST",
          body: JSON.stringify({ pointId: data.pointId, title: data.title, body: data.body })
        }));
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const id = `audit-${Date.now()}`;
    db.auditQueue.unshift({
      id,
      type: "纠错反馈",
      targetType: "point",
      targetId: data.pointId,
      title: data.title || "知识点纠错反馈",
      status: "待处理",
      reason: data.body || "学生提交知识点纠错反馈。"
    });
    state.selected = { type: "audit", id };
    closeModal();
    toast("纠错反馈已提交给管理员。");
    render();
    return;
  }

  if (mode === "knowledge") {
    if (currentUser().role !== "admin") return toast("只有管理员可以新增知识点。");
    if (runtime.useApi) {
      try {
        closeModal();
        await syncAfterMutation(await apiRequest("/api/knowledge-points", {
          method: "POST",
          body: JSON.stringify({ chapter: data.chapter, title: data.title, body: data.body })
        }));
        return;
      } catch (error) {
        toast(error.message);
        return;
      }
    }
    const chapter = db.chapters.find((item) => item.id === data.chapter) || db.chapters[0];
    const newPoint = {
      id: `p-${Date.now()}`,
      title: data.title || "新知识点",
      tags: ["hot"],
      completed: false,
      summary: data.body || "管理员新增的知识点。",
      facts: [["高频考点", "待管理员补充。"], ["易错点", "待管理员补充。"], ["学习方法", "待管理员补充。"]]
    };
    chapter.sections[0].points.push(newPoint);
    chapter.open = true;
    state.selected = { type: "point", id: newPoint.id };
    state.route = "knowledge";
    closeModal();
    toast("知识点已新增。");
    render();
  }
}

async function handleAction(target) {
  const action = target.dataset.action;
  if (!action) return false;

  if (action === "logout") {
    logout();
    return true;
  }

  if (action === "set-auth-mode") {
    setAuthMode(target.dataset.mode);
    return true;
  }

  if (action === "close-modal") {
    closeModal();
    return true;
  }

  if (action === "mock-campus-post") {
    if (!ensureCanInteract()) return true;
    db.campusPosts.unshift({
      id: `campus-${Date.now()}`,
      authorId: currentUser().id,
      type: "study",
      title: "今晚一起复盘高数错题吗？",
      body: "我在校园圈发起一个 40 分钟错题互讲，先讲思路再看标准答案。",
      image: assets.dashboard,
      createdAt: "刚刚",
      likes: 0,
      comments: []
    });
    state.route = "campus";
    state.campusFeedFilter = "all";
    toast("校园动态已发布。");
    render();
    return true;
  }

  if (action === "add-friend") {
    if (!ensureCanInteract()) return true;
    const user = currentUser();
    const friendId = target.dataset.id;
    if (friendId === user.id) return true;
    if (!isFriend(user.id, friendId)) {
      db.friendships.push({ userId: user.id, friendId, status: "accepted", createdAt: "刚刚" });
      db.friendships.push({ userId: friendId, friendId: user.id, status: "accepted", createdAt: "刚刚" });
    }
    state.activeChatId = friendId;
    state.selected = { type: "chat", id: friendId };
    toast(`已添加 ${userById(friendId).name}，可以开始聊天。`);
    render();
    return true;
  }

  if (action === "select-chat") {
    state.activeChatId = target.dataset.id;
    state.selected = { type: "chat", id: state.activeChatId };
    state.route = "campus";
    render();
    return true;
  }

  if (action === "send-chat-image") {
    if (!ensureCanInteract()) return true;
    state.activeChatId = target.dataset.id;
    db.campusMessages.push({
      id: `msg-${Date.now()}`,
      roomId: state.activeChatId,
      from: currentUser().id,
      type: "image",
      body: assets.community,
      caption: "发送了一张校园图片",
      createdAt: "刚刚"
    });
    state.selected = { type: "chat", id: state.activeChatId };
    toast("图片已发送。");
    render();
    return true;
  }

  if (action === "send-chat-voice") {
    if (!ensureCanInteract()) return true;
    state.activeChatId = target.dataset.id;
    db.campusMessages.push({
      id: `msg-${Date.now()}`,
      roomId: state.activeChatId,
      from: currentUser().id,
      type: "voice",
      body: "语音消息 00:12",
      createdAt: "刚刚"
    });
    state.selected = { type: "chat", id: state.activeChatId };
    toast("语音消息已发送。");
    render();
    return true;
  }

  if (action === "start-voice-call") {
    if (!ensureCanInteract()) return true;
    state.voiceCall = target.dataset.id;
    state.activeChatId = target.dataset.id;
    state.selected = { type: "chat", id: state.activeChatId };
    toast(`正在呼叫 ${userById(state.activeChatId).name}。`);
    renderDetail();
    return true;
  }

  if (action === "end-voice-call") {
    const friendId = target.dataset.id;
    state.voiceCall = null;
    state.activeChatId = friendId;
    db.campusMessages.push({
      id: `msg-${Date.now()}`,
      roomId: friendId,
      from: currentUser().id,
      type: "voice",
      body: "语音通话 00:23",
      createdAt: "刚刚"
    });
    state.selected = { type: "chat", id: friendId };
    toast("语音通话已结束。");
    render();
    return true;
  }

  if (action === "toggle-chapter") {
    const chapter = db.chapters.find((item) => item.id === target.dataset.id);
    chapter.open = !chapter.open;
    render();
    return true;
  }

  if (action === "toggle-all-tree") {
    const shouldOpen = db.chapters.some((chapter) => !chapter.open);
    db.chapters.forEach((chapter) => { chapter.open = shouldOpen; });
    render();
    return true;
  }

  if (action === "complete-point") {
    if (runtime.useApi) {
      try {
        await syncAfterMutation(await apiRequest(`/api/points/${target.dataset.id}/completion`, { method: "POST" }));
        return true;
      } catch (error) {
        toast(error.message);
        return true;
      }
    }
    const point = pointById(target.dataset.id);
    point.completed = !point.completed;
    const user = currentUser();
    user.progressDone = Math.min(user.progressTotal, Math.max(0, user.progressDone + (point.completed ? 1 : -1)));
    toast(point.completed ? "已标记为完成。" : "已取消完成标记。");
    render();
    return true;
  }

  if (["like-note", "like-post", "save-item", "report-item"].includes(action)) {
    if (!ensureCanInteract()) return true;
    const type = target.dataset.type || (action.includes("note") ? "note" : "post");
    const item = type === "note" ? noteById(target.dataset.id) : postById(target.dataset.id);
    const user = currentUser();

    if (runtime.useApi) {
      try {
        if (action === "like-note" || action === "like-post") {
          await syncAfterMutation(await apiRequest("/api/reactions/like", {
            method: "POST",
            body: JSON.stringify({ targetType: type, targetId: item.id })
          }));
          return true;
        }
        if (action === "save-item") {
          await syncAfterMutation(await apiRequest("/api/reactions/collection", {
            method: "POST",
            body: JSON.stringify({ targetType: type, targetId: item.id })
          }));
          return true;
        }
        if (action === "report-item") {
          await syncAfterMutation(await apiRequest("/api/reports", {
            method: "POST",
            body: JSON.stringify({ targetType: type, targetId: item.id })
          }));
          return true;
        }
      } catch (error) {
        toast(error.message);
        return true;
      }
    }

    if (action === "like-note" || action === "like-post") {
      if (user.likes.includes(item.id)) {
        user.likes = user.likes.filter((id) => id !== item.id);
        item.likes = Math.max(0, item.likes - 1);
        toast("已取消点赞。");
      } else {
        user.likes.push(item.id);
        item.likes += 1;
        toast("已点赞。");
      }
    }

    if (action === "save-item") {
      if (user.collections.includes(item.id)) {
        user.collections = user.collections.filter((id) => id !== item.id);
        toast("已取消收藏。");
      } else {
        user.collections.push(item.id);
        toast("已收藏到个人中心。");
      }
    }

    if (action === "report-item") {
      const id = `audit-${Date.now()}`;
      db.auditQueue.unshift({
        id,
        type: "举报处理",
        targetType: type,
        targetId: item.id,
        title: item.title,
        status: "已自动隐藏",
        reason: `${currentUser().name} 举报了该内容，等待管理员处理。`
      });
      item.status = "已自动隐藏";
      toast("举报已提交，内容进入后台待处理。");
    }

    render();
    return true;
  }

  if (action === "toggle-privacy") {
    state.masked = !state.masked;
    render();
    return true;
  }

  if (action === "approve-audit" || action === "reject-audit" || action === "delete-audit") {
    if (currentUser().role !== "admin") return toast("只有管理员可以处理审核。"), true;
    if (runtime.useApi) {
      const actionMap = {
        "approve-audit": "approve",
        "reject-audit": "reject",
        "delete-audit": "delete"
      };
      try {
        await syncAfterMutation(await apiRequest(`/api/audit/${target.dataset.id}`, {
          method: "POST",
          body: JSON.stringify({ action: actionMap[action] })
        }));
        state.selected = db.auditQueue[0] ? { type: "audit", id: db.auditQueue[0].id } : { type: "note", id: db.notes[0].id };
        render();
        return true;
      } catch (error) {
        toast(error.message);
        return true;
      }
    }
    const item = auditById(target.dataset.id);
    if (!item) return true;
    const targetItem = item.targetType === "note" ? noteById(item.targetId) : item.targetType === "post" ? postById(item.targetId) : pointById(item.targetId);

    if (action === "approve-audit") {
      if (targetItem?.status) targetItem.status = item.type === "举报处理" ? "讨论中" : "已发布";
      item.status = item.type === "纠错反馈" ? "已采纳" : "已通过";
      db.systemLogs.unshift(`管理员通过：${item.title}`);
      toast("已通过并记录处理结果。");
    }
    if (action === "reject-audit") {
      if (targetItem?.status) targetItem.status = "已驳回";
      item.status = "已驳回";
      db.systemLogs.unshift(`管理员驳回：${item.title}`);
      toast("已驳回，作者可看到处理原因。");
    }
    if (action === "delete-audit") {
      if (targetItem?.status) targetItem.status = "已删除";
      item.status = "已删除";
      db.systemLogs.unshift(`管理员删除：${item.title}`);
      toast("已删除并记录原因。");
    }
    db.auditQueue = db.auditQueue.filter((entry) => entry.id !== item.id);
    state.selected = db.auditQueue[0] ? { type: "audit", id: db.auditQueue[0].id } : { type: "note", id: db.notes[0].id };
    render();
    return true;
  }

  if (action === "quality-note") {
    if (runtime.useApi) {
      try {
        await syncAfterMutation(await apiRequest(`/api/notes/${target.dataset.id}/quality`, { method: "POST" }));
        return true;
      } catch (error) {
        toast(error.message);
        return true;
      }
    }
    const note = noteById(target.dataset.id);
    note.quality = !note.quality;
    note.status = "已发布";
    toast(note.quality ? "已设为优质笔记。" : "已取消优质标记。");
    render();
    return true;
  }

  if (action === "toggle-ban") {
    if (runtime.useApi) {
      try {
        await syncAfterMutation(await apiRequest(`/api/users/${target.dataset.id}/ban`, { method: "POST" }));
        return true;
      } catch (error) {
        toast(error.message);
        return true;
      }
    }
    const user = db.users.find((item) => item.id === target.dataset.id);
    user.banned = !user.banned;
    db.systemLogs.unshift(`管理员${user.banned ? "封禁" : "解封"}：${user.name}`);
    toast(user.banned ? "用户已封禁。" : "用户已解封。");
    render();
    return true;
  }

  return false;
}

function bindHoverLight() {
  $$(".glass-panel, .card, .mini-card, .note-card, .list-row, .tree-node").forEach((el) => {
    if (el.dataset.lightBound) return;
    el.dataset.lightBound = "true";
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

function bindLogoutButtons(root = document) {
  $$("[data-action='logout']", root).forEach((button) => {
    if (button.dataset.logoutBound) return;
    button.dataset.logoutBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      logout();
    });
  });
}

function bindEvents() {
  bindLogoutButtons();

  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    if (actionTarget) {
      handleAction(actionTarget);
      return;
    }

    const modalTarget = event.target.closest("[data-modal]");
    if (modalTarget) {
      openModal(modalTarget.dataset.modal);
      return;
    }

    const setTarget = event.target.closest("[data-set]");
    if (setTarget) {
      state[setTarget.dataset.set] = setTarget.dataset.value;
      render();
      return;
    }

    const routeTarget = event.target.closest("[data-route]");
    if (routeTarget) {
      setRoute(routeTarget.dataset.route);
      return;
    }

    const detailTarget = event.target.closest("[data-detail-type][data-detail-id]");
    if (detailTarget) {
      state.selected = { type: detailTarget.dataset.detailType, id: detailTarget.dataset.detailId };
      if (state.route === "knowledge" && detailTarget.dataset.detailType === "point") {
        render();
      } else {
        setSelected(detailTarget.dataset.detailType, detailTarget.dataset.detailId);
      }
      return;
    }

    if (event.target.matches("[data-modal-layer]")) closeModal();
  });

  document.addEventListener("submit", handleForm);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.modal) closeModal();
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-detail-type][data-detail-id]")) {
      event.preventDefault();
      setSelected(event.target.dataset.detailType, event.target.dataset.detailId);
    }
  });

  $("#globalSearch").addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
    if (state.query) {
      const hit = allSearchable().find(textMatches);
      if (hit) {
        if (hit.facts) state.selected = { type: "point", id: hit.id };
        else if (hit.pointId) state.selected = { type: "note", id: hit.id };
        else if (hit.type === "question" || hit.type === "experience") state.selected = { type: "post", id: hit.id };
        else if (hit.authorId || hit.phone) {
          state.route = "campus";
          if (hit.phone) state.friendQuery = hit.phone;
        }
      }
      renderDetail();
    }
  });
}

async function initApp() {
  bindEvents();
  if (runtime.authenticated && state.user) {
    await refreshFromApi({ silent: true });
    setAuthenticated(true);
    render();
  } else {
    setAuthenticated(false);
  }
  renderIcons();
}

initApp();
