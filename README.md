# Crown Overview Tools v0.6.4

## Siege development, fortifications, and equipment
- Siege settlement names now match the actual development ladder used by the realm system: **Ruins → Village → Holdfast → Town → City**.
- Quick Siege difficulty is now presented as a consistent formula: **15 base + 10 per Development level + 5 per Fortification level**.
- This preserves the existing effective DC range while making it understandable: Ruins begin at DC 15 and a City with a Castle reaches DC 70.
- Watchtowers, Holdfasts, and Castles now correctly describe their real siege protection as **+5 / +10 / +15 Siege DC**. Their enemy movement penalties remain +0.5 / +1 / +1.5.
- The Siege Workshop line no longer produces an abstract `Siege` stockpile resource. It now provides **House-wide Siege Capacity**:
  - Ram Specialists: 5 capacity; unlock Battering Rams.
  - Carpenters Guild: 10 capacity; unlock Ballistae and Onagers.
  - Siege Workshop: 15 capacity; unlock Trebuchets.
- Siege Capacity stacks across active holdings, while the highest active Siege Workshop tier determines which engine types are unlocked.
- Existing legacy `Siege` stockpile values are left untouched for safety but are ignored by the player-facing Holdings stockpile/income display.

## Structured siege equipment on armies
- The old free-entry `Siege Engines` number box has been removed from Summon Army and Siege / Storm.
- Siege equipment is now chosen when an army is mustered, using the same locked/unlocked presentation as troops and ships.
- Fielded siege equipment consumes House Siege Capacity until that army is dismissed; pending army musters also reserve capacity for validation purposes.
- Old pre-v0.6.4 armies with only a numeric siege-engine count remain compatible: the legacy count is treated as Battering Rams until the army is edited/saved in the new format.
- Siege equipment adds **1 Gold round upkeep per 5 Siege Capacity fielded, rounded up**. Troop Food upkeep remains unchanged.
- My Holdings now includes a Siege Capacity summary showing available, total, and committed capacity.

### Siege equipment effects
- **Battering Ram** — requires Tier 1; uses 1 capacity; +2% Storm chance, plus +2% against any fortified target.
- **Ballista** — requires Tier 2; uses 1 capacity; +1% Storm chance and reduces attacker siege casualties by 1 percentage point each, capped at -5 percentage points.
- **Onager** — requires Tier 2; uses 2 capacity; +6% Storm chance, plus +2% against Holdfasts, Towns, and Cities.
- **Trebuchet** — requires Tier 3; uses 3 capacity; +10% Storm chance, plus +5% against Town/City targets or Fortification level 2-3.
- Total Storm chance bonus from siege equipment is capped at **+30%**.
- Siege / Storm now reads the equipment actually attached to the army; players can no longer type in extra engines at the moment of the assault.
- Siege result cards show Development DC, Fortification DC, attached equipment, equipment bonus, and Ballista casualty reduction.

## Building interface cleanup
- The Build / Upgrade dialog has been reorganized around clear **Economy, Infrastructure, Military, Social, and Legacy** category buttons.
- Building dropdown labels are now concise instead of trying to place the building name, tier, Statecraft, cost, effect, and lock reason into a single very long option line.
- Selecting a building now opens a dedicated detail panel showing:
  - target building and tier;
  - current building/effect when upgrading;
  - resulting effect;
  - Statecraft requirement and lock reason;
  - actual Gold cost after applicable discounts;
  - construction duration;
  - Building Slot impact; and
  - Development impact.
- The top summary now says **Building Slots** rather than the more technical `Building Lines` wording.
- Upgrades explicitly show that they do not consume another slot or increase Development; new building lines show the resulting Development step.
- The confusing Tier 4 building-rule text has been removed. Building lines currently have Tier 1-3 requirements of Statecraft 5 / 10 / 12 and build times of 1 / 2 / 3 rounds.

# Crown Overview Tools v0.6.3

## Navy muster UI cleanup
- Summon Navy now uses the same clearer upkeep wording as Summon Army.
- Ship costs are displayed as `Round upkeep: X Gold + Y Food per 5 ships` instead of the older `X Gold / 5, Y Food / 5` shorthand.
- Ship quality, role notes, Drydock unlock requirements, command capacity, and ship-capacity rules are unchanged.
- The underlying navy upkeep calculation is unchanged: each ship type charges its listed Gold and Food for every 5 ships fielded.
- The GM Edit Navy dialog uses the same cleaned-up upkeep wording for consistency.

# Crown Overview Tools v0.6.2

## Manpower, training capacity, and army UI
- My Holdings now promotes realm Manpower to the top summary and shows total trained-troop capacity from active Barracks, Archery Range, and Stable lines.
- Population remains visible as secondary realm flavour rather than occupying one of the main summary cards.
- Military troop buildings now grant training capacity only. They no longer create Light Infantry, Spearmen, Archers, cavalry, or other troop types as round income or stockpile resources.
- Legacy troop values already sitting in a tile stockpile are ignored by the My Holdings stockpile/income display; the underlying old values are left untouched rather than silently deleting campaign data.
- Training capacity still stacks across owned provinces. Two active Town Guards therefore provide 1,000 Light Infantry training capacity, while all trained troops still count against the same realm manpower pool.
- Summon Army upkeep text is now written as `Round upkeep: X Gold + Y Food per 500 troops` for clearer costing.
- Existing trained-troop locks and available-capacity validation are retained.

## Siege engines
- No new siege-engine cost rule is imposed in v0.6.2. The existing module still stores a numeric siege-engine count and applies the existing siege-roll bonus bands; siege procurement/capacity remains a separate rules pass.

# Crown Overview Tools v0.6.1

## Economy privacy and turn-lock polish
- Economy collection details are no longer posted as one public all-realm breakdown.
- GM receives the full Economy Collected report with every paid tile and all military upkeep.
- Each player receives only their own economy income and their own military upkeep lines.
- Diplomatic Takeover now checks strategic locks before sending a player request to the GM, so recently disembarked characters are blocked immediately with a useful warning.
- Disembark/embark character lock data is also saved onto character data as well as world-piece data, reducing stale action-state mismatches.

## Note on troop stockpiles
- Military buildings still produce troop resources into stockpile when their construction is active.
- Seasonal market scaling applies to non-Gold/Food outputs only when the configured general market multiplier is global; in Winter 0.5 this means a 500 Light Infantry building output can appear as Light Infantry: 250.

# Crown Overview Tools v0.6.0

## Embark composition and visibility
- Embark Army now lets the player choose which troops embark when the fleet cannot carry the whole army.
- Surplus troops are dispersed/dismissed from the field and the embarked army upkeep is recalculated from the kept composition.
- Embarked army tokens now remain visible while at sea instead of becoming hidden.

## Disembark action locks
- Disembarking an army now locks the army, army commander, and carrying navy for the rest of the turn.
- A disembarked character cannot immediately use Diplomatic Takeover in the same turn.
- Moving a fleet only carries armies still explicitly marked as embarked.

## Holdings and Influence
- My Holdings now labels conquered generic Neutral/NPC holdings by political allegiance/House so it matches the map tooltip.
- Local House identity is still shown separately when it differs from allegiance.
- Adds a first-pass House Influence display on My Holdings and My Turn — Characters.
- House Influence defaults to 10, is capped 0–21, and includes stored Influence from holdings.
- Low Influence now applies an effective levy cap to army mustering: below 7 starts penalties, reaching 0 caps levies at 70%.

## UI cleanup
- The GM Make Territory Neutral / Unaligned button is no longer bolded in the Crown Overview panel.

# Crown Overview Tools v0.5.20

## My Turn dashboard
- My Turn — Characters now shows each character's primary stats, secondary stats, and current tile directly in the roster.
- Linked armies now show composition breakdown and upkeep instead of only total strength.
- Added a Build / Upgrade button to the My Turn character roster.

## Construction timing / build feedback
- Building bonuses are treated as inactive until their construction completion round.
- Tier 1 buildings activate after 1 round, Tier 2 after 2 rounds, and Tier 3 after 3 rounds.
- Inactive/under-construction buildings no longer provide training capacity, manpower, ship capacity, drydock unlocks, fortification, settlement/DC, or development economy bonuses before completion.
- Player build menus now show builder Statecraft and lock options the character cannot build.
- Failed player build requests now notify the requesting player as well as the GM.

## Navy disembark cleanup
- Disembarking now more aggressively clears stale army/navy transport flags.
- Fleet cargo movement only carries armies still explicitly marked as embarked.
- This prevents disembarked armies and their commanders from being dragged when the navy moves later.

# Crown Overview Tools v0.5.19

## Army muster UI polish
- Summon Army now visually locks trained troop types when the House has 0 available training capacity for that troop type.
- Locked army troop inputs are disabled and greyed out, matching the Summon Navy ship-class lock behaviour.
- Mob remains available when manpower/command capacity allows, because it is the default troop type.

## Embark / disembark cleanup
- Disembarking an army now clears additional stale navy transport flags from the army and army commander.
- The carrying navy removes the disembarked army from all known cargo manifests.
- If the same character was acting as both fleet commander and disembarking army commander, the fleet is detached so it does not keep dragging that character after they land.

## Neutral takeover display
- When a generic Neutral/NPC province is taken over, the public owner label now displays the conquering House/allegiance instead of leaving the large tooltip heading as Neutral.
- The local/original House identity is still preserved for non-generic local Houses.

All v0.5.18 and earlier allegiance, holdings, manpower, navy, army, diplomacy, duel, siege, and character-menu fixes are retained.

# Crown Overview Tools v0.5.3

## v0.5.3 — Army embarkation and naval transport

- Adds player-facing `Embark Army` and `Disembark Army` actions.
- `Embark Army` works from an army token or the character commanding that army.
- Embark checks adjacent sea tiles for a navy/fleet controlled by the same player.
- Armies can only embark from land/port tiles onto a navy in an adjacent sea tile.
- Each ship can carry 100 troops. Fleet carrying capacity is total active ships × 100.
- If the army is too large for the available ships, the module warns the player; continuing embarks only the troops that fit and dismisses the surplus from the field, removing their upkeep.
- Embarked armies are stored as navy cargo and hidden on the map; move the navy token to transport them.
- The army commander character embarks with the army and is carried with the navy.
- `Disembark Army` can be run from the army, its commander character, or the carrying navy.
- Disembark shows adjacent land/port landing tiles from the navy's current sea tile.
- Embarking and disembarking lock the army/commander movement for the current turn.
- Non-GM embark/disembark requests route through the active GM client.
- Commander-in-Chief trait support is reserved for a later rule pass.

## v0.5.2 — Diplomacy defender targeting + Spread Selected

- Fixes Diplomatic Takeover incorrectly using random visiting character tokens as defenders.
- NPC/Neutral tiles now use explicit `NPC Defender Diplomacy` / `Ruler Diplomacy` unless an explicit ruling/defender character ID is set.
- Player-owned tiles only use defending character tokens controlled by that tile's owner.
- Blank diplomacy CSV cells no longer block fallback to another filled diplomacy field.
- Adds player-facing `Spread Selected` action to separate stacked Crown pieces.
- Non-GM spread requests route through the active GM client and only move pieces the requesting player controls.
- Spread Selected also syncs character/world-piece tile IDs when it spreads pieces inside a tile.

## v0.5.1 — Duel output-fix script alignment

Uses the corrected `Roll_Everything_Output_Fix.gs` file as the Duel reference.

- Duel formula now follows the corrected sheet exactly: d30 + Prowess + Martial/2 + Secondary Bonus + Armor Modifier + Weapon Advantage + Valyrian Steel Bonus.
- Favoured Weapon Bonus remains stored/exported on characters, but is not applied to Duel rolls unless re-added later as a separate rule.
- Keeps corrected d100 injury check: only the higher Final Combat combatant can inflict injury, and injury triggers when d100 is equal to or below Final Combat.
- Keeps armor injury protection: Light rerolls Amputation, Medium rerolls lethal/Amputation, Heavy rolls a second injury on lethal/Amputation and keeps the less severe result.
- Keeps v0.5.0 Duel button, GM whisper math, d36 hit location, and d10 severity.


## v0.5.0 — Crown Duel System

- Uses the uploaded v0.4.9 naval construction/capacity version as the base.
- Fixes the internal script version constant to `0.5.0`.
- Adds a player-facing/GMsupported `Duel` action to the Crown Overview panel.
- Duel workflow: select exactly two character tokens, click `Duel`, choose weapon, armor, Valyrian steel, and any secondary bonus, then roll.
- Non-GM duel requests route through the active GM client so hidden character stats are resolved GM-side.
- Combat formula follows the supplied Google Apps Script: d30 + Prowess + Martial/2 + Secondary Bonus + Armor Modifier + Weapon Advantage + Valyrian Steel Bonus.
- The module also adds the character Favoured Weapon Bonus when the selected weapon matches the character's preferred weapon category.
- Weapon advantage is +5 using the supplied matrix: Sword beats Axe/Mace; Axe beats Mace/Polearm; Mace beats Polearm/Spear; Polearm beats Spear/Sword; Spear beats Sword/Axe; Bow has no melee advantage.
- Valyrian Steel gives +5 when only one combatant has it and negates the opponent's normal weapon advantage.
- Injury logic follows the supplied Apps Script: only the higher Final Combat combatant can inflict injury; injury occurs when that side's d100 is equal to or below their Final Combat.
- Injury rolls use d36 location and d10 severity.
- Armor injury protection follows the sheet: Light rerolls Amputation once; Medium rerolls lethal/Amputation once; Heavy rolls a second injury on lethal/Amputation and keeps the less severe result.
- Public chat shows the duel winner, margin, injury check, and injury result.
- GM whispered chat shows the full combat math and armor reroll details.
- Injuries are reported but not automatically applied to wounds/status yet; GM should edit character state after reviewing the result.

# Crown Overview Tools v0.4.9

## v0.4.9 — Naval construction tiers

- Naval quantity remains House-wide: 10 ships per province, increased proportionally by Mustering buildings.
- Ship quality is now unlocked by the highest Drydock-line building anywhere in the House holdings.
- No Drydock-line building: no ship classes can be newly fielded.
- Level 1 Shipwright unlocks Fishing / Conscripted Vessels and Longships.
- Level 2 Sail Makers additionally unlocks Galleys and War Galleys.
- Level 3 Dry Dock additionally unlocks Greatships and Dromonds.
- The Summon Navy dialog displays the House's naval-infrastructure tier and visibly locks unavailable vessel classes.
- GM-side navy request validation independently checks ship-class access, preventing UI/socket bypasses.
- GM fleet editing also checks Drydock ship-class access when a linked commander can be resolved.
- Drydock buildings no longer generate abstract `Ships` economy income; their purpose is ship-quality access.
- Command remains 1 ship = 100 Mob-equivalent.

Scene-gated strategic overview tools for the Crown of Ashes Foundry world map.

## v0.4.6

Hotfix and systems polish for navies, sieges, strategic action locks, upkeep, and the campaign clock.

### Navies / fleets

- Adds stricter Summon Navy rules.
- A navy can only be summoned from an active Port tile.
- The Summon Navy dialog now shows the linked sea tiles available from that port.
- The player/GM chooses the starting sea tile when launching the navy.
- The fleet launches immediately into that sea tile.
- The linked character is moved/embarked into the same sea tile.
- The character and the new fleet are locked for the turn after launching.
- Fleet movement remains sea/port based.
- Fleets can still carry their linked character when moving.

### Armies / navies dismissal

- Players can now dismiss their own army or navy.
- Non-GM dismissals route through the active GM client by socket.
- Dismissed forces are removed from the map and stop future upkeep.
- GM can still dismiss any selected army/navy.

### Siege / Storm

- Player siege attempts now route through the active GM client.
- This fixes player permission errors when a successful siege needs to update a tile drawing.
- Siege still commits the army for the turn.
- Siege casualties still reduce the army strength.
- Player-held tiles with a defending army still produce a pitched-battle GM alert instead of a quick siege roll.
- NPC/neutral or undefended player tiles still use settlement + fortification DC only.
- No garrisons are required.

### Upkeep and economy

- Active armies and navies now charge upkeep when economy is collected.
- Round Clock advance collects economy and applies military upkeep once for the new round.
- Manual Collect Economy using All or Player scope also applies upkeep.
- Selected-tile-only collection does not charge global upkeep.
- Upkeep is deducted from the owner player's controlled tile stockpile.
- If no controlled stockpile is found, the upkeep is listed as unpaid in the economy chat card.

### Round clock / ledger tools

- Round Clock now has Advance Round + Economy.
- Round Clock now has Go Back One Round.
- Round Clock now has Collect Current Round.
- Round Clock now has Reset Economy Ledger.
- Reset Clock no longer silently clears the economy ledger; use Reset Economy Ledger when testing or correcting.

### Tile ownership / culture / religion

- Culture and Religion remain editable through Edit Tile Ownership / House Data.
- Culture and Religion remain exported/imported through Tile Ownership CSV.
- The merged tile ownership editor is the main GM workflow for ownership, ruler, culture, religion, sworn-to, marriage protection, and NPC diplomacy.

## Install

Upload the matching zip to the GitHub release for this tag and update Foundry from the manifest.

- Tag: `v0.4.6`
- Asset: `crown-overview-tools-v0.4.6.zip`


## v0.4.8 Naval Capacity
- Each land province contributes 10 ships of House-wide naval fielding capacity.
- Mustering Hall adds +5 ship capacity, Mustering Grounds +10, and Levee En Masse +15, matching the army manpower scaling at 1 ship per 100 manpower bonus.
- Active fleets consume House naval capacity, so the limit is shared across all characters of the House.
- Navy command uses Martial at the existing 250-men-per-Martial command rate, with 1 ship counting as 100 Mob-equivalent. Thus Martial 4 can command 10 ships, Martial 8 can command 20, etc.
- The Summon Navy dialog shows House capacity, already-fielded ships, and commander capacity, and the GM re-validates the cap when a launch request arrives.
