# Crown Overview Tools v1.1.26

## Final Player UI Consolidation + Marriage Diplomacy

### Player panel
- Realm and Military are now separate player sections.
- **Summon Military** replaces the separate Army/Navy buttons and opens an Army/Navy choice.
- **Embark / Disembark** replaces the separate transport buttons and opens an Embark/Disembark choice.

### My Holdings
- Adds **Realm** and **Raised Armies** tabs.
- Raised Armies uses the same military-controller resolver as upkeep and includes active armies and navies.
- Shows commander, location, current strength/ships, composition, and live per-round upkeep.
- Realm income now shows gross current House income, current military upkeep, and net round income. Current income uses the same tile-total calculation as round collection, including trade goods, Markets/Market Forces, buildings, and raid penalties.

### Marriage Diplomacy
- Diplomatic Takeover now has a **Use Marriage Diplomacy** toggle.
- When enabled, the roll is `d20 + Diplomacy + Marriage Diplomacy` against the existing takeover DC.
- A failed attempt consumes the normal diplomacy action but does not consume a marriage slot.
- A successful Marriage Diplomacy takeover records one active realm marriage.
- Each realm is capped at **3 active marriages**; the toggle is disabled when all slots are occupied, and the GM-side resolver enforces the cap again.
- My Holdings → Realm shows **Marriages: X / 3** and the recorded alliances.
- Marriage records are stored in a scene-level world ledger keyed to the controlling Foundry player, so province loss does not silently erase an established marriage alliance.

### Preserved
- v1.1.25 persistent political-controller synchronization.
- v1.1.20 negative military upkeep → Influence loss → levy-cap attrition loop.
- v1.1.19 political intelligence memory.
- v1.1.21 GM province edit mode.
