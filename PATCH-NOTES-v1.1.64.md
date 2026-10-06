# Crown Overview Tools v1.1.64

- Hover tooltips no longer leak current political ownership through line of sight.
  - Outside current player sight, Player Owner, ruling House, ruler, allegiance, economy, buildings, and other political/internal information are hidden.
  - Geographic information such as province name, region, terrain, movement cost, Culture/Religion, and public supernatural/social markers remains hoverable.
- Added a public marriage-control marker to province hover: `💍 MARRIED INTO <REALM> 💍`.
  - New Marriage Diplomacy records now store the acquiring House/realm.
  - Existing marriage records fall back to the controller user/current allegiance when needed.
  - The marker is shown only while the province is still politically controlled by the realm that acquired it through marriage. If control changes, the marker disappears automatically without deleting the historical marriage ledger.
