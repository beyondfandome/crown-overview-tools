# Crown Overview Tools v1.1.32

## Private bank activity

- Bank Loan Secured cards now whisper only to the borrowing player and all GMs.
- Early Loan Repaid cards now whisper only to that player and all GMs.
- Automatic due-date repayment and loan-default cards now whisper only to the affected player and all GMs.
- Uses the same `getPrivateActionRecipients()` helper already used by movement and diplomacy.

Existing chat cards are not retroactively re-permissioned by Foundry; only messages created after installing this version use the new privacy.
