# Crown of Ashes — v1.1.88 Patch Notes (Test Build)

Based on v1.1.87; retains earlier round lock, shared Main Action restrictions, arrival points, anti-stacking fallback, winter granaries and raiding rules.

## Implemented in v1.1.88

- **Quick Siege: Assault Quality.** Per 500: Mob 0; Light Infantry/Spearmen/Archers +0.5%; Light Cavalry +0.25%; Heavy Infantry/Pikemen/Crossbowmen +1%; Lancers/Heavy Cavalry +0.5%. Maximum +8 percentage points. Existing DCs, Martial, manpower, engine, duration, Foothold and outcome probabilities preserved.
- **Quick Siege: proportional, exposure-weighted infantry and cavalry casualties.** Mob 1.40; Light Infantry/Spearmen/Archers 1.15; Heavy Infantry/Pikemen/Crossbowmen 0.90; Light Cavalry 0.85; Lancers 0.70; Heavy Cavalry 0.60. The total casualty count is maintained; whole-person distribution uses largest remainder. Army compositions, current strength and troop upkeep are updated.
- **Only battering rams risk destruction in assaults.** Ballistae, onagers and trebuchets are not damaged by Quick Siege casualties. For each ram, the probability of loss is the effective attacker casualty percentage (after ballista reduction); this is an interim simple approach, not cumulative damage. Example: 10% casualties means each ram has a 10% chance of being lost. The previously proposed 100/75/150/250 virtual exposure allocations are NOT implemented for other engines, by design.
- **Population:** Growth each round by current province development: 0.5% / 1% / 2% / 4% / 6%; no per-round minimum; no natural growth from zero. Awards +500/+1500/+3000 on activation of an eligible Tier I/II/III construction record; +6000 once on reaching City when that transition is recorded. No population reroll when construction starts or when editing existing buildings. No manpower/income impact from population. Batch drawing updates. Old completed buildings do not receive retroactive grants.
- **Winter default:** On advancing *out of* an unpaid winter round, each affected player realm loses 1 Influence and 10% (rounded up) of current population in each controlled land province. Debited once per House per winter round; payment via Open Granaries prevents the penalty. Two unpaid rounds compound losses. The winter ledger records settlement of missed payments.
- **Military-conquest occupation:** Successful Quick Siege removes the province's Married protection and sets three-round diplomatic immunity. The diplomacy handler checks occupation at submission. Expiry uses the existing round clock without separate tick-down jobs.

## Retained from v1.1.87

- Raid payout 50% / 100% / 150% provincial income; influence −1 per successful raid (House cap −3 per round), loss of province income at next collection, 0.5% / 1% / 2% population casualties; remaining movement retained.
- Three successful raids in the same in-game year neutralize an unmarried, controlled province; one successful raid per province per round; neutral provinces cannot be raided; Married provinces cannot be neutralized by raiding.
- Winter granary payment amounts 1 / 2 / 3 / 4 / 5 Food per winter round according to province Development.
- GM round lock, Main Action enforcement, province arrival placement with fallback stacking.

## NOT included / requires later work

- My Realm **Attempt Marriage** button on uncored provinces, with eligible unmarried character selector and +5 sworn-to-you rule; +1 Influence when a province becomes Married. Existing marriage mechanics are preserved, but this NEW panel workflow was not safely finished for v1.1.88.
- Differentiated Influence penalties when losing ordinary / Married / realm-capital provinces: exact values were not recovered and cannot be implemented faithfully yet.
- Permanent Crown-vs-Battle scene isolation.
- Full multiplayer/Foundry regression testing; only syntax and ZIP integrity checks have been run.

## Notes on timing

Population updates occur during advance into the new round; construction settlements occur when their building activation round is reached. Starvation penalties are assessed when leaving the winter round. Capital city growth at 6% each round is deliberately aggressive and may change game balance over multiple campaign years.
