# Crown Overview Tools v0.6.24

## Development / building-set correction
- Development now counts physical building pieces, not completed building lines.
- Each province supports at most 4 building pieces.
- Development Stewardship/Statecraft requirements are 5 / 10 / 12 / 16 for Development 1 / 2 / 3 / 4, regardless of which building is being constructed.
- Upgrading a line adds the next piece of that set and consumes another Development slot.
- A Watchtowers + Holdfasts + Castle set therefore occupies 3 slots, leaving 1 slot for another Tier I building.
- Building effects and income use the highest completed tier in a line; tier bonuses do not stack with the earlier pieces in that same line.
- Legacy saves that stored only the highest tier are counted compatibly: a Tier II line counts as 2 pieces and a Tier III line as 3 pieces.
- The existing building dialog layout and category UI are retained, with its slot/development preview corrected for upgrades.
- Demolishing a building line removes the full set and recalculates Development metadata.

## Compatibility fix
- Raid Defense now correctly reads the Watchtower/Holdfast/Castle building line key.
