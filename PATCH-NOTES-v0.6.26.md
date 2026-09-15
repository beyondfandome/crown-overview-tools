# Crown Overview Tools v0.6.26

- Fixed player demolition permissions: demolition requests are now GM-mediated and revalidated before the territory Drawing is changed.
- Armies now have an independent base movement of 2 instead of inheriting commander speed when mustered.
- An attached commander uses the army movement allowance, even when the army movement is above the character base (for example, a Movement 4 army gives its attached commander Movement 4).
- Attached army and commander share movement spent and travel together in either direction, preventing detach-after-move movement exploits.
- Detached, besieging, or embarked armies do not override normal character movement.
