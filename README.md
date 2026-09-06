# Crown Overview Tools v0.4.4

Scene-gated strategic overview tools for Crown of Ashes.

## Included in v0.4.4

This version includes all v0.4.3 systems and adds the first pass of strategic diplomacy, tile ownership, armies, and quick sieges.

### Player-facing actions

- Move Piece
- Summon Army
- Diplomatic Takeover
- Siege / Storm
- Build / Upgrade
- My Holdings
- Port Crossing
- Click Move toggle
- Route Tooltip toggle
- Piece Tooltip toggle

### Tile ownership CSV

New GM buttons:

- Export Tile Ownership CSV
- Import Tile Ownership CSV

The ownership CSV matches tiles by:

1. Tile ID
2. Drawing ID
3. Tile Name fallback

New supported ownership columns include:

- Ownership Type
- Controller Player Name
- Controller Player User ID
- Ruling Character Name / Ruler
- Ruling Character ID
- Culture
- Religion
- Sworn To Type
- Sworn To Player Name
- Sworn To Player User ID
- Marriage Protected
- Marriage Protected Player Name
- Marriage Protected Player User ID
- Ruler Diplomacy
- NPC Defender Diplomacy
- Diplomatic Takeover Allowed
- Public Owner Label
- Ownership Notes

### Diplomacy

Diplomatic Takeover now uses a d20 check:

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

Players get a public success/failure card. GMs get the hidden math.

### Characters

Character CSV export now syncs the character's current tile from the token position before exporting.

Character CSV import no longer forces an existing character back to an old location when the location columns are blank. Filled location columns still intentionally move the character.

Character rows now also support Culture and Religion columns.

### Armies

New player action:

- Summon Army

Rules implemented:

- One army per character.
- Maximum army size = character Martial × 250.
- Summoning creates a pending muster.
- GM uses Process Army Musters after one turn to spawn the army token.
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

### Quick Siege / Storm

New player action:

- Siege / Storm

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

Fortification level is read from the Watchtowers → Holdfasts → Castles building line.

Against player-held tiles:

- If a defending player army is present, the module sends a Pitched Battle card to the GM and does not roll quick siege.
- If no defending player army is present, the module resolves the quick siege against the tile's passive settlement/fortification DC.

## Compatibility

- Foundry minimum: v13
- Foundry verified: v14
