# v1.2.13 — Diplomacy briefing null-token fix

- Fixed `findDefenderCharacterForTile` crashing when a player opens Diplomatic Considerations. Preview calls intentionally have no attacker token.
- Preserve defender matching and attacker exclusion when an attacker token exists.
- No migration or changes to saved treasury, marriage, province, or character flags.
- Release ZIP URL expects tag `1.2.13` (without `v`) to match the current repository release-tag convention.
