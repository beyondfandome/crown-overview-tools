(() => {
  const MODULE_ID = "crown-overview-tools";
  const MODULE_VERSION = "0.1.5";
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
  const CLICK_MOVE_KEY = "COA_WORLD_CLICK_MOVE";
  const HOVER_KEY = "COA_WORLD_TILE_HOVER";
  const VISIBILITY_KEY = "COA_WORLD_TILE_VISIBILITY";
  const LINK_VIEWER_KEY = "COA_WORLD_TILE_LINK_VIEWER";
  const BUILD_LEDGER_KEY = "worldBuildLedger";

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
        <button data-coa-action="createPiece">Create World Piece</button>
        <button data-coa-action="linkTiles">Link Selected Tiles</button>
        <button data-coa-action="unlinkTiles">Unlink Selected Tiles</button>
        <button data-coa-action="viewLinks">View Tile Links</button>
        <button data-coa-action="togglePort">Make / Edit Port</button>
        <button data-coa-action="assignHouse">Assign House Data</button>
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
        <button data-coa-action="portCrossing">Port Crossing</button>
        <button data-coa-action="buildOnCurrentTile">Build</button>
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
    el.style.bottom = "24px";
    el.style.width = "420px";
    el.style.maxHeight = "70vh";
    el.style.overflowY = "auto";
    el.style.zIndex = "100000";
    el.style.padding = "10px 12px";
    el.style.border = "1px solid rgba(255,255,255,0.35)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.92)";
    el.style.color = "#f0f0f0";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.4";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.45)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
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

    let html = `<div><strong style="font-size:17px;">${escapeHtml(tile.name || "Unnamed Tile")}</strong>
      <div style="margin-top:6px;">
        <strong>Region:</strong> ${escapeHtml(tile.region || "None")}<br>
        <strong>Type:</strong> ${escapeHtml(tile.tileType || "land")}<br>
        <strong>Terrain:</strong> ${escapeHtml(tile.terrainLabel || tile.terrainKey || "None")}<br>
        <strong>Move Cost:</strong> ${escapeHtml(tile.movementCost ?? 1)}
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
      if (house.primaryExport || house.exports) html += `<strong>Primary Export:</strong> ${escapeHtml(house.primaryExport || house.exports)}<br>`;
      if (house.secondaryExport) html += `<strong>Secondary Export:</strong> ${escapeHtml(house.secondaryExport)}<br>`;
      if (house.allegiance) html += `<strong>Allegiance:</strong> ${escapeHtml(house.allegiance)}<br>`;
      html += `</div>`;
      if (!isSea && buildings) html += `<div style="margin-top:7px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);"><strong>Buildings:</strong><br><span style="opacity:0.9;">${escapeHtml(buildings)}</span></div>`;
      html += `</div>`;
    }
    if (adjacentNames) html += `<div style="margin-top:9px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);opacity:0.8;"><strong>Links:</strong> ${escapeHtml(adjacentNames)}</div>`;
    html += `</div>`;
    el.innerHTML = html;
    el.style.display = "block";
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

  function revealForToken(token) {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;
    if (!getWorldPiece(token)) { clearReveal(); return; }
    const current = findCurrentTileForToken(token);
    if (!current) { clearReveal(); return; }
    const linked = getLinkedTiles(current);
    manager.revealedEntries = [current, ...linked];
    manager.graphics.clear();
    manager.graphics.visible = true;
    for (const entry of manager.revealedEntries) drawTileIntoVision(manager.graphics, entry.drawing);
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
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
      if (controlled && canvas.tokens.controlled.length === 1) revealForToken(token);
      else if (canvas.tokens.controlled.length === 1) revealForToken(canvas.tokens.controlled[0]);
      else clearReveal();
    });
    const updateHook = Hooks.on("updateToken", (document, changes) => {
      if (!isOverviewScene()) return;
      if (changes.x === undefined && changes.y === undefined) return;
      const token = canvas.tokens.get(document.id);
      if (token && token.controlled && canvas.tokens.controlled.length === 1) revealForToken(token);
      else refreshTokenVisibility();
    });

    globalThis[VISIBILITY_KEY] = { TokenClass, originalIsVisibleDescriptor, graphics, visionContainer, revealedEntries: [], controlHook, updateHook };

    Object.defineProperty(TokenClass.prototype, "isVisible", {
      configurable: true,
      get: function () {
        const manager = globalThis[VISIBILITY_KEY];
        if (manager && isOverviewScene() && isWorldPieceRevealed(this)) return true;
        return originalIsVisibleGetter.call(this);
      }
    });

    if (canvas.tokens.controlled.length === 1) revealForToken(canvas.tokens.controlled[0]);
    else clearReveal();
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

  async function createWorldPiece() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Tile drawing where the piece should spawn."); return; }
    const drawing = selected[0];
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("The selected drawing has not been assigned as a World Tile."); return; }
    const tileType = getTileType(worldTile);

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
              imagePath: String(form.imagePath.value || "").trim(),
              width: Math.max(0.25, Number(form.tokenWidth.value || 1)),
              height: Math.max(0.25, Number(form.tokenHeight.value || 1))
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "create"
      }, { width: 600, height: 680, resizable: true }).render(true);
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
    ui.notifications.info(`Created ${details.name} (${details.pieceType}) in ${worldTile.name || "selected World Tile"}.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Piece" }), content: `<h2>World Piece Created</h2><p><strong>Name:</strong> ${escapeHtml(details.name)}</p><p><strong>Type:</strong> ${escapeHtml(details.pieceType)}</p><p><strong>Faction:</strong> ${escapeHtml(details.faction || "None")}</p><p><strong>Spawned At:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p><p><strong>Movement:</strong> 0 / ${escapeHtml(details.movementMax)} used</p>` });
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
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Round Clock" }), content: `<h2>Round Advanced</h2><p><strong>Previous:</strong> ${escapeHtml(getDateLabel(oldClock))}</p><p><strong>Current:</strong> ${escapeHtml(getDateLabel(newClock))}</p><p>All World Pieces now have their full movement available.</p>` });
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
    const existingBuildings = Array.isArray(house.builtBuildings) ? [...house.builtBuildings] : [];

    if (existingBuildings.length >= 4) {
      ui.notifications.warn(`${worldTile.name || "This tile"} already has the maximum of 4 buildings.`);
      return;
    }

    const ledger = foundry.utils.deepClone(getBuildLedger());
    const existingBuildThisRound = getAlreadyBuiltForRound(ledger, roundKey, game.user.id);

    if (!game.user.isGM && existingBuildThisRound) {
      ui.notifications.warn(`You have already built this turn: ${existingBuildThisRound.building} at ${existingBuildThisRound.tileName}.`);
      return;
    }

    if (!game.user.isGM && piece.lastBuildRoundKey === roundKey) {
      ui.notifications.warn(`${piece.name || token.document.name} has already built this turn.`);
      return;
    }

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
            <strong>Date:</strong> ${escapeHtml(dateLabel)}<br>
            <strong>Buildings:</strong> ${escapeHtml(existingBuildings.length)} / 4<br>
            <strong>Development:</strong> ${escapeHtml(currentDevelopment)} → ${escapeHtml(nextDevelopment)}
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

          <p class="notes">Players may place one building per world round. Each tile can hold a maximum of four buildings.</p>
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

    const updatedBuildings = [...existingBuildings, details.building].slice(0, 4);
    const developmentLevel = updatedBuildings.length;
    const developmentLabel = DEVELOPMENT_LEVELS[developmentLevel]?.label || "City";
    const oldPopulation = house.population;
    const population = randomPopulation(developmentLevel);
    const now = new Date().toISOString();

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
      worldTileId: doc.id,
      worldTileName: worldTile.name || "Unnamed Tile",
      lastBuiltBuilding: details.building,
      lastBuiltRoundKey: roundKey,
      lastBuiltDateLabel: dateLabel,
      lastBuiltByUserId: game.user.id,
      lastBuiltByUserName: game.user.name,
      lastBuiltByPieceId: token.document.id,
      lastBuiltByPieceName: piece.name || token.document.name,
      lastBuiltAt: now,
      buildLog: [
        ...(Array.isArray(house.buildLog) ? house.buildLog : []),
        {
          building: details.building,
          roundKey,
          dateLabel,
          userId: game.user.id,
          userName: game.user.name,
          pieceId: token.document.id,
          pieceName: piece.name || token.document.name,
          builtAt: now
        }
      ],
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      updatedAt: now,
      updatedBy: game.user.name
    };

    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);

    const updatedPiece = foundry.utils.deepClone(piece);
    updatedPiece.lastBuildRoundKey = roundKey;
    updatedPiece.lastBuiltBuilding = details.building;
    updatedPiece.lastBuiltTileId = worldTile.id || doc.id;
    updatedPiece.lastBuiltTileName = worldTile.name || "Unnamed Tile";
    updatedPiece.lastBuiltAt = now;
    updatedPiece.lastBuiltBy = game.user.name;
    await saveWorldPiece(token, updatedPiece);

    ledger[roundKey] = ledger[roundKey] || { dateLabel, users: {}, builds: [] };
    ledger[roundKey].dateLabel = dateLabel;
    ledger[roundKey].users = ledger[roundKey].users || {};
    ledger[roundKey].builds = Array.isArray(ledger[roundKey].builds) ? ledger[roundKey].builds : [];
    ledger[roundKey].users[game.user.id] = {
      userName: game.user.name,
      building: details.building,
      tileId: worldTile.id || doc.id,
      tileName: worldTile.name || "Unnamed Tile",
      pieceId: token.document.id,
      pieceName: piece.name || token.document.name,
      builtAt: now
    };
    ledger[roundKey].builds.push(ledger[roundKey].users[game.user.id]);
    await saveBuildLedger(ledger);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Building Constructed</h2>
        <p><strong>Player:</strong> ${escapeHtml(game.user.name)}</p>
        <p><strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}</p>
        <p><strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p>
        <p><strong>Building:</strong> ${escapeHtml(details.building)}</p>
        <p><strong>Development:</strong> ${escapeHtml(developmentLabel)} (${escapeHtml(developmentLevel)} / 4)</p>
        <p><strong>Population:</strong> ${escapeHtml(Number(population).toLocaleString())}${oldPopulation !== undefined && oldPopulation !== "" ? ` <span style="opacity:0.75;">previously ${escapeHtml(oldPopulation)}</span>` : ""}</p>
        <p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p>`
    });

    ui.notifications.info(`${details.building} built in ${worldTile.name || "selected tile"}.`);
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

    new Dialog({
      title: `House Data — ${worldTile.name || "Unnamed World Tile"}`,
      content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>World Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br><strong>Region:</strong> ${escapeHtml(worldTile.region || "None")}<br><strong>Terrain:</strong> ${escapeHtml(worldTile.terrainLabel || worldTile.terrainKey || "None")}</div><h2>House</h2><div class="form-group"><label>House Name</label><input type="text" name="house" value="${escapeHtml(existing.house ?? worldTile.owner ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Lord / Ruler</label><input type="text" name="lord" value="${escapeHtml(existing.lord ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Region</label><input type="text" name="region" value="${escapeHtml(existing.region ?? worldTile.region ?? "")}" style="width:100%;" /></div>${cultureSection}${developmentSection}<hr><h2>Economy</h2><div class="form-group"><label>Primary Export</label><input type="text" name="primaryExport" value="${escapeHtml(existing.primaryExport ?? existing.exports ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Secondary Export</label><input type="text" name="secondaryExport" value="${escapeHtml(existing.secondaryExport ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Treasury</label><input type="number" name="treasury" value="${escapeHtml(existing.treasury ?? "")}" style="width:100%;" /></div><div class="form-group"><label>Allegiance</label><input type="text" name="allegiance" value="${escapeHtml(existing.allegiance ?? "")}" style="width:100%;" /></div>${buildingsSection}</form>`,
      buttons: { save: { label: "Save House Data", callback: async html => {
        const form = html[0].querySelector("form");
        const buildings = isSea ? [] : Array.from(form.querySelectorAll('input[name="building"]:checked')).map(input => input.value);
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
          version: `Crown Overview Tools ${MODULE_VERSION}`,
          updatedAt: new Date().toISOString(),
          updatedBy: game.user.name
        };
        if (!isSea) {
          houseData.culture = String(form.culture.value || "").trim();
          houseData.developmentLevel = developmentLevel;
          houseData.developmentLabel = developmentLabel;
          houseData.population = population;
          houseData.builtBuildings = buildings;
        }
        await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
        await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, houseData);
        ui.notifications.info(isSea ? `Saved ${houseData.house || worldTile.name} — Sea Tile` : `Saved ${houseData.house || worldTile.name} — ${developmentLabel} (${developmentLevel} buildings) — Population ${Number(population).toLocaleString()}`);
      } }, cancel: { label: "Cancel" } },
      default: "save"
    }, { width: 680, height: 820, resizable: true }).render(true);
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
      ["Province / Tile", "province"], ["Drawing ID", "drawingId"], ["Region / Kingdom", "region"], ["Tile Type", "tileType"], ["Terrain", "terrain"], ["Movement Cost", "movementCost"], ["House", "house"], ["Lord / Ruler", "lord"], ["Culture", "culture"], ["Development Level", "developmentLevel"], ["Development Type", "developmentType"], ["Population", "population"], ["Treasury", "treasury"], ["Primary Export", "primaryExport"], ["Secondary Export", "secondaryExport"], ["Allegiance", "allegiance"], ["Built Buildings", "builtBuildings"], ["Building Count", "buildingCount"], ["Adjacent Tiles", "adjacentTiles"], ["World Tile Owner", "worldTileOwner"], ["Tile Assigned By", "tileAssignedBy"], ["House Updated By", "houseUpdatedBy"], ["House Updated At", "houseUpdatedAt"]
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
      const drawing = canvas.drawings.placeables.find(drawing => drawing.document.id === drawingId);
      if (!drawing) { missing.push(drawingId); continue; }
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
        primaryExport: String(getColumn(row, "Primary Export")).trim(),
        secondaryExport: String(getColumn(row, "Secondary Export")).trim(),
        allegiance: String(getColumn(row, "Allegiance")).trim(),
        builtBuildings: buildings,
        worldTileId: drawingId,
        worldTileName: String(getColumn(row, "Province / Tile")).trim(),
        version: `Crown Overview Tools ${MODULE_VERSION}`,
        updatedAt: new Date().toISOString(),
        updatedBy: game.user.name
      };
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
    portCrossing,
    buildOnCurrentTile,
    resetMovement,
    roundClock,
    createPiece: createWorldPiece,
    linkTiles,
    unlinkTiles,
    viewLinks,
    togglePort,
    assignHouse,
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
