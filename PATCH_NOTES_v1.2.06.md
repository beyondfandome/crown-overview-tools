# Crown of Ashes v1.2.06 — City Rebalance

- City development income: +12 Gold / −4 Food per collection (previously +9 / −1).
- City base siege DC: 60 (previously 55). Existing fortification and stone DC bonuses still apply.
- First activation of City development grants +2 Influence once, at its first eligible economy collection. A persistent `cityInfluenceClaim1206` on the province prevents repeat grants.
- Existing completed Cities are marked claimed without backpay. Conquest does not reset the claim marker.
- Food deficits flow through the existing House shared treasury adjustment; insufficient Food may prevent a collection, so make sure Houses can pay the City deficit.
- Retains v1.2.05 marriage and earlier features. Does not repair historical missed development payouts.
- Source syntax and ZIP integrity verified; live Foundry testing pending.
