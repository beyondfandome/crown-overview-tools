# Crown Overview Tools v0.6.14

## What v0.6.14 changes

- Reworked military upkeep to use a House-wide Realm Stockpile

- Armies and navies no longer charge their entire upkeep to one arbitrary province

- Previously the module:
  totalled a player's military upkeep
  found the first controlled economy tile
  deducted the entire bill from that one province

- This is why messages could say things such as:
  "Thom: -Gold 13.5; Food 14.5 from Wyl"

- Wyl was not actually responsible for those armies
- It was simply the first qualifying controlled tile found by the module


- Military upkeep is now treated as a realm-level cost

- All controlled land-province stockpiles are treated as one logical:
  Realm Stockpile

- The player's total Gold / Food across their holdings is the military treasury

- Army and navy upkeep is deducted from that combined realm balance

- The economy message now says:
  from Realm Stockpile
  rather than naming an arbitrary province


- Upkeep debits are distributed across the realm balances

- When the realm can afford the bill, the deduction is spread proportionally
  across provinces according to the resources currently held there

- This avoids randomly draining Wyl, Cinderholdt, Blackmont, or whichever
  province happens to appear first internally

- If the total realm cannot afford the full upkeep, the available resources
  are exhausted first and the remaining shortfall is distributed across the
  realm rather than placing the entire deficit on one arbitrary province

- This preserves the existing rule that military upkeep is always charged
  while making the accounting House-wide


- Military Upkeep reports now show:

  Total Upkeep
  Realm Stockpile before payment
  Realm Stockpile after payment
  individual army / navy upkeep lines

- Example:

  Thom: -Gold 13.5; Food 14.5 from Realm Stockpile
  Realm: Gold 1,006; Food 967.5 → Gold 992.5; Food 953
  Alester's Host: Gold 10; Food 12
  Grand Maester Thomore's Host: Gold 3.5; Food 2.5


- My Holdings terminology has been updated

- The top summary card now says:
  Realm Stockpile

- "Total Stockpile" now says:
  Total Realm Stockpile

- Individual province stockpiles are still shown in the table because
  construction and local economy data continue to use province records


- Why this is implemented as one logical realm pool rather than creating a second duplicated bank

- The existing campaign already stores Gold / Food inside each province

- Creating a second independent Realm Treasury would duplicate those same resources
  and require a risky migration of every existing campaign balance

- v0.6.14 therefore treats the aggregate of all controlled province balances
  as the authoritative Realm Stockpile for military costs

- From the player's point of view it behaves as one House treasury
- Internally the existing province records remain the backing ledger

- This keeps all existing campaign resources intact while giving military upkeep
  the realm-wide behaviour intended by the rules


- Building and province-specific economy spending are NOT changed in this update

- This update only changes army / navy military upkeep

- All v0.6.13 and earlier gameplay systems remain included

## ZIP contents

- module.json
- README.md
- scripts/crown-overview-tools-v0.6.14.js
- styles/crown-overview-tools.css
