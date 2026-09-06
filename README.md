# Crown Overview Tools v0.4.5

Scene-gated strategic overview tools for Crown of Ashes.

## Included in v0.4.5

This version includes all v0.4.4 systems and adds the first pass of navies/fleets, siege casualties, strategic action locks, public culture/religion visibility, and a merged tile ownership/house editor.

### Player-facing actions

- Move Piece
- Summon Army
- Summon Navy
- Diplomatic Takeover
- Siege / Storm
- Build / Upgrade
- My Holdings
- Port Crossing
- Click Move toggle
- Route Tooltip toggle
- Piece Tooltip toggle

### Tile ownership and house data

The old Assign Tile Owner and Assign House Data workflows are now consolidated into one GM workflow:

- Edit Tile Ownership / House Data

This editor updates both the world tile and house data flags, so the tile ownership CSV can carry the same information.

Supported fields include:

- Ownership Type
- Controller Player
- House
- Lord / Ruler
- Ruling Character ID
- Culture
- Religion
- Sworn To Type
- Sworn To Player
- Marriage Protected
- Marriage Protected Player
- Ruler Diplomacy
- NPC Defender Diplomacy
- Diplomatic Takeover Allowed
- Economy and building notes

Culture and Religion now display in the basic tile hover information, so players can see those broad public details without seeing private economy/stat data.

### Tile ownership CSV

GM buttons:

- Export Tile Ownership CSV
- Import Tile Ownership CSV

The ownership CSV matches tiles by:

1. Tile ID
2. Drawing ID
3. Tile Name fallback

Use Tile ID as the source of truth whenever possible.

### Diplomacy

Diplomatic Takeover uses a d20 check:

```text
Diplomacy Roll = d20 + Attacker Diplomacy
Target DC = 10 + Defender Diplomacy + modifiers
```

DC modifiers:

```text
Different Culture: +2
Different Religion: +2
Target sworn to another player: +4
Same Culture: -2
Same Religion: -2
```

Marriage-protected territories block diplomatic takeover completely.

A successful diplomatic takeover changes the tile controller/allegiance to the acting player, but it does not automatically replace the local ruler.

New action rule:

- Diplomacy can only be attempted once per character per turn.
- A failed diplomacy attempt locks that character's movement until movement resets.

### Armies

Rules implemented:

- One army per character.
- Maximum army size = character Martial × 250.
- Summoning creates a pending muster.
- GM uses Process Military Musters after one turn to spawn the army token.
- Army tokens can follow their linked character when not detached or besieging.
- Armies store composition, strength, siege engines, and upkeep.

Upkeep per 500 troops:

```text
Mob: 1 Gold, 1 Food
Light Infantry: 1 Gold, 2 Food
Spearmen: 1 Gold, 2 Food
Archers: 2 Gold, 2 Food
Heavy Infantry: 3 Gold, 2 Food
Pikemen: 3 Gold, 2 Food
Crossbowmen: 3 Gold, 2 Food
Light Cavalry: 3 Gold, 3 Food
Lancers: 4 Gold, 3 Food
Heavy Cavalry: 5 Gold, 4 Food
```

### Navies / fleets

New player action:

- Summon Navy

Rules implemented:

- One navy/fleet per character.
- Navy tokens are piece type `fleet`.
- Fleets use sea/port routing.
- Fleets can carry their linked character token on sea/port movement.
- Fleet upkeep is calculated from ship composition.
- GM uses Process Military Musters to spawn pending armies and pending navies.

Upkeep per 5 ships:

```text
Fishing / Conscripted Vessel: 1 Gold, 1 Food
Longship: 2 Gold, 1 Food
Galley: 3 Gold, 2 Food
War Galley: 4 Gold, 2 Food
Greatship: 5 Gold, 3 Food
Dromond: 6 Gold, 3 Food
```

### Quick Siege / Storm

NPCs and neutral rulers do not need army or garrison tokens. Passive defence comes from settlement development plus fortification level.

Storm formula:

```text
Storm Chance = 50 + (Attacker Martial × 2) + Manpower Bonus + Siege Engine Bonus + Siege Duration Bonus + Foothold Bonus - Settlement/Fortification DC
```

Storm chance is capped between 5% and 95%.

Manpower bonus:

```text
+1% per full 500 attacking troops, maximum +20%
```

Siege duration bonus:

```text
+3% per completed turn after the first, maximum +21%
```

Settlement/Fortification DC:

```text
Ruin:   15 / 20 / 25 / 30
Hamlet: 25 / 30 / 35 / 40
Village:35 / 40 / 45 / 50
Town:   45 / 50 / 55 / 60
City:   55 / 60 / 65 / 70
```

Fortification level is read from the Watchtowers -> Holdfasts -> Castles building line.

Against player-held tiles:

- If a defending player army is present, the module sends a Pitched Battle card to the GM and does not roll quick siege.
- If no defending player army is present, the module resolves the quick siege against the tile's passive settlement/fortification DC.

Sieges now apply attacker casualties to the army token and lock that army's movement until movement resets.

Default siege casualties:

```text
Decisive Storm: 5%
Successful Storm: 10%
Foothold: 5%
Repulsed: 10%
Bloody Repulse: 20%
Catastrophe: 30%
Automatic Catastrophe: 40%
```

## Compatibility

- Foundry minimum: v13
- Foundry verified: v14
