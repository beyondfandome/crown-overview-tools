# v1.2.05 — Marriage diplomacy status fix

- Successful Marriage Diplomacy takeover now sets province `marriageProtected` and marriage-controller metadata on both `worldTile` and `houseData` before saving the takeover.
- Province hover now recognizes an existing active marriage-ledger record for the *current* province owner, covering historical records created without a protection flag.
- Does not automatically alter old political flags, retry checks, grant Influence, or consume another marriage slot. Existing historical marriages still require flag repair to enforce *all* immunity rules outside the hover.
- Retains 1.2.04 political owner label fix and prior 1.2.x changes.
- JS parse and ZIP integrity verified; Foundry live behavior untested.
