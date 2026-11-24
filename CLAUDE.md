# Working on this repo

This is Destine's capstone site for Royal Beads Edo (brand Taoué). It is graded against the class Capstone Student Brief. These steps run automatically for every task. Don't wait to be asked.

## Before building anything

1. Read [docs/RULES.md](docs/RULES.md) and [docs/PHASES.md](docs/PHASES.md).
2. Check the planned change against every line of the RULES.md checklist. If any rule would break (for example a video replacing the AI hero, an unlabelled image, a date shown to customers, or an Enquire link that skips the n8n form), stop and tell Destine before building. Give the rule number and a fix that keeps the rule.
3. In PHASES.md, mark the item as in progress. If it's new, add it to the right phase.

## While building

- Follow the client rules. Never show or promise a custom-set ready date. Show price ranges only. Every Enquire goes to the group n8n form with `Business=Royal Beads Edo` prefilled.
- Every AI image gets the small "Concept image" tag. Every third-party photo gets an on-image credit.
- Write copy as a real business. No demo, placeholder or assumption wording.
- Commits use Destine's identity only. No Claude author, no Co-Authored-By trailer, no session link.

## Before merging to main (the live branch)

Keep the checks light. Run only:

- `npm run lint` and `npm run build`.
- The RULES.md checklist, ticked, in the PR description. The PR template adds it.
- A quick look at 375 px wide: no sideways scroll, the hero line visible first, the chat bubble not covering buttons.

Don't add heavy test suites. Don't rerun checks that already passed when nothing changed.

## After finishing

Tick the item in PHASES.md. If the phase is done, update "Current phase". Do both in the same PR.

## Next.js notes

@AGENTS.md
