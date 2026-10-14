# Crown Overview Tools v1.1.90 — Consolidated Events & Player Weddings

Base: v1.1.89. No scene-grid or Battle Army Tools modifications.

## Celebrations

- **Feast:** 5 Gold + 5 Food; immediately awards 1 Influence.
- **Festival:** 12 Gold + 10 Food; one round preparation, then awards 2 Influence, grants a temporary +1 House Diplomacy bonus and +1 Gold per round to the hosting province through the end of that season (or the following full season when preparation finishes at a seasonal boundary).
- **Grand Tourney:** 25 Gold + 20 Food; two rounds preparation, then awards 4 Influence and grants temporary +2 House Diplomacy and +2 Prowess for four rounds (two seasons).
- The organizer must control the hosting province and have an available Main Action. Starting the event costs that action and resources. Delayed rewards apply on completion. Duplicate bonus types do not stack; expired effects are removed through Round Clock processing.
- Bonuses do not overwrite imported base stats. Prowess affects the CoA duel calculation, not maximum Wounds; Diplomacy affects the CoA getDiplomacyValue path.

## Player wedding invitations and ceremonies

- House A sends a private proposal naming an eligible character; House B accepts/declines and picks its own unmarried, eligible character. Proposals and acceptances are recorded in scene flags. No Main Action is charged merely for proposing or accepting.
- Hosting player selects a controlled province, organizer and tier, pays the resources and spends the organizer's Main Action when scheduling:
  - Modest: 10 Gold, 10 Food, 1 round preparation, +2 Influence to each House.
  - Noble: 20 Gold, 15 Food, 2 rounds, +4 Influence each.
  - Grand: 35 Gold, 25 Food, 3 rounds, +6 Influence each.
- Scheduling broadcasts the wedding announcement and location to all players via chat; a reminder is sent before the ceremony, with another public message when ready.
- Both betrothed must be physically present in the hosting province and have unused Main Actions during the scheduled ceremony round. Each House must separately confirm; the second confirmation commits both Main Actions and finishes the ceremony. No ceremony = no Influence award.
- The Round Clock settles an unperformed ceremony at the next advance, deducting 2 Influence once from Houses that did not attend/confirm. GM can postpone without penalty.
- Persistent House marriage alliances continue after raids/sieges until dissolved explicitly; the marital status remains even after political dissolution. Repeat marriages of the same two Houses do not award repeat Influence.
- The authoritative Quick Siege and raid resolution routes issue a warning before hostilities against a marriage ally. If continued, the responsible linked commander gains Dishonorable; neither the marriage nor the alliance is automatically dissolved.

## From previous consolidated patches (retained)

- GM round lock and existing shared Main Action enforcement.
- Province arrival points and anti-stacking with fallback.
- Winter provisions, winter starvation and persistent population growth/building bonuses.
- Raid income, casualty and annual tally overhaul.
- Quick Siege assault quality and exposure-based casualty allocation (battering rams are the only engine type suffering losses).
- My Realm province marriage and territorial Influence-loss rules.

## Installation and validation

- Back up the Foundry world before upgrading from v1.1.89.
- JavaScript syntax was checked with Node; package integrity was tested. **Not tested in multiplayer Foundry**. In particular, validate two-party confirmation in separate browser clients, bonus expiration, events under round lock, and GM resolution.
- Existing `module.json` GitHub repository, stable manifest, and versioned release download metadata are preserved and advanced to v1.1.90. The GitHub release URL will work only after that release is published.
- CoA checks apply to CoA raid/Quick Siege routes; battles resolved solely through Battle Army Tools or other systems require a separate ally-betrayal integration.
