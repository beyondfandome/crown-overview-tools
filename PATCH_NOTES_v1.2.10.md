# v1.2.10 — Wound Recovery (pre-Godswood)

- Character Actions: Recover and Apply Medicine are independent Main Actions. Both may successfully heal a wound; healing is applied once at the end of the round. Recover grounds the patient, Medicine does not ground the healer.
- Injury DCs scale with **current injuries / maximum Wounds**: 10 (up to 1/3), 12 (up to 2/3), 15 (above 2/3).
- Medicine is `Lore / 4`; Sept bonus +1/+2/+3 from an active Village Sept / Monastery / Grand Sept in the patient's province. +2 Medicine when the patient took Recover this round (regardless of their Recover success). Action order does not matter; the bonus is retroactively checked if Medicine preceded Recover.
- Maximum Wounds remains the existing imported `wounds` stat. `coaCurrentInjuries` is a **new, separate current-injury value**, editable by GMs in Character Actions. Existing wound incidents and prior sheets may need GM reconciliation; this does not automatically infer historical injuries.
- GM resolves player requests through the module socket; the round ledger enforces one Recover and one Medicine per patient per round; settlement is idempotent.
- Godswood troop effect and remaining Influence-building changes are NOT implemented in this patch; pending balance choice.
- Deployment reminder: upload to a GitHub v1.2.10 release before relying on the configured download URL.
