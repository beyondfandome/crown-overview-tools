# Crown Overview Tools v1.1.55

- **Diligent** is now an active strategic construction action: a Diligent character may spend their action while in a land region to prepare a 25% discount for their realm's next build/upgrade in that same region during the current round. The character is grounded for the round and the prep is consumed only when construction successfully starts.
- **Engineer** now passively reduces by 10% the cost of building projects personally started by that character.
- Engineer and Diligent stack additively to 35% when an Engineer starts a project benefiting from another Diligent character's regional preparation.
- Construction now refuses to start with a character who has already committed a strategic action that round.
- Build UI and private build chat show active construction discounts and the actual discounted cost paid.
- Tile-name Drawings remain labels only and startup sanitation now also forces their fill/stroke alpha to true zero; stored province geometry still uses validation-safe near-transparent alpha. This targets the stray rectangular/line artifacts without making labels act like provinces.
