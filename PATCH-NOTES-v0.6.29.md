# Crown Overview Tools v0.6.29

## Round Clock / release packaging hotfix
- Restores the complete GM Round Clock handler and controls.
- Keeps Advance Round + Economy, Go Back One Round, Collect Current Round, Reset Economy Ledger, Reset Movement, and Reset Clock.
- Uses the canonical `scripts/crown-overview-tools.js` in `module.json` so release filenames cannot drift from the loaded script.
- Updates the manifest download target to the exact v0.6.29 GitHub release asset.
- No Market/trade-good balance redesign is included in this hotfix.
