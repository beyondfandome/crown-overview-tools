# Crown Overview Tools v1.0.10

- Restores province Drawing borders/fills to the validation-safe near-transparent values used by the stable 1.0.0 maintenance behavior (`0.001`).
- Preserves province text while removing visible polygon/rectangle lines and fills.
- Includes a GM **Hide Province Drawing Lines** maintenance button and automatically repairs Crown province Drawing appearance on overview-scene load.
- Province Highlights Off now explicitly releases Drawing selections and activates Foundry's Token layer using its normal layer lifecycle.
- Does not mutate Drawing frame/control display internals.
- Preserves assigned-character ownership/control repair.
- Preserves `getStrategicArmiesForBattle()` and Battle Army Tools integration.
