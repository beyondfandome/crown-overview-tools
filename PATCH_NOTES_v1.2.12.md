# Crown of Ashes v1.2.12 — Schools, Events & Diplomacy Briefing

## Schools
- Adds **Study at School (Main Action)** to My Characters / Move.
- School identity is permanently the **province tile ID**. Demolition, reconstruction and ownership changes do not erase character training records.
- T1 outcome: 33% +1, 33% +0.5, 34% no improvement. T2: 50% +1, 50% +0.5. T3: 75% +1, 25% +0.5.
- A full +1 completes training permanently at that province. No improvement or +0.5 permits another attempt **only after reaching a higher tier**. Training always consumes a Main Action; a result above zero also locks movement for the round.
- GM rolls and validates skill selection, province and eligibility. Attempt history saved to the character token and Actor flags, separate from the building.

## Events
- Feast/Festival/Grand Tourney use `coaCelebrations190`, independent of the separate player wedding ledger `coaPlayerWeddings190`.
- Local active Festival Square/Feasting Halls/Tourney Grounds discount **Gold and Food** costs of any Feast/Festival/Tourney hosted in that province by 10/15/20%; each charge rounds UP to the next half resource.
- GM checks the host character is physically present in the hosting province and validates the House treasury before deducting. Event records now include actual paid amounts and discount for auditing.
- Existing event prep, award, duration and House buffs are preserved.

## Diplomacy
- Diplomatic Considerations describes (without numbers) defending House loyalty and active Social building defenses, using the same helpers as the actual roll. Existing culture and faith descriptions remain.

## Verification and caveats
- Source and syntax checks were run, but **no live Foundry test** has been performed. Back up world before installing.
- Training flags are carried on token and Actor. Character replacement/import with a *new* token and Actor must migrate those flags to preserve training history.
- Automatic updates: semver v1.2.12 supersedes v1.2.11 and v1.2.2.
