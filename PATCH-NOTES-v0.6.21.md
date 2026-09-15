# Crown Overview Tools v0.6.21

## Raiding
- Added **Raid Territory** for selected armies.
- Requires at least 500 troops and an enemy land territory.
- **Hard blocked if any opposing army is present**, checked both before confirmation and again immediately before resource mutation.
- Roll: d100 + commander Martial vs 50 + fortification bonus (10/20/30) + barracks bonus (5/10/15).
- Success steals 25% / 50% / 75% of current tile Gold/Food income by margin; natural 100 steals 100%, subject to limits.
- Carry capacity per 500 troops: 2 Gold and 3 Food. Loot cannot exceed the defender's actual stockpile.
- Loot is deducted from the target and credited across the raider's controlled realm stockpile.
- A territory can be raided only once per round.
- Raiding spends the army's strategic action and all remaining movement for the round.
- Player raid requests are GM-resolved through the module socket, with validation repeated server-side.
