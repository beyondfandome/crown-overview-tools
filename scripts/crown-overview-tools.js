(() => {
  const MODULE_ID = "crown-overview-tools";
  const MODULE_VERSION = "0.3.0";
  const FLAG_SCOPE = "world";
  const WORLD_TILE_KEY = "worldTile";
  const WORLD_PIECE_KEY = "worldPiece";
  const HOUSE_KEY = "houseData";
  const ROUND_CLOCK_KEY = "worldRoundClock";
  const SCENE_MODE_KEY = "overviewMapMode";
  const WORLD_MAP_FOLDER_NAME = "World Map Folder";

  const ALLOWED_SCENE_NAMES = ["Crown of Ashes", "Crown of Ashes (Copy)"];
  const DATE_BANNER_ID = "coa-world-date-banner";
  const PANEL_ID = "coa-overview-panel";
  const PANEL_POSITION_KEY = "COA_OVERVIEW_PANEL_POSITION_V1";
  const HOVER_TOOLTIP_ID = "world-tile-hover-tooltip";
  const ROUTE_TOOLTIP_ID = "coa-route-tooltip";
  const ROUTE_TOOLTIP_KEY = "COA_WORLD_ROUTE_TOOLTIP";
  const PIECE_TOOLTIP_ID = "coa-world-piece-tooltip";
  const PIECE_TOOLTIP_KEY = "COA_WORLD_PIECE_TOOLTIP";
  const CLICK_MOVE_KEY = "COA_WORLD_CLICK_MOVE";
  const HOVER_KEY = "COA_WORLD_TILE_HOVER";
  const VISIBILITY_KEY = "COA_WORLD_TILE_VISIBILITY";
  const VISIBILITY_DIMMER_KEY = "COA_WORLD_TILE_VISIBILITY_DIMMER";
  const LINK_VIEWER_KEY = "COA_WORLD_TILE_LINK_VIEWER";
  const BUILD_LEDGER_KEY = "worldBuildLedger";
  const ECONOMY_LEDGER_KEY = "worldEconomyLedger";
  const MARKET_FORCES_KEY = "worldMarketForces";
  const PENDING_BUILD_STATUS_PENDING = "pending";
  const PENDING_BUILD_STATUS_APPLIED = "applied";
  const PENDING_BUILD_STATUS_FAILED = "failed";
  const SOCKET_NAME = `module.${MODULE_ID}`;

  const DEFAULT_IMAGES = {
    character: "icons/svg/mystery-man.svg",
    army: "icons/svg/sword.svg",
    fleet: "icons/svg/anchor.svg",
    dragon: "icons/svg/wing.svg"
  };

  const ROUND_ORDER = [
    { season: "Spring", round: 1 },
    { season: "Spring", round: 2 },
    { season: "Summer", round: 1 },
    { season: "Summer", round: 2 },
    { season: "Fall", round: 1 },
    { season: "Fall", round: 2 },
    { season: "Winter", round: 1 },
    { season: "Winter", round: 2 }
  ];

  const DEVELOPMENT_LEVELS = {
    0: { label: "Ruins", minPopulation: 0, maxPopulation: 4999 },
    1: { label: "Village", minPopulation: 5000, maxPopulation: 9999 },
    2: { label: "Holdfast", minPopulation: 10000, maxPopulation: 14999 },
    3: { label: "Town", minPopulation: 15000, maxPopulation: 24999 },
    4: { label: "City", minPopulation: 25000, maxPopulation: 34999 }
  };

  const CULTURES = ["First Men", "Andal", "Ironborn", "Rhoynar", "Valyrian", "Free Folk", "Other"];
  const BUILDINGS = [
    "Great Hall", "Keep", "Barracks", "Stable", "Smithy", "Market", "Temple", "Shipyard",
    "Whaling Dock", "Smokehouse", "Workshop", "Granary", "Mill", "Watchtower", "Harbor"
  ];

  const DEFAULT_RESOURCE_NAMES = ["Gold", "Grain", "Wood", "Stone", "Iron", "Wool", "Fish", "Horses"];

  // Costs are intentionally light/default. A tile only enforces costs once its economy is enabled
  // by Manage Tile Economy or CSV import. This keeps existing playtest tiles backwards compatible.
  const BUILDING_RULES = {
    "Great Hall": { cost: { Gold: 4 }, income: { Gold: 1 } },
    "Keep": { cost: { Gold: 5, Stone: 1 }, income: { Gold: 1 } },
    "Barracks": { cost: { Gold: 3, Wood: 1 }, income: {} },
    "Stable": { cost: { Gold: 3, Wood: 1 }, income: { Horses: 1 } },
    "Smithy": { cost: { Gold: 3, Iron: 1 }, income: { Gold: 1, Iron: 1 } },
    "Market": { cost: { Gold: 4 }, income: { Gold: 2 } },
    "Temple": { cost: { Gold: 3, Stone: 1 }, income: { Gold: 1 } },
    "Shipyard": { cost: { Gold: 4, Wood: 2 }, income: { Wood: 1 } },
    "Whaling Dock": { cost: { Gold: 3, Wood: 1 }, income: { Fish: 2, Gold: 1 } },
    "Smokehouse": { cost: { Gold: 2, Wood: 1 }, income: { Fish: 1 } },
    "Workshop": { cost: { Gold: 3, Wood: 1 }, income: { Gold: 1 } },
    "Granary": { cost: { Gold: 2, Wood: 1 }, income: { Grain: 2 } },
    "Mill": { cost: { Gold: 2, Wood: 1 }, income: { Grain: 1, Gold: 1 } },
    "Watchtower": { cost: { Gold: 2, Wood: 1 }, income: {} },
    "Harbor": { cost: { Gold: 5, Wood: 2 }, income: { Gold: 2, Fish: 1 } }
  };

  const SEASON_INCOME_MULTIPLIERS = {
    Spring: 1,
    Summer: 1,
    Fall: 1,
    Winter: 0.5
  };

  const TRADE_GOODS = [
    {
        "category": "Grains & Field Crops",
        "name": "Barley",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Buckwheat",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Oat",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Rye",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Wheat",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Blueberries",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Green Apples",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Pears",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Plums",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Pumpkins",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Red Apples",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Cantaloupes",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Grapes",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Lemons",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Olives",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Peaches",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Peppers",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Watermelons",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Fireplums",
        "goldValue": 3,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Spicy Peppers",
        "goldValue": 3,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Cattle",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Chickens",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Ducks",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Geese",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Goats",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Pigs",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Sheep",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Bracken Browns",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Highland Cows",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Honeybees",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Pack Horses",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Westerland Golds",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Sand Steed",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Snow Steeds",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Vale Greys",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Boar",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Deer",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Elk",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Hides",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Small Game",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Bear Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Falcons",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Fox Furs",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Hunting Hounds",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Marten Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Otter Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Ravens",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Wolf Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Exotic Birds",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Game & Animal Products",
        "name": "Pale Hide",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Unicorns",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Unicorn Horn",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Catfish",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Cod",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "River Pike",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "River Trout",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Crab",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Fermented Crab",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Seals",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Tuna",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Turtles",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Whale Oil",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Pearls",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Bog Iron",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Lead",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Bronze",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Copper",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Iron",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Tin",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Gold",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Silver",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Clay",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Sandstone",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Stone",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Cut Stone",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Granite",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Ice",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Salt",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Sulfur",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Amber",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Jewels",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Marble",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Beech",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Peat",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Reeds",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Ash",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Oak",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Ironwood",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Candles",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Fertilizer",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Dyes",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Glass",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Goosefeather Arrows",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Paper",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Yew Bows",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Obsidian Blades",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Poison",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Weirwood Bows",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Trade & Industry",
        "name": "Ale",
        "goldValue": 1,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Cider",
        "goldValue": 1,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Whiskey",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Wine",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Dornish Red",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Eyrie Purple (Wine)",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Tradeports",
        "goldValue": 3,
        "foodValue": 0
    }
];

  const TRADE_GOOD_CATEGORIES = Array.from(new Set(TRADE_GOODS.map(good => good.category)));

  const DEVELOPMENT_ECONOMY_BONUSES = {
    0: { label: "Ruins", gold: 0, food: 1 },
    1: { label: "Hamlet / Village", gold: 3, food: 2 },
    2: { label: "Holdfast", gold: 4, food: 2 },
    3: { label: "Town", gold: 6, food: 1 },
    4: { label: "City", gold: 9, food: -1 }
  };

  const BUILDING_TREE_DEFINITIONS = {
    economy: {
      maxLevel: 3,
      notes: "Category buildings can be built anywhere, but perform better when the tile has a matching trade good.",
      categories: TRADE_GOOD_CATEGORIES
    },
    road: { maxLevel: 1, movementModifierPerLevel: -0.5, notes: "Roads reduce movement cost by 0.5 and do not upgrade twice." },
    military: { maxLevel: 3, lines: ["Barracks", "Archery Range", "Stable", "Siege Workshop"], notes: "Future hook: converts base mob into trained soldiers." },
    musteringGrounds: { maxLevel: 3, baseManpower: 1000, manpowerPerLevel: 500, upkeep: { Gold: 1, Food: 1 } },
    influence: { maxLevel: 3, lines: ["Sept", "Godswood", "Festival Square", "School"], notes: "Future hook: influence income, holy mercenaries, weddings, tourneys, and stat upgrades." },
    fortification: { maxLevel: 3, movementCostIncreasePerLevel: 0.5, quickSiegeDcIncreasePerLevel: 2 }
  };


  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function titleCase(value) {
    const text = String(value || "").trim();
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  function isOverviewScene(scene = canvas?.scene) {
    if (!scene) return false;
    const explicit = scene.getFlag?.(FLAG_SCOPE, SCENE_MODE_KEY);
    if (explicit === true || explicit === "overview" || explicit === "world" || explicit === "on") return true;
    if (explicit === false || explicit === "off") return false;
    return ALLOWED_SCENE_NAMES.includes(scene.name);
  }

  function requireOverviewScene() {
    if (isOverviewScene()) return true;
    ui.notifications.warn("Crown Overview Tools only runs on Crown of Ashes overview scenes.");
    return false;
  }

  function getWorldTile(drawing) {
    return drawing?.document?.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
  }

  function getHouseData(drawing) {
    return drawing?.document?.getFlag(FLAG_SCOPE, HOUSE_KEY);
  }

  function getWorldPiece(token) {
    return token?.document?.getFlag(FLAG_SCOPE, WORLD_PIECE_KEY);
  }

  function getTileId(entry) {
    return entry?.tile?.id || entry?.drawing?.document?.id;
  }

  function getTileName(entry) {
    return entry?.tile?.name || entry?.drawing?.document?.name || getTileId(entry) || "Unnamed Tile";
  }

  function normalizeShapeType(type) {
    const value = normalize(type);
    if (value === "r" || value.includes("rect")) return "rectangle";
    if (value === "e" || value.includes("ellipse") || value.includes("circle")) return "ellipse";
    if (value === "p" || value.includes("poly")) return "polygon";
    if (value === "f" || value.includes("free")) return "freehand";
    return value;
  }

  function normalizePoints(rawPoints) {
    if (!Array.isArray(rawPoints) || !rawPoints.length) return [];
    if (typeof rawPoints[0] === "number") {
      const points = [];
      for (let i = 0; i < rawPoints.length - 1; i += 2) {
        points.push({ x: Number(rawPoints[i] || 0), y: Number(rawPoints[i + 1] || 0) });
      }
      return points;
    }
    return rawPoints.map(point => ({ x: Number(point.x || 0), y: Number(point.y || 0) }));
  }

  function getDrawingLocalPoint(point, drawing) {
    const doc = drawing.document;
    return { x: point.x - Number(doc.x || 0), y: point.y - Number(doc.y || 0) };
  }

  function pointInRectangle(localPoint, shape) {
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    return localPoint.x >= 0 && localPoint.y >= 0 && localPoint.x <= width && localPoint.y <= height;
  }

  function pointInEllipse(localPoint, shape) {
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    if (width <= 0 || height <= 0) return false;
    const rx = width / 2;
    const ry = height / 2;
    const dx = (localPoint.x - rx) / rx;
    const dy = (localPoint.y - ry) / ry;
    return dx * dx + dy * dy <= 1;
  }

  function pointInPolygon(localPoint, points) {
    if (!points || points.length < 3) return false;
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x;
      const yi = points[i].y;
      const xj = points[j].x;
      const yj = points[j].y;
      const intersects = yi > localPoint.y !== yj > localPoint.y &&
        localPoint.x < ((xj - xi) * (localPoint.y - yi)) / ((yj - yi) || 0.000001) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function pointInsideDrawing(point, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    const localPoint = getDrawingLocalPoint(point, drawing);
    if (shapeType === "rectangle") return pointInRectangle(localPoint, shape);
    if (shapeType === "ellipse") return pointInEllipse(localPoint, shape);
    if (shapeType === "polygon" || shapeType === "freehand") {
      const points = normalizePoints(shape.points || doc.points || []);
      return pointInPolygon(localPoint, points);
    }
    return pointInRectangle(localPoint, shape);
  }

  function getWorldTileEntries() {
    return canvas.drawings.placeables
      .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
      .filter(entry => Boolean(entry.tile));
  }

  function getEntryById(id) {
    return getWorldTileEntries().find(entry => getTileId(entry) === id || entry.drawing.document.id === id) || null;
  }

  function getTileById(tileId) {
    return getEntryById(tileId);
  }

  function getMouseWorldPoint() {
    try {
      const mouse = canvas?.app?.renderer?.plugins?.interaction?.mouse?.global || canvas?.app?.renderer?.events?.pointer?.global;
      if (!mouse) return null;
      const point = new PIXI.Point(mouse.x, mouse.y);
      return canvas.stage.worldTransform.applyInverse(point);
    } catch (err) {
      return null;
    }
  }

  function findTileAtPoint(point) {
    if (!point) return null;
    const candidates = getWorldTileEntries()
      .filter(entry => pointInsideDrawing(point, entry.drawing))
      .sort((a, b) => {
        const ap = Number(a.tile.priority || 0);
        const bp = Number(b.tile.priority || 0);
        if (bp !== ap) return bp - ap;
        return Number(b.drawing.document.sort || 0) - Number(a.drawing.document.sort || 0);
      });
    return candidates[0] || null;
  }

  function getDrawingCenter(drawingOrEntry) {
    const drawing = drawingOrEntry.drawing || drawingOrEntry;
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    if (shapeType === "polygon" || shapeType === "freehand") {
      const points = normalizePoints(shape.points || doc.points || []);
      if (points.length) {
        const avg = points.reduce((acc, point) => {
          acc.x += point.x;
          acc.y += point.y;
          return acc;
        }, { x: 0, y: 0 });
        return { x: Number(doc.x || 0) + avg.x / points.length, y: Number(doc.y || 0) + avg.y / points.length };
      }
    }
    return { x: Number(doc.x || 0) + Number(shape.width || 0) / 2, y: Number(doc.y || 0) + Number(shape.height || 0) / 2 };
  }

  function getGridSize() {
    return Number(canvas.scene?.grid?.size || 100);
  }

  function getTokenCenter(token) {
    if (token.center) return { x: token.center.x, y: token.center.y };
    const gridSize = getGridSize();
    return {
      x: Number(token.document.x || 0) + (Number(token.document.width || 1) * gridSize) / 2,
      y: Number(token.document.y || 0) + (Number(token.document.height || 1) * gridSize) / 2
    };
  }

  function getTokenTopLeftForPoint(token, point) {
    const gridSize = getGridSize();
    const width = Number(token.document.width || 1) * gridSize;
    const height = Number(token.document.height || 1) * gridSize;
    return { x: point.x - width / 2, y: point.y - height / 2 };
  }

  function getTileType(tile) {
    const explicit = normalize(tile?.tileType);
    if (["land", "sea", "port", "mixed"].includes(explicit)) return explicit;
    const terrain = normalize(tile?.terrainKey || tile?.terrainLabel);
    if (terrain === "sea" || terrain.includes("sea")) return "sea";
    if (terrain === "port" || terrain.includes("port") || terrain.includes("coastal")) return "port";
    return "land";
  }

  function isSeaTile(tile) { return getTileType(tile) === "sea"; }
  function isPortLike(tile) { const type = getTileType(tile); return type === "port" || type === "mixed"; }
  function isSeaLike(tile) { return getTileType(tile) === "sea"; }
  function isLandLike(tile) { const type = getTileType(tile); return type === "land" || type === "port" || type === "mixed"; }
  function isActivePort(tile) { return tile?.portActive === true || getTileType(tile) === "port"; }

  function getAllowedTileTypes(pieceType) {
    const type = normalize(pieceType || "army");
    if (type === "fleet") return ["sea", "port"];
    if (type === "dragon") return ["land", "sea", "port", "mixed"];
    return ["land", "port", "mixed"];
  }

  function isTileAllowedForPiece(piece, tile) {
    if (!piece || !tile) return false;
    const type = getTileType(tile);
    const pieceType = normalize(piece.pieceType || "army");
    if (pieceType === "dragon") return true;
    if (pieceType === "fleet") return type === "sea" || type === "port";
    if (pieceType === "army" || pieceType === "character") return type === "land" || type === "port" || type === "mixed";
    const allowed = Array.isArray(piece.allowedTileTypes) ? piece.allowedTileTypes : ["land", "port", "mixed"];
    return allowed.map(normalize).includes(type);
  }

  function isTileAllowedForRoute(piece, tile, routeMode, startTile, endTile) {
    if (!piece || !tile) return false;
    if (!isTileAllowedForPiece(piece, tile)) return false;
    const type = getTileType(tile);
    const pieceType = normalize(piece.pieceType || "army");
    if (pieceType === "dragon") return true;
    if (pieceType === "fleet") return type === "sea" || type === "port";
    if (routeMode === "land") return isLandLike(tile);
    if (routeMode === "sea") {
      const startValid = isPortLike(startTile) || isSeaLike(startTile);
      const endValid = isPortLike(endTile) || isSeaLike(endTile);
      if (!startValid || !endValid) return false;
      return type === "sea" || type === "port" || type === "mixed";
    }
    return isTileAllowedForPiece(piece, tile);
  }

  function getTileMovementCost(tile) {
    const cost = Number(tile?.movementCost ?? 1);
    return Number.isFinite(cost) ? Math.max(0, cost) : 1;
  }

  function findPath(startTile, endTile, piece, routeMode) {
    if (!startTile || !endTile) return null;
    if (!isTileAllowedForRoute(piece, endTile, routeMode, startTile, endTile)) return null;
    if (startTile.id === endTile.id) return { mode: routeMode, cost: 0, tileIds: [startTile.id], tileNames: [startTile.name] };

    const entries = getWorldTileEntries();
    const byId = new Map(entries.map(entry => [entry.tile.id, entry.tile]));
    const distances = new Map([[startTile.id, 0]]);
    const previous = new Map();
    const visited = new Set();

    while (true) {
      let currentId = null;
      let currentDistance = Infinity;
      for (const [tileId, distance] of distances.entries()) {
        if (visited.has(tileId)) continue;
        if (distance < currentDistance) {
          currentDistance = distance;
          currentId = tileId;
        }
      }
      if (!currentId) break;
      if (currentId === endTile.id) break;
      visited.add(currentId);
      const currentTile = byId.get(currentId);
      if (!currentTile) continue;
      const adjacentIds = Array.isArray(currentTile.adjacentTileIds) ? currentTile.adjacentTileIds : [];
      for (const nextId of adjacentIds) {
        const nextTile = byId.get(nextId);
        if (!nextTile) continue;
        if (!isTileAllowedForRoute(piece, nextTile, routeMode, startTile, endTile)) continue;
        const candidateDistance = currentDistance + getTileMovementCost(nextTile);
        if (!distances.has(nextId) || candidateDistance < distances.get(nextId)) {
          distances.set(nextId, candidateDistance);
          previous.set(nextId, currentId);
        }
      }
    }

    if (!distances.has(endTile.id)) return null;
    const tileIds = [];
    let cursor = endTile.id;
    while (cursor) {
      tileIds.unshift(cursor);
      if (cursor === startTile.id) break;
      cursor = previous.get(cursor);
    }
    const tileNames = tileIds.map(id => byId.get(id)?.name || id);
    return { mode: routeMode, cost: distances.get(endTile.id), tileIds, tileNames };
  }

  function findBestPath(startTile, endTile, piece) {
    const options = [
      findPath(startTile, endTile, piece, "land"),
      findPath(startTile, endTile, piece, "sea"),
      findPath(startTile, endTile, piece, "default")
    ].filter(Boolean);
    if (!options.length) return null;
    options.sort((a, b) => {
      if (a.cost !== b.cost) return a.cost - b.cost;
      const priority = { sea: 1, land: 2, default: 3 };
      return (priority[a.mode] || 99) - (priority[b.mode] || 99);
    });
    return options[0];
  }

  function getMovementRemaining(piece) {
    return Math.max(0, Number(piece.movementMax ?? 0) - Number(piece.movementUsed ?? 0));
  }

  function routeModeLabel(mode) {
    if (mode === "land") return "Land Route";
    if (mode === "sea") return "Sea / Port Route";
    if (mode === "best") return "Best Available Route";
    if (mode === "default") return "Piece Default Route";
    if (mode === "crossing") return "Port Crossing";
    return mode;
  }

  function getRegionName(tile) {
    return String(tile?.region ?? "").trim() || "Unassigned";
  }

  function getRegions() {
    return Array.from(new Set(getWorldTileEntries().map(entry => getRegionName(entry.tile)))).sort((a, b) => a.localeCompare(b));
  }

  function getTilesInRegion(region) {
    return getWorldTileEntries()
      .filter(entry => getRegionName(entry.tile) === region)
      .sort((a, b) => String(a.tile.name || "").localeCompare(String(b.tile.name || "")));
  }

  function getLegalTilesInRegion(region, piece) {
    return getTilesInRegion(region).filter(entry => isTileAllowedForPiece(piece, entry.tile));
  }

  function randomPopulation(level) {
    const data = DEVELOPMENT_LEVELS[level];
    if (!data) return 0;
    return Math.floor(Math.random() * (data.maxPopulation - data.minPopulation + 1)) + data.minPopulation;
  }

  function cleanNumber(value) {
    const text = String(value ?? "").replaceAll(",", "").trim();
    if (text === "") return "";
    const number = Number(text);
    return Number.isNaN(number) ? "" : number;
  }

  function splitList(value) {
    const text = String(value ?? "").trim();
    if (!text) return [];
    return text.split(";").map(item => item.trim()).filter(Boolean);
  }

  function csvEscape(value) {
    if (value === null || value === undefined) return '""';
    return '"' + String(value).replaceAll('"', '""') + '"';
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"') {
        if (insideQuotes && next === '"') { cell += '"'; i++; }
        else insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        row.push(cell); cell = "";
      } else if ((char === "\n" || char === "\r") && !insideQuotes) {
        if (char === "\r" && next === "\n") i++;
        row.push(cell);
        if (row.some(value => value !== "")) rows.push(row);
        row = []; cell = "";
      } else {
        cell += char;
      }
    }
    if (cell !== "" || row.length) {
      row.push(cell);
      if (row.some(value => value !== "")) rows.push(row);
    }
    return rows;
  }

  function safeFilename(value) {
    return String(value ?? "World_Map").replace(/[^a-z0-9_-]/gi, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  }

  function getClock() {
    return canvas.scene?.getFlag(FLAG_SCOPE, ROUND_CLOCK_KEY) ?? null;
  }

  function getDefaultClock() {
    return { year: 100, roundIndex: 0, season: "Spring", round: 1, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function getDateLabel(clock) {
    if (!clock) return "Date Not Initialized";
    return `${clock.season ?? "Spring"} ${Number(clock.round ?? 1)}, ${Number(clock.year ?? 100)} AF`;
  }

  async function saveClock(clock) {
    clock.version = MODULE_VERSION;
    clock.updatedAt = new Date().toISOString();
    clock.updatedBy = game.user.name;
    await canvas.scene.setFlag(FLAG_SCOPE, ROUND_CLOCK_KEY, clock);
    updateDateBanner();
  }

  function advanceClockData(clock) {
    let nextIndex = Number(clock.roundIndex ?? 0) + 1;
    let nextYear = Number(clock.year ?? 100);
    if (nextIndex >= ROUND_ORDER.length) { nextIndex = 0; nextYear++; }
    const nextRound = ROUND_ORDER[nextIndex];
    return { year: nextYear, roundIndex: nextIndex, season: nextRound.season, round: nextRound.round, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function getOrCreateDateBanner() {
    let banner = document.getElementById(DATE_BANNER_ID);
    if (banner) return banner;
    banner = document.createElement("div");
    banner.id = DATE_BANNER_ID;
    banner.style.position = "fixed";
    banner.style.top = "8px";
    banner.style.left = "50%";
    banner.style.transform = "translateX(-50%)";
    banner.style.zIndex = "1000000";
    banner.style.padding = "8px 24px 10px 24px";
    banner.style.minWidth = "220px";
    banner.style.textAlign = "center";
    banner.style.fontSize = "18px";
    banner.style.fontWeight = "bold";
    banner.style.letterSpacing = "0.5px";
    banner.style.color = "#f2e4c4";
    banner.style.background = "rgba(35, 24, 18, 0.94)";
    banner.style.border = "2px solid rgba(180, 145, 90, 0.9)";
    banner.style.borderTop = "none";
    banner.style.borderRadius = "0 0 10px 10px";
    banner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.55)";
    banner.style.textShadow = "0 1px 2px rgba(0,0,0,0.8)";
    banner.style.pointerEvents = "none";

    for (const side of ["left", "right"]) {
      const tab = document.createElement("div");
      tab.style.position = "absolute";
      tab.style.top = "-8px";
      tab.style[side] = "24px";
      tab.style.width = "12px";
      tab.style.height = "12px";
      tab.style.background = "rgba(120, 85, 50, 0.95)";
      tab.style.borderRadius = "2px";
      banner.appendChild(tab);
    }

    const text = document.createElement("div");
    text.className = "coa-world-date-text";
    banner.appendChild(text);
    document.body.appendChild(banner);
    return banner;
  }

  function updateDateBanner() {
    if (!isOverviewScene()) return;
    const banner = getOrCreateDateBanner();
    const text = banner.querySelector(".coa-world-date-text");
    if (text) text.textContent = getDateLabel(getClock());
  }

  function removeDateBanner() {
    document.getElementById(DATE_BANNER_ID)?.remove();
  }

  function getDefaultPanelPosition() {
    return {
      left: 86,
      top: 96
    };
  }

  function loadPanelPosition() {
    const fallback = getDefaultPanelPosition();

    try {
      const raw = localStorage.getItem(PANEL_POSITION_KEY);
      if (!raw) return fallback;

      const parsed = JSON.parse(raw);
      const left = Number(parsed.left);
      const top = Number(parsed.top);

      if (!Number.isFinite(left) || !Number.isFinite(top)) return fallback;

      return {
        left,
        top
      };
    } catch (err) {
      return fallback;
    }
  }

  function savePanelPosition(left, top) {
    try {
      localStorage.setItem(PANEL_POSITION_KEY, JSON.stringify({
        left: Math.round(left),
        top: Math.round(top)
      }));
    } catch (err) {
      console.warn("Crown Overview Tools could not save panel position:", err);
    }
  }

  function clampPanelPosition(panel, position) {
    const margin = 8;
    const width = Number(panel.offsetWidth || 205);
    const height = Number(panel.offsetHeight || 320);

    const maxLeft = Math.max(margin, window.innerWidth - width - margin);
    const maxTop = Math.max(margin, window.innerHeight - height - margin);

    return {
      left: Math.min(Math.max(Number(position.left || 0), margin), maxLeft),
      top: Math.min(Math.max(Number(position.top || 0), margin), maxTop)
    };
  }

  function applyPanelPosition(panel) {
    const position = clampPanelPosition(panel, loadPanelPosition());
    panel.style.left = `${position.left}px`;
    panel.style.top = `${position.top}px`;
  }

  function resetPanelPosition(panel) {
    const position = getDefaultPanelPosition();
    savePanelPosition(position.left, position.top);
    applyPanelPosition(panel);
    ui.notifications.info("Crown Overview panel position reset.");
  }

  function makePanelDraggable(panel) {
    if (!panel) return;

    const handle = panel.querySelector(".coa-panel-drag-handle");
    if (!handle) return;

    let dragging = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let startLeft = 0;
    let startTop = 0;

    function onMouseMove(event) {
      if (!dragging) return;

      event.preventDefault();

      const nextPosition = clampPanelPosition(panel, {
        left: startLeft + event.clientX - startMouseX,
        top: startTop + event.clientY - startMouseY
      });

      panel.style.left = `${nextPosition.left}px`;
      panel.style.top = `${nextPosition.top}px`;
    }

    function onMouseUp() {
      if (!dragging) return;

      dragging = false;
      panel.classList.remove("coa-dragging");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      savePanelPosition(parseInt(panel.style.left || "0", 10), parseInt(panel.style.top || "0", 10));
    }

    handle.addEventListener("mousedown", event => {
      if (event.button !== 0) return;
      if (event.target?.closest?.("button")) return;

      dragging = true;
      startMouseX = event.clientX;
      startMouseY = event.clientY;
      startLeft = parseInt(panel.style.left || "0", 10) || panel.getBoundingClientRect().left;
      startTop = parseInt(panel.style.top || "0", 10) || panel.getBoundingClientRect().top;

      panel.classList.add("coa-dragging");
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      event.preventDefault();
      event.stopPropagation();
    });

    panel.querySelector("[data-coa-panel-reset]")?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      resetPanelPosition(panel);
    });
  }

  function getOrCreatePanel() {
    let panel = document.getElementById(PANEL_ID);
    if (panel) return panel;
    panel = document.createElement("div");
    panel.id = PANEL_ID;
    document.body.appendChild(panel);
    return panel;
  }

  function renderPanel() {
    if (!isOverviewScene()) { document.getElementById(PANEL_ID)?.remove(); return; }
    const panel = getOrCreatePanel();
    const gmButtons = game.user.isGM ? `
      <div class="coa-panel-section">
        <button data-coa-action="roundClock">Round Clock</button>
        <button data-coa-action="resetMovement">Reset Movement</button>
        <button data-coa-action="resetBuildCapacity">Reset Build Uses</button>
        <button data-coa-action="repairBuildLocks">Repair Build Locks</button>
        <button data-coa-action="processPendingBuilds">Process Pending Builds</button>
        <button data-coa-action="createPiece">Create World Piece</button>
        <button data-coa-action="linkTiles">Link Selected Tiles</button>
        <button data-coa-action="unlinkTiles">Unlink Selected Tiles</button>
        <button data-coa-action="viewLinks">View Tile Links</button>
        <button data-coa-action="togglePort">Make / Edit Port</button>
        <button data-coa-action="assignTileOwner">Assign Tile Owner</button>
        <button data-coa-action="assignPieceOwner">Assign Piece Owner</button>
        <button data-coa-action="editWorldPiece">Edit World Piece</button>
        <button data-coa-action="assignHouse">Assign House Data</button>
        <button data-coa-action="manageTileEconomy">Manage Tile Economy</button>
        <button data-coa-action="manageMarketForces">Manage Market Forces</button>
        <button data-coa-action="collectEconomy">Collect Economy</button>
        <button data-coa-action="repairEconomyData">Repair Economy Data</button>
        <button data-coa-action="importRealm">Import CSV</button>
        <button data-coa-action="exportRealm">Export CSV</button>
        <button data-coa-action="hideTileText">Hide Original Tile Text</button>
      </div>
    ` : "";
    panel.innerHTML = `
      <div class="coa-panel-drag-handle" title="Drag to move this panel">
        <div>
          <h2>Crown Overview</h2>
          <div class="coa-muted">${escapeHtml(canvas.scene?.name || "")}</div>
        </div>
        <button type="button" class="coa-panel-reset" data-coa-panel-reset title="Reset panel position">↺</button>
      </div>
      <div class="coa-panel-section">
        <button data-coa-action="pathMove">Move Piece</button>
        <button data-coa-action="toggleClickMove">Click Move: ${globalThis[CLICK_MOVE_KEY] ? "On" : "Off"}</button>
        <button data-coa-action="toggleRouteTooltip">Route Tooltip: ${globalThis[ROUTE_TOOLTIP_KEY] ? "On" : "Off"}</button>
        <button data-coa-action="togglePieceTooltip">Piece Tooltip: ${globalThis[PIECE_TOOLTIP_KEY] ? "On" : "Off"}</button>
        <button data-coa-action="portCrossing">Port Crossing</button>
        <button data-coa-action="buildOnCurrentTile">Build</button>
        <button data-coa-action="showHoldings">My Holdings</button>
      </div>
      ${gmButtons}
    `;

    applyPanelPosition(panel);
    makePanelDraggable(panel);

    for (const button of panel.querySelectorAll("[data-coa-action]")) {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const action = button.dataset.coaAction;
        try {
          await API[action]?.();
        } catch (err) {
          console.error(`Crown Overview action failed: ${action}`, err);
          ui.notifications.error(`Crown Overview action failed: ${action}. Check console.`);
        }
      });
    }
  }

  function removePanel() {
    document.getElementById(PANEL_ID)?.remove();
  }

  function getOrCreateHoverOverlay() {
    const manager = globalThis[HOVER_KEY];
    if (manager?.overlay) return manager.overlay;
    const overlay = new PIXI.Graphics();
    overlay.name = "coa-world-tile-hover-highlight-overlay";
    overlay.zIndex = 999999;
    overlay.eventMode = "none";
    overlay.interactive = false;
    canvas.stage.sortableChildren = true;
    canvas.stage.addChild(overlay);
    return overlay;
  }

  function getOrCreateHoverTooltip() {
    let el = document.getElementById(HOVER_TOOLTIP_ID);
    if (el) return el;
    el = document.createElement("div");
    el.id = HOVER_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "16px";
    el.style.bottom = "104px";
    el.style.width = "460px";
    el.style.maxWidth = "calc(100vw - 32px)";
    el.style.maxHeight = "calc(100vh - 170px)";
    el.style.overflowY = "auto";
    el.style.zIndex = "100000";
    el.style.padding = "10px 12px";
    el.style.border = "1px solid rgba(255,255,255,0.35)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.92)";
    el.style.color = "#f0f0f0";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.4";
    el.style.pointerEvents = "auto";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.45)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function fitFixedTooltipToViewport(el) {
    if (!el) return;

    const margin = 12;
    const rect = el.getBoundingClientRect();

    if (rect.left < margin) {
      el.style.left = `${margin}px`;
    }

    if (rect.right > window.innerWidth - margin) {
      el.style.left = `${Math.max(margin, window.innerWidth - rect.width - margin)}px`;
    }

    if (rect.top < margin) {
      el.style.top = `${margin}px`;
      el.style.bottom = "auto";
    }
  }

  function hideHoverTooltip() {
    const el = document.getElementById(HOVER_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function isSeaByTile(tile) {
    return isSeaTile(tile) || normalize(tile?.terrainKey) === "sea" || normalize(tile?.terrainLabel) === "sea";
  }

  function showHoverTooltip(entry) {
    const el = getOrCreateHoverTooltip();
    const tile = entry.tile;
    const house = getHouseData(entry.drawing);
    const isSea = isSeaByTile(tile);
    const adjacentNames = Array.isArray(tile.adjacentTileNames) ? tile.adjacentTileNames.join(", ") : "";
    const buildings = !isSea && house && Array.isArray(house.builtBuildings) ? house.builtBuildings.join(", ") : "";
    const tileOwnerName = getTileOwnerUserName(tile, house);

    let html = `<div><strong style="font-size:17px;">${escapeHtml(tile.name || "Unnamed Tile")}</strong>
      <div style="margin-top:6px;">
        <strong>Region:</strong> ${escapeHtml(tile.region || "None")}<br>
        <strong>Type:</strong> ${escapeHtml(tile.tileType || "land")}<br>
        <strong>Terrain:</strong> ${escapeHtml(tile.terrainLabel || tile.terrainKey || "None")}<br>
        <strong>Move Cost:</strong> ${escapeHtml(tile.movementCost ?? 1)}${tileOwnerName ? `<br><strong>Player Owner:</strong> ${escapeHtml(tileOwnerName)}` : ""}
      </div>`;

    if (house) {
      html += `<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.30);">
        <strong style="font-size:16px;">${escapeHtml(house.house || "House Information")}</strong>
        <div style="margin-top:6px;">`;
      if (house.lord) html += `<strong>Ruler:</strong> ${escapeHtml(house.lord)}<br>`;
      if (!isSea && house.culture) html += `<strong>Culture:</strong> ${escapeHtml(house.culture)}<br>`;
      if (!isSea && (house.developmentLabel || house.developmentLevel !== undefined)) {
        html += `<strong>Development:</strong> ${escapeHtml(house.developmentLabel || `Level ${house.developmentLevel}`)}`;
        if (house.developmentLevel !== "" && house.developmentLevel !== undefined && house.developmentLevel !== null) html += ` (${escapeHtml(house.developmentLevel)})`;
        html += `<br>`;
      }
      if (!isSea && house.population !== "" && house.population !== undefined && house.population !== null) {
        const population = Number(house.population);
        html += `<strong>Population:</strong> ${escapeHtml(Number.isNaN(population) ? house.population : population.toLocaleString())}<br>`;
      }
      if (house.treasury !== "" && house.treasury !== undefined && house.treasury !== null) {
        const treasury = Number(house.treasury);
        html += `<strong>Treasury:</strong> ${escapeHtml(Number.isNaN(treasury) ? house.treasury : treasury.toLocaleString())}<br>`;
      }
      if (isEconomyEnabled(house)) {
        html += `<strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(house))}<br>`;
        html += `<strong>Stockpile:</strong> ${escapeHtml(resourceMapToText(getHouseResourceStockpile(house)))}<br>`;
        html += `<strong>Round Income:</strong> ${escapeHtml(resourceMapToText(getTileTotalIncome(house, getClock())))}<br>`;
      }
      if (house.primaryExport || house.exports) html += `<strong>Primary Export:</strong> ${escapeHtml(house.primaryExport || house.exports)}<br>`;
      if (house.secondaryExport) html += `<strong>Secondary Export:</strong> ${escapeHtml(house.secondaryExport)}<br>`;
      if (house.allegiance) html += `<strong>Allegiance:</strong> ${escapeHtml(house.allegiance)}<br>`;
      html += `</div>`;
      if (!isSea && buildings) html += `<div style="margin-top:7px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);"><strong>Buildings:</strong><br><span style="opacity:0.9;">${escapeHtml(buildings)}</span></div>`;
      html += `</div>`;
    }
    if (adjacentNames) {
      const linkedTiles = adjacentNames
        .split(",")
        .map(value => value.trim())
        .filter(Boolean);

      html += `<div style="margin-top:9px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);">
        <strong>Links:</strong>
        <div class="coa-hover-links">
          ${linkedTiles.map(name => `<span>${escapeHtml(name)}</span>`).join("")}
        </div>
      </div>`;
    }

    html += `</div>`;
    el.innerHTML = html;
    el.style.display = "block";
    fitFixedTooltipToViewport(el);
  }

  function drawTileShapeOnGraphics(graphics, drawing, fillColor = 0xffcc33, fillAlpha = 0.18, strokeColor = 0xffcc33, strokeAlpha = 0.95, strokeWidth = 4) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    graphics.lineStyle(strokeWidth, strokeColor, strokeAlpha);
    graphics.beginFill(fillColor, fillAlpha);
    if (shapeType === "rectangle") graphics.drawRect(x, y, width, height);
    else if (shapeType === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      if (points.length >= 3) {
        const flat = [];
        for (const point of points) flat.push(x + point.x, y + point.y);
        graphics.drawPolygon(flat);
      }
    }
    graphics.endFill();
  }

  function drawHoverHighlight(entry) {
    const overlay = getOrCreateHoverOverlay();
    overlay.clear();
    if (!entry) { overlay.visible = false; hideHoverTooltip(); return; }
    overlay.visible = true;
    drawTileShapeOnGraphics(overlay, entry.drawing);
    showHoverTooltip(entry);
  }

  function updateHoverHighlight() {
    if (!isOverviewScene() || !canvas?.ready) return;
    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { drawHoverHighlight(null); return; }
    const entry = findTileAtPoint(mousePoint);
    const manager = globalThis[HOVER_KEY];
    if (!manager) return;
    const currentId = entry?.tile?.id || null;
    if (manager.lastTileId === currentId) return;
    manager.lastTileId = currentId;
    drawHoverHighlight(entry);
  }

  function startHover() {
    stopHover();
    const overlay = getOrCreateHoverOverlay();
    globalThis[HOVER_KEY] = { version: MODULE_VERSION, overlay, interval: setInterval(updateHoverHighlight, 100), lastTileId: null };
    updateHoverHighlight();
  }

  function stopHover() {
    const manager = globalThis[HOVER_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    if (manager?.overlay) { manager.overlay.clear(); manager.overlay.destroy(); }
    document.getElementById(HOVER_TOOLTIP_ID)?.remove();
    globalThis[HOVER_KEY] = null;
  }

  function getOrCreateRouteTooltip() {
    let el = document.getElementById(ROUTE_TOOLTIP_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = ROUTE_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "315px";
    el.style.top = "112px";
    el.style.width = "420px";
    el.style.maxHeight = "calc(100vh - 150px)";
    el.style.overflowY = "auto";
    el.style.zIndex = "100000";
    el.style.padding = "10px";
    el.style.border = "1px solid rgba(180,145,90,0.85)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.94)";
    el.style.color = "#f2e4c4";
    el.style.fontSize = "12px";
    el.style.lineHeight = "1.35";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.55)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function hideRouteTooltip() {
    const el = document.getElementById(ROUTE_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function removeRouteTooltipElement() {
    document.getElementById(ROUTE_TOOLTIP_ID)?.remove();
  }

  function routeTooltipStatusHtml(route, remaining) {
    if (!route) return '<span style="color:#ff9999;font-weight:bold;">No route</span>';
    if (route.cost > remaining) return '<span style="color:#ffd166;font-weight:bold;">Costs ' + escapeHtml(route.cost) + ' / not enough movement</span>';
    return '<span style="color:#9ee493;font-weight:bold;">Costs ' + escapeHtml(route.cost) + '</span>';
  }

  function routeTooltipPathHtml(route) {
    if (!route) return '<div style="opacity:0.75;margin-top:4px;">No linked route found.</div>';
    return '<div style="margin-top:4px;padding:6px;border-radius:5px;background:rgba(255,255,255,0.08);">' + route.tileNames.map(escapeHtml).join(" → ") + '</div>';
  }

  function getBestRouteOption(routeOptions) {
    const valid = routeOptions.filter(option => Boolean(option.path));
    if (!valid.length) return null;
    valid.sort((a, b) => {
      if (a.path.cost !== b.path.cost) return a.path.cost - b.path.cost;
      const priority = { sea: 1, land: 2, default: 3 };
      return (priority[a.path.mode] || 99) - (priority[b.path.mode] || 99);
    });
    return valid[0];
  }

  function buildRouteTooltipBlock(title, route, remaining, isBest) {
    return '<div style="margin-top:8px;padding:8px;border-radius:6px;background:' +
      (isBest ? 'rgba(158,228,147,0.14)' : 'rgba(255,255,255,0.055)') +
      ';">' +
        '<div style="font-weight:bold;font-size:13px;margin-bottom:4px;color:#f7e2b5;">' +
          escapeHtml(title) +
          (isBest ? ' <span style="color:#9ee493;">★ Best</span>' : '') +
        '</div>' +
        '<div><strong>Status:</strong> ' + routeTooltipStatusHtml(route, remaining) + '</div>' +
        '<div style="margin-top:4px;"><strong>Route:</strong></div>' +
        routeTooltipPathHtml(route) +
      '</div>';
  }

  function buildRouteTooltipHtml(piece, startTile, destinationTile, landPath, seaPath, defaultPath) {
    const remaining = getMovementRemaining(piece);
    const options = [
      { label: "Sea / Port Route", path: seaPath },
      { label: "Land Route", path: landPath },
      { label: "Piece Default Route", path: defaultPath }
    ];
    const best = getBestRouteOption(options);
    const bestMode = best?.path?.mode || null;

    return '<div>' +
      '<h2 style="margin:0 0 8px 0;font-size:16px;color:#f7e2b5;">World Route</h2>' +
      '<div style="margin-bottom:8px;">' +
        '<strong>Piece:</strong> ' + escapeHtml(piece.name || "World Piece") + '<br>' +
        '<strong>From:</strong> ' + escapeHtml(startTile?.name || "Unknown") + ' <span style="opacity:0.7;">[' + escapeHtml(getTileType(startTile)) + ']</span><br>' +
        '<strong>To:</strong> ' + escapeHtml(destinationTile?.name || "Unknown") + ' <span style="opacity:0.7;">[' + escapeHtml(getTileType(destinationTile)) + ']</span>' +
      '</div>' +
      '<div style="margin-bottom:8px;">' +
        '<strong>Movement:</strong> ' + escapeHtml(Number(piece.movementUsed || 0)) + ' / ' + escapeHtml(Number(piece.movementMax || 0)) + ' used — <strong>' + escapeHtml(remaining) + '</strong> remaining' +
      '</div>' +
      buildRouteTooltipBlock("Sea / Port Route", seaPath, remaining, bestMode === "sea") +
      buildRouteTooltipBlock("Land Route", landPath, remaining, bestMode === "land") +
      buildRouteTooltipBlock("Piece Default Route", defaultPath, remaining, bestMode === "default") +
      '<div style="opacity:0.75;font-size:11px;margin-top:10px;">Select one world piece, then hover a tile. Turn on Click Move to click a destination and confirm movement.</div>' +
    '</div>';
  }

  function updateRouteTooltip() {
    if (!isOverviewScene() || !canvas?.ready) { hideRouteTooltip(); return; }

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { hideRouteTooltip(); return; }

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) { hideRouteTooltip(); return; }

    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { hideRouteTooltip(); return; }

    const destinationEntry = findTileAtPoint(mousePoint);
    if (!destinationEntry) { hideRouteTooltip(); return; }

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);

    if (!startEntry) {
      const el = getOrCreateRouteTooltip();
      el.innerHTML = '<h2 style="margin:0 0 8px 0;font-size:16px;color:#f7e2b5;">World Route</h2>' +
        '<p><strong>Piece:</strong> ' + escapeHtml(piece.name || token.document.name) + '</p>' +
        '<p>Selected piece is not currently inside a world tile.</p>';
      el.style.display = "block";
      return;
    }

    const startTile = startEntry.tile;
    const destinationTile = destinationEntry.tile;
    const landPath = findPath(startTile, destinationTile, piece, "land");
    const seaPath = findPath(startTile, destinationTile, piece, "sea");
    const defaultPath = findPath(startTile, destinationTile, piece, "default");

    const el = getOrCreateRouteTooltip();
    el.innerHTML = buildRouteTooltipHtml(piece, startTile, destinationTile, landPath, seaPath, defaultPath);
    el.style.display = "block";
  }

  function startRouteTooltip() {
    stopRouteTooltip(false);
    globalThis[ROUTE_TOOLTIP_KEY] = {
      version: MODULE_VERSION,
      interval: setInterval(updateRouteTooltip, 150),
      startedAt: new Date().toISOString()
    };
    updateRouteTooltip();
    renderPanel();
    ui.notifications.info("World route tooltip enabled.");
  }

  function stopRouteTooltip(showNotification = true) {
    const manager = globalThis[ROUTE_TOOLTIP_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    removeRouteTooltipElement();
    globalThis[ROUTE_TOOLTIP_KEY] = null;
    renderPanel();
    if (showNotification) ui.notifications.info("World route tooltip disabled.");
  }

  async function toggleRouteTooltip() {
    if (!requireOverviewScene()) return;
    if (globalThis[ROUTE_TOOLTIP_KEY]) stopRouteTooltip(true);
    else startRouteTooltip();
  }

  function getClickMoveRouteSelectHtml(comparisons) {
    const items = [];
    if (comparisons.bestPath) items.push(["best", `Best Available Route — ${routeModeLabel(comparisons.bestPath.mode)} / Cost ${comparisons.bestPath.cost}`]);
    if (comparisons.landPath) items.push(["land", `Land Route — Cost ${comparisons.landPath.cost}`]);
    if (comparisons.seaPath) items.push(["sea", `Sea / Port Route — Cost ${comparisons.seaPath.cost}`]);
    if (comparisons.defaultPath) items.push(["default", `Piece Default Route — Cost ${comparisons.defaultPath.cost}`]);

    return items
      .map(([value, label], index) => `<option value="${escapeHtml(value)}" ${index === 0 ? "selected" : ""}>${escapeHtml(label)}</option>`)
      .join("");
  }

  async function askClickMoveConfirmation(token, piece, startTile, destinationTile, comparisons) {
    const remaining = getMovementRemaining(piece);
    const bestMode = comparisons.bestPath?.mode || null;

    return await new Promise(resolve => {
      new Dialog({
        title: "Confirm World Move",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}<br>
            <strong>From:</strong> ${escapeHtml(startTile.name)}<br>
            <strong>To:</strong> ${escapeHtml(destinationTile.name)}<br>
            <strong>Movement:</strong> ${escapeHtml(Number(piece.movementUsed || 0))} / ${escapeHtml(Number(piece.movementMax || 0))} used — ${escapeHtml(remaining)} remaining
          </div>

          <div class="form-group">
            <label><strong>Route to use</strong></label>
            <select name="routeMode" style="width:100%;">
              ${getClickMoveRouteSelectHtml(comparisons)}
            </select>
          </div>

          <div style="max-height:260px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:8px;">
            <ul style="margin:0 0 0 18px;padding:0;">
              ${routeSummaryLine("Sea / Port Route", comparisons.seaPath, remaining, bestMode === "sea")}
              ${routeSummaryLine("Land Route", comparisons.landPath, remaining, bestMode === "land")}
              ${routeSummaryLine("Piece Default Route", comparisons.defaultPath, remaining, bestMode === "default")}
            </ul>
          </div>

          <p class="notes">If another world piece is already in the destination tile, this piece will be placed in an open slot nearby instead of directly on top of it.</p>
        </form>`,
        buttons: {
          move: { label: "Move", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ routeMode: String(form.routeMode.value || "best") });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "move"
      }, { width: 640, height: 520, resizable: true }).render(true);
    });
  }

  async function handleClickMove(event) {
    const manager = globalThis[CLICK_MOVE_KEY];
    if (!manager || !isOverviewScene() || !canvas?.ready) return;

    if (event?.target?.tagName && String(event.target.tagName).toLowerCase() !== "canvas") return;

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) return;

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) return;

    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) return;

    const destinationEntry = findTileAtPoint(mousePoint);
    if (!destinationEntry) return;

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);
    if (!startEntry) return;

    const startTile = startEntry.tile;
    const destinationTile = destinationEntry.tile;

    if (String(startTile.id) === String(destinationTile.id)) return;

    event.preventDefault?.();
    event.stopPropagation?.();

    if (!canUserControlWorldPiece(token, piece)) {
      ui.notifications.warn("You can only move world pieces you control.");
      return;
    }

    if (!isTileAllowedForPiece(piece, destinationTile)) {
      ui.notifications.warn(`${piece.name || token.document.name} cannot enter ${destinationTile.name}.`);
      return;
    }

    const comparisons = getRouteComparisons(startTile, destinationTile, piece);
    if (!comparisons.bestPath && !comparisons.landPath && !comparisons.seaPath && !comparisons.defaultPath) {
      ui.notifications.warn(`No valid route from ${startTile.name} to ${destinationTile.name}.`);
      return;
    }

    const choice = await askClickMoveConfirmation(token, piece, startTile, destinationTile, comparisons);
    if (!choice) return;

    const path = getPathForMode(startTile, destinationTile, piece, choice.routeMode);
    if (!path) { ui.notifications.warn(`No valid ${routeModeLabel(choice.routeMode)} from ${startTile.name} to ${destinationTile.name}.`); return; }

    const remaining = getMovementRemaining(piece);
    if (path.cost > remaining) { ui.notifications.warn(`Move blocked: needs ${path.cost} movement, but only has ${remaining} remaining.`); return; }

    await executeWorldPathMove(token, piece, startTile, destinationTile, path, 350, "Click World Move");
  }

  function startClickMove() {
    stopClickMove(false);
    const clickHandler = event => handleClickMove(event);
    document.addEventListener("click", clickHandler, true);
    globalThis[CLICK_MOVE_KEY] = {
      version: MODULE_VERSION,
      clickHandler,
      startedAt: new Date().toISOString()
    };
    renderPanel();
    ui.notifications.info("Click Move enabled. Select a world piece, then click a destination tile.");
  }

  function stopClickMove(showNotification = true) {
    const manager = globalThis[CLICK_MOVE_KEY];
    if (manager?.clickHandler) document.removeEventListener("click", manager.clickHandler, true);
    globalThis[CLICK_MOVE_KEY] = null;
    renderPanel();
    if (showNotification) ui.notifications.info("Click Move disabled.");
  }

  async function toggleClickMove() {
    if (!requireOverviewScene()) return;
    if (globalThis[CLICK_MOVE_KEY]) stopClickMove(true);
    else startClickMove();
  }

  function refreshTokenVisibility() {
    for (const token of canvas.tokens.placeables) {
      try { token.renderFlags?.set?.({ refreshVisibility: true }); }
      catch (_) { try { token._refreshVisibility?.(); } catch (_) {} }
    }
  }

  function getVisionContainer() {
    return canvas?.visibility?.vision?.sight || canvas?.visibility?.vision?.light?.preview || null;
  }

  function getSceneRect() {
    const dims = canvas?.dimensions || {};
    return {
      x: Number(dims.sceneX ?? dims.rect?.x ?? 0),
      y: Number(dims.sceneY ?? dims.rect?.y ?? 0),
      width: Number(dims.sceneWidth ?? dims.rect?.width ?? canvas?.scene?.width ?? 4000),
      height: Number(dims.sceneHeight ?? dims.rect?.height ?? canvas?.scene?.height ?? 4000)
    };
  }

  function getOrCreateVisionDimmer() {
    let overlay = globalThis[VISIBILITY_DIMMER_KEY];
    if (overlay && !overlay.destroyed) return overlay;

    overlay = new PIXI.Graphics();
    overlay.name = VISIBILITY_DIMMER_KEY;
    overlay.zIndex = 999990;
    overlay.eventMode = "none";
    overlay.interactive = false;
    overlay.alpha = 1;
    canvas.stage.sortableChildren = true;
    canvas.stage.addChild(overlay);
    globalThis[VISIBILITY_DIMMER_KEY] = overlay;
    return overlay;
  }

  function drawTilePath(graphics, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const type = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);

    if (type === "rectangle") graphics.drawRect(x, y, width, height);
    else if (type === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      const flat = [];
      for (const point of points) flat.push(x + point.x, y + point.y);
      if (flat.length >= 6) graphics.drawPolygon(flat);
    }
  }

  function redrawVisibilityDimmer(revealedEntries = []) {
    const overlay = getOrCreateVisionDimmer();
    overlay.clear();

    if (!isOverviewScene() || game.user.isGM) {
      overlay.visible = false;
      return;
    }

    const rect = getSceneRect();
    overlay.visible = true;
    overlay.beginFill(0x000000, 0.48);
    overlay.drawRect(rect.x, rect.y, rect.width, rect.height);

    if (revealedEntries.length && typeof overlay.beginHole === "function") {
      overlay.beginHole();
      for (const entry of revealedEntries) drawTilePath(overlay, entry.drawing);
      overlay.endHole();
    }

    overlay.endFill();
  }

  function removeVisibilityDimmer() {
    const overlay = globalThis[VISIBILITY_DIMMER_KEY];
    if (overlay) {
      overlay.clear?.();
      overlay.parent?.removeChild?.(overlay);
      overlay.destroy?.();
    }
    globalThis[VISIBILITY_DIMMER_KEY] = null;
  }

  function findCurrentTileForToken(token) {
    return findTileAtPoint(getTokenCenter(token));
  }

  function getLinkedTiles(current) {
    const allTiles = getWorldTileEntries();
    const rawIds = Array.isArray(current.tile.adjacentTileIds) ? current.tile.adjacentTileIds : [];
    const rawNames = Array.isArray(current.tile.adjacentTileNames) ? current.tile.adjacentTileNames : [];
    const idSet = new Set(rawIds.map(String));
    const nameSet = new Set(rawNames.map(normalize));
    return allTiles.filter(entry => idSet.has(String(entry.tile.id)) || idSet.has(String(entry.drawing.document.id)) || nameSet.has(normalize(entry.tile.name)));
  }

  function isWorldPieceRevealed(token) {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager || !getWorldPiece(token) || !manager.revealedEntries?.length) return false;
    const point = getTokenCenter(token);
    return manager.revealedEntries.some(entry => pointInsideDrawing(point, entry.drawing));
  }

  function clearReveal() {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;
    manager.revealedEntries = [];
    manager.graphics?.clear();
    if (manager.graphics) manager.graphics.visible = false;
    redrawVisibilityDimmer([]);
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  function drawTileIntoVision(graphics, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const type = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    graphics.beginFill(0xffffff, 1);
    if (type === "rectangle") graphics.drawRect(x, y, width, height);
    else if (type === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      const flat = [];
      for (const point of points) flat.push(x + point.x, y + point.y);
      if (flat.length >= 6) graphics.drawPolygon(flat);
    }
    graphics.endFill();
  }

  function getRevealEntriesForToken(token) {
    if (!token || !getWorldPiece(token)) return [];
    const current = findCurrentTileForToken(token) || getTileById(getWorldPiece(token)?.currentTileId);
    if (!current) return [];
    return [current, ...getLinkedTiles(current)];
  }

  function getControlledRevealSourceTokens() {
    const selectedWorldPieces = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (selectedWorldPieces.length === 1) return selectedWorldPieces;

    if (game.user.isGM) return [];

    return canvas.tokens.placeables.filter(token => {
      const piece = getWorldPiece(token);
      return Boolean(piece) && canUserControlWorldPiece(token, piece);
    });
  }

  function revealForTokens(tokens) {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;

    const byTileId = new Map();
    for (const token of tokens || []) {
      for (const entry of getRevealEntriesForToken(token)) {
        const id = String(getTileId(entry) || entry.tile?.id || entry.drawing?.document?.id || "");
        if (id && !byTileId.has(id)) byTileId.set(id, entry);
      }
    }

    manager.revealedEntries = [...byTileId.values()];
    manager.graphics.clear();

    if (!manager.revealedEntries.length) {
      manager.graphics.visible = false;
      redrawVisibilityDimmer([]);
      canvas.visibility?.refreshVisibility?.();
      refreshTokenVisibility();
      return;
    }

    manager.graphics.visible = true;
    for (const entry of manager.revealedEntries) drawTileIntoVision(manager.graphics, entry.drawing);
    redrawVisibilityDimmer(manager.revealedEntries);
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  function revealForCurrentPlayerPieces() {
    revealForTokens(getControlledRevealSourceTokens());
  }

  function revealForToken(token) {
    if (!token || !getWorldPiece(token)) { revealForCurrentPlayerPieces(); return; }
    revealForTokens([token]);
  }

  function startVisibility() {
    if (globalThis[VISIBILITY_KEY]) return;
    const TokenClass = foundry?.canvas?.placeables?.Token || CONFIG?.Token?.objectClass || globalThis.Token;
    if (!TokenClass) { console.warn("Crown Overview Tools: could not locate Token class."); return; }
    const originalIsVisibleDescriptor = Object.getOwnPropertyDescriptor(TokenClass.prototype, "isVisible");
    if (!originalIsVisibleDescriptor?.get) { console.warn("Crown Overview Tools: could not patch Token.isVisible."); return; }
    const visionContainer = getVisionContainer();
    if (!visionContainer) { console.warn("Crown Overview Tools: could not locate vision container."); return; }
    const graphics = new PIXI.Graphics();
    graphics.name = VISIBILITY_KEY;
    graphics.eventMode = "none";
    graphics.interactive = false;
    visionContainer.addChild(graphics);

    const originalIsVisibleGetter = originalIsVisibleDescriptor.get;
    const controlHook = Hooks.on("controlToken", (token, controlled) => {
      if (!isOverviewScene()) return;
      if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
      else revealForCurrentPlayerPieces();
    });
    const updateHook = Hooks.on("updateToken", (document, changes) => {
      if (!isOverviewScene()) return;
      if (changes.x === undefined && changes.y === undefined) return;
      if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
      else revealForCurrentPlayerPieces();
    });

    globalThis[VISIBILITY_KEY] = { TokenClass, originalIsVisibleDescriptor, graphics, visionContainer, revealedEntries: [], controlHook, updateHook };

    Object.defineProperty(TokenClass.prototype, "isVisible", {
      configurable: true,
      get: function () {
        const manager = globalThis[VISIBILITY_KEY];
        if (manager && isOverviewScene() && !game.user.isGM && getWorldPiece(this)) {
          return isWorldPieceRevealed(this);
        }
        if (manager && isOverviewScene() && isWorldPieceRevealed(this)) return true;
        return originalIsVisibleGetter.call(this);
      }
    });

    if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
    else revealForCurrentPlayerPieces();
  }

  function stopVisibility() {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;
    if (manager.TokenClass && manager.originalIsVisibleDescriptor) {
      Object.defineProperty(manager.TokenClass.prototype, "isVisible", manager.originalIsVisibleDescriptor);
    }
    if (manager.controlHook) Hooks.off("controlToken", manager.controlHook);
    if (manager.updateHook) Hooks.off("updateToken", manager.updateHook);
    manager.graphics?.parent?.removeChild(manager.graphics);
    manager.graphics?.destroy();
    globalThis[VISIBILITY_KEY] = null;
    removeVisibilityDimmer();
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  async function getOrCreateWorldMapFolder() {
    let folder = game.folders.find(folder => folder.type === "Actor" && folder.name === WORLD_MAP_FOLDER_NAME);
    if (folder) return folder;
    return await Folder.create({ name: WORLD_MAP_FOLDER_NAME, type: "Actor", sorting: "a" });
  }

  function getSafeActorType() {
    let availableTypes = [];
    if (Array.isArray(game.system?.documentTypes?.Actor)) availableTypes = game.system.documentTypes.Actor;
    if (!availableTypes.length && CONFIG?.Actor?.typeLabels) availableTypes = Object.keys(CONFIG.Actor.typeLabels);
    if (availableTypes.includes("character")) return "character";
    if (availableTypes.includes("npc")) return "npc";
    return availableTypes[0] || "character";
  }

  async function saveWorldPiece(token, piece) {
    await token.document.setFlag(FLAG_SCOPE, WORLD_PIECE_KEY, piece);
    if (token.actor) {
      try { await token.actor.setFlag(FLAG_SCOPE, WORLD_PIECE_KEY, foundry.utils.deepClone(piece)); }
      catch (error) { console.warn("Could not update Actor worldPiece flag:", error); }
    }
  }

  function canUserControlWorldPiece(token, piece = getWorldPiece(token)) {
    if (game.user.isGM) return true;
    if (!token || !piece) return false;
    if (token.isOwner) return true;
    if (piece.ownerUserId && String(piece.ownerUserId) === String(game.user.id)) return true;
    if (piece.ownerUserName && normalize(piece.ownerUserName) === normalize(game.user.name)) return true;
    return false;
  }
  function canUserControlWorldPieceForUser(token, piece = getWorldPiece(token), user = game.user) {
    if (!user || !token || !piece) return false;
    if (user.isGM) return true;
    if (piece.ownerUserId && String(piece.ownerUserId) === String(user.id)) return true;
    if (piece.ownerUserName && normalize(piece.ownerUserName) === normalize(user.name)) return true;

    const actorOwnership = token.actor?.ownership || {};
    const level = Number(actorOwnership[user.id] ?? actorOwnership.default ?? 0);
    return level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  }


  function getTileOwnerUserId(worldTile, house = null) {
    return String(
      house?.ownerUserId ||
      house?.playerOwnerUserId ||
      worldTile?.ownerUserId ||
      worldTile?.playerOwnerUserId ||
      ""
    ).trim();
  }

  function getTileOwnerUserName(worldTile, house = null) {
    return String(
      house?.ownerUserName ||
      house?.playerOwnerUserName ||
      worldTile?.ownerUserName ||
      worldTile?.playerOwnerUserName ||
      ""
    ).trim();
  }

  function canUserBuildOnTile(worldTile, house = null) {
    if (game.user.isGM) return true;

    const ownerUserId = getTileOwnerUserId(worldTile, house);
    if (ownerUserId) return String(ownerUserId) === String(game.user.id);

    const ownerUserName = getTileOwnerUserName(worldTile, house);
    if (ownerUserName) return normalize(ownerUserName) === normalize(game.user.name);

    return false;
  }

  function getBuildBlockedReason(worldTile, house = null) {
    const ownerName = getTileOwnerUserName(worldTile, house);
    if (ownerName) return `${worldTile?.name || "This tile"} is assigned to ${ownerName}. You are ${game.user.name}.`;
    return `${worldTile?.name || "This tile"} is not assigned to any player yet. Ask the GM to use Assign Tile Owner.`;
  }

  function getPlayerUsers() {
    return game.users.contents
      .filter(user => !user.isGM)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  function getOccupantsForTile(tile, movingToken = null) {
    if (!tile) return [];
    const tileId = String(tile.id || "");
    const occupants = [];

    for (const other of canvas.tokens.placeables) {
      if (movingToken && other.document.id === movingToken.document.id) continue;
      const otherPiece = getWorldPiece(other);
      if (!otherPiece) continue;

      let inTile = false;
      if (otherPiece.currentTileId && String(otherPiece.currentTileId) === tileId) inTile = true;
      if (!inTile) {
        const entry = findTileAtPoint(getTokenCenter(other));
        if (entry?.tile?.id && String(entry.tile.id) === tileId) inTile = true;
      }

      if (inTile) occupants.push(other);
    }

    return occupants.sort((a, b) => String(a.document.id).localeCompare(String(b.document.id)));
  }

  function getSlotOffset(index, gridSize) {
    if (index <= 0) return { x: 0, y: 0 };

    const radius = gridSize * 0.42 * Math.ceil(index / 8);
    const angle = ((index - 1) % 8) * (Math.PI / 4);

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  }

  function getTokenTopLeftForTileSlot(token, entry) {
    const center = getDrawingCenter(entry);
    const gridSize = getGridSize();
    const occupants = getOccupantsForTile(entry.tile, token);
    const slotIndex = occupants.length;
    const offset = getSlotOffset(slotIndex, gridSize);

    return getTokenTopLeftForPoint(token, {
      x: center.x + offset.x,
      y: center.y + offset.y
    });
  }

  function getRouteComparisons(startTile, destinationTile, piece) {
    const landPath = findPath(startTile, destinationTile, piece, "land");
    const seaPath = findPath(startTile, destinationTile, piece, "sea");
    const defaultPath = findPath(startTile, destinationTile, piece, "default");
    const bestPath = findBestPath(startTile, destinationTile, piece);

    return { landPath, seaPath, defaultPath, bestPath };
  }

  function getPathForMode(startTile, destinationTile, piece, routeMode) {
    if (routeMode === "best") return findBestPath(startTile, destinationTile, piece);
    return findPath(startTile, destinationTile, piece, routeMode);
  }

  function routeSummaryLine(label, path, remaining, isBest = false) {
    if (!path) return `<li><strong>${escapeHtml(label)}:</strong> No route</li>`;
    const status = path.cost > remaining ? `Costs ${path.cost} / not enough movement` : `Costs ${path.cost}`;
    return `<li><strong>${escapeHtml(label)}${isBest ? " ★ Best" : ""}:</strong> ${escapeHtml(status)}<br><span style="opacity:0.85;">${path.tileNames.map(escapeHtml).join(" → ")}</span></li>`;
  }

  async function executeWorldPathMove(token, piece, startTile, destinationTile, path, pauseMs = 350, sourceLabel = "World Path Move") {
    if (!path) return null;

    let currentPiece = foundry.utils.deepClone(piece);
    let spentThisMove = 0;

    for (let i = 1; i < path.tileIds.length; i++) {
      const entry = getTileById(path.tileIds[i]);
      if (!entry) continue;

      const tile = entry.tile;
      if (!isTileAllowedForPiece(currentPiece, tile)) {
        ui.notifications.error(`Movement stopped: ${currentPiece.name || token.document.name} cannot enter ${tile.name}.`);
        return null;
      }

      const position = getTokenTopLeftForTileSlot(token, entry);
      const stepCost = getTileMovementCost(tile);

      currentPiece.previousTileId = currentPiece.currentTileId || path.tileIds[i - 1];
      currentPiece.previousTileName = currentPiece.currentTileName || path.tileNames[i - 1];
      currentPiece.currentTileId = tile.id;
      currentPiece.currentTileName = tile.name;
      currentPiece.movementUsed = Number(currentPiece.movementUsed || 0) + stepCost;
      currentPiece.lastMoveCost = stepCost;
      currentPiece.lastMovePath = path.tileNames.slice(0, i + 1);
      currentPiece.lastRouteMode = path.mode;
      currentPiece.lastMovedAt = new Date().toISOString();
      currentPiece.lastMovedBy = game.user.name;
      currentPiece.lastMovedSource = `Crown Overview Tools ${MODULE_VERSION} - ${sourceLabel}`;

      spentThisMove += stepCost;

      await saveWorldPiece(token, currentPiece);
      await token.document.update({ x: position.x, y: position.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, clickMoveBypass: true });

      if (pauseMs > 0) await new Promise(resolve => setTimeout(resolve, pauseMs));
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: sourceLabel }),
      content: `<h2>${escapeHtml(sourceLabel)}</h2><p><strong>Piece:</strong> ${escapeHtml(currentPiece.name || token.document.name)}</p><p><strong>Type:</strong> ${escapeHtml(currentPiece.pieceType || "Unknown")}</p><p><strong>Route Mode:</strong> ${escapeHtml(routeModeLabel(path.mode))}</p><p><strong>From:</strong> ${escapeHtml(startTile.name)}</p><p><strong>To:</strong> ${escapeHtml(destinationTile.name)}</p><p><strong>Path:</strong> ${path.tileNames.map(escapeHtml).join(" → ")}</p><p><strong>Movement spent:</strong> ${escapeHtml(spentThisMove)}</p><p><strong>Total movement used:</strong> ${escapeHtml(currentPiece.movementUsed)} / ${escapeHtml(currentPiece.movementMax || 0)}</p>`
    });

    return { piece: currentPiece, spentThisMove };
  }


  function getActorOwnerNames(actor) {
    if (!actor) return [];
    const ownership = actor.ownership || {};
    const ownerLevel = CONST.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
    return getPlayerUsers()
      .filter(user => Number(ownership[user.id] || 0) >= ownerLevel)
      .map(user => user.name);
  }

  function getWorldPieceOwnerName(token, piece = getWorldPiece(token)) {
    if (piece?.ownerUserName) return String(piece.ownerUserName);
    if (piece?.playerOwnerUserName) return String(piece.playerOwnerUserName);
    if (piece?.ownerUserId && game.users.get(piece.ownerUserId)) return game.users.get(piece.ownerUserId).name;
    if (piece?.playerOwnerUserId && game.users.get(piece.playerOwnerUserId)) return game.users.get(piece.playerOwnerUserId).name;
    const actorOwners = getActorOwnerNames(token?.actor);
    return actorOwners.length ? actorOwners.join(", ") : "Unassigned";
  }

  function pointInsideToken(point, token) {
    if (!point || !token) return false;
    const gridSize = getGridSize();
    const x = Number(token.document.x || 0);
    const y = Number(token.document.y || 0);
    const width = Number(token.document.width || 1) * gridSize;
    const height = Number(token.document.height || 1) * gridSize;
    return point.x >= x && point.y >= y && point.x <= x + width && point.y <= y + height;
  }

  function findWorldPieceAtPoint(point) {
    const candidates = canvas.tokens.placeables
      .filter(token => Boolean(getWorldPiece(token)))
      .filter(token => token.visible !== false)
      .filter(token => pointInsideToken(point, token))
      .sort((a, b) => {
        const as = Number(a.document.sort || 0);
        const bs = Number(b.document.sort || 0);
        if (bs !== as) return bs - as;
        return String(b.document.id || "").localeCompare(String(a.document.id || ""));
      });
    return candidates[0] || null;
  }

  function getOrCreatePieceTooltip() {
    let el = document.getElementById(PIECE_TOOLTIP_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = PIECE_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "16px";
    el.style.bottom = "560px";
    el.style.width = "420px";
    el.style.maxHeight = "220px";
    el.style.overflowY = "auto";
    el.style.zIndex = "100001";
    el.style.padding = "10px 12px";
    el.style.border = "1px solid rgba(180,145,90,0.85)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.94)";
    el.style.color = "#f0f0f0";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.4";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.45)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function hidePieceTooltip() {
    const el = document.getElementById(PIECE_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function renderPieceTooltip(token) {
    const piece = getWorldPiece(token);
    if (!piece) { hidePieceTooltip(); return; }

    const currentEntry = findTileAtPoint(getTokenCenter(token)) || getTileById(piece.currentTileId);
    const currentTileName = currentEntry?.tile?.name || piece.currentTileName || "Unknown";
    const ownerName = getWorldPieceOwnerName(token, piece);
    const movementUsed = Number(piece.movementUsed || 0);
    const movementMax = Number(piece.movementMax || 0);
    const movementRemaining = Math.max(0, movementMax - movementUsed);

    let extra = "";
    if (piece.pieceType === "army" && (piece.strengthCurrent !== undefined || piece.strengthMax !== undefined)) {
      extra += `<strong>Strength:</strong> ${escapeHtml(piece.strengthCurrent ?? "?")} / ${escapeHtml(piece.strengthMax ?? "?")}<br>`;
    }
    if (piece.pieceType === "character" && piece.wounds !== undefined) {
      extra += `<strong>Wounds:</strong> ${escapeHtml(piece.wounds)}<br>`;
    }

    const el = getOrCreatePieceTooltip();
    el.innerHTML = `
      <div>
        <strong style="font-size:17px;">${escapeHtml(piece.name || token.document.name || "World Piece")}</strong>
        <div style="margin-top:6px;">
          <strong>Type:</strong> ${escapeHtml(piece.pieceType || "Unknown")}<br>
          <strong>Player Owner:</strong> ${escapeHtml(ownerName)}<br>
          <strong>Faction:</strong> ${escapeHtml(piece.faction || "None")}<br>
          <strong>Current Tile:</strong> ${escapeHtml(currentTileName)}<br>
          <strong>Movement:</strong> ${escapeHtml(movementUsed)} / ${escapeHtml(movementMax)} used — ${escapeHtml(movementRemaining)} remaining<br>
          ${extra}
        </div>
      </div>
    `;
    el.style.display = "block";
    positionPieceTooltipAboveTileTooltip(el);
  }

  function positionPieceTooltipAboveTileTooltip(el) {
    if (!el) return;
    const margin = 12;
    const hover = document.getElementById(HOVER_TOOLTIP_ID);

    if (hover && hover.style.display !== "none") {
      const hoverRect = hover.getBoundingClientRect();
      const ownRect = el.getBoundingClientRect();
      const preferredBottom = Math.max(320, window.innerHeight - hoverRect.top + 28);
      const maxBottom = Math.max(104, window.innerHeight - ownRect.height - margin);
      el.style.left = `${Math.max(margin, hoverRect.left)}px`;
      el.style.bottom = `${Math.min(preferredBottom, maxBottom)}px`;
      el.style.top = "auto";
      return;
    }

    el.style.left = "16px";
    el.style.bottom = "560px";
    el.style.top = "auto";
  }

  function updatePieceTooltip() {
    if (!isOverviewScene() || !canvas?.ready) return;
    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { hidePieceTooltip(); return; }
    const token = findWorldPieceAtPoint(mousePoint);
    const manager = globalThis[PIECE_TOOLTIP_KEY];
    if (!manager) return;
    const currentId = token?.document?.id || null;
    if (manager.lastTokenId === currentId) return;
    manager.lastTokenId = currentId;
    if (!token) hidePieceTooltip();
    else renderPieceTooltip(token);
  }

  function startPieceTooltip() {
    stopPieceTooltip(false);
    globalThis[PIECE_TOOLTIP_KEY] = {
      version: MODULE_VERSION,
      interval: setInterval(updatePieceTooltip, 120),
      lastTokenId: null,
      startedAt: new Date().toISOString()
    };
    updatePieceTooltip();
    ui.notifications.info("World piece hover tooltip enabled.");
    renderPanel();
  }

  function stopPieceTooltip(notify = true) {
    const manager = globalThis[PIECE_TOOLTIP_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    document.getElementById(PIECE_TOOLTIP_ID)?.remove();
    globalThis[PIECE_TOOLTIP_KEY] = null;
    if (notify) ui.notifications.info("World piece hover tooltip disabled.");
    renderPanel();
  }

  async function togglePieceTooltip() {
    if (!requireOverviewScene()) return;
    if (globalThis[PIECE_TOOLTIP_KEY]) stopPieceTooltip(true);
    else startPieceTooltip();
  }

  async function applyWorldPieceOwner(token, piece, ownerUser, clearOtherPlayers = true) {
    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});

    if (ownerUser) {
      updatedPiece.ownerUserId = ownerUser.id;
      updatedPiece.ownerUserName = ownerUser.name;
      updatedPiece.playerOwnerUserId = ownerUser.id;
      updatedPiece.playerOwnerUserName = ownerUser.name;
    } else {
      delete updatedPiece.ownerUserId;
      delete updatedPiece.ownerUserName;
      delete updatedPiece.playerOwnerUserId;
      delete updatedPiece.playerOwnerUserName;
    }

    updatedPiece.ownerAssignedAt = new Date().toISOString();
    updatedPiece.ownerAssignedBy = game.user.name;
    updatedPiece.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;

    await saveWorldPiece(token, updatedPiece);

    if (token.actor) {
      const ownership = foundry.utils.deepClone(token.actor.ownership || {});
      if (clearOtherPlayers) {
        for (const user of getPlayerUsers()) {
          ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
        }
      }
      if (ownerUser) ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await token.actor.update({ ownership });
    }

    return updatedPiece;
  }

  async function assignPieceOwner() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can assign world piece owners."); return; }

    const selected = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (!selected.length) { ui.notifications.warn("Select one or more World Piece tokens first."); return; }

    const users = getPlayerUsers();
    const firstPiece = getWorldPiece(selected[0]);
    const currentOwnerId = firstPiece?.ownerUserId || firstPiece?.playerOwnerUserId || "";
    const userOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / clear owner</option>`,
      ...users.map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Assign Piece Owner",
        content: `<form>
          <p>Assign selected world piece token(s) to a Foundry player.</p>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${userOptions}</select></div>
          <div class="form-group"><label><input type="checkbox" name="clearOthers" checked /> Remove other non-GM ownership</label></div>
        </form>`,
        buttons: {
          save: { label: "Assign", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ ownerUserId: String(form.ownerUserId.value || ""), clearOthers: form.clearOthers.checked });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 540, height: 310, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    let updated = 0;
    const rows = [];

    for (const token of selected) {
      const piece = getWorldPiece(token);
      const updatedPiece = await applyWorldPieceOwner(token, piece, ownerUser, result.clearOthers);
      rows.push(`<li><strong>${escapeHtml(updatedPiece.name || token.document.name)}</strong> → ${escapeHtml(ownerUser?.name || "Unassigned")}</li>`);
      updated++;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Piece Owner" }),
      content: `<h2>World Piece Owner Assigned</h2><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Pieces Updated:</strong> ${escapeHtml(updated)}</p><ul>${rows.join("")}</ul>`
    });

    ui.notifications.info(`Assigned owner for ${updated} world piece(s): ${ownerUser?.name || "Unassigned"}.`);
  }

  async function editWorldPiece() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can edit world pieces."); return; }

    const selected = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Piece token to edit."); return; }

    const token = selected[0];
    const piece = foundry.utils.deepClone(getWorldPiece(token));
    const currentOwnerId = piece.ownerUserId || piece.playerOwnerUserId || "";
    const ownerOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / GM only</option>`,
      ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const typeOptions = ["character", "army", "fleet", "dragon"].map(type => {
      const label = type === "dragon" ? "Dragon / Flying Unit" : titleCase(type);
      return `<option value="${escapeHtml(type)}" ${normalize(piece.pieceType || "army") === type ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Edit World Piece — ${piece.name || token.document.name}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Token:</strong> ${escapeHtml(token.document.name)}<br>
            <strong>Current Tile:</strong> ${escapeHtml(piece.currentTileName || getCurrentTileEntryForToken(token, piece)?.tile?.name || "Unknown")}
          </div>
          <div class="form-group"><label>Piece Name</label><input type="text" name="pieceName" value="${escapeHtml(piece.name || token.document.name)}" style="width:100%;" /></div>
          <div class="form-group"><label>Piece Type</label><select name="pieceType" style="width:100%;">${typeOptions}</select></div>
          <div class="form-group"><label>Movement Points Per Turn</label><input type="number" name="movementMax" value="${escapeHtml(piece.movementMax ?? 3)}" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Movement Used</label><input type="number" name="movementUsed" value="${escapeHtml(piece.movementUsed ?? 0)}" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Faction / Owner</label><input type="text" name="faction" value="${escapeHtml(piece.faction || "")}" style="width:100%;" /></div>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${ownerOptions}</select></div>
          <div class="form-group"><label>Token Image Path</label><input type="text" name="imagePath" value="${escapeHtml(token.document.texture?.src || token.actor?.img || "")}" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group"><label>Token Width</label><input type="number" name="tokenWidth" value="${escapeHtml(token.document.width || 1)}" min="0.25" step="0.25" style="width:100%;" /></div>
            <div class="form-group"><label>Token Height</label><input type="number" name="tokenHeight" value="${escapeHtml(token.document.height || 1)}" min="0.25" step="0.25" style="width:100%;" /></div>
          </div>
          <div class="form-group"><label><input type="checkbox" name="syncCurrentTile" checked /> Sync current tile from token position</label></div>
          <div class="form-group"><label><input type="checkbox" name="resetMovement" /> Reset movement used to 0</label></div>
        </form>`,
        buttons: {
          save: { label: "Save", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              name: String(form.pieceName.value || token.document.name).trim(),
              pieceType: normalize(form.pieceType.value || "army"),
              movementMax: Math.max(0, Number(form.movementMax.value || 0)),
              movementUsed: Math.max(0, Number(form.movementUsed.value || 0)),
              faction: String(form.faction.value || "").trim(),
              ownerUserId: String(form.ownerUserId.value || ""),
              imagePath: String(form.imagePath.value || "").trim(),
              width: Math.max(0.25, Number(form.tokenWidth.value || 1)),
              height: Math.max(0.25, Number(form.tokenHeight.value || 1)),
              syncCurrentTile: form.syncCurrentTile.checked,
              resetMovement: form.resetMovement.checked
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 620, height: 720, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    const updatedPiece = foundry.utils.deepClone(piece);
    updatedPiece.name = result.name || token.document.name;
    updatedPiece.pieceType = result.pieceType;
    updatedPiece.faction = result.faction;
    updatedPiece.movementMax = result.movementMax;
    updatedPiece.movementUsed = result.resetMovement ? 0 : Math.min(result.movementUsed, result.movementMax);
    updatedPiece.allowedTileTypes = getAllowedTileTypes(result.pieceType);

    if (result.syncCurrentTile) {
      const entry = getCurrentTileEntryForToken(token, updatedPiece);
      if (entry?.tile) {
        updatedPiece.currentTileId = entry.tile.id || entry.drawing.document.id;
        updatedPiece.currentTileName = entry.tile.name || "Unnamed Tile";
      }
    }

    updatedPiece.editedAt = new Date().toISOString();
    updatedPiece.editedBy = game.user.name;
    updatedPiece.editedSource = `Crown Overview Tools ${MODULE_VERSION}`;

    await saveWorldPiece(token, updatedPiece);
    const ownedPiece = await applyWorldPieceOwner(token, updatedPiece, ownerUser, true);

    const tokenUpdate = { name: ownedPiece.name, width: result.width, height: result.height };
    if (result.imagePath) tokenUpdate.texture = { src: result.imagePath };
    await token.document.update(tokenUpdate);

    if (token.actor) {
      const actorUpdate = { name: ownedPiece.name };
      if (result.imagePath) actorUpdate.img = result.imagePath;
      await token.actor.update(actorUpdate);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Piece" }),
      content: `<h2>World Piece Updated</h2><p><strong>Piece:</strong> ${escapeHtml(ownedPiece.name)}</p><p><strong>Type:</strong> ${escapeHtml(ownedPiece.pieceType)}</p><p><strong>Faction:</strong> ${escapeHtml(ownedPiece.faction || "None")}</p><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Movement:</strong> ${escapeHtml(ownedPiece.movementUsed || 0)} / ${escapeHtml(ownedPiece.movementMax || 0)} used</p>`
    });

    ui.notifications.info(`Updated world piece: ${ownedPiece.name}.`);
    revealForCurrentPlayerPieces();
  }

  async function createWorldPiece() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Tile drawing where the piece should spawn."); return; }
    const drawing = selected[0];
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("The selected drawing has not been assigned as a World Tile."); return; }
    const tileType = getTileType(worldTile);

    const playerOwnerOptions = [
      `<option value="">Unassigned / GM only</option>`,
      ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`)
    ].join("");

    const details = await new Promise(resolve => {
      new Dialog({
        title: "Create World Piece",
        content: `<form>
          <div style="padding:8px;margin-bottom:12px;border:1px solid #777;border-radius:6px;">
            <strong>Spawn Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>Region:</strong> ${escapeHtml(worldTile.region || "None")}<br>
            <strong>Terrain:</strong> ${escapeHtml(worldTile.terrainLabel || worldTile.terrainKey || tileType)}<br>
            <strong>Tile Type:</strong> ${escapeHtml(tileType)}
          </div>
          <div class="form-group"><label>Piece Name</label><input type="text" name="pieceName" style="width:100%;" placeholder="Northern Host, Redwyne Fleet, Daemon..." /></div>
          <div class="form-group"><label>Piece Type</label><select name="pieceType" style="width:100%;"><option value="character">Character</option><option value="army" selected>Army</option><option value="fleet">Fleet</option><option value="dragon">Dragon / Flying Unit</option></select></div>
          <div class="form-group"><label>Movement Points Per Turn</label><input type="number" name="movementMax" value="3" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Faction / Owner</label><input type="text" name="faction" placeholder="Stark, Lannister, Neutral..." style="width:100%;" /></div>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${playerOwnerOptions}</select><p class="notes">This controls which player can select and move the piece.</p></div>
          <div class="form-group"><label>Token Image Path</label><input type="text" name="imagePath" placeholder="Leave blank for default icon" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group"><label>Token Width</label><input type="number" name="tokenWidth" value="1" min="0.25" step="0.25" style="width:100%;" /></div>
            <div class="form-group"><label>Token Height</label><input type="number" name="tokenHeight" value="1" min="0.25" step="0.25" style="width:100%;" /></div>
          </div>
        </form>`,
        buttons: {
          create: { label: "Create & Spawn", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              name: String(form.pieceName.value || "").trim(),
              pieceType: normalize(form.pieceType.value || "army"),
              movementMax: Math.max(0, Number(form.movementMax.value || 3)),
              faction: String(form.faction.value || "").trim(),
              ownerUserId: String(form.ownerUserId.value || ""),
              imagePath: String(form.imagePath.value || "").trim(),
              width: Math.max(0.25, Number(form.tokenWidth.value || 1)),
              height: Math.max(0.25, Number(form.tokenHeight.value || 1))
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "create"
      }, { width: 600, height: 740, resizable: true }).render(true);
    });
    if (!details) return;
    if (!details.name) { ui.notifications.warn("Give the World Piece a name."); return; }
    if (!getAllowedTileTypes(details.pieceType).includes(tileType)) {
      ui.notifications.error(`${details.name} cannot spawn on ${worldTile.name || "this World Tile"}. ${details.pieceType} pieces may only occupy: ${getAllowedTileTypes(details.pieceType).join(", ")}.`);
      return;
    }

    const image = details.imagePath || DEFAULT_IMAGES[details.pieceType] || "icons/svg/mystery-man.svg";
    const folder = await getOrCreateWorldMapFolder();
    const actorType = getSafeActorType();
    const ownerUser = details.ownerUserId ? game.users.get(details.ownerUserId) : null;
    const pieceData = {
      name: details.name,
      pieceType: details.pieceType,
      faction: details.faction,
      movementMax: details.movementMax,
      movementUsed: 0,
      allowedTileTypes: getAllowedTileTypes(details.pieceType),
      currentTileId: worldTile.id || drawing.document.id,
      currentTileName: worldTile.name || "Unnamed Tile",
      previousTileId: null,
      previousTileName: null,
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      playerOwnerUserId: ownerUser?.id || "",
      playerOwnerUserName: ownerUser?.name || "",
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      assignedAt: new Date().toISOString(),
      assignedBy: game.user.name,
      spawnedAt: new Date().toISOString(),
      spawnedBy: game.user.name
    };

    const actor = await Actor.create({
      name: details.name,
      type: actorType,
      folder: folder.id,
      img: image,
      flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData) } },
      prototypeToken: {
        name: details.name,
        actorLink: true,
        width: details.width,
        height: details.height,
        disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
        sight: { enabled: true },
        texture: { src: image },
        flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData) } }
      }
    });

    if (ownerUser) {
      const ownership = foundry.utils.deepClone(actor.ownership || {});
      for (const user of getPlayerUsers()) {
        ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
      }
      ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await actor.update({ ownership });
    }

    const center = getDrawingCenter(drawing);
    const gridSize = getGridSize();
    const tokenData = actor.prototypeToken.toObject();
    tokenData.actorId = actor.id;
    tokenData.actorLink = true;
    tokenData.name = details.name;
    tokenData.x = center.x - (details.width * gridSize) / 2;
    tokenData.y = center.y - (details.height * gridSize) / 2;
    tokenData.width = details.width;
    tokenData.height = details.height;
    tokenData.hidden = false;
    tokenData.sight = tokenData.sight || {};
    tokenData.sight.enabled = true;
    tokenData.texture = tokenData.texture || {};
    tokenData.texture.src = image;
    tokenData.flags = tokenData.flags || {};
    tokenData.flags[FLAG_SCOPE] = tokenData.flags[FLAG_SCOPE] || {};
    tokenData.flags[FLAG_SCOPE][WORLD_PIECE_KEY] = foundry.utils.deepClone(pieceData);
    await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    ui.notifications.info(`Created ${details.name} (${details.pieceType}) in ${worldTile.name || "selected World Tile"}${ownerUser ? " for " + ownerUser.name : ""}.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Piece" }), content: `<h2>World Piece Created</h2><p><strong>Name:</strong> ${escapeHtml(details.name)}</p><p><strong>Type:</strong> ${escapeHtml(details.pieceType)}</p><p><strong>Faction:</strong> ${escapeHtml(details.faction || "None")}</p><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Spawned At:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p><p><strong>Movement:</strong> 0 / ${escapeHtml(details.movementMax)} used</p>` });
  }

  async function resetMovement() {
    if (!requireOverviewScene()) return;
    let resetCount = 0;
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const updated = foundry.utils.deepClone(piece);
      updated.movementUsed = 0;
      updated.lastMovementResetAt = new Date().toISOString();
      updated.lastMovementResetBy = game.user.name;
      updated.lastMovementResetSource = `Crown Overview Tools ${MODULE_VERSION}`;
      await saveWorldPiece(token, updated);
      resetCount++;
    }
    ui.notifications.info(`Movement reset for ${resetCount} world piece(s).`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Movement" }), content: `<h2>World Movement Reset</h2><p><strong>World Pieces Reset:</strong> ${resetCount}</p><p>All World Pieces now have their full movement available.</p>` });
  }

  async function roundClock() {
    if (!requireOverviewScene()) return;
    let clock = getClock();
    if (!clock) {
      clock = getDefaultClock();
      await saveClock(clock);
      await resetMovement();
      ui.notifications.info(`World clock initialized: ${getDateLabel(clock)}.`);
      return;
    }
    const currentLabel = getDateLabel(clock);
    const nextClock = advanceClockData(clock);
    const nextLabel = getDateLabel(nextClock);
    const result = await new Promise(resolve => {
      new Dialog({
        title: "World Round Clock",
        content: `<div style="text-align:center;padding:12px;"><div style="font-size:14px;opacity:0.8;margin-bottom:5px;">Current Date</div><div style="font-size:28px;font-weight:bold;margin-bottom:16px;">${escapeHtml(currentLabel)}</div><div style="padding:10px;border:1px solid #777;border-radius:6px;margin-bottom:12px;"><strong>Next Round:</strong><br>${escapeHtml(nextLabel)}</div><p class="notes">Advancing the round resets <strong>all World Piece movement</strong> to 0 used.</p></div>`,
        buttons: {
          advance: { label: "Advance Round", callback: () => resolve("advance") },
          resetMovement: { label: "Reset Movement Only", callback: () => resolve("resetMovement") },
          resetClock: { label: "Reset Clock", callback: () => resolve("resetClock") },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "advance"
      }, { width: 520, height: 410, resizable: true }).render(true);
    });
    if (!result) return;
    if (result === "resetMovement") { await resetMovement(); return; }
    if (result === "resetClock") {
      const confirmed = await Dialog.confirm({ title: "Reset World Clock?", content: "<p>This will reset the campaign clock to <strong>Spring 1, 100 AF</strong> and reset movement.</p>" });
      if (!confirmed) return;
      const newClock = getDefaultClock();
      await saveClock(newClock);
      await resetMovement();
      return;
    }
    if (result === "advance") {
      const oldClock = foundry.utils.deepClone(clock);
      const newClock = advanceClockData(clock);
      await saveClock(newClock);
      await resetMovement();
      const economySummary = await collectEconomyForRound(newClock, { scope: "all", force: false, silent: false });
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Round Clock" }), content: `<h2>Round Advanced</h2><p><strong>Previous:</strong> ${escapeHtml(getDateLabel(oldClock))}</p><p><strong>Current:</strong> ${escapeHtml(getDateLabel(newClock))}</p><p>All World Pieces now have their full movement available.</p><p><strong>Economy:</strong> ${economySummary.skipped ? "Already collected" : `${escapeHtml(economySummary.applied)} tile(s) paid ${escapeHtml(resourceMapToText(economySummary.totals))}`}</p>` });
    }
  }

  function buildRouteModeOptions(piece) {
    const pieceType = normalize(piece?.pieceType || "army");
    if (pieceType === "fleet") return `<option value="best" selected>Best Available Route</option><option value="sea">Sea / Port Route only</option><option value="default">Piece Default Route</option>`;
    if (pieceType === "army" || pieceType === "character") return `<option value="best" selected>Best Available Route</option><option value="land">Land Route only</option><option value="default">Piece Default Route</option>`;
    return `<option value="best" selected>Best Available Route</option><option value="land">Land Route only</option><option value="sea">Sea / Port Route only</option><option value="default">Piece Default Route</option>`;
  }

  function buildRegionOptions(selectedRegion, piece) {
    return getRegions().filter(region => getLegalTilesInRegion(region, piece).length).map(region => `<option value="${escapeHtml(region)}" ${region === selectedRegion ? "selected" : ""}>${escapeHtml(region)}</option>`).join("");
  }

  function buildTileOptionsForRegion(region, selectedTileId, piece) {
    return getLegalTilesInRegion(region, piece).map(entry => {
      const tile = entry.tile;
      let label = `${tile.name} [${tile.tileType || "land"}]`;
      if (tile.id === selectedTileId) label += " — Current";
      return `<option value="${escapeHtml(tile.id)}" ${tile.id === selectedTileId ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  async function askDestination(piece, startTile) {
    return await new Promise(resolve => {
      let startRegion = getRegionName(startTile);
      if (!getLegalTilesInRegion(startRegion, piece).length) startRegion = getRegions().find(region => getLegalTilesInRegion(region, piece).length) || startRegion;
      new Dialog({
        title: "World Path Move",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Piece:</strong> ${escapeHtml(piece.name || "World Piece")}<br><strong>Type:</strong> ${escapeHtml(piece.pieceType || "army")}<br><strong>Current Tile:</strong> ${escapeHtml(startTile?.name || "Unknown")}<br><strong>Current Region:</strong> ${escapeHtml(getRegionName(startTile))}<br><strong>Movement:</strong> ${escapeHtml(Number(piece.movementUsed || 0))} / ${escapeHtml(Number(piece.movementMax || 0))} used</div>
          <div class="form-group"><label><strong>Destination Region</strong></label><select name="destinationRegion" style="width:100%;">${buildRegionOptions(startRegion, piece)}</select></div>
          <div class="form-group"><label><strong>Destination Tile</strong></label><select name="destinationTileId" style="width:100%;">${buildTileOptionsForRegion(startRegion, startTile?.id, piece)}</select></div>
          <div class="form-group"><label><strong>Route Mode</strong></label><select name="routeMode" style="width:100%;">${buildRouteModeOptions(piece)}</select></div>
          <div class="form-group"><label>Pause Between Tiles, milliseconds</label><input type="number" name="pauseMs" value="500" min="0" step="100" /></div>
          <p class="notes"><strong>Army / Character:</strong> Land, Port, and Mixed tiles only.<br><strong>Fleet:</strong> Sea and Port tiles only.<br><strong>Dragon:</strong> All terrain types.</p>
        </form>`,
        buttons: {
          move: { label: "Move", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ destinationTileId: String(form.destinationTileId.value || ""), routeMode: String(form.routeMode.value || "best"), pauseMs: Math.max(0, Number(form.pauseMs.value || 500)) });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "move",
        render: html => {
          const form = html[0].querySelector("form");
          const regionSelect = form.querySelector('[name="destinationRegion"]');
          const tileSelect = form.querySelector('[name="destinationTileId"]');
          regionSelect.addEventListener("change", () => {
            const selectedRegion = String(regionSelect.value || "");
            tileSelect.innerHTML = buildTileOptionsForRegion(selectedRegion, startTile?.id, piece);
            tileSelect.disabled = !tileSelect.options.length;
          });
        }
      }, { width: 660, height: 520, resizable: true }).render(true);
    });
  }

  async function pathMove() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one world-map piece token."); return; }

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) { ui.notifications.warn("Selected token is not a world piece."); return; }
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only move world pieces you control."); return; }

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);
    if (!startEntry) { ui.notifications.warn("The selected piece is not currently inside a world tile."); return; }

    const startTile = startEntry.tile;
    const options = await askDestination(piece, startTile);
    if (!options || !options.destinationTileId) return;

    const destinationEntry = getTileById(options.destinationTileId);
    if (!destinationEntry) { ui.notifications.error("Could not find destination tile."); return; }

    const destinationTile = destinationEntry.tile;
    if (!isTileAllowedForPiece(piece, destinationTile)) { ui.notifications.warn(`${piece.name || token.document.name} cannot enter ${destinationTile.name}.`); return; }

    const path = getPathForMode(startTile, destinationTile, piece, options.routeMode);
    if (!path) { ui.notifications.warn(`No valid ${routeModeLabel(options.routeMode)} from ${startTile.name} to ${destinationTile.name}.`); return; }

    const remaining = getMovementRemaining(piece);
    if (path.cost > remaining) { ui.notifications.warn(`Move blocked: needs ${path.cost} movement, but only has ${remaining} remaining.`); return; }
    if (path.cost === 0) { ui.notifications.info(`Already in ${destinationTile.name}.`); return; }

    await executeWorldPathMove(token, piece, startTile, destinationTile, path, options.pauseMs, "World Path Move");
  }

  function getAdjacentIds(tile) { return Array.isArray(tile?.adjacentTileIds) ? [...tile.adjacentTileIds] : []; }
  function getAdjacentNames(tile) { return Array.isArray(tile?.adjacentTileNames) ? [...tile.adjacentTileNames] : []; }
  function addUnique(array, value) { if (!array.includes(value)) array.push(value); }
  function removeValue(array, value) { return array.filter(item => item !== value); }
  function removeNormalizedName(array, value) { const target = normalize(value); return array.filter(item => normalize(item) !== target); }

  async function linkTiles() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 2) { ui.notifications.warn("Select exactly two world tile drawings to link them."); return; }
    const [first, second] = selected;
    const firstTile = foundry.utils.deepClone(getWorldTile(first));
    const secondTile = foundry.utils.deepClone(getWorldTile(second));
    if (!firstTile || !secondTile) { ui.notifications.error("Both selected drawings must already be assigned as world tiles."); return; }
    addUnique(firstTile.adjacentTileIds = getAdjacentIds(firstTile), secondTile.id);
    addUnique(secondTile.adjacentTileIds = getAdjacentIds(secondTile), firstTile.id);
    addUnique(firstTile.adjacentTileNames = getAdjacentNames(firstTile), secondTile.name);
    addUnique(secondTile.adjacentTileNames = getAdjacentNames(secondTile), firstTile.name);
    await first.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, firstTile);
    await second.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, secondTile);
    ui.notifications.info(`Linked ${firstTile.name} ↔ ${secondTile.name}`);
  }

  async function unlinkTiles() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 2) { ui.notifications.warn("Select exactly two world tile drawings to unlink them."); return; }
    const [first, second] = selected;
    const firstTile = foundry.utils.deepClone(getWorldTile(first));
    const secondTile = foundry.utils.deepClone(getWorldTile(second));
    if (!firstTile || !secondTile) { ui.notifications.error("Both selected drawings must be world tiles."); return; }
    firstTile.adjacentTileIds = getAdjacentIds(firstTile).filter(id => id !== secondTile.id);
    secondTile.adjacentTileIds = getAdjacentIds(secondTile).filter(id => id !== firstTile.id);
    firstTile.adjacentTileNames = removeNormalizedName(getAdjacentNames(firstTile), secondTile.name);
    secondTile.adjacentTileNames = removeNormalizedName(getAdjacentNames(secondTile), firstTile.name);
    await first.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, firstTile);
    await second.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, secondTile);
    ui.notifications.info(`Unlinked ${firstTile.name} ↔ ${secondTile.name}`);
  }

  function clearLinkOverlay() {
    const viewer = globalThis[LINK_VIEWER_KEY];
    if (viewer?.overlay) { viewer.overlay.clear(); viewer.overlay.destroy(); }
    globalThis[LINK_VIEWER_KEY] = null;
  }

  async function viewLinks() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    const mode = await new Promise(resolve => {
      new Dialog({
        title: "View World Tile Links",
        content: `<form><p>Show links for selected tiles or the whole scene.</p><div class="form-group"><label>Mode</label><select name="mode"><option value="selected" selected>Selected tile(s)</option><option value="all">All tile links</option><option value="clear">Clear visual overlay</option></select></div><div class="form-group"><label><input type="checkbox" name="drawLines" checked /> Draw temporary link lines</label></div></form>`,
        buttons: { apply: { label: "Apply", callback: html => { const form = html[0].querySelector("form"); resolve({ mode: form.mode.value, drawLines: form.drawLines.checked }); } }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "apply"
      }, { width: 560, height: 320, resizable: true }).render(true);
    });
    if (!mode) return;
    if (mode.mode === "clear") { clearLinkOverlay(); return; }
    const allEntries = getWorldTileEntries();
    const byId = new Map(allEntries.map(entry => [entry.tile.id, entry]));
    const entriesToShow = mode.mode === "all" ? allEntries : selected.map(drawing => ({ drawing, tile: getWorldTile(drawing) })).filter(entry => entry.tile);
    if (!entriesToShow.length) { ui.notifications.warn("No world tiles selected/found."); return; }
    let linksDrawn = 0;
    if (mode.drawLines) {
      clearLinkOverlay();
      const overlay = new PIXI.Graphics();
      overlay.name = "coa-world-tile-link-viewer-overlay";
      overlay.zIndex = 999998;
      overlay.eventMode = "none";
      overlay.interactive = false;
      canvas.stage.sortableChildren = true;
      canvas.stage.addChild(overlay);
      globalThis[LINK_VIEWER_KEY] = { overlay };
      const drawnPairs = new Set();
      for (const entry of entriesToShow) {
        const from = getDrawingCenter(entry.drawing);
        for (const adjacentId of getAdjacentIds(entry.tile)) {
          const linked = byId.get(adjacentId);
          if (!linked) continue;
          const pairKey = [entry.tile.id, linked.tile.id].sort().join("|");
          if (drawnPairs.has(pairKey)) continue;
          drawnPairs.add(pairKey);
          const to = getDrawingCenter(linked.drawing);
          overlay.lineStyle(5, 0x00ccff, 0.85);
          overlay.moveTo(from.x, from.y);
          overlay.lineTo(to.x, to.y);
          overlay.beginFill(0x00ccff, 0.95);
          overlay.drawCircle(from.x, from.y, 9);
          overlay.drawCircle(to.x, to.y, 9);
          overlay.endFill();
          linksDrawn++;
        }
      }
    }
    const rows = entriesToShow.map(entry => {
      const names = getAdjacentIds(entry.tile).map(id => byId.get(id)?.tile?.name || id);
      return `<tr><td style="padding:4px 6px;border:1px solid #999;"><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong></td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(entry.tile.region || "")}</td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(entry.tile.tileType || "land")}</td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(names.length ? names.join(", ") : "No links")}</td></tr>`;
    }).join("");
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Tile Links" }), content: `<h2>World Tile Links</h2><p><strong>Tiles shown:</strong> ${entriesToShow.length}</p><p><strong>Visual links drawn:</strong> ${linksDrawn}</p><table style="border-collapse:collapse;width:100%;"><thead><tr><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Tile</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Region</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Type</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Linked To</th></tr></thead><tbody>${rows}</tbody></table>` });
  }

  async function togglePort() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Tile drawing."); return; }
    const drawing = selected[0];
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("The selected drawing has not been assigned as a World Tile."); return; }
    if (isSeaTile(worldTile)) { ui.notifications.warn("A Sea tile cannot itself be converted into a Port."); return; }
    const portEntry = { drawing, tile: worldTile };
    const portId = getTileId(portEntry);
    const portName = getTileName(portEntry);
    const seaEntries = getWorldTileEntries().filter(entry => isSeaTile(entry.tile)).sort((a, b) => (String(a.tile.region || "") || "").localeCompare(String(b.tile.region || "")) || getTileName(a).localeCompare(getTileName(b)));
    const existingPortSeaIds = Array.isArray(worldTile.portSeaTileIds) ? [...worldTile.portSeaTileIds] : [];
    const seaCheckboxes = seaEntries.map(entry => `<label style="display:block;padding:4px 6px;margin:2px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><input type="checkbox" name="seaTile" value="${escapeHtml(getTileId(entry))}" ${existingPortSeaIds.includes(getTileId(entry)) ? "checked" : ""}> <strong>${escapeHtml(getTileName(entry))}</strong> — ${escapeHtml(entry.tile.region || "Unassigned")}</label>`).join("");
    const portActive = worldTile.portActive === true;
    const result = await new Promise(resolve => {
      new Dialog({
        title: portActive ? "Edit Port" : "Create Port",
        content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Tile:</strong> ${escapeHtml(portName)}<br><strong>Current Type:</strong> ${escapeHtml(getTileType(worldTile))}</div><h3>Connected Sea Tiles</h3><p class="notes">Check every Sea tile that physically touches this Port.</p><div style="max-height:360px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:6px;">${seaCheckboxes || "<em>No Sea tiles found.</em>"}</div></form>`,
        buttons: {
          save: { label: portActive ? "Save Port" : "Create Port", callback: html => { const form = html[0].querySelector("form"); resolve({ action: "save", seaIds: Array.from(form.querySelectorAll('input[name="seaTile"]:checked')).map(input => String(input.value)) }); } },
          ...(portActive ? { disable: { label: "Disable Port", callback: () => resolve({ action: "disable", seaIds: [] }) } } : {}),
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 620, height: 600, resizable: true }).render(true);
    });
    if (!result) return;

    for (const oldSeaId of existingPortSeaIds) {
      const seaEntry = getEntryById(oldSeaId);
      if (!seaEntry) continue;
      const seaData = foundry.utils.deepClone(seaEntry.tile);
      const autoPortLinks = Array.isArray(seaData.autoPortLinks) ? [...seaData.autoPortLinks] : [];
      if (autoPortLinks.includes(portId)) {
        seaData.adjacentTileIds = removeValue(getAdjacentIds(seaData), portId);
        seaData.adjacentTileNames = removeNormalizedName(getAdjacentNames(seaData), portName);
        seaData.autoPortLinks = removeValue(autoPortLinks, portId);
        await seaEntry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, seaData);
      }
    }

    const updatedPort = foundry.utils.deepClone(worldTile);
    let portAdjacentIds = getAdjacentIds(updatedPort);
    let portAdjacentNames = getAdjacentNames(updatedPort);
    for (const oldSeaId of existingPortSeaIds) {
      const seaEntry = getEntryById(oldSeaId);
      if (!seaEntry) continue;
      portAdjacentIds = removeValue(portAdjacentIds, oldSeaId);
      portAdjacentNames = removeNormalizedName(portAdjacentNames, getTileName(seaEntry));
    }

    if (result.action === "disable") {
      updatedPort.tileType = updatedPort.prePortTileType || "land";
      updatedPort.portActive = false;
      updatedPort.portSeaTileIds = [];
      updatedPort.adjacentTileIds = portAdjacentIds;
      updatedPort.adjacentTileNames = portAdjacentNames;
      updatedPort.portDisabledAt = new Date().toISOString();
      updatedPort.portDisabledBy = game.user.name;
      await drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedPort);
      ui.notifications.info(`${portName} is no longer an active Port.`);
      return;
    }

    if (!updatedPort.portActive) {
      const oldType = getTileType(updatedPort);
      updatedPort.prePortTileType = oldType === "port" ? "land" : oldType;
    }
    updatedPort.tileType = "port";
    updatedPort.portActive = true;
    updatedPort.portSeaTileIds = [...result.seaIds];
    updatedPort.portEnabledAt = updatedPort.portEnabledAt || new Date().toISOString();
    updatedPort.portUpdatedAt = new Date().toISOString();
    updatedPort.portUpdatedBy = game.user.name;

    for (const seaId of result.seaIds) {
      const seaEntry = getEntryById(seaId);
      if (!seaEntry) continue;
      const seaName = getTileName(seaEntry);
      addUnique(portAdjacentIds, seaId);
      if (!portAdjacentNames.map(normalize).includes(normalize(seaName))) portAdjacentNames.push(seaName);
      const seaData = foundry.utils.deepClone(seaEntry.tile);
      const seaAdjacentIds = getAdjacentIds(seaData);
      const seaAdjacentNames = getAdjacentNames(seaData);
      addUnique(seaAdjacentIds, portId);
      if (!seaAdjacentNames.map(normalize).includes(normalize(portName))) seaAdjacentNames.push(portName);
      seaData.adjacentTileIds = seaAdjacentIds;
      seaData.adjacentTileNames = seaAdjacentNames;
      const autoPortLinks = Array.isArray(seaData.autoPortLinks) ? [...seaData.autoPortLinks] : [];
      addUnique(autoPortLinks, portId);
      seaData.autoPortLinks = autoPortLinks;
      await seaEntry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, seaData);
    }

    updatedPort.adjacentTileIds = portAdjacentIds;
    updatedPort.adjacentTileNames = portAdjacentNames;
    await drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedPort);
    ui.notifications.info(`${portName} is now an active Port linked to ${result.seaIds.length} Sea tile(s).`);
  }

  function getPortSeaIds(tile) { return Array.isArray(tile?.portSeaTileIds) ? [...tile.portSeaTileIds] : []; }
  function getAdjacentSeaIds(seaTile) { return getAdjacentIds(seaTile).filter(id => { const entry = getEntryById(id); return entry && isSeaTile(entry.tile); }); }

  function getReachableSeaIds(sourcePort) {
    const sourceSeaIds = getPortSeaIds(sourcePort.tile);
    const reachable = new Set(sourceSeaIds);
    for (const sourceSeaId of sourceSeaIds) {
      const seaEntry = getEntryById(sourceSeaId);
      if (!seaEntry || !isSeaTile(seaEntry.tile)) continue;
      for (const adjacentId of getAdjacentSeaIds(seaEntry.tile)) reachable.add(adjacentId);
    }
    return { sourceSeaIds, reachableSeaIds: [...reachable] };
  }

  function getCrossingDestinations(sourcePort) {
    const sourcePortId = getTileId(sourcePort);
    const network = getReachableSeaIds(sourcePort);
    const sourceSeaSet = new Set(network.sourceSeaIds);
    const reachableSet = new Set(network.reachableSeaIds);
    const destinations = [];
    for (const entry of getWorldTileEntries()) {
      if (getTileId(entry) === sourcePortId) continue;
      if (!isActivePort(entry.tile)) continue;
      const sharedReachable = getPortSeaIds(entry.tile).filter(id => reachableSet.has(id));
      if (!sharedReachable.length) continue;
      const sameSea = sharedReachable.some(id => sourceSeaSet.has(id));
      destinations.push({ entry, crossingType: sameSea ? "same-sea" : "adjacent-sea", connectingSeaIds: sharedReachable });
    }
    destinations.sort((a, b) => (String(a.entry.tile.region || "")).localeCompare(String(b.entry.tile.region || "")) || getTileName(a.entry).localeCompare(getTileName(b.entry)));
    return destinations;
  }

  async function portCrossing() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Piece."); return; }
    const token = selected[0];
    const originalPiece = getWorldPiece(token);
    if (!originalPiece) { ui.notifications.warn("The selected token is not a World Piece."); return; }
    if (!canUserControlWorldPiece(token, originalPiece)) { ui.notifications.warn("You can only use Port Crossing with world pieces you control."); return; }
    const pieceType = normalize(originalPiece.pieceType);
    if (pieceType !== "army" && pieceType !== "character") { ui.notifications.warn("Port Crossing is only used by Armies and Characters."); return; }
    let sourcePort = findCurrentTileForToken(token);
    if (!sourcePort && originalPiece.currentTileId) sourcePort = getEntryById(originalPiece.currentTileId);
    if (!sourcePort) { ui.notifications.warn("Could not determine the World Piece's current tile."); return; }
    if (!isActivePort(sourcePort.tile)) { ui.notifications.warn("Port Crossing can only begin from an active Port."); return; }
    if (!getPortSeaIds(sourcePort.tile).length) { ui.notifications.warn("This Port is not linked to any Sea tiles."); return; }
    const movementRemaining = getMovementRemaining(originalPiece);
    const crossingCost = 1;
    if (movementRemaining < crossingCost) { ui.notifications.warn(`This piece needs ${crossingCost} movement point(s), but only has ${movementRemaining} remaining.`); return; }
    const destinations = getCrossingDestinations(sourcePort);
    if (!destinations.length) { ui.notifications.warn("No Ports are within crossing range of this Port."); return; }

    const destinationOptions = destinations.map(destination => {
      const entry = destination.entry;
      const label = `${entry.tile.region ? entry.tile.region + " — " : ""}${getTileName(entry)} ${destination.crossingType === "same-sea" ? "[Same Sea]" : "[Adjacent Sea]"}`;
      return `<option value="${escapeHtml(getTileId(entry))}">${escapeHtml(label)}</option>`;
    }).join("");

    const details = await new Promise(resolve => {
      new Dialog({
        title: "Port Crossing",
        content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Piece:</strong> ${escapeHtml(originalPiece.name || token.document.name)}<br><strong>Type:</strong> ${escapeHtml(pieceType)}<br><strong>Current Port:</strong> ${escapeHtml(getTileName(sourcePort))}<br><strong>Movement:</strong> ${escapeHtml(originalPiece.movementUsed || 0)} / ${escapeHtml(originalPiece.movementMax || 0)} used</div><div class="form-group"><label><strong>Destination Port</strong></label><select name="destinationPortId" style="width:100%;">${destinationOptions}</select></div>${pieceType === "army" ? `<div class="form-group"><label><strong>Current Army Strength</strong></label><input type="number" name="armyStrength" value="${escapeHtml(originalPiece.strengthCurrent ?? "")}" min="1" step="1" style="width:100%;" /><p class="notes">Required for crossing casualties.</p></div>` : ""}<div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;"><strong>Crossing Check</strong><br>${pieceType === "army" ? "1–5 — Safe<br>6–7 — Lose 1d10%<br>8–9 — Lose 20%<br>10 — Lose 30%" : "1–9 — Safe<br>10 — Gain 1 Wound"}<br><br><strong>Movement Cost:</strong> ${crossingCost}</div></form>`,
        buttons: { cross: { label: "Make Crossing", callback: html => { const form = html[0].querySelector("form"); resolve({ destinationPortId: String(form.destinationPortId.value || ""), armyStrength: pieceType === "army" ? Number(form.armyStrength.value || 0) : null }); } }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "cross"
      }, { width: 580, height: pieceType === "army" ? 560 : 500, resizable: true }).render(true);
    });
    if (!details) return;
    if (pieceType === "army" && (!Number.isFinite(details.armyStrength) || details.armyStrength <= 0)) { ui.notifications.warn("Enter the Army's current strength before crossing."); return; }
    const destinationData = destinations.find(destination => getTileId(destination.entry) === details.destinationPortId);
    if (!destinationData) { ui.notifications.error("Could not locate destination Port."); return; }
    const destinationPort = destinationData.entry;
    const crossingRoll = await (new Roll("1d10")).evaluate();
    const crossingResult = Number(crossingRoll.total);
    const piece = foundry.utils.deepClone(originalPiece);
    let lossPercent = 0;
    let soldiersLost = 0;
    let woundGained = false;
    let secondaryRoll = null;
    if (pieceType === "army") {
      const currentStrength = Math.max(1, Math.floor(details.armyStrength));
      piece.strengthCurrent = currentStrength;
      if (piece.strengthMax === undefined || piece.strengthMax === null || Number(piece.strengthMax) < currentStrength) piece.strengthMax = currentStrength;
      if (crossingResult <= 5) lossPercent = 0;
      else if (crossingResult <= 7) { secondaryRoll = await (new Roll("1d10")).evaluate(); lossPercent = Number(secondaryRoll.total); }
      else if (crossingResult <= 9) lossPercent = 20;
      else lossPercent = 30;
      if (lossPercent > 0) { soldiersLost = Math.ceil(currentStrength * (lossPercent / 100)); piece.strengthCurrent = Math.max(0, currentStrength - soldiersLost); }
    }
    if (pieceType === "character" && crossingResult === 10) { piece.wounds = Number(piece.wounds || 0) + 1; woundGained = true; }
    piece.movementUsed = Number(piece.movementUsed || 0) + crossingCost;
    piece.previousTileId = getTileId(sourcePort);
    piece.previousTileName = getTileName(sourcePort);
    piece.currentTileId = getTileId(destinationPort);
    piece.currentTileName = getTileName(destinationPort);
    piece.lastMoveCost = crossingCost;
    piece.lastRouteMode = "crossing";
    piece.lastCrossingRoll = crossingResult;
    piece.lastCrossingLossPercent = lossPercent;
    piece.lastCrossingLosses = soldiersLost;
    piece.lastCrossingFrom = getTileName(sourcePort);
    piece.lastCrossingTo = getTileName(destinationPort);
    piece.lastCrossingType = destinationData.crossingType;
    piece.lastCrossedAt = new Date().toISOString();
    piece.lastCrossedBy = game.user.name;
    piece.lastMovedAt = new Date().toISOString();
    piece.lastMovedBy = game.user.name;
    piece.lastMovedSource = `Crown Overview Tools ${MODULE_VERSION}`;
    const position = getTokenTopLeftForTileSlot(token, destinationPort);
    await saveWorldPiece(token, piece);
    await token.document.update({ x: position.x, y: position.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, portCrossingBypass: true });
    let resultText = "";
    if (pieceType === "army") resultText = lossPercent === 0 ? `<p><strong>Result:</strong> Safe crossing. No soldiers lost.</p>` : `<p><strong>Result:</strong> ${escapeHtml(lossPercent)}% losses.</p><p><strong>Soldiers Lost:</strong> ${escapeHtml(soldiersLost.toLocaleString())}</p><p><strong>Army Strength Remaining:</strong> ${escapeHtml(Number(piece.strengthCurrent).toLocaleString())} / ${escapeHtml(Number(piece.strengthMax).toLocaleString())}</p>`;
    if (pieceType === "character") resultText = woundGained ? `<p><strong>Result:</strong> Dangerous crossing! The character gains 1 Wound.</p><p><strong>Total Wounds:</strong> ${escapeHtml(piece.wounds)}</p>` : `<p><strong>Result:</strong> Safe crossing. No wound suffered.</p>`;
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Port Crossing" }), content: `<h2>Port Crossing</h2><p><strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}</p><p><strong>From:</strong> ${escapeHtml(getTileName(sourcePort))}</p><p><strong>To:</strong> ${escapeHtml(getTileName(destinationPort))}</p><p><strong>Route:</strong> ${destinationData.crossingType === "same-sea" ? "Same Sea Tile" : "Adjacent Sea Tile"}</p><p><strong>Crossing Check:</strong> ${escapeHtml(crossingResult)} on 1d10</p>${secondaryRoll ? `<p><strong>Loss Roll:</strong> ${escapeHtml(secondaryRoll.total)}%</p>` : ""}${resultText}<p><strong>Movement Spent:</strong> ${escapeHtml(crossingCost)}</p><p><strong>Total Movement Used:</strong> ${escapeHtml(piece.movementUsed)} / ${escapeHtml(piece.movementMax || 0)}</p>` });
  }


  function getRoundKey(clock = getClock()) {
    if (!clock) return null;
    return `${Number(clock.year ?? 100)}|${String(clock.season ?? "Spring")}|${Number(clock.round ?? 1)}`;
  }

  function getCurrentTileEntryForToken(token, piece = getWorldPiece(token)) {
    let entry = findTileAtPoint(getTokenCenter(token));
    if (!entry && piece?.currentTileId) entry = getTileById(piece.currentTileId);
    return entry || null;
  }

  function getBuildLedger() {
    return canvas.scene?.getFlag(FLAG_SCOPE, BUILD_LEDGER_KEY) ?? {};
  }

  async function saveBuildLedger(ledger) {
    await canvas.scene.setFlag(FLAG_SCOPE, BUILD_LEDGER_KEY, ledger);
  }

  function getAlreadyBuiltForRound(ledger, roundKey, userId) {
    return ledger?.[roundKey]?.users?.[userId] ?? null;
  }

  function buildBuildingOptions(existingBuildings) {
    const existing = new Set((existingBuildings || []).map(String));
    return BUILDINGS
      .filter(building => !existing.has(building))
      .map(building => `<option value="${escapeHtml(building)}">${escapeHtml(building)}</option>`)
      .join("");
  }

  function resourceKey(value) {
    let text = String(value ?? "")
      .trim()
      .replace(/[：]/g, ":")
      .replace(/[=:\s]+$/g, "")
      .replace(/^[:=\s]+/g, "")
      .replace(/\s+/g, " ");

    // Legacy v0.2.6 could accidentally store keys like "Gold:".
    // Normalise those back to "Gold" so old bad keys do not survive forever.
    text = text.replace(/[=:]+$/g, "").trim();

    if (!text) return "";

    const lower = text.toLowerCase();
    const known = DEFAULT_RESOURCE_NAMES.find(name => name.toLowerCase() === lower);
    return known || titleCase(text);
  }

  function normalizeResourceMap(value) {
    if (!value) return {};
    const output = {};

    if (typeof value === "string") {
      const parts = value.split(/[;,\n]/).map(part => part.trim()).filter(Boolean);
      for (const part of parts) {
        // Accept Gold: 6, Gold:: 6, Gold = 6, Gold 6.
        const match = part.match(/^(.+?)(?:[:=]+|\s+)\s*([-+]?\d+(?:\.\d+)?)$/);
        if (!match) continue;
        const key = resourceKey(match[1]);
        const amount = Number(match[2]);
        if (key && Number.isFinite(amount)) output[key] = Number(output[key] || 0) + amount;
      }
      return output;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        if (!entry) continue;
        const key = resourceKey(entry.name ?? entry.resource ?? entry.key);
        const amount = Number(entry.amount ?? entry.value ?? entry.qty ?? 0);
        if (key && Number.isFinite(amount)) output[key] = Number(output[key] || 0) + amount;
      }
      return output;
    }

    if (typeof value === "object") {
      const canonicalSeen = new Set();
      for (const [rawKey, rawValue] of Object.entries(value)) {
        const key = resourceKey(rawKey);
        const amount = Number(rawValue);
        if (!key || !Number.isFinite(amount)) continue;

        const rawClean = String(rawKey ?? "").trim().replace(/[=:\s]+$/g, "").replace(/^[:=\s]+/g, "").replace(/\s+/g, " ");
        const canonical = normalize(rawClean) === normalize(key);

        // If both a clean key (Gold) and a legacy malformed key (Gold:) exist,
        // keep the clean one rather than adding a phantom duplicate.
        if (!Object.prototype.hasOwnProperty.call(output, key)) {
          output[key] = amount;
          if (canonical) canonicalSeen.add(key);
        } else if (canonical) {
          output[key] = amount;
          canonicalSeen.add(key);
        } else if (!canonicalSeen.has(key)) {
          output[key] = amount;
        }
      }
    }

    return output;
  }

  function resourceMapToText(map, emptyText = "None") {
    const normalized = normalizeResourceMap(map);
    const parts = Object.entries(normalized)
      .filter(([, value]) => Number(value) !== 0)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    return parts.length ? parts.join("; ") : emptyText;
  }


  function getTradeGoodByName(name) {
    const target = normalize(name);
    if (!target) return null;
    return TRADE_GOODS.find(good => normalize(good.name) === target) || null;
  }

  function buildTradeGoodOptions(selectedName = "") {
    const selected = normalize(selectedName);
    let html = '<option value="">None</option>';
    const grouped = new Map();
    for (const good of TRADE_GOODS) {
      if (!grouped.has(good.category)) grouped.set(good.category, []);
      grouped.get(good.category).push(good);
    }
    for (const [category, goods] of grouped.entries()) {
      html += `<optgroup label="${escapeHtml(category)}">`;
      for (const good of goods) {
        const isSelected = normalize(good.name) === selected ? "selected" : "";
        html += `<option value="${escapeHtml(good.name)}" ${isSelected}>${escapeHtml(good.name)} — G${escapeHtml(good.goldValue)} / F${escapeHtml(good.foodValue)}</option>`;
      }
      html += "</optgroup>";
    }
    return html;
  }

  function getHouseTradeGoods(house = {}) {
    const primaryName = house.tradeGoods?.primary?.name || house.primaryTradeGood || house.primaryExport || house.exports || "";
    const secondaryName = house.tradeGoods?.secondary?.name || house.secondaryTradeGood || house.secondaryExport || "";
    const primary = getTradeGoodByName(primaryName);
    const secondary = getTradeGoodByName(secondaryName);
    return { primary, secondary };
  }

  function setHouseTradeGoods(house, primaryName, secondaryName) {
    const primary = getTradeGoodByName(primaryName);
    const secondary = getTradeGoodByName(secondaryName);
    house.tradeGoods = {
      primary: primary ? foundry.utils.deepClone(primary) : null,
      secondary: secondary ? foundry.utils.deepClone(secondary) : null
    };
    house.primaryTradeGood = primary?.name || "";
    house.secondaryTradeGood = secondary?.name || "";
    house.primaryExport = primary?.name || String(primaryName || "").trim();
    house.secondaryExport = secondary?.name || String(secondaryName || "").trim();
    return house;
  }

  function getDefaultMarketForces() {
    const output = {};
    for (const season of ROUND_ORDER.map(item => item.season).filter((value, index, array) => array.indexOf(value) === index)) {
      output[season] = {};
      for (const category of TRADE_GOOD_CATEGORIES) output[season][category] = { gold: 1, food: 1 };
    }
    return output;
  }

  function normalizeMarketForces(value = {}) {
    const output = getDefaultMarketForces();
    for (const [season, categories] of Object.entries(value || {})) {
      if (!output[season]) output[season] = {};
      for (const [category, raw] of Object.entries(categories || {})) {
        const matchedCategory = TRADE_GOOD_CATEGORIES.find(cat => normalize(cat) === normalize(category));
        if (!matchedCategory) continue;
        if (typeof raw === "number" || typeof raw === "string") {
          const amount = Number(raw);
          if (Number.isFinite(amount)) output[season][matchedCategory] = { gold: amount, food: amount };
        } else if (raw && typeof raw === "object") {
          const gold = Number(raw.gold ?? raw.value ?? 1);
          const food = Number(raw.food ?? raw.value ?? gold);
          output[season][matchedCategory] = {
            gold: Number.isFinite(gold) ? gold : 1,
            food: Number.isFinite(food) ? food : 1
          };
        }
      }
    }
    return output;
  }

  function getMarketForces() {
    return normalizeMarketForces(canvas.scene?.getFlag(FLAG_SCOPE, MARKET_FORCES_KEY) ?? {});
  }

  async function saveMarketForces(forces) {
    await canvas.scene.setFlag(FLAG_SCOPE, MARKET_FORCES_KEY, normalizeMarketForces(forces));
  }

  function parseMarketForcesText(text, existing, season) {
    const forces = normalizeMarketForces(existing);
    const lines = String(text || "").split(/\n|;/).map(line => line.trim()).filter(Boolean);
    for (const line of lines) {
      const match = line.match(/^(.+?)(?:[:=]+)\s*([-+]?\d+(?:\.\d+)?)(?:\s*[,/]\s*([-+]?\d+(?:\.\d+)?))?$/);
      if (!match) continue;
      const category = TRADE_GOOD_CATEGORIES.find(cat => normalize(cat) === normalize(match[1]));
      if (!category) continue;
      const gold = Number(match[2]);
      const food = match[3] !== undefined ? Number(match[3]) : gold;
      forces[season][category] = {
        gold: Number.isFinite(gold) ? gold : 1,
        food: Number.isFinite(food) ? food : (Number.isFinite(gold) ? gold : 1)
      };
    }
    return forces;
  }

  function marketForcesToText(forces, season) {
    const normalized = normalizeMarketForces(forces);
    return TRADE_GOOD_CATEGORIES
      .map(category => `${category}: ${normalized[season]?.[category]?.gold ?? 1}, ${normalized[season]?.[category]?.food ?? 1}`)
      .join("\n");
  }

  function getDevelopmentEconomyBonus(house = {}) {
    const level = Math.max(0, Math.min(4, Number(house.developmentLevel ?? (Array.isArray(house.builtBuildings) ? house.builtBuildings.length : 0)) || 0));
    return DEVELOPMENT_ECONOMY_BONUSES[level] || DEVELOPMENT_ECONOMY_BONUSES[0];
  }

  function getTradeGoodIncomeBreakdown(house = {}, clock = getClock()) {
    const forces = getMarketForces();
    const season = String(clock?.season || "Spring");
    const goods = getHouseTradeGoods(house);
    const selectedGoods = [goods.primary, goods.secondary].filter(Boolean);
    let gold = 0;
    let food = 0;
    const rows = [];

    for (const good of selectedGoods) {
      const force = forces[season]?.[good.category] || { gold: 1, food: 1 };
      const goldValue = Math.round(Number(good.goldValue || 0) * Number(force.gold || 1) * 100) / 100;
      const foodValue = Math.round(Number(good.foodValue || 0) * Number(force.food || 1) * 100) / 100;
      gold += goldValue;
      food += foodValue;
      rows.push({ ...good, finalGoldValue: goldValue, finalFoodValue: foodValue, goldMultiplier: force.gold, foodMultiplier: force.food });
    }

    const dev = getDevelopmentEconomyBonus(house);
    gold += Number(dev.gold || 0);
    food += Number(dev.food || 0);

    gold = Math.round(gold * 100) / 100;
    food = Math.round(food * 100) / 100;

    return {
      goods,
      rows,
      development: dev,
      gold,
      food,
      income: { Gold: gold, Food: food },
      text: `Gold: ${gold.toLocaleString(undefined, { maximumFractionDigits: 2 })}; Food: ${food.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    };
  }

  function tradeGoodSummaryText(house = {}, emptyText = "None") {
    const goods = getHouseTradeGoods(house);
    const parts = [];
    if (goods.primary) parts.push(`${goods.primary.name} (${goods.primary.category}, G${goods.primary.goldValue}/F${goods.primary.foodValue})`);
    if (goods.secondary) parts.push(`${goods.secondary.name} (${goods.secondary.category}, G${goods.secondary.goldValue}/F${goods.secondary.foodValue})`);
    return parts.length ? parts.join("; ") : emptyText;
  }

  function getTileEconomyBreakdownText(house = {}, clock = getClock()) {
    const breakdown = getTradeGoodIncomeBreakdown(house, clock);
    const manual = getHouseResourceIncome(house);
    const building = getActiveBuildingIncome(house, clock);
    const manualAndBuildings = scaleResourceMap(addResourceMaps(manual, building), getSeasonMultiplier(clock));
    const total = addResourceMaps(manualAndBuildings, breakdown.income);
    return {
      trade: breakdown,
      manualAndBuildings,
      total,
      totalText: resourceMapToText(total)
    };
  }

  function addResourceMaps(...maps) {
    const output = {};
    for (const map of maps) {
      const normalized = normalizeResourceMap(map);
      for (const [key, value] of Object.entries(normalized)) {
        output[key] = Number(output[key] || 0) + Number(value || 0);
      }
    }
    return output;
  }

  function scaleResourceMap(map, multiplier = 1) {
    const output = {};
    for (const [key, value] of Object.entries(normalizeResourceMap(map))) {
      const result = Number(value || 0) * Number(multiplier || 0);
      output[key] = Number.isInteger(result) ? result : Math.round(result * 100) / 100;
    }
    return output;
  }

  function hasAnyResources(map) {
    return Object.values(normalizeResourceMap(map)).some(value => Number(value) !== 0);
  }

  function getHouseResourceIncome(house = {}) {
    return normalizeResourceMap(house.resourceIncome ?? house.resourcesIncome ?? house.naturalResources ?? house.resourceProduction);
  }

  function getHouseResourceStockpile(house = {}) {
    const stockpile = normalizeResourceMap(house.resourceStockpile ?? house.resources ?? house.stockpile);
    if (house.treasury !== "" && house.treasury !== undefined && house.treasury !== null) {
      const treasury = Number(house.treasury);
      if (Number.isFinite(treasury) && stockpile.Gold === undefined) stockpile.Gold = treasury;
    }
    return stockpile;
  }

  function isEconomyEnabled(house = {}) {
    return house.economyEnabled === true ||
      hasAnyResources(getHouseResourceIncome(house)) ||
      hasAnyResources(getHouseResourceStockpile(house)) ||
      Boolean(getHouseTradeGoods(house).primary || getHouseTradeGoods(house).secondary);
  }

  function getSeasonMultiplier(clock = getClock()) {
    const season = String(clock?.season ?? "Spring");
    const value = SEASON_INCOME_MULTIPLIERS[season];
    return Number.isFinite(Number(value)) ? Number(value) : 1;
  }

  function getNextClockData(clock = getClock()) {
    if (!clock) return null;
    return advanceClockData(clock);
  }

  function roundSortValueFromParts(year, roundIndex) {
    return Number(year ?? 100) * ROUND_ORDER.length + Number(roundIndex ?? 0);
  }

  function roundSortValue(clock = getClock()) {
    if (!clock) return 0;
    return roundSortValueFromParts(clock.year ?? 100, clock.roundIndex ?? 0);
  }

  function roundSortValueFromBuildMeta(meta = {}) {
    if (meta.activeFromSort !== undefined) return Number(meta.activeFromSort || 0);
    if (meta.activeFromYear !== undefined || meta.activeFromRoundIndex !== undefined) return roundSortValueFromParts(meta.activeFromYear ?? 100, meta.activeFromRoundIndex ?? 0);
    return 0;
  }

  function getBuildingRule(building) {
    return BUILDING_RULES[building] || { cost: {}, income: {} };
  }

  function getActiveBuildingIncome(house = {}, clock = getClock()) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
    const details = Array.isArray(house.buildingData) ? house.buildingData : [];
    const detailsByName = new Map(details.map(item => [String(item.name || item.building || ""), item]));
    const currentSort = roundSortValue(clock);
    let total = {};

    for (const building of built) {
      const meta = detailsByName.get(String(building));
      const isActive = !meta || roundSortValueFromBuildMeta(meta) <= currentSort;
      if (!isActive) continue;
      total = addResourceMaps(total, getBuildingRule(building).income);
    }

    return total;
  }

  function getTileTotalIncome(house = {}, clock = getClock()) {
    return getTileEconomyBreakdownText(house, clock).total;
  }

  function getMissingResources(stockpile, cost) {
    const have = normalizeResourceMap(stockpile);
    const need = normalizeResourceMap(cost);
    const missing = {};
    for (const [key, amount] of Object.entries(need)) {
      const deficit = Number(amount || 0) - Number(have[key] || 0);
      if (deficit > 0) missing[key] = deficit;
    }
    return missing;
  }

  function spendResources(stockpile, cost) {
    const result = normalizeResourceMap(stockpile);
    for (const [key, amount] of Object.entries(normalizeResourceMap(cost))) {
      result[key] = Number(result[key] || 0) - Number(amount || 0);
    }
    return result;
  }

  function addResourceIncomeToStockpile(stockpile, income) {
    return addResourceMaps(stockpile, income);
  }

  function syncTreasuryFromResources(house) {
    const stockpile = getHouseResourceStockpile(house);
    house.resourceStockpile = stockpile;
    if (stockpile.Gold !== undefined) house.treasury = stockpile.Gold;
    return house;
  }

  function getEconomyLedger() {
    return canvas.scene?.getFlag(FLAG_SCOPE, ECONOMY_LEDGER_KEY) ?? {};
  }

  async function saveEconomyLedger(ledger) {
    await canvas.scene.setFlag(FLAG_SCOPE, ECONOMY_LEDGER_KEY, ledger);
  }

  function getNextRoundActivation(clock = getClock()) {
    const next = getNextClockData(clock) || getDefaultClock();
    return {
      activeFromRoundKey: getRoundKey(next),
      activeFromDateLabel: getDateLabel(next),
      activeFromYear: Number(next.year ?? 100),
      activeFromRoundIndex: Number(next.roundIndex ?? 0),
      activeFromSort: roundSortValue(next)
    };
  }

  function canUserBuildOnTileForUser(worldTile, house = null, user = game.user) {
    if (!user) return false;
    if (user.isGM) return true;

    const ownerUserId = getTileOwnerUserId(worldTile, house);
    if (ownerUserId) return String(ownerUserId) === String(user.id);

    const ownerUserName = getTileOwnerUserName(worldTile, house);
    if (ownerUserName) return normalize(ownerUserName) === normalize(user.name);

    return false;
  }

  function findActiveGmForScene(sceneId = canvas.scene?.id) {
    const activeGms = game.users.contents.filter(user => user.isGM && user.active);
    if (!activeGms.length) return null;

    return activeGms.find(user => String(user.viewedScene || "") === String(sceneId || "")) || activeGms[0];
  }

  function getPendingBuildRequestsFromPiece(piece) {
    return Array.isArray(piece?.pendingBuildRequests) ? [...piece.pendingBuildRequests] : [];
  }

  function hasPendingBuildForRound(roundKey, userId) {
    if (!roundKey || !userId) return null;
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const requests = getPendingBuildRequestsFromPiece(piece);
      const found = requests.find(request =>
        request &&
        request.status === PENDING_BUILD_STATUS_PENDING &&
        String(request.roundKey || "") === String(roundKey) &&
        String(request.requesterUserId || "") === String(userId)
      );
      if (found) return { token, piece, request: found };
    }
    return null;
  }

  async function savePendingBuildRequest({ token, piece, entry, building }) {
    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const dateLabel = clock ? getDateLabel(clock) : "Unknown Date";
    const existingPending = hasPendingBuildForRound(roundKey, game.user.id);

    if (existingPending) {
      ui.notifications.warn(`You already have a pending build this round: ${existingPending.request.building} at ${existingPending.request.tileName}.`);
      return false;
    }

    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});
    const requests = getPendingBuildRequestsFromPiece(updatedPiece);
    const request = {
      id: foundry.utils.randomID(16),
      status: PENDING_BUILD_STATUS_PENDING,
      sceneId: canvas.scene?.id,
      sceneName: canvas.scene?.name,
      roundKey,
      dateLabel,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      pieceName: updatedPiece.name || token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: entry.tile.id || entry.drawing.document.id,
      tileName: entry.tile.name || "Unnamed Tile",
      building,
      requestedAt: new Date().toISOString(),
      requestedSource: `Crown Overview Tools ${MODULE_VERSION}`
    };

    requests.push(request);
    updatedPiece.pendingBuildRequests = requests;
    updatedPiece.pendingBuildRoundKey = roundKey;
    updatedPiece.pendingBuildBuilding = building;
    updatedPiece.pendingBuildTileId = request.tileId;
    updatedPiece.pendingBuildTileName = request.tileName;
    updatedPiece.pendingBuildRequestedAt = request.requestedAt;
    updatedPiece.lastBuildRoundKey = roundKey;
    updatedPiece.lastBuiltBuilding = building;
    updatedPiece.lastBuiltTileId = request.tileId;
    updatedPiece.lastBuiltTileName = request.tileName;
    updatedPiece.lastBuiltAt = request.requestedAt;
    updatedPiece.lastBuiltBy = game.user.name;
    updatedPiece.lastBuildStatus = PENDING_BUILD_STATUS_PENDING;

    await saveWorldPiece(token, updatedPiece);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Request Queued</h2>
        <p><strong>Player:</strong> ${escapeHtml(game.user.name)}</p>
        <p><strong>Piece:</strong> ${escapeHtml(updatedPiece.name || token.document.name)}</p>
        <p><strong>Tile:</strong> ${escapeHtml(request.tileName)}</p>
        <p><strong>Building:</strong> ${escapeHtml(building)}</p>
        <p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p>
        <p>No active GM was online, so this has been saved as a pending request. A GM can apply it later with <strong>Process Pending Builds</strong>.</p>`
    });

    ui.notifications.info(`No active GM online. Queued pending build: ${building} at ${request.tileName}.`);
    return true;
  }

  async function requestGmBuild({ token, entry, building }) {
    const gm = findActiveGmForScene(canvas.scene?.id);

    if (!gm) {
      const piece = getWorldPiece(token);
      return await savePendingBuildRequest({ token, piece, entry, building });
    }

    const payload = {
      type: "buildRequest",
      targetGmId: gm.id,
      sceneId: canvas.scene?.id,
      sceneName: canvas.scene?.name,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: entry.tile.id || entry.drawing.document.id,
      tileName: entry.tile.name || "Unnamed Tile",
      building
    };

    game.socket.emit(SOCKET_NAME, payload);
    ui.notifications.info(`Build request sent to GM ${gm.name} for ${entry.tile.name || "selected tile"}.`);
    return true;
  }

  async function applyBuildToTile({ token, piece, entry, building, builderUserId, builderUserName }) {
    const builderUser = game.users.get(builderUserId) || null;
    const builderIsGm = Boolean(builderUser?.isGM);
    const worldTile = entry.tile;
    const drawing = entry.drawing;
    const doc = drawing.document;
    const clock = getClock();
    const roundKey = getRoundKey(clock);

    if (!roundKey) throw new Error("World Round Clock is not initialized.");
    if (isSeaByTile(worldTile)) throw new Error("Sea tiles cannot build settlements/buildings.");
    if (!canUserControlWorldPieceForUser(token, piece, builderUser || { id: builderUserId, name: builderUserName, isGM: false })) throw new Error(`${builderUserName} does not control ${piece.name || token.document.name}.`);

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

    if (!canUserBuildOnTileForUser(worldTile, house, builderUser || { id: builderUserId, name: builderUserName, isGM: false })) {
      throw new Error(getBuildBlockedReason(worldTile, house));
    }

    const existingBuildings = Array.isArray(house.builtBuildings) ? [...house.builtBuildings] : [];

    if (existingBuildings.length >= 4) throw new Error(`${worldTile.name || "This tile"} already has the maximum of 4 buildings.`);
    if (existingBuildings.includes(building)) throw new Error(`${building} already exists in ${worldTile.name || "this tile"}.`);

    const ledger = foundry.utils.deepClone(getBuildLedger());
    const existingBuildThisRound = getAlreadyBuiltForRound(ledger, roundKey, builderUserId);

    if (!builderIsGm && existingBuildThisRound) {
      throw new Error(`${builderUserName} has already built this turn: ${existingBuildThisRound.building} at ${existingBuildThisRound.tileName}.`);
    }

    const hasMatchingPendingBuild = getPendingBuildRequestsFromPiece(piece).some(request =>
      request?.status === PENDING_BUILD_STATUS_PENDING &&
      String(request.roundKey || "") === String(roundKey || "") &&
      String(request.requesterUserId || "") === String(builderUserId || "") &&
      String(request.building || "") === String(building || "")
    );

    // v0.2.4: the scene build ledger and pending-build queue are the source of truth for one-build-per-round.
    // Older piece-level lastBuildRoundKey flags can become stale when a GM rewinds the round clock or edits test data,
    // so they are no longer used as a hard blocker here.

    const economyActive = isEconomyEnabled(house);
    const rule = getBuildingRule(building);
    const currentStockpile = getHouseResourceStockpile(house);
    const buildingCost = normalizeResourceMap(rule.cost);
    const missingResources = economyActive ? getMissingResources(currentStockpile, buildingCost) : {};

    if (economyActive && hasAnyResources(missingResources)) {
      throw new Error(`${worldTile.name || "This tile"} lacks the resources for ${building}. Missing: ${resourceMapToText(missingResources)}.`);
    }

    const stockpileAfterCost = economyActive ? spendResources(currentStockpile, buildingCost) : currentStockpile;
    const activation = getNextRoundActivation(clock);

    const updatedBuildings = [...existingBuildings, building].slice(0, 4);
    const developmentLevel = updatedBuildings.length;
    const developmentLabel = DEVELOPMENT_LEVELS[developmentLevel]?.label || "City";
    const oldPopulation = house.population;
    const population = randomPopulation(developmentLevel);
    const now = new Date().toISOString();
    const dateLabel = getDateLabel(clock);

    const updatedHouse = {
      ...house,
      house: house.house || worldTile.owner || "Neutral",
      lord: house.lord || "",
      region: house.region || worldTile.region || "",
      culture: house.culture || "",
      developmentLevel,
      developmentLabel,
      population,
      builtBuildings: updatedBuildings,
      economyEnabled: economyActive || house.economyEnabled === true,
      resourceStockpile: stockpileAfterCost,
      resourceIncome: getHouseResourceIncome(house),
      buildingData: [
        ...(Array.isArray(house.buildingData) ? house.buildingData : []).filter(item => String(item.name || item.building || "") !== String(building)),
        {
          name: building,
          cost: buildingCost,
          income: normalizeResourceMap(rule.income),
          builtRoundKey: roundKey,
          builtDateLabel: dateLabel,
          builtByUserId: builderUserId,
          builtByUserName: builderUserName,
          ...activation
        }
      ],
      worldTileId: doc.id,
      worldTileName: worldTile.name || "Unnamed Tile",
      lastBuiltBuilding: building,
      lastBuiltRoundKey: roundKey,
      lastBuiltDateLabel: dateLabel,
      lastBuiltByUserId: builderUserId,
      lastBuiltByUserName: builderUserName,
      lastBuiltByPieceId: token.document.id,
      lastBuiltByPieceName: piece.name || token.document.name,
      lastBuiltAt: now,
      buildLog: [
        ...(Array.isArray(house.buildLog) ? house.buildLog : []),
        {
          building,
          roundKey,
          dateLabel,
          userId: builderUserId,
          userName: builderUserName,
          pieceId: token.document.id,
          pieceName: piece.name || token.document.name,
          builtAt: now
        }
      ],
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      updatedAt: now,
      updatedBy: game.user.name
    };

    syncTreasuryFromResources(updatedHouse);

    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);

    const updatedPiece = foundry.utils.deepClone(piece);
    updatedPiece.lastBuildRoundKey = roundKey;
    updatedPiece.lastBuiltBuilding = building;
    updatedPiece.lastBuiltTileId = worldTile.id || doc.id;
    updatedPiece.lastBuiltTileName = worldTile.name || "Unnamed Tile";
    updatedPiece.lastBuiltAt = now;
    updatedPiece.lastBuiltBy = builderUserName;
    await saveWorldPiece(token, updatedPiece);

    ledger[roundKey] = ledger[roundKey] || { dateLabel, users: {}, builds: [] };
    ledger[roundKey].dateLabel = dateLabel;
    ledger[roundKey].users = ledger[roundKey].users || {};
    ledger[roundKey].builds = Array.isArray(ledger[roundKey].builds) ? ledger[roundKey].builds : [];
    ledger[roundKey].users[builderUserId] = {
      userName: builderUserName,
      building,
      tileId: worldTile.id || doc.id,
      tileName: worldTile.name || "Unnamed Tile",
      pieceId: token.document.id,
      pieceName: piece.name || token.document.name,
      builtAt: now
    };
    ledger[roundKey].builds.push(ledger[roundKey].users[builderUserId]);
    await saveBuildLedger(ledger);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Building Constructed</h2>
        <p><strong>Player:</strong> ${escapeHtml(builderUserName)}</p>
        <p><strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}</p>
        <p><strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p>
        <p><strong>Tile Owner:</strong> ${escapeHtml(getTileOwnerUserName(worldTile, updatedHouse) || "Unassigned")}</p>
        <p><strong>Building:</strong> ${escapeHtml(building)}</p>
        ${economyActive ? `<p><strong>Cost Paid:</strong> ${escapeHtml(resourceMapToText(buildingCost))}</p><p><strong>Tile Stockpile:</strong> ${escapeHtml(resourceMapToText(stockpileAfterCost))}</p><p><strong>Building Income Starts:</strong> ${escapeHtml(activation.activeFromDateLabel)} — ${escapeHtml(resourceMapToText(rule.income))}</p>` : `<p><strong>Economy:</strong> Not enabled for this tile, so no resource cost was charged.</p>`}
        <p><strong>Development:</strong> ${escapeHtml(developmentLabel)} (${escapeHtml(developmentLevel)} / 4)</p>
        <p><strong>Population:</strong> ${escapeHtml(Number(population).toLocaleString())}${oldPopulation !== undefined && oldPopulation !== "" ? ` <span style="opacity:0.75;">previously ${escapeHtml(oldPopulation)}</span>` : ""}</p>
        <p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p>`
    });

    ui.notifications.info(`${building} built in ${worldTile.name || "selected tile"}.`);
    return true;
  }

  async function handleBuildRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;

    if (String(message.sceneId || "") !== String(canvas.scene?.id || "")) {
      ui.notifications.warn(`Build request from ${message.requesterUserName || "player"} ignored: GM is not on ${message.sceneName || "the requested scene"}.`);
      return;
    }

    try {
      const token = canvas.tokens.get(message.tokenId) || canvas.tokens.placeables.find(t => t.document.id === message.tokenId);
      if (!token) throw new Error(`Could not find world piece token ${message.tokenName || message.tokenId}.`);

      const piece = getWorldPiece(token);
      if (!piece) throw new Error(`${token.document.name} is not a world piece.`);

      const entry = canvas.drawings.placeables
        .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
        .find(candidate => candidate.drawing.document.id === message.drawingId || candidate.tile?.id === message.tileId);

      if (!entry?.tile) throw new Error(`Could not find target tile ${message.tileName || message.tileId}.`);

      ui.notifications.info(`Processing build request from ${message.requesterUserName}: ${message.building} at ${entry.tile.name || "selected tile"}.`);

      await applyBuildToTile({
        token,
        piece,
        entry,
        building: message.building,
        builderUserId: message.requesterUserId,
        builderUserName: message.requesterUserName || "Player"
      });
    } catch (err) {
      console.error("Crown Overview build request failed:", err, message);
      ui.notifications.error(`Build request from ${message.requesterUserName || "player"} failed: ${err.message || err}`);
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
        content: `<h2>Build Request Failed</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Reason:</strong> ${escapeHtml(err.message || err)}</p>`
      });
    }
  }

  function registerSocketHandlers() {
    if (!game.socket) return;
    game.socket.on(SOCKET_NAME, async message => {
      if (!message || message.type !== "buildRequest") return;
      await handleBuildRequest(message);
    });
  }

  function getPendingBuildEntries() {
    const entries = [];
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const requests = getPendingBuildRequestsFromPiece(piece).filter(request => request?.status === PENDING_BUILD_STATUS_PENDING);
      for (const request of requests) entries.push({ token, piece, request });
    }
    return entries;
  }

  async function markPendingBuildRequest(token, piece, requestId, status, extra = {}) {
    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});
    const requests = getPendingBuildRequestsFromPiece(updatedPiece).map(request => {
      if (String(request.id || "") !== String(requestId || "")) return request;
      return {
        ...request,
        status,
        ...extra,
        resolvedAt: new Date().toISOString(),
        resolvedBy: game.user.name
      };
    });

    updatedPiece.pendingBuildRequests = requests;

    const stillPending = requests.find(request => request?.status === PENDING_BUILD_STATUS_PENDING);
    if (!stillPending) {
      delete updatedPiece.pendingBuildRoundKey;
      delete updatedPiece.pendingBuildBuilding;
      delete updatedPiece.pendingBuildTileId;
      delete updatedPiece.pendingBuildTileName;
      delete updatedPiece.pendingBuildRequestedAt;
      if (status === PENDING_BUILD_STATUS_FAILED) {
        delete updatedPiece.lastBuildRoundKey;
        delete updatedPiece.lastBuiltBuilding;
        delete updatedPiece.lastBuiltTileId;
        delete updatedPiece.lastBuiltTileName;
        delete updatedPiece.lastBuiltAt;
        delete updatedPiece.lastBuiltBy;
      }
    }

    updatedPiece.lastBuildStatus = status;
    await saveWorldPiece(token, updatedPiece);
    return updatedPiece;
  }

  async function processPendingBuilds() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can process pending builds.");
      return;
    }

    const pending = getPendingBuildEntries();
    if (!pending.length) {
      ui.notifications.info("There are no pending build requests on this scene.");
      return;
    }

    const rows = pending.map((entry, index) => {
      const request = entry.request;
      return `<label style="display:block;margin:5px 0;padding:5px;border-bottom:1px solid rgba(255,255,255,0.12);">
        <input type="checkbox" name="requestIndex" value="${escapeHtml(index)}" checked>
        <strong>${escapeHtml(request.requesterUserName || "Player")}</strong> — ${escapeHtml(request.building || "Building")} at ${escapeHtml(request.tileName || "Unknown Tile")}
        <br><span style="opacity:0.75;font-size:12px;">Piece: ${escapeHtml(request.pieceName || request.tokenName || entry.token.document.name)} | Date: ${escapeHtml(request.dateLabel || request.roundKey || "Unknown")}</span>
      </label>`;
    }).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Process Pending Builds",
        content: `<form>
          <p>Select pending builds to apply. Failed requests will be marked and reported in chat.</p>
          <div style="max-height:360px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:6px;">${rows}</div>
        </form>`,
        buttons: {
          apply: {
            label: "Apply Selected",
            callback: html => {
              const form = html[0].querySelector("form");
              const indexes = Array.from(form.querySelectorAll('input[name="requestIndex"]:checked')).map(input => Number(input.value));
              resolve({ action: "apply", indexes });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "apply"
      }, { width: 650, height: 520, resizable: true }).render(true);
    });

    if (!result || result.action !== "apply") return;
    if (!result.indexes.length) {
      ui.notifications.warn("No pending builds selected.");
      return;
    }

    let applied = 0;
    let failed = 0;
    let summary = "";

    for (const index of result.indexes) {
      const item = pending[index];
      if (!item) continue;
      const { token, request } = item;
      const piece = getWorldPiece(token);
      if (!piece) continue;

      try {
        const entry = canvas.drawings.placeables
          .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
          .find(candidate => candidate.drawing.document.id === request.drawingId || candidate.tile?.id === request.tileId);

        if (!entry?.tile) throw new Error(`Could not find target tile ${request.tileName || request.tileId}.`);

        await applyBuildToTile({
          token,
          piece,
          entry,
          building: request.building,
          builderUserId: request.requesterUserId,
          builderUserName: request.requesterUserName || "Player"
        });

        await markPendingBuildRequest(token, getWorldPiece(token), request.id, PENDING_BUILD_STATUS_APPLIED, { appliedBuilding: request.building });
        applied++;
        summary += `<li><strong>Applied:</strong> ${escapeHtml(request.requesterUserName || "Player")} — ${escapeHtml(request.building)} at ${escapeHtml(request.tileName)}</li>`;
      } catch (err) {
        console.error("Pending build failed:", err, request);
        await markPendingBuildRequest(token, getWorldPiece(token), request.id, PENDING_BUILD_STATUS_FAILED, { failedReason: String(err.message || err) });
        failed++;
        summary += `<li><strong>Failed:</strong> ${escapeHtml(request.requesterUserName || "Player")} — ${escapeHtml(request.building)} at ${escapeHtml(request.tileName)}<br><span style="color:#ff9999;">${escapeHtml(err.message || err)}</span></li>`;
      }
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Pending Builds Processed</h2><p><strong>Applied:</strong> ${escapeHtml(applied)}</p><p><strong>Failed:</strong> ${escapeHtml(failed)}</p><ul>${summary}</ul>`
    });

    ui.notifications.info(`Pending builds processed: ${applied} applied, ${failed} failed.`);
  }

  function buildRecordMatchesUser(record, targetUserId, targetUserName) {
    if (!record) return false;
    if (String(record.userId || "") === String(targetUserId || "")) return true;
    if (String(record.builderUserId || "") === String(targetUserId || "")) return true;
    if (String(record.requesterUserId || "") === String(targetUserId || "")) return true;
    if (normalize(record.userName || "") && normalize(record.userName || "") === normalize(targetUserName || "")) return true;
    if (normalize(record.builderUserName || "") && normalize(record.builderUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(record.requesterUserName || "") && normalize(record.requesterUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  function pieceBuildBelongsToTarget(piece, targetAllPlayers, targetUserId, targetUserName) {
    if (targetAllPlayers) return true;
    if (!piece) return false;
    if (String(piece.ownerUserId || piece.playerOwnerUserId || piece.controllerUserId || "") === String(targetUserId || "")) return true;
    if (String(piece.lastBuiltByUserId || piece.lastBuildUserId || "") === String(targetUserId || "")) return true;
    if (String(piece.pendingBuildRequesterUserId || "") === String(targetUserId || "")) return true;
    if (normalize(piece.ownerUserName || piece.playerOwnerUserName || piece.controllerUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(piece.lastBuiltBy || piece.lastBuiltByUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  function pendingRequestMatchesTarget(request, targetAllPlayers, targetUserId, targetUserName) {
    if (targetAllPlayers) return true;
    if (!request) return false;
    if (String(request.requesterUserId || "") === String(targetUserId || "")) return true;
    if (String(request.builderUserId || "") === String(targetUserId || "")) return true;
    if (normalize(request.requesterUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(request.builderUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  async function clearBuildTracking({ playerId = "all", scope = "current", clearPieceFlags = true, clearPending = true, forceAllLedger = false } = {}) {
    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const targetAllPlayers = playerId === "all" || forceAllLedger;
    const targetUser = targetAllPlayers ? null : game.users.get(playerId);
    const targetUserName = targetUser?.name || "";

    const ledger = foundry.utils.deepClone(getBuildLedger() || {});
    let ledgerCleared = 0;

    const clearLedgerRound = key => {
      if (!ledger?.[key]) return;
      const round = ledger[key];

      if (targetAllPlayers) {
        ledgerCleared += Object.keys(round.users || {}).length;
        ledgerCleared += Array.isArray(round.builds) ? round.builds.length : 0;
        delete ledger[key];
        return;
      }

      if (round.users) {
        for (const userKey of Object.keys(round.users)) {
          const record = round.users[userKey];
          if (String(userKey) === String(playerId) || buildRecordMatchesUser(record, playerId, targetUserName)) {
            delete round.users[userKey];
            ledgerCleared++;
          }
        }
      }

      if (Array.isArray(round.builds)) {
        const before = round.builds.length;
        round.builds = round.builds.filter(build => !buildRecordMatchesUser(build, playerId, targetUserName));
        ledgerCleared += before - round.builds.length;
      }

      if (!Object.keys(round.users || {}).length && !(round.builds || []).length) delete ledger[key];
    };

    if (scope === "all" || forceAllLedger) {
      for (const key of Object.keys(ledger || {})) clearLedgerRound(key);
    } else if (roundKey) {
      clearLedgerRound(roundKey);
    }

    if (scope === "all" && targetAllPlayers) await canvas.scene.unsetFlag(FLAG_SCOPE, BUILD_LEDGER_KEY);
    else await saveBuildLedger(ledger || {});

    let piecesCleared = 0;
    let pendingCleared = 0;

    if (clearPieceFlags || clearPending || forceAllLedger) {
      for (const token of canvas.tokens.placeables) {
        const piece = getWorldPiece(token);
        if (!piece) continue;

        const belongsToTarget = pieceBuildBelongsToTarget(piece, targetAllPlayers, playerId, targetUserName);
        if (!belongsToTarget) continue;

        const updatedPiece = foundry.utils.deepClone(piece);
        let changed = false;

        const lockMatchesScope = scope === "all" || forceAllLedger || String(updatedPiece.lastBuildRoundKey || "") === String(roundKey || "");
        if ((clearPieceFlags || forceAllLedger) && lockMatchesScope) {
          for (const key of [
            "lastBuildRoundKey", "lastBuiltBuilding", "lastBuiltTileId", "lastBuiltTileName", "lastBuiltAt", "lastBuiltBy",
            "lastBuiltByUserId", "lastBuiltByUserName", "lastBuildStatus", "pendingBuildRoundKey", "pendingBuildBuilding",
            "pendingBuildTileId", "pendingBuildTileName", "pendingBuildRequestedAt", "pendingBuildRequesterUserId"
          ]) delete updatedPiece[key];
          changed = true;
        }

        if ((clearPending || forceAllLedger) && Array.isArray(updatedPiece.pendingBuildRequests)) {
          const before = updatedPiece.pendingBuildRequests.length;
          updatedPiece.pendingBuildRequests = updatedPiece.pendingBuildRequests.filter(request => {
            const requestMatchesScope = scope === "all" || forceAllLedger || String(request.roundKey || "") === String(roundKey || "");
            if (!requestMatchesScope) return true;
            return !pendingRequestMatchesTarget(request, targetAllPlayers, playerId, targetUserName);
          });
          pendingCleared += before - updatedPiece.pendingBuildRequests.length;
          if (updatedPiece.pendingBuildRequests.length !== before) changed = true;
        }

        const pendingStillActive = Array.isArray(updatedPiece.pendingBuildRequests) && updatedPiece.pendingBuildRequests.some(request => request?.status === PENDING_BUILD_STATUS_PENDING);
        if (!pendingStillActive) {
          delete updatedPiece.pendingBuildRoundKey;
          delete updatedPiece.pendingBuildBuilding;
          delete updatedPiece.pendingBuildTileId;
          delete updatedPiece.pendingBuildTileName;
          delete updatedPiece.pendingBuildRequestedAt;
        }

        if (changed) {
          updatedPiece.lastBuildResetAt = new Date().toISOString();
          updatedPiece.lastBuildResetBy = game.user.name;
          updatedPiece.lastBuildResetSource = `Crown Overview Tools ${MODULE_VERSION}`;
          await saveWorldPiece(token, updatedPiece);
          piecesCleared++;
        }
      }
    }

    return { ledgerCleared, piecesCleared, pendingCleared, roundKey };
  }

  async function clearSelectedWorldPieceBuildLocks({ scope = "current", roundKey = null } = {}) {
    const selectedTokens = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    let piecesCleared = 0;
    let pendingCleared = 0;

    for (const token of selectedTokens) {
      const piece = getWorldPiece(token);
      if (!piece) continue;

      const updatedPiece = foundry.utils.deepClone(piece);
      let changed = false;
      const lockMatchesScope = scope === "all" || String(updatedPiece.lastBuildRoundKey || "") === String(roundKey || "");

      if (lockMatchesScope) {
        for (const key of [
          "lastBuildRoundKey", "lastBuiltBuilding", "lastBuiltTileId", "lastBuiltTileName", "lastBuiltAt", "lastBuiltBy",
          "lastBuiltByUserId", "lastBuiltByUserName", "lastBuildStatus", "pendingBuildRoundKey", "pendingBuildBuilding",
          "pendingBuildTileId", "pendingBuildTileName", "pendingBuildRequestedAt", "pendingBuildRequesterUserId"
        ]) delete updatedPiece[key];
        changed = true;
      }

      if (Array.isArray(updatedPiece.pendingBuildRequests)) {
        const before = updatedPiece.pendingBuildRequests.length;
        updatedPiece.pendingBuildRequests = updatedPiece.pendingBuildRequests.filter(request => {
          const requestMatchesScope = scope === "all" || String(request.roundKey || "") === String(roundKey || "");
          return !requestMatchesScope;
        });
        pendingCleared += before - updatedPiece.pendingBuildRequests.length;
        if (updatedPiece.pendingBuildRequests.length !== before) changed = true;
      }

      const pendingStillActive = Array.isArray(updatedPiece.pendingBuildRequests) && updatedPiece.pendingBuildRequests.some(request => request?.status === PENDING_BUILD_STATUS_PENDING);
      if (!pendingStillActive) {
        delete updatedPiece.pendingBuildRoundKey;
        delete updatedPiece.pendingBuildBuilding;
        delete updatedPiece.pendingBuildTileId;
        delete updatedPiece.pendingBuildTileName;
        delete updatedPiece.pendingBuildRequestedAt;
        delete updatedPiece.pendingBuildRequesterUserId;
      }

      if (changed) {
        updatedPiece.lastBuildResetAt = new Date().toISOString();
        updatedPiece.lastBuildResetBy = game.user.name;
        updatedPiece.lastBuildResetSource = `Crown Overview Tools ${MODULE_VERSION} selected-piece reset`;
        await saveWorldPiece(token, updatedPiece);
        piecesCleared++;
      }
    }

    return { piecesCleared, pendingCleared, selectedCount: selectedTokens.length };
  }

  async function resetBuildCapacity() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can reset build uses.");
      return;
    }

    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const currentLabel = clock ? getDateLabel(clock) : "Current Round";
    const selectedWorldPieces = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    const players = getPlayerUsers();
    const playerOptions = [
      `<option value="all" selected>All players</option>`,
      ...players.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Reset Build Uses",
        content: `<form>
          <p>Clear one-build-per-round tracking. This does not remove buildings from tiles.</p>
          <div class="form-group">
            <label>Player</label>
            <select name="playerId" style="width:100%;">${playerOptions}</select>
          </div>
          <div class="form-group">
            <label>Reset Scope</label>
            <select name="scope" style="width:100%;">
              <option value="current" selected>Current round only — ${escapeHtml(currentLabel)}</option>
              <option value="all">All rounds / full build ledger</option>
            </select>
          </div>
          <div class="form-group"><label><input type="checkbox" name="clearPieceFlags" checked> Clear world piece build locks</label></div>
          <div class="form-group"><label><input type="checkbox" name="clearPending" checked> Clear pending build requests for the selected scope</label></div>
          ${selectedWorldPieces.length ? `<div class="form-group"><label><input type="checkbox" name="clearSelectedPieces" checked> Force-clear selected world piece token(s): ${escapeHtml(selectedWorldPieces.length)}</label></div>` : ""}
          <p class="notes">If a player is stuck, select their world piece and use Current round, or choose All players + All rounds / Repair Build Locks.</p>
        </form>`,
        buttons: {
          reset: { label: "Reset Build Uses", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              playerId: String(form.playerId.value || "all"),
              scope: String(form.scope.value || "current"),
              clearPieceFlags: form.clearPieceFlags.checked,
              clearPending: form.clearPending.checked,
              clearSelectedPieces: Boolean(form.clearSelectedPieces?.checked)
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "reset"
      }, { width: 560, height: 410, resizable: true }).render(true);
    });

    if (!result) return;
    if (result.scope === "current" && !roundKey) {
      ui.notifications.warn("The World Round Clock is not initialized, so there is no current round to reset.");
      return;
    }

    const targetName = result.playerId === "all" ? "All players" : (game.users.get(result.playerId)?.name || result.playerId);
    const summary = await clearBuildTracking(result);

    if (result.clearSelectedPieces) {
      const selectedSummary = await clearSelectedWorldPieceBuildLocks({ scope: result.scope, roundKey });
      summary.piecesCleared += selectedSummary.piecesCleared;
      summary.pendingCleared += selectedSummary.pendingCleared;
      summary.selectedPiecesChecked = selectedSummary.selectedCount;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Uses Reset</h2><p><strong>Player:</strong> ${escapeHtml(targetName)}</p><p><strong>Scope:</strong> ${escapeHtml(result.scope === "all" ? "All rounds" : currentLabel)}</p><p><strong>Ledger entries cleared:</strong> ${escapeHtml(summary.ledgerCleared)}</p><p><strong>Pending requests cleared:</strong> ${escapeHtml(summary.pendingCleared)}</p><p><strong>World pieces unlocked:</strong> ${escapeHtml(summary.piecesCleared)}</p>${summary.selectedPiecesChecked ? `<p><strong>Selected pieces force-checked:</strong> ${escapeHtml(summary.selectedPiecesChecked)}</p>` : ""}`
    });

    ui.notifications.info(`Build uses reset for ${targetName}. World pieces unlocked: ${summary.piecesCleared}.`);
  }

  async function repairBuildLocks() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can repair build locks.");
      return;
    }

    const confirmed = await Dialog.confirm({
      title: "Repair Build Locks?",
      content: `<p>This will hard-clear the scene build ledger, pending build requests, and build-lock fields from every World Piece on this scene.</p><p><strong>It will not remove buildings from holdings.</strong></p>`
    });

    if (!confirmed) return;

    const summary = await clearBuildTracking({ playerId: "all", scope: "all", clearPieceFlags: true, clearPending: true, forceAllLedger: true });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Locks Repaired</h2><p><strong>Scene:</strong> ${escapeHtml(canvas.scene?.name || "Unknown")}</p><p><strong>Ledger entries cleared:</strong> ${escapeHtml(summary.ledgerCleared)}</p><p><strong>Pending requests cleared:</strong> ${escapeHtml(summary.pendingCleared)}</p><p><strong>World pieces unlocked:</strong> ${escapeHtml(summary.piecesCleared)}</p><p>Existing buildings on tiles were not changed.</p>`
    });

    ui.notifications.info(`Build locks repaired. World pieces unlocked: ${summary.piecesCleared}.`);
  }

  async function buildOnCurrentTile() {
    if (!requireOverviewScene()) return;

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) {
      ui.notifications.warn("Select exactly one world piece first.");
      return;
    }

    const token = selected[0];
    const piece = getWorldPiece(token);

    if (!piece) {
      ui.notifications.warn("Selected token is not a world piece.");
      return;
    }

    if (!canUserControlWorldPiece(token, piece)) {
      ui.notifications.warn("You can only build with world pieces you control.");
      return;
    }

    const clock = getClock();
    const roundKey = getRoundKey(clock);

    if (!roundKey) {
      ui.notifications.warn("Initialize the World Round Clock before building, so the one-building-per-turn rule can be tracked.");
      return;
    }

    const entry = getCurrentTileEntryForToken(token, piece);
    if (!entry) {
      ui.notifications.warn("Could not determine which world tile this piece occupies.");
      return;
    }

    const worldTile = entry.tile;
    const drawing = entry.drawing;
    const doc = drawing.document;

    if (isSeaByTile(worldTile)) {
      ui.notifications.warn("Sea tiles cannot build settlements/buildings.");
      return;
    }

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

    if (!canUserBuildOnTile(worldTile, house)) {
      ui.notifications.warn(getBuildBlockedReason(worldTile, house));
      return;
    }

    const existingBuildings = Array.isArray(house.builtBuildings) ? [...house.builtBuildings] : [];

    if (existingBuildings.length >= 4) {
      ui.notifications.warn(`${worldTile.name || "This tile"} already has the maximum of 4 buildings.`);
      return;
    }

    const ledger = foundry.utils.deepClone(getBuildLedger());
    const existingBuildThisRound = getAlreadyBuiltForRound(ledger, roundKey, game.user.id);
    const pendingBuildThisRound = hasPendingBuildForRound(roundKey, game.user.id);

    if (!game.user.isGM && pendingBuildThisRound) {
      ui.notifications.warn(`You already have a pending build this turn: ${pendingBuildThisRound.request.building} at ${pendingBuildThisRound.request.tileName}.`);
      return;
    }

    if (!game.user.isGM && existingBuildThisRound) {
      ui.notifications.warn(`You have already built this turn: ${existingBuildThisRound.building} at ${existingBuildThisRound.tileName}.`);
      return;
    }

    // v0.2.4: do not block on piece.lastBuildRoundKey.
    // The player build ledger and pending-build queue handle one-build-per-round.
    // This avoids stale token locks after GM testing, rollback, or manual house edits.

    const buildingOptions = buildBuildingOptions(existingBuildings);
    if (!buildingOptions) {
      ui.notifications.warn("No available buildings remain for this tile.");
      return;
    }

    const currentLevel = Math.min(existingBuildings.length, 4);
    const nextLevel = Math.min(existingBuildings.length + 1, 4);
    const currentDevelopment = DEVELOPMENT_LEVELS[currentLevel]?.label || "Ruins";
    const nextDevelopment = DEVELOPMENT_LEVELS[nextLevel]?.label || "City";
    const dateLabel = getDateLabel(clock);

    const details = await new Promise(resolve => {
      new Dialog({
        title: `Build — ${worldTile.name || "World Tile"}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}<br>
            <strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>Region:</strong> ${escapeHtml(worldTile.region || house.region || "None")}<br>
            <strong>Player Owner:</strong> ${escapeHtml(getTileOwnerUserName(worldTile, house) || (game.user.isGM ? "GM Override" : "Unassigned"))}<br>
            <strong>Date:</strong> ${escapeHtml(dateLabel)}<br>
            <strong>Buildings:</strong> ${escapeHtml(existingBuildings.length)} / 4<br>
            <strong>Development:</strong> ${escapeHtml(currentDevelopment)} → ${escapeHtml(nextDevelopment)}<br>
            <strong>Resources:</strong> ${escapeHtml(resourceMapToText(getHouseResourceStockpile(house)))}
          </div>

          <div class="form-group">
            <label><strong>Building to construct</strong></label>
            <select name="building" style="width:100%;">
              ${buildingOptions}
            </select>
          </div>

          <div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;">
            <strong>Existing Buildings:</strong><br>
            ${existingBuildings.length ? escapeHtml(existingBuildings.join(", ")) : "None"}
          </div>

          <div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;">
            <strong>Building costs/income:</strong><br>
            ${BUILDINGS.filter(name => !existingBuildings.includes(name)).map(name => `${escapeHtml(name)} — Cost: ${escapeHtml(resourceMapToText(getBuildingRule(name).cost))}; Income next round: ${escapeHtml(resourceMapToText(getBuildingRule(name).income))}`).join("<br>")}
          </div>

          <p class="notes">Players may place one building per world round. Each tile can hold a maximum of four buildings. Resource costs are enforced once economy is enabled for this tile.</p>
        </form>`,
        buttons: {
          build: {
            label: "Build",
            callback: html => {
              const form = html[0].querySelector("form");
              resolve({ building: String(form.building.value || "").trim() });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "build"
      }, { width: 560, height: 430, resizable: true }).render(true);
    });

    if (!details?.building) return;

    if (existingBuildings.includes(details.building)) {
      ui.notifications.warn(`${details.building} already exists in ${worldTile.name}.`);
      return;
    }

    if (!game.user.isGM) {
      await requestGmBuild({ token, entry, building: details.building });
      return;
    }

    await applyBuildToTile({
      token,
      piece,
      entry,
      building: details.building,
      builderUserId: game.user.id,
      builderUserName: game.user.name
    });
  }

  async function assignTileOwner() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can assign tile owners.");
      return;
    }

    const selected = canvas.drawings.controlled
      .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
      .filter(entry => Boolean(entry.tile));

    if (!selected.length) {
      ui.notifications.warn("Select one or more world tile drawings first.");
      return;
    }

    const players = getPlayerUsers();
    if (!players.length) {
      ui.notifications.warn("No non-GM player users found.");
      return;
    }

    const currentHouse = selected.length === 1 ? getHouseData(selected[0].drawing) : null;
    const currentTile = selected.length === 1 ? selected[0].tile : null;
    const currentOwnerId = getTileOwnerUserId(currentTile, currentHouse);
    const currentOwnerName = getTileOwnerUserName(currentTile, currentHouse);

    const userOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / clear owner</option>`,
      ...players.map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Assign Tile Owner",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Tiles selected:</strong> ${escapeHtml(selected.length)}<br>
            ${selected.length === 1 ? `<strong>Tile:</strong> ${escapeHtml(selected[0].tile.name || "Unnamed Tile")}<br>` : ""}
            <strong>Current Player Owner:</strong> ${escapeHtml(currentOwnerName || "Unassigned")}
          </div>

          <div class="form-group">
            <label><strong>Player Owner</strong></label>
            <select name="ownerUserId" style="width:100%;">
              ${userOptions}
            </select>
            <p class="notes">Players can build only on tiles assigned to their Foundry player account.</p>
          </div>

          <div class="form-group">
            <label>Ruler Display Name</label>
            <input type="text" name="rulerName" value="${escapeHtml(currentHouse?.lord || currentOwnerName || "")}" style="width:100%;" />
            <p class="notes">This is the visible Ruler field shown in the hover tooltip. It can be character flavour; the actual build permission uses the selected player above.</p>
          </div>

          <div class="form-group">
            <label>
              <input type="checkbox" name="updateRuler" checked />
              Update Lord / Ruler display field
            </label>
          </div>
        </form>`,
        buttons: {
          save: {
            label: "Assign Owner",
            callback: html => {
              const form = html[0].querySelector("form");
              resolve({
                ownerUserId: String(form.ownerUserId.value || ""),
                rulerName: String(form.rulerName.value || "").trim(),
                updateRuler: form.updateRuler.checked
              });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 560, height: 410, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    const ownerName = ownerUser?.name || "";
    const now = new Date().toISOString();
    let updated = 0;
    const rows = [];

    for (const entry of selected) {
      const drawing = entry.drawing;
      const doc = drawing.document;
      const worldTile = foundry.utils.deepClone(entry.tile || {});
      const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

      if (ownerUser) {
        worldTile.ownerUserId = ownerUser.id;
        worldTile.ownerUserName = ownerUser.name;
        worldTile.playerOwnerUserId = ownerUser.id;
        worldTile.playerOwnerUserName = ownerUser.name;

        house.ownerUserId = ownerUser.id;
        house.ownerUserName = ownerUser.name;
        house.playerOwnerUserId = ownerUser.id;
        house.playerOwnerUserName = ownerUser.name;
      } else {
        delete worldTile.ownerUserId;
        delete worldTile.ownerUserName;
        delete worldTile.playerOwnerUserId;
        delete worldTile.playerOwnerUserName;

        delete house.ownerUserId;
        delete house.ownerUserName;
        delete house.playerOwnerUserId;
        delete house.playerOwnerUserName;
      }

      if (result.updateRuler) {
        house.lord = result.rulerName || ownerName || "";
      }

      house.region = house.region || worldTile.region || "";
      house.worldTileId = doc.id;
      house.worldTileName = worldTile.name || "Unnamed Tile";
      house.ownerAssignedAt = now;
      house.ownerAssignedBy = game.user.name;
      house.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;
      house.version = `Crown Overview Tools ${MODULE_VERSION}`;
      house.updatedAt = now;
      house.updatedBy = game.user.name;

      worldTile.ownerAssignedAt = now;
      worldTile.ownerAssignedBy = game.user.name;
      worldTile.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;

      await doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, worldTile);
      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, house);

      updated++;
      rows.push(`<li><strong>${escapeHtml(worldTile.name || "Unnamed Tile")}</strong> → ${escapeHtml(ownerName || "Unassigned")}${house.lord ? `, ruler display: ${escapeHtml(house.lord)}` : ""}</li>`);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Tile Owner" }),
      content: `<h2>Tile Owner Assigned</h2>
        <p><strong>Updated:</strong> ${escapeHtml(updated)}</p>
        <p><strong>Player Owner:</strong> ${escapeHtml(ownerName || "Unassigned")}</p>
        <ul>${rows.join("")}</ul>`
    });

    ui.notifications.info(`Assigned owner for ${updated} tile(s): ${ownerName || "Unassigned"}.`);
  }

  async function assignHouse() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select one world tile drawing first."); return; }
    const drawing = selected[0];
    const doc = drawing.document;
    const worldTile = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
    if (!worldTile) { ui.notifications.warn("This drawing has not been assigned as a World Tile."); return; }
    const isSea = isSeaByTile(worldTile);
    const existing = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
    const existingBuildings = !isSea && Array.isArray(existing.builtBuildings) ? existing.builtBuildings : [];
    const currentBuildingCount = Math.min(existingBuildings.length, 4);
    const currentDevelopment = DEVELOPMENT_LEVELS[currentBuildingCount];
    const cultureOptions = CULTURES.map(culture => `<option value="${escapeHtml(culture)}" ${existing.culture === culture ? "selected" : ""}>${escapeHtml(culture)}</option>`).join("");
    const buildingOptions = BUILDINGS.map(building => `<label style="display:block;margin:4px 0;"><input type="checkbox" name="building" value="${escapeHtml(building)}" ${existingBuildings.includes(building) ? "checked" : ""}> ${escapeHtml(building)}</label>`).join("");
    const cultureSection = isSea ? "" : `<div class="form-group"><label>Culture</label><select name="culture" style="width:100%;"><option value="">Select Culture</option>${cultureOptions}</select></div>`;
    const developmentSection = isSea ? `<hr><h2>Sea Tile</h2><div style="padding:10px;border:1px solid #777;border-radius:6px;margin-bottom:10px;"><strong>Sea Terrain</strong><br><span style="font-size:12px;opacity:0.85;">Development, population, culture, and built buildings do not apply to sea tiles.</span></div>` : `<hr><h2>Development</h2><div style="padding:8px;border:1px solid #777;border-radius:6px;margin-bottom:10px;"><strong>Current Development:</strong> ${escapeHtml(currentBuildingCount + " — " + currentDevelopment.label)}<br><strong>Built Buildings:</strong> ${escapeHtml(currentBuildingCount)} / 4</div><div class="form-group"><label>Population</label><input type="number" name="population" value="${escapeHtml(existing.population ?? "")}" style="width:100%;" /><p class="notes">Population rerolls automatically whenever the number of built buildings changes.</p></div>`;
    const buildingsSection = isSea ? "" : `<hr><h2>Built Buildings</h2><p>A tile may have a maximum of <strong>4 buildings</strong>.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;">${buildingOptions}</div>`;
    const currentOwnerId = getTileOwnerUserId(worldTile, existing) || "";
    const ownerOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / clear owner</option>`,
      ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    new Dialog({
      title: `House Data — ${worldTile.name || "Unnamed World Tile"}`,
      content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>World Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br><strong>Region:</strong> ${escapeHtml(worldTile.region || "None")}<br><strong>Terrain:</strong> ${escapeHtml(worldTile.terrainLabel || worldTile.terrainKey || "None")}</div><h2>House</h2><div class="form-group"><label>House Name</label><input type="text" name="house" value="${escapeHtml(existing.house ?? worldTile.owner ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Player Owner</label><select name="ownerUserId" style="width:100%;">${ownerOptions}</select><p class="notes">This controls which Foundry player can build on this tile. This is separate from the visible Lord / Ruler text.</p></div><div class="form-group"><label>Lord / Ruler</label><input type="text" name="lord" value="${escapeHtml(existing.lord ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Region</label><input type="text" name="region" value="${escapeHtml(existing.region ?? worldTile.region ?? "")}" style="width:100%;" /></div>${cultureSection}${developmentSection}<hr><h2>Economy</h2><div class="form-group"><label>Primary Export</label><input type="text" name="primaryExport" value="${escapeHtml(existing.primaryExport ?? existing.exports ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Secondary Export</label><input type="text" name="secondaryExport" value="${escapeHtml(existing.secondaryExport ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Treasury</label><input type="number" name="treasury" value="${escapeHtml(existing.treasury ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Allegiance</label><input type="text" name="allegiance" value="${escapeHtml(existing.allegiance ?? "")}" style="width:100%;" /></div>${buildingsSection}</form>`,
      buttons: { save: { label: "Save House Data", callback: async html => {
        const form = html[0].querySelector("form");
        const buildings = isSea ? [] : Array.from(form.querySelectorAll('input[name="building"]:checked')).map(input => input.value);
        const ownerUserId = String(form.ownerUserId.value || "");
        const ownerUser = ownerUserId ? game.users.get(ownerUserId) : null;
        if (!isSea && buildings.length > 4) { ui.notifications.error("A world tile may have no more than 4 built buildings."); return; }
        let developmentLevel = null, developmentLabel = null, population = null;
        if (!isSea) {
          developmentLevel = buildings.length;
          developmentLabel = DEVELOPMENT_LEVELS[developmentLevel].label;
          const oldBuildingCount = Array.isArray(existing.builtBuildings) ? existing.builtBuildings.length : 0;
          const populationRaw = String(form.population.value ?? "").trim();
          population = populationRaw === "" ? "" : Number(populationRaw);
          if (oldBuildingCount !== buildings.length || population === "" || Number.isNaN(Number(population))) population = randomPopulation(developmentLevel);
        }
        const now = new Date().toISOString();
        const updatedWorldTile = foundry.utils.deepClone(worldTile || {});
        const houseData = {
          house: String(form.house.value || "").trim(),
          lord: String(form.lord.value || "").trim(),
          region: String(form.region.value || "").trim(),
          primaryExport: String(form.primaryExport.value || "").trim(),
          secondaryExport: String(form.secondaryExport.value || "").trim(),
          treasury: String(form.treasury.value || "").trim() === "" ? "" : Number(form.treasury.value),
          allegiance: String(form.allegiance.value || "").trim(),
          worldTileId: doc.id,
          worldTileName: worldTile.name,
          ownerAssignedAt: existing.ownerAssignedAt || worldTile.ownerAssignedAt || "",
          ownerAssignedBy: existing.ownerAssignedBy || worldTile.ownerAssignedBy || "",
          version: `Crown Overview Tools ${MODULE_VERSION}`,
          updatedAt: now,
          updatedBy: game.user.name
        };

        if (ownerUser) {
          updatedWorldTile.ownerUserId = ownerUser.id;
          updatedWorldTile.ownerUserName = ownerUser.name;
          updatedWorldTile.playerOwnerUserId = ownerUser.id;
          updatedWorldTile.playerOwnerUserName = ownerUser.name;
          updatedWorldTile.ownerAssignedAt = now;
          updatedWorldTile.ownerAssignedBy = game.user.name;
          updatedWorldTile.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION} House Data`;

          houseData.ownerUserId = ownerUser.id;
          houseData.ownerUserName = ownerUser.name;
          houseData.playerOwnerUserId = ownerUser.id;
          houseData.playerOwnerUserName = ownerUser.name;
          houseData.ownerAssignedAt = now;
          houseData.ownerAssignedBy = game.user.name;
        } else {
          delete updatedWorldTile.ownerUserId;
          delete updatedWorldTile.ownerUserName;
          delete updatedWorldTile.playerOwnerUserId;
          delete updatedWorldTile.playerOwnerUserName;
          houseData.ownerUserId = "";
          houseData.ownerUserName = "";
          houseData.playerOwnerUserId = "";
          houseData.playerOwnerUserName = "";
        }

        if (!isSea) {
          houseData.culture = String(form.culture.value || "").trim();
          houseData.developmentLevel = developmentLevel;
          houseData.developmentLabel = developmentLabel;
          houseData.population = population;
          houseData.builtBuildings = buildings;
        }
        await doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedWorldTile);
        await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
        await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, houseData);
        ui.notifications.info(isSea ? `Saved ${houseData.house || worldTile.name} — Sea Tile` : `Saved ${houseData.house || worldTile.name} — ${developmentLabel} (${developmentLevel} buildings) — Population ${Number(population).toLocaleString()}${ownerUser ? " — Owner " + ownerUser.name : ""}`);
      } }, cancel: { label: "Cancel" } },
      default: "save"
    }, { width: 680, height: 820, resizable: true }).render(true);
  }


  function getHoldingsForUser(user) {
    const entries = [];
    for (const entry of getWorldTileEntries()) {
      const house = getHouseData(entry.drawing) || {};
      const ownerId = getTileOwnerUserId(entry.tile, house);
      const ownerName = getTileOwnerUserName(entry.tile, house);
      const matches = user
        ? ((ownerId && String(ownerId) === String(user.id)) || (!ownerId && ownerName && normalize(ownerName) === normalize(user.name)))
        : Boolean(ownerId || ownerName);
      if (matches) entries.push({ ...entry, house });
    }
    entries.sort((a, b) => {
      const ar = String(a.house.region || a.tile.region || "");
      const br = String(b.house.region || b.tile.region || "");
      return ar.localeCompare(br) || String(a.tile.name || "").localeCompare(String(b.tile.name || ""));
    });
    return entries;
  }

  function numberText(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toLocaleString() : "0";
  }

  function holdingsSummary(entries) {
    let population = 0;
    let treasury = 0;
    let buildings = 0;
    let stockpile = {};
    let income = {};
    for (const entry of entries) {
      const house = entry.house || {};
      const pop = Number(house.population || 0);
      const cash = Number(house.treasury || 0);
      if (Number.isFinite(pop)) population += pop;
      if (Number.isFinite(cash)) treasury += cash;
      buildings += Array.isArray(house.builtBuildings) ? house.builtBuildings.length : 0;
      stockpile = addResourceMaps(stockpile, getHouseResourceStockpile(house));
      income = addResourceMaps(income, getTileTotalIncome(house, getClock()));
    }
    return { population, treasury, buildings, stockpile, income };
  }

  async function chooseHoldingsUser() {
    if (!game.user.isGM) return game.user;
    const users = getPlayerUsers();
    const options = users.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`).join("");
    return await new Promise(resolve => {
      new Dialog({
        title: "View Player Holdings",
        content: `
          <form>
            <p>Choose which player's assigned holdings to view.</p>
            <div class="form-group">
              <label>Player</label>
              <select name="userId" style="width:100%;">
                ${options}
              </select>
            </div>
          </form>
        `,
        buttons: {
          view: { label: "View Holdings", callback: html => {
            const form = html[0].querySelector("form");
            resolve(game.users.get(String(form.userId.value || "")) || null);
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "view"
      }, { width: 520, height: 260, resizable: true }).render(true);
    });
  }

  async function showHoldings() {
    if (!requireOverviewScene()) return;
    const user = await chooseHoldingsUser();
    if (!user) return;

    const entries = getHoldingsForUser(user);
    const summary = holdingsSummary(entries);

    const rows = entries.map(entry => {
      const tile = entry.tile || {};
      const house = entry.house || {};
      const built = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
      const developmentLevel = built.length;
      const developmentLabel = house.developmentLabel || DEVELOPMENT_LEVELS[developmentLevel]?.label || "Ruins";
      const resources = [house.primaryExport || house.exports, house.secondaryExport].filter(Boolean).join(", ") || "None";
      const stockpileText = resourceMapToText(getHouseResourceStockpile(house));
      const incomeText = resourceMapToText(getTileTotalIncome(house, getClock()));
      return `
        <tr>
          <td style="padding:5px 7px;border:1px solid #777;"><strong>${escapeHtml(tile.name || "Unnamed Tile")}</strong><br><span style="opacity:0.75;">${escapeHtml(house.region || tile.region || "Unassigned")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(house.house || tile.owner || "None")}<br><span style="opacity:0.75;">Ruler: ${escapeHtml(house.lord || "None")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(developmentLabel)} (${escapeHtml(developmentLevel)}/4)<br><span style="opacity:0.75;">${escapeHtml(built.length ? built.join(", ") : "No buildings")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">Pop: ${escapeHtml(numberText(house.population))}<br>Treasury: ${escapeHtml(numberText(house.treasury))}<br>Stockpile: ${escapeHtml(stockpileText)}<br>Income: ${escapeHtml(incomeText)}</td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(resources)}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="5" style="padding:8px;border:1px solid #777;">No holdings assigned to ${escapeHtml(user.name)} yet.</td></tr>`;

    new Dialog({
      title: `Holdings — ${user.name}`,
      content: `
        <div style="max-height:70vh;overflow:auto;">
          <h2 style="margin-top:0;">${escapeHtml(user.name)} Holdings</h2>
          <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:10px;">
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Tiles</strong><br>${escapeHtml(entries.length)}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Buildings</strong><br>${escapeHtml(summary.buildings)}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Population</strong><br>${escapeHtml(summary.population.toLocaleString())}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Treasury</strong><br>${escapeHtml(summary.treasury.toLocaleString())}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Round Income</strong><br>${escapeHtml(resourceMapToText(summary.income))}</div>
          </div>
          <p><strong>Total Stockpile:</strong> ${escapeHtml(resourceMapToText(summary.stockpile))}</p>
          <table style="border-collapse:collapse;width:100%;font-size:13px;">
            <thead>
              <tr>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Tile</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">House / Ruler</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Development</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Economy</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Exports</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `,
      buttons: { close: { label: "Close" } },
      default: "close"
    }, { width: 900, height: "auto", resizable: true }).render(true);
  }


  async function repairEconomyData() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can repair economy data.");
      return;
    }

    const confirmed = await Dialog.confirm({
      title: "Repair Economy Data?",
      content: `<p>This will clean malformed resource keys on every world tile in this scene.</p><p>Example: <strong>Gold:: 6</strong> becomes <strong>Gold: 6</strong>.</p><p><strong>It will not delete buildings or change tile ownership.</strong></p>`,
      yes: () => true,
      no: () => false,
      defaultYes: false
    });

    if (!confirmed) return;

    let checked = 0;
    let repaired = 0;
    const rows = [];

    for (const entry of getWorldTileEntries()) {
      const doc = entry.drawing.document;
      const house = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      checked++;

      const oldIncomeText = resourceMapToText(house.resourceIncome ?? house.resourcesIncome ?? house.naturalResources ?? house.resourceProduction, "");
      const oldStockText = resourceMapToText(house.resourceStockpile ?? house.resources ?? house.stockpile, "");

      const cleanIncome = getHouseResourceIncome(house);
      const cleanStockpile = getHouseResourceStockpile(house);
      const cleanIncomeText = resourceMapToText(cleanIncome, "");
      const cleanStockText = resourceMapToText(cleanStockpile, "");

      const hasLegacyKeys = Object.keys(house.resourceIncome ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.resourceStockpile ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.resources ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.stockpile ?? {}).some(key => resourceKey(key) !== key);

      if (!hasLegacyKeys && oldIncomeText === cleanIncomeText && oldStockText === cleanStockText) continue;

      const updatedHouse = {
        ...house,
        resourceIncome: cleanIncome,
        resourceStockpile: cleanStockpile,
        treasury: cleanStockpile.Gold ?? house.treasury ?? "",
        resourceRepairedAt: new Date().toISOString(),
        resourceRepairedBy: game.user.name,
        resourceRepairedSource: `Crown Overview Tools ${MODULE_VERSION}`
      };

      delete updatedHouse.resources;
      delete updatedHouse.stockpile;
      delete updatedHouse.resourcesIncome;
      delete updatedHouse.naturalResources;
      delete updatedHouse.resourceProduction;

      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);
      repaired++;
      rows.push(`<li><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong>: ${escapeHtml(cleanStockText || "No stockpile")}</li>`);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
      content: `<h2>Economy Data Repaired</h2><p><strong>Tiles checked:</strong> ${escapeHtml(checked)}</p><p><strong>Tiles repaired:</strong> ${escapeHtml(repaired)}</p><ul>${rows.join("") || "<li>No malformed resource records found.</li>"}</ul>`
    });

    ui.notifications.info(`Economy repair complete. Tiles repaired: ${repaired}.`);
  }


  async function manageMarketForces() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can manage market forces."); return; }

    const clock = getClock() || { season: "Spring" };
    const currentSeason = String(clock.season || "Spring");
    const forces = getMarketForces();
    const seasons = Object.keys(forces);
    const seasonOptions = seasons.map(season => `<option value="${escapeHtml(season)}" ${season === currentSeason ? "selected" : ""}>${escapeHtml(season)}</option>`).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Manage Market Forces",
        content: `<form>
          <p>These multipliers modify trade-good output by category. Use one number for both Gold/Food, or two values as <code>gold, food</code>.</p>
          <div class="form-group">
            <label>Season</label>
            <select name="season" style="width:100%;">${seasonOptions}</select>
          </div>
          <div class="form-group">
            <label><strong>Category Multipliers</strong></label>
            <textarea name="marketForces" rows="12" style="width:100%;">${escapeHtml(marketForcesToText(forces, currentSeason))}</textarea>
            <p class="notes">Example: Grains & Field Crops: 1.25, 1.5 means +25% gold value and +50% food value for that category.</p>
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="resetAll"> Reset all categories/seasons to 1</label>
          </div>
        </form>`,
        buttons: {
          save: { label: "Save Market Forces", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              season: String(form.season.value || currentSeason),
              marketForces: String(form.marketForces.value || ""),
              resetAll: form.resetAll.checked
            });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        render: html => {
          const form = html[0].querySelector("form");
          const seasonSelect = form.querySelector('[name="season"]');
          const textArea = form.querySelector('[name="marketForces"]');
          seasonSelect.addEventListener("change", () => {
            textArea.value = marketForcesToText(forces, seasonSelect.value);
          });
        },
        default: "save"
      }, { width: 700, height: 600, resizable: true }).render(true);
    });

    if (!result) return;
    const updated = result.resetAll ? getDefaultMarketForces() : parseMarketForcesText(result.marketForces, forces, result.season);
    await saveMarketForces(updated);
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Market" }),
      content: `<h2>Market Forces Updated</h2><p><strong>Season:</strong> ${escapeHtml(result.resetAll ? "All seasons reset" : result.season)}</p><pre style="white-space:pre-wrap;">${escapeHtml(result.resetAll ? marketForcesToText(updated, currentSeason) : marketForcesToText(updated, result.season))}</pre>`
    });
    ui.notifications.info("Market forces updated.");
  }

  async function manageTileEconomy() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can manage tile economy data."); return; }

    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select one world tile drawing first."); return; }

    const drawing = selected[0];
    const doc = drawing.document;
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("This drawing is not a World Tile."); return; }

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});
    const stockpile = getHouseResourceStockpile(house);
    const income = getHouseResourceIncome(house);
    const breakdown = getTileEconomyBreakdownText(house, getClock());
    const goods = getHouseTradeGoods(house);

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Economy — ${worldTile.name || "World Tile"}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>House:</strong> ${escapeHtml(house.house || worldTile.owner || "None")}<br>
            <strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(house))}<br>
            <strong>Development Bonus:</strong> ${escapeHtml(breakdown.trade.development.label)} — Gold ${escapeHtml(breakdown.trade.development.gold)}, Food ${escapeHtml(breakdown.trade.development.food)}<br>
            <strong>Current round total income estimate:</strong> ${escapeHtml(breakdown.totalText)}
          </div>

          <div class="form-group">
            <label><input type="checkbox" name="economyEnabled" ${isEconomyEnabled(house) ? "checked" : ""}> Enable economy and resource costs for this tile</label>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group">
              <label><strong>Primary Trade Good</strong></label>
              <select name="primaryTradeGood" style="width:100%;">${buildTradeGoodOptions(goods.primary?.name || house.primaryExport || "")}</select>
            </div>
            <div class="form-group">
              <label><strong>Secondary Trade Good</strong></label>
              <select name="secondaryTradeGood" style="width:100%;">${buildTradeGoodOptions(goods.secondary?.name || house.secondaryExport || "")}</select>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Manual Base Resource Income Each Round</strong></label>
            <textarea name="resourceIncome" rows="3" style="width:100%;">${escapeHtml(resourceMapToText(income, ""))}</textarea>
            <p class="notes">Optional. Format: Gold: 2; Food: 1; Wool: 1. Trade goods and buildings are added automatically.</p>
          </div>

          <div class="form-group">
            <label><strong>Current Resource Stockpile</strong></label>
            <textarea name="resourceStockpile" rows="4" style="width:100%;">${escapeHtml(resourceMapToText(stockpile, ""))}</textarea>
            <p class="notes">Gold is mirrored into the old Treasury field for compatibility.</p>
          </div>

          <div class="form-group">
            <label><strong>Add / Subtract Stockpile Now</strong></label>
            <input type="text" name="resourceDelta" style="width:100%;" placeholder="Gold: -2; Food: 3" />
          </div>
        </form>`,
        buttons: {
          save: { label: "Save Economy", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              economyEnabled: form.economyEnabled.checked,
              primaryTradeGood: String(form.primaryTradeGood.value || ""),
              secondaryTradeGood: String(form.secondaryTradeGood.value || ""),
              resourceIncome: String(form.resourceIncome.value || ""),
              resourceStockpile: String(form.resourceStockpile.value || ""),
              resourceDelta: String(form.resourceDelta.value || "")
            });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 760, height: 690, resizable: true }).render(true);
    });

    if (!result) return;

    const updatedHouse = foundry.utils.deepClone(house);
    updatedHouse.economyEnabled = result.economyEnabled;
    setHouseTradeGoods(updatedHouse, result.primaryTradeGood, result.secondaryTradeGood);
    updatedHouse.resourceIncome = normalizeResourceMap(result.resourceIncome);
    updatedHouse.resourceStockpile = addResourceMaps(normalizeResourceMap(result.resourceStockpile), normalizeResourceMap(result.resourceDelta));
    if (updatedHouse.resourceStockpile.Gold !== undefined) updatedHouse.treasury = updatedHouse.resourceStockpile.Gold;
    updatedHouse.resourceUpdatedAt = new Date().toISOString();
    updatedHouse.resourceUpdatedBy = game.user.name;
    updatedHouse.version = `Crown Overview Tools ${MODULE_VERSION}`;
    syncTreasuryFromResources(updatedHouse);

    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);

    const updatedBreakdown = getTileEconomyBreakdownText(updatedHouse, getClock());
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
      content: `<h2>Tile Economy Updated</h2><p><strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p><p><strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(updatedHouse))}</p><p><strong>Manual Base Income:</strong> ${escapeHtml(resourceMapToText(updatedHouse.resourceIncome))}</p><p><strong>Current Total Income:</strong> ${escapeHtml(updatedBreakdown.totalText)}</p><p><strong>Stockpile:</strong> ${escapeHtml(resourceMapToText(updatedHouse.resourceStockpile))}</p><p><strong>Economy Enabled:</strong> ${updatedHouse.economyEnabled ? "Yes" : "No"}</p>`
    });

    ui.notifications.info(`Economy updated for ${worldTile.name || "selected tile"}.`);
  }

  function getEconomyTilesForScope(scope, userId = "") {
    let entries = getWorldTileEntries().map(entry => ({ ...entry, house: getHouseData(entry.drawing) ?? {} }));

    if (scope === "selected") {
      const selectedIds = new Set(canvas.drawings.controlled.map(d => d.document.id));
      entries = entries.filter(entry => selectedIds.has(entry.drawing.document.id));
    }

    if (scope === "player") {
      entries = entries.filter(entry => String(getTileOwnerUserId(entry.tile, entry.house) || "") === String(userId || ""));
    }

    return entries;
  }

  async function collectEconomyForRound(clock = getClock(), { scope = "all", userId = "", force = false, silent = false } = {}) {
    if (!clock) throw new Error("World Round Clock is not initialized.");

    const roundKey = getRoundKey(clock);
    const dateLabel = getDateLabel(clock);
    const ledger = foundry.utils.deepClone(getEconomyLedger());
    const ledgerKey = `${roundKey}|${scope}|${userId || "all"}`;

    if (!force && ledger[ledgerKey]?.collected) {
      if (!silent) ui.notifications.warn(`Economy has already been collected for ${dateLabel}. Use Force collect if this is a test/correction.`);
      return { applied: 0, skipped: true, totals: {}, dateLabel };
    }

    const entries = getEconomyTilesForScope(scope, userId);
    const seasonMultiplier = getSeasonMultiplier(clock);
    let applied = 0;
    let totals = {};
    const lines = [];

    for (const entry of entries) {
      const doc = entry.drawing.document;
      const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});
      if (!isEconomyEnabled(house)) continue;

      const income = getTileTotalIncome(house, clock);
      if (!hasAnyResources(income)) continue;

      const stockpile = addResourceIncomeToStockpile(getHouseResourceStockpile(house), income);
      house.resourceStockpile = stockpile;
      house.resourceIncome = getHouseResourceIncome(house);
      house.lastEconomyCollectedRoundKey = roundKey;
      house.lastEconomyCollectedDateLabel = dateLabel;
      house.lastEconomyCollectedAt = new Date().toISOString();
      house.lastEconomyCollectedBy = game.user.name;
      syncTreasuryFromResources(house);

      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, house);

      totals = addResourceMaps(totals, income);
      applied++;
      lines.push(`<li><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong>: +${escapeHtml(resourceMapToText(income))}</li>`);
    }

    ledger[ledgerKey] = {
      collected: true,
      scope,
      userId: userId || "",
      roundKey,
      dateLabel,
      season: clock.season || "Spring",
      seasonMultiplier,
      applied,
      totals,
      collectedAt: new Date().toISOString(),
      collectedBy: game.user.name
    };
    await saveEconomyLedger(ledger);

    if (!silent) {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
        content: `<h2>Economy Collected</h2><p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p><p><strong>Season Multiplier:</strong> ${escapeHtml(seasonMultiplier)}</p><p><strong>Tiles Paid:</strong> ${escapeHtml(applied)}</p><p><strong>Total Income:</strong> ${escapeHtml(resourceMapToText(totals))}</p><ul>${lines.join("") || "<li>No economy-enabled tiles produced resources.</li>"}</ul>`
      });
      ui.notifications.info(`Economy collected for ${dateLabel}: ${resourceMapToText(totals)}.`);
    }

    return { applied, skipped: false, totals, dateLabel };
  }

  async function collectEconomy() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can collect economy."); return; }

    const players = getPlayerUsers();
    const playerOptions = players.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Collect Economy",
        content: `<form>
          <p>Collect resource income into tile stockpiles for the current world round.</p>
          <div class="form-group">
            <label>Scope</label>
            <select name="scope" style="width:100%;">
              <option value="all">All economy-enabled tiles</option>
              <option value="selected">Selected tile drawings only</option>
              <option value="player">One player's holdings</option>
            </select>
          </div>
          <div class="form-group">
            <label>Player, if using player scope</label>
            <select name="userId" style="width:100%;">${playerOptions}</select>
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="force"> Force collect again for this round</label>
          </div>
        </form>`,
        buttons: {
          collect: { label: "Collect", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ scope: String(form.scope.value || "all"), userId: String(form.userId.value || ""), force: form.force.checked });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "collect"
      }, { width: 560, height: 370, resizable: true }).render(true);
    });

    if (!result) return;
    await collectEconomyForRound(getClock(), result);
  }

  async function exportRealm() {
    if (!requireOverviewScene()) return;
    const rows = [];
    for (const drawing of canvas.drawings.placeables) {
      const doc = drawing.document;
      const worldTile = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
      if (!worldTile) continue;
      const house = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      const buildings = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
      const developmentLevel = Math.min(buildings.length, 4);
      rows.push({
        province: worldTile.name ?? "",
        drawingId: doc.id,
        region: house.region || worldTile.region || "",
        tileType: worldTile.tileType ?? "",
        terrain: worldTile.terrainLabel || worldTile.terrainKey || "",
        movementCost: worldTile.movementCost ?? "",
        house: house.house || worldTile.owner || "",
        lord: house.lord ?? "",
        culture: house.culture ?? "",
        developmentLevel,
        developmentType: DEVELOPMENT_LEVELS[developmentLevel]?.label ?? "Ruins",
        population: house.population ?? "",
        treasury: house.treasury ?? "",
        resourceIncome: resourceMapToText(getHouseResourceIncome(house), ""),
        resourceStockpile: resourceMapToText(getHouseResourceStockpile(house), ""),
        economyEnabled: isEconomyEnabled(house) ? "Yes" : "No",
        primaryTradeGood: getHouseTradeGoods(house).primary?.name || "",
        primaryTradeCategory: getHouseTradeGoods(house).primary?.category || "",
        primaryTradeGoldValue: getHouseTradeGoods(house).primary?.goldValue ?? "",
        primaryTradeFoodValue: getHouseTradeGoods(house).primary?.foodValue ?? "",
        secondaryTradeGood: getHouseTradeGoods(house).secondary?.name || "",
        secondaryTradeCategory: getHouseTradeGoods(house).secondary?.category || "",
        secondaryTradeGoldValue: getHouseTradeGoods(house).secondary?.goldValue ?? "",
        secondaryTradeFoodValue: getHouseTradeGoods(house).secondary?.foodValue ?? "",
        tradeFinalGoldValue: getTradeGoodIncomeBreakdown(house, getClock()).gold,
        tradeFinalFoodValue: getTradeGoodIncomeBreakdown(house, getClock()).food,
        developmentGoldBonus: getDevelopmentEconomyBonus(house).gold,
        developmentFoodBonus: getDevelopmentEconomyBonus(house).food,
        buildingData: JSON.stringify(Array.isArray(house.buildingData) ? house.buildingData : []),
        primaryExport: house.primaryExport || house.exports || "",
        secondaryExport: house.secondaryExport ?? "",
        allegiance: house.allegiance ?? "",
        builtBuildings: buildings.join("; "),
        buildingCount: buildings.length,
        adjacentTiles: Array.isArray(worldTile.adjacentTileNames) ? worldTile.adjacentTileNames.join("; ") : "",
        worldTileOwner: worldTile.owner ?? "",
        tileAssignedBy: worldTile.assignedBy ?? "",
        houseUpdatedBy: house.updatedBy ?? "",
        houseUpdatedAt: house.updatedAt ?? ""
      });
    }
    if (!rows.length) { ui.notifications.warn("No World Tiles were found on this scene."); return; }
    rows.sort((a, b) => String(a.region).localeCompare(String(b.region)) || String(a.province).localeCompare(String(b.province)));
    const columns = [
      ["Province / Tile", "province"], ["Drawing ID", "drawingId"], ["Region / Kingdom", "region"], ["Tile Type", "tileType"], ["Terrain", "terrain"], ["Movement Cost", "movementCost"], ["House", "house"], ["Lord / Ruler", "lord"], ["Culture", "culture"], ["Development Level", "developmentLevel"], ["Development Type", "developmentType"], ["Population", "population"], ["Treasury", "treasury"], ["Resource Income", "resourceIncome"], ["Resource Stockpile", "resourceStockpile"], ["Economy Enabled", "economyEnabled"], ["Primary Trade Good", "primaryTradeGood"], ["Primary Trade Category", "primaryTradeCategory"], ["Primary Trade Gold Value", "primaryTradeGoldValue"], ["Primary Trade Food Value", "primaryTradeFoodValue"], ["Secondary Trade Good", "secondaryTradeGood"], ["Secondary Trade Category", "secondaryTradeCategory"], ["Secondary Trade Gold Value", "secondaryTradeGoldValue"], ["Secondary Trade Food Value", "secondaryTradeFoodValue"], ["Trade Final Gold Value", "tradeFinalGoldValue"], ["Trade Final Food Value", "tradeFinalFoodValue"], ["Development Gold Bonus", "developmentGoldBonus"], ["Development Food Bonus", "developmentFoodBonus"], ["Building Data", "buildingData"], ["Primary Export", "primaryExport"], ["Secondary Export", "secondaryExport"], ["Allegiance", "allegiance"], ["Built Buildings", "builtBuildings"], ["Building Count", "buildingCount"], ["Adjacent Tiles", "adjacentTiles"], ["World Tile Owner", "worldTileOwner"], ["Tile Assigned By", "tileAssignedBy"], ["House Updated By", "houseUpdatedBy"], ["House Updated At", "houseUpdatedAt"]
    ];
    let csv = "\uFEFF" + columns.map(column => csvEscape(column[0])).join(",") + "\r\n";
    for (const row of rows) csv += columns.map(column => csvEscape(row[column[1]])).join(",") + "\r\n";
    const filename = `Crown_of_Ashes_${safeFilename(canvas.scene?.name || "World_Map")}_Realm_Data.csv`;
    saveDataToFile(csv, "text/csv;charset=utf-8", filename);
    ui.notifications.info(`Exported ${rows.length} world tiles and ${rows.filter(row => row.house).length} Houses.`);
  }

  async function importRealm() {
    if (!requireOverviewScene()) return;
    const file = await new Promise(resolve => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,text/csv";
      input.addEventListener("change", () => resolve(input.files?.length ? input.files[0] : null));
      input.click();
    });
    if (!file) { ui.notifications.warn("No CSV file selected."); return; }
    let text = await file.text();
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const csvRows = parseCSV(text);
    if (csvRows.length < 2) { ui.notifications.error("This CSV contains no data rows."); return; }
    const headers = csvRows[0].map(header => String(header).trim());
    const getColumn = (row, name) => { const index = headers.indexOf(name); return index === -1 ? "" : row[index] ?? ""; };
    if (!headers.includes("Drawing ID")) { ui.notifications.error('The CSV is missing the required "Drawing ID" column.'); return; }
    const updates = [], missing = [], invalidBuildings = [], skipped = [];
    for (let i = 1; i < csvRows.length; i++) {
      const row = csvRows[i];
      const drawingId = String(getColumn(row, "Drawing ID")).trim();
      if (!drawingId) { skipped.push(i + 1); continue; }
      let drawing = canvas.drawings.placeables.find(drawing => drawing.document.id === drawingId);
      if (!drawing) {
        const provinceName = normalize(getColumn(row, "Province / Tile"));
        drawing = canvas.drawings.placeables.find(drawing => normalize(drawing.document.getFlag(FLAG_SCOPE, WORLD_TILE_KEY)?.name) === provinceName);
      }
      if (!drawing) { missing.push(drawingId || getColumn(row, "Province / Tile")); continue; }
      const doc = drawing.document;
      const existingWorld = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY) ?? {};
      const existingHouse = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      const buildings = splitList(getColumn(row, "Built Buildings"));
      if (buildings.length > 4) { invalidBuildings.push({ row: i + 1, tile: getColumn(row, "Province / Tile"), count: buildings.length }); continue; }
      const developmentLevel = buildings.length;
      const developmentLabel = DEVELOPMENT_LEVELS[developmentLevel].label;
      let population = cleanNumber(getColumn(row, "Population"));
      if (population === "") population = randomPopulation(developmentLevel);
      const updatedWorld = {
        ...existingWorld,
        name: String(getColumn(row, "Province / Tile")).trim(),
        region: String(getColumn(row, "Region / Kingdom")).trim(),
        tileType: String(getColumn(row, "Tile Type")).trim(),
        terrainLabel: String(getColumn(row, "Terrain")).trim(),
        movementCost: cleanNumber(getColumn(row, "Movement Cost")),
        owner: String(getColumn(row, "World Tile Owner")).trim(),
        adjacentTileNames: splitList(getColumn(row, "Adjacent Tiles"))
      };
      const updatedHouse = {
        ...existingHouse,
        house: String(getColumn(row, "House")).trim(),
        lord: String(getColumn(row, "Lord / Ruler")).trim(),
        region: String(getColumn(row, "Region / Kingdom")).trim(),
        culture: String(getColumn(row, "Culture")).trim(),
        developmentLevel,
        developmentLabel,
        population,
        treasury: cleanNumber(getColumn(row, "Treasury")),
        resourceIncome: normalizeResourceMap(getColumn(row, "Resource Income")),
        resourceStockpile: normalizeResourceMap(getColumn(row, "Resource Stockpile")),
        economyEnabled: normalize(getColumn(row, "Economy Enabled")) === "yes" || normalize(getColumn(row, "Economy Enabled")) === "true",
        buildingData: (() => { try { const value = getColumn(row, "Building Data"); return value ? JSON.parse(value) : (Array.isArray(existingHouse.buildingData) ? existingHouse.buildingData : []); } catch (_) { return Array.isArray(existingHouse.buildingData) ? existingHouse.buildingData : []; } })(),
        primaryExport: String(getColumn(row, "Primary Export") || getColumn(row, "Primary Trade Good")).trim(),
        secondaryExport: String(getColumn(row, "Secondary Export") || getColumn(row, "Secondary Trade Good")).trim(),
        allegiance: String(getColumn(row, "Allegiance")).trim(),
        builtBuildings: buildings,
        worldTileId: drawingId,
        worldTileName: String(getColumn(row, "Province / Tile")).trim(),
        version: `Crown Overview Tools ${MODULE_VERSION}`,
        updatedAt: new Date().toISOString(),
        updatedBy: game.user.name
      };
      setHouseTradeGoods(updatedHouse, getColumn(row, "Primary Trade Good") || updatedHouse.primaryExport, getColumn(row, "Secondary Trade Good") || updatedHouse.secondaryExport);
      syncTreasuryFromResources(updatedHouse);
      updates.push({ doc, world: updatedWorld, house: updatedHouse });
    }
    let summaryHtml = `<h2>Realm Import</h2><p><strong>${updates.length}</strong> world tiles are ready to update.</p>`;
    if (missing.length) summaryHtml += `<p><strong>${missing.length}</strong> Drawing IDs could not be found.</p>`;
    if (invalidBuildings.length) summaryHtml += `<p style="color:#ff7777;"><strong>${invalidBuildings.length}</strong> rows contain more than 4 buildings and will NOT be imported.</p><ul>${invalidBuildings.map(invalid => `<li>${escapeHtml(invalid.tile || "Unknown Tile")} — ${invalid.count} buildings</li>`).join("")}</ul>`;
    if (skipped.length) summaryHtml += `<p><strong>${skipped.length}</strong> rows had no Drawing ID and were skipped.</p>`;
    summaryHtml += `<hr><p>Development will automatically be calculated from the number of buildings. Drawing IDs will not be changed.</p>`;
    const confirmed = await Dialog.confirm({ title: "Import Crown of Ashes Realm", content: summaryHtml, yes: () => true, no: () => false, defaultYes: false });
    if (!confirmed) { ui.notifications.warn("Realm import cancelled."); return; }
    let updatedCount = 0, failedCount = 0;
    for (const update of updates) {
      try {
        await update.doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, update.world);
        await update.doc.setFlag(FLAG_SCOPE, HOUSE_KEY, update.house);
        try { await update.doc.update({ text: update.world.name }); } catch (err) { console.warn("Could not update Drawing label:", update.doc.id, err); }
        updatedCount++;
      } catch (err) { failedCount++; console.error("Failed to import Drawing:", update.doc.id, err); }
    }
    ui.notifications.info(`Realm import complete — ${updatedCount} updated, ${failedCount} failed.`);
  }

  async function hideTileText() {
    if (!requireOverviewScene()) return;
    const tileDrawings = canvas.drawings.placeables.filter(drawing => Boolean(getWorldTile(drawing)) && !drawing.document.getFlag(FLAG_SCOPE, "worldTileLabel"));
    let updated = 0, failed = 0;
    for (const drawing of tileDrawings) {
      try {
        await drawing.document.update({ text: "", textAlpha: 0, fillAlpha: 0.001, strokeAlpha: 0.001, strokeWidth: 1, hidden: false });
        updated++;
      } catch (err) { console.warn("Failed to hide original tile label:", drawing.document.name, err); failed++; }
    }
    ui.notifications.info(`Hidden original world tile labels: ${updated}. Failed: ${failed}.`);
  }

  function startSceneFeatures() {
    updateDateBanner();
    renderPanel();
    startHover();
    startVisibility();
  }

  function stopSceneFeatures() {
    removeDateBanner();
    removePanel();
    stopHover();
    stopRouteTooltip(false);
    stopPieceTooltip(false);
    stopClickMove(false);
    clearLinkOverlay();
    stopVisibility();
  }

  function refreshSceneFeatures() {
    if (isOverviewScene()) startSceneFeatures();
    else stopSceneFeatures();
  }

  const API = {
    version: MODULE_VERSION,
    isOverviewScene,
    refresh: refreshSceneFeatures,
    start: startSceneFeatures,
    stop: stopSceneFeatures,
    pathMove,
    toggleClickMove,
    toggleRouteTooltip,
    togglePieceTooltip,
    portCrossing,
    buildOnCurrentTile,
    showHoldings,
    resetMovement,
    resetBuildCapacity,
    repairBuildLocks,
    processPendingBuilds,
    roundClock,
    createPiece: createWorldPiece,
    linkTiles,
    unlinkTiles,
    viewLinks,
    togglePort,
    assignTileOwner,
    assignPieceOwner,
    editWorldPiece,
    assignHouse,
    manageTileEconomy,
    manageMarketForces,
    collectEconomy,
    repairEconomyData,
    collectEconomyForRound,
    exportRealm,
    importRealm,
    hideTileText,
    setSceneOverviewMode: async value => {
      await canvas.scene.setFlag(FLAG_SCOPE, SCENE_MODE_KEY, Boolean(value));
      refreshSceneFeatures();
    }
  };

  Hooks.once("init", () => {
    game.settings.register(MODULE_ID, "autoStart", {
      name: "Auto-start on Crown overview scenes",
      hint: "Automatically shows the date banner, panel, hover tooltip, and tile visibility on Crown of Ashes overview scenes.",
      scope: "client",
      config: true,
      type: Boolean,
      default: true
    });
  });

  Hooks.once("ready", () => {
    globalThis.CROWN_OVERVIEW_TOOLS = API;
    registerSocketHandlers();
    if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
  });

  Hooks.on("canvasReady", () => {
    if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
  });

  Hooks.on("updateScene", (scene, changes) => {
    if (scene.id === canvas.scene?.id && (changes.name !== undefined || changes.flags !== undefined)) {
      if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
    }
  });
})();
