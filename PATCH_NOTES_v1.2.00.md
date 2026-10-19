# Crown Overview Tools v1.2.00 — ALL-HOUSE MIGRATION BUILD

Based on original 1.1.99 ZIP supplied by the GM.

## Implemented
- Ledger-based Gold/Food for Houses that already have approved `coaHouseTreasuries120Test` migration entries.
- Province income credited to opted-in House ledger with stable per-province-per-round idempotency keys.
- Realm spend, bank loans, loan repayment, raid loot, shipments and military upkeep follow ledger-based helpers for migrated Houses.
- Capital mirror updated from House ledger. GM capital reassignment moves the mirror without changing House balance.
- Conquest starts captured provinces with zero Gold/Food. Previous migrated owners keep their House ledger; legacy player owners have remaining reserves shifted to another holding before loss, or transfer refuses if no safe destination.
- GM-only Reset Actions in My Characters.
- Celebration event request now distinguishes message type from eventType.
- Kinslayer character excluded from province marriage, and Houses with Kinslayers capped at two active marriages.
- Harrenhal's existing cursed-income half multiplier preserved; it is not changed in this build.

## Restrictions / NEEDS FOUNDRY TESTING
- ALL audited, province-owning player Houses migrate on first map load. Legacy balances are not simply summed into the ledger. New unreviewed House IDs stop the migration without changing balances.
- GM audit targets are used for previously unmigrated Houses; existing migrated Forrester/Harlaw balances are preserved, with Harlaw Food corrected to 10.
- Before any writes, a full scene-level backup is saved under coaAllHouseMigrationBackup120. The marker coaAllHouseMigration120 prevents repeat migration.
- This is an integration test build, not an audited production release. Source syntax and archive checks do not exercise Foundry document/socket transactions.
- Full cross-document atomic rollback is not guaranteed by Foundry's document update API.
- Additional direct GM tile edits and extraordinary military paths require live verification.
- A migrated House with no unique designated capital retains its ledger, but will not show its entire balance in a capital mirror until a new capital is set.
- Never advance the real campaign round without a backed-up test world and staged verification first.
