# Crown Overview Tools v1.1.54

- Tile-name Drawings are now label-only and cannot resolve as provinces.
- GM startup strips stale worldTile and houseData flags from label Drawings.
- getWorldTile/getHouseData hard-return null for label Drawings, so tokens over text resolve only to the underlying real province.
- Diligent was reviewed against available rules/source files; the trait is present in character data but no mechanical definition is documented, so no invented automation was added.
