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
