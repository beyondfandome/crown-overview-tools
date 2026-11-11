# Crown Overview Tools — v1.2.22 (test build)

## Cross-House construction
- Visiting characters may propose an eligible building or upgrade on a player-owned foreign province.
- Builder chooses how much Gold to contribute; the owner receives a private approve/decline prompt showing the rest of the cost.
- Both treasuries are rechecked upon approval. Only then are funds deducted, construction started, and the visiting builder's Main Action consumed and movement locked.
- Declines and invalid/expired proposals cost nothing; approval requires the province owner to be online.
- Project retains original construction slots, tiers, discounts and activation rules. If costs change while awaiting approval, the proposal is canceled.
- This version holds a contribution *authorization*, not an upfront Gold escrow; Gold does not leave either treasury until approval.

## Province lockdown
- A character standing in an owned land province may spend a Main Action to lock or unlock the province.
- Lockdown halves the province's positive Gold/Food income through the existing curse income calculation; curse and lockdown do not double-stack.
- Foreign characters entering by path movement must succeed on 1d20 + Intrigue vs DC 15. Success costs +1 movement; failed attempts spend 1 movement without entering.
- Locked-down port destinations also require a successful Intrigue check for foreign characters, replacing normal port permission when passed. Port crossing uses remaining movement and requires at least 2 movement points for this bypass. Military crossings retain the original permission system.
- GM/player controls in the overview panel and Main Actions selector; lockdown status shown on province hover.

## Province inspection
- Character presence grants the controlling player access to province income, trade goods, development, and buildings regardless of ownership, including neutral provinces.
- Visitors do **not** see House stockpiles or treasury balances. Access ends on departure.

## Privacy
- Trade shipment sent/delivered messages only to the sender, recipient and GM.
- School training rolls and outcomes only to the studying player and GM.
- Diplomatic gift details were already GM/private in v1.2.20 and remain so.

## Known limitations / test instructions
- This build was statically checked, not run in a live Foundry world. Back up your world first and test in a copy.
- Approvals are held in the active GM client's memory; an unanswered proposal is lost if the GM reloads. No money has been charged for pending proposals.
- Lockdown checks are implemented in Crown's character path movement and port crossing handlers; they have not been validated for all third-party token movement methods.
- Intrigue check DC defaults to 15; we have not finalized a fortification/skill scaling rule.
- Test normal building, owner accept/reject, low funding, simultaneous offers, cursed+locked income, visitor tooltip, port and walking entry, school privacy, and trade privacy.
