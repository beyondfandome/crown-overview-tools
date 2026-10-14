# Crown Overview Tools v1.1.91 — Test Patch

- Automatically assigns each player's capital when ONE unambiguous controlled original-local-House starting province exists. Keeps any previously flagged capital; does not guess from conquered territory or ambiguous multi-holding starts. GM may manually resolve ambiguous Houses using the existing My Realm capital control.
- Persists initial capital decisions per scene. Conquest clears the captured province's capital flag, but no new capital is silently selected.
- Enforces one capital per House when assigned through the GM control. Capital designation removes province Married status and ends its province-level protection ledger records (not player-to-player wedding alliance records).
- Capital displays **Capital**, never Attempt Marriage / Married. Married and Occupied provinces hide Attempt Marriage. GM marriage requests also reject capitals.
- **Open Granaries** removed from permanent panel. Existing WINTER HAS COME popup and round announcement remain, with pay button in the popup.
- Explicit Main Action labels on Raid Territory, Diplomatic Takeover, Host Event and Attempt Marriage. Underlying action handling from v1.1.90 remains unchanged.
- Known limitation: original starting provinces cannot always be reconstructed from modern ownership flags. Ambiguous Houses are skipped rather than assigned an invented home capital.
- Testing needed in Foundry: multi-client round advance, historical capital migration, province data preservation, capital conquest and wedding action edge cases.
