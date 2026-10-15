# Crown Overview Tools v1.1.96 — Testing Build

- **Movement:** Saved custom arrival points remain authoritative. Placement searches only four short rings around the anchor for an open slot within the province, then stacks at the anchor if crowded. No secondary token-update hook is used; normal animated Crown movement is retained. Applies to characters, linked units, and muster placement via the shared helper.
- **Military privacy:** Army raising chats remain private to owner and GM; navy muster requests and launches now also whisper only to owner and GMs instead of broadcasting publicly. Normal scene token visibility and vision mechanics are not altered.
- **GM province marriage:** My Realm offers eligible characters belonging to the selected player's House; the GM can assign/edit/remove province marriages without rolls, Main Action, or Influence reward. Candidate selection checks House identity instead of relying on blanket actor permissions.
- **Version:** Module manifest and legacy console label updated to 1.1.96.

## Test carefully
1. **Disable the temporary GM arrival-correction hook macro** before evaluating this update, and reload every client after installing.
2. Test two or more characters entering Highgarden and Cobblecove; they should animate to nearby distinct slots. Some stacking is expected in very small/irregular provinces.
3. From two player sessions, raise army/navy; only the owning player and GMs should see muster chat.
4. As GM, inspect a player's My Realm and assign a province marriage using that player's eligible character; verify unrelated player characters are excluded.

Syntax and ZIP integrity checks are static only; Foundry multiplayer behavior must be verified live.
