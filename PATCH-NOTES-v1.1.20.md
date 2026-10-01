# Crown Overview Tools v1.1.20

## Military Sustainability + Round Edge Hardening

- Military upkeep remains mandatory and may drive a House's realm Gold/Food below zero.
- If a realm finishes its military-upkeep charge with either Gold or Food below zero, that realm loses **1 Influence for that round**. This is one point per realm/round, not one per negative resource.
- Influence cannot be driven below the existing 0 floor. A realm already at 0 Influence remains at 0 while negative.
- Restores the Guidebook levy rule exactly: below 7 Influence, levy capacity falls **10% for each point below 7**, reaching a 70% penalty / 30% levy cap at Influence 0.
- After upkeep and any Influence loss, the module recalculates the realm's actual levy cap from its currently controlled land, Mustering infrastructure, and Influence.
- If total surviving fielded army strength exceeds that cap, the realm suffers attrition equal to **5% of currently fielded troops per round**, capped at the actual amount over the levy cap.
- Attrition is distributed proportionally across that realm's active armies and reduces `strengthCurrent`, preserving the module's existing casualty convention and automatically lowering later upkeep.
- Province loss therefore lowers the levy cap immediately for the next round's sustainability check even if local historical House identity is preserved.
- Economy collection now stamps economy-enabled provinces as collected even when their payout is zero, preventing a same-round GM trade-good edit from creating an unintended second payout.
- Trade delivery is isolated per shipment. A recipient with no controlled land no longer aborts Round Advance; the shipment stays in transit and is retried on later rounds. Overdue in-transit shipments are eligible for retry.
- Legacy `pending` navy musters are now processed by the same Round Clock readiness path as pending army musters. Current immediate-launch navy behavior is unchanged.
- v1.1.19 Political Intelligence Memory and the v1.1.18 once-per-round political snapshot architecture are otherwise unchanged.
