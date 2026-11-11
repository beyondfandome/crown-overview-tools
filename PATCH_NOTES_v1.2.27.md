# Crown Overview Tools — v1.2.27 Military Stability

- Army route steps await an **automatic GM-side verification** of army encounters before continuing; no GM approval popup or manual signoff is required. Pending encounters and battles stop subsequent route movement.
- Movement route reentrancy guard prevents duplicate movement orders on the same formation in one client.
- Fallback destinations include eligible neutral or non-hostile foreign provinces and mutually friendly army-occupied provinces; hostile and non-friendly occupied destinations remain invalid.
- New **GM Military Control Panel** unifies Army Audit, encounter history, pending army encounter recovery, interception override/history, post-battle release, House relations, and event/mercenary troop tools.
- GM encounter recovery permits retrying unanswered player decisions, clearing a peaceful meeting, or declaring a battle.
- GM post-battle release offers a list of all locked armies and releases the corresponding battle group without deleting commanders or troops.

**Testing note:** Validate multiplayer encounter and movement behavior in a backed-up Foundry world. The GM client must be online to host authoritative checks.
