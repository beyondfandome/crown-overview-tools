# Crown Overview Tools v1.1.89 — Test Patch

- My Realm: uncored controlled land provinces show **Attempt Marriage**. Marriage-protected provinces retain **Married** label. If conquest removes protection and the previous owner retakes a province, the button becomes available again.
- Dropdown filters active marriage ledger participants, characters with existing spouse data, and characters with spent Main Actions.
- GM-authoritative marriage attempt: d20 + character Diplomacy + Marriage Diplomacy + 5 sworn bonus vs 10 + local defender Diplomacy. Character spends Main Action on success or failure. Successful marriage marks the province Married and awards the current ruler +1 Influence. Existing active-alliance limit remains 3.
- Territory changes via siege or diplomacy deduct Influence from the former realm: ordinary −1, Married −2, explicitly marked realm capital −3. Highest applicable penalty only.
- Capital recognition: GM can now **Mark Capital / Unmark Capital** beside any province in My Realm. Loss charges −3 when that flag was set. Conquest clears the former realm's capital designation. This does not automatically choose a new capital.
- Third-raid neutralization remains governed by the existing raiding Influence penalty rather than charging another territory-loss penalty.
- Keeps prior v1.1.88 changes.

**Important limitations:** Not yet live-tested in Foundry. Territory loss when a player has *no remaining holding* is reported to GMs rather than charged because realm Influence is stored across holding resource data. GM/manual ownership reassignment does not automatically run the charge handler. Back up your world before testing.
