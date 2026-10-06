# Crown Overview Tools v1.1.63

- Bank loans no longer divide the borrowed Gold across every province in the realm.
- A loan is deposited once, preferring the borrowing character's current controlled province, with a stable controlled-holding fallback.
- The deposited Gold is still available to the pooled realm treasury for construction, upkeep, trade, and repayment.
- When an NPC/neutral province transfers into player control, its old local stockpile is quarantined under `preTransferNpcStockpile` instead of immediately becoming player realm money.
- Existing player-to-player political transfers do not erase already-player treasury balances.
