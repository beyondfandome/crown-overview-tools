# Crown of Ashes v1.2.07 — Marriage Tile Verification & System Audit

- Following a successful Marriage Diplomacy takeover, verify that **both** `worldTile` and `houseData` contain `marriageProtected: true` and the correct controlling user ID **before** recording the alliance. If persistence fails, raise an error instead of silently reporting an unmarked holding.
- Apply the same verification to the separate direct Marriage action.
- Retains v1.2.06 City development (+12 Gold / -4 Food, Siege DC 60, +2 Influence once).
- Audited existing features (no behavioral changes): development included in trade/income breakdown; social buildings' Influence stripped from recurring income and awarded once on activation; GM Influence adjustment on My Realm; army port-crossing casualties (d10: 1-5 safe, 6-7 lose d10%, 8-9 lose 20%, 10 lose 30%).
- NOT included: unapproved diplomacy gift costs / score-based bonuses, or retroactive development-income repairs.
- Back up your world before installing; live Foundry testing is still needed.
