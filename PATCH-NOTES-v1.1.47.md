# Crown Overview Tools v1.1.47

- Fixes phantom **Summoned an army this turn** movement locks when a character has no live pending muster and no active linked army.
- Startup GM repair automatically clears unambiguous orphaned/cancelled muster locks.
- GM muster cancellation now also clears any matching legacy character-level muster lock, not only the world-piece lock.
- Legitimate pending musters and genuinely active spawned armies are left alone.
