# Crown Overview Tools v1.1.34

- GM **Cancel Pending Army Muster** now restores the commander to the exact movement/action state they had immediately before calling the muster.
- Pending musters created before v1.1.34 fall back to restoring full action availability when their only current lock is the army-muster lock.
- Character data resolution now includes **Culture** and **Religion/Faith** directly.
- Diplomatic Takeover now resolves an explicitly assigned **Ruling Character / NPC Defender** by Character ID even when that character token is elsewhere on the strategic map.
- Diplomacy continues to prefer the actual defender character's Culture/Faith over province defaults when a defender character exists.
- GM diplomacy detail cards now display the exact attacker/defender Culture and Faith values used for the comparison.
