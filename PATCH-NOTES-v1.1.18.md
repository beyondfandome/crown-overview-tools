# Crown Overview Tools v1.1.18

## Political Overlay round-snapshot performance hotfix

- Political overlay geometry is built **at most once per strategic round per client**.
- Turning the overlay off and back on during the same round only hides/shows the cached snapshot; it does not rebuild it.
- Drawing updates, token movement/selection, user changes, and Crown visibility recalculation no longer trigger political redraws.
- The World Round Clock is the snapshot cache key. Advance/rewind changes the key, so the active overlay builds one fresh snapshot for the new round.
- Player ID/name/House colours are resolved once for the entire snapshot. Province rendering uses constant-time lookup rather than repeated realm scans.
- The one allowed round build is still spread over small animation-frame batches to avoid a single large blocking frame.
- Strict fog remains authoritative. Non-GM snapshots create political geometry only for provinces already present in Crown visibility `revealedEntries` at snapshot time.
- The cached political container is additionally masked by Crown's **live visibility graphics**, so a province that later falls under fog cannot reveal stale political colour, borders, or silhouettes.
- Newly revealed provinces later in the same round intentionally do not gain political colour until the next round snapshot. This is the requested once-per-round behavior.
- GMs retain the complete political map snapshot.
- Boxed v1.1.15 economy/military/raiding/movement systems and v1.1.16-v1.1.17 ownership/fog fixes are otherwise unchanged.
