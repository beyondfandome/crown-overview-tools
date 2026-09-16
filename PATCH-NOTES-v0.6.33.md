# Crown Overview Tools v0.6.33

- Fixed demolition leaving building income active after a building line was destroyed.
- Demolition now removes the line from built buildings, construction metadata, and cached building-slot state.
- Building slots are rebuilt from surviving buildings after demolition, repairing stale legacy slot references.
- Demolition chat now reports the Gold/Food income removed per round when applicable.
- Retains v0.6.32 Market rebalance and 5/15/30 Gold construction costs.
