# Decision Knowledge Base — The Surgery Center at Plano Dermatology

This directory is the **source of truth** for every durable decision made
during the build and design of this site. It exists so a brand-new Claude
session (or a new collaborator) can pick up exactly where the last one left
off without re-deriving or re-asking anything.

Two other systems mirror this KB — both are secondary:

- The **`memory` MCP knowledge graph** (`~/.claude/memory-graph.jsonl`) holds
  the same decisions as entities/relations for cross-project recall. **On any
  conflict, this markdown wins**; the graph is regenerable from these files.
- Claude Code **auto-memory** for this project points here from its index.

The `decision-log` personal skill (`~/.claude/skills/decision-log/`) is what
keeps all three in sync — it fires whenever a decision is made, confirmed,
changed, or reversed.

## Entry format

Every decision is recorded as an entry like this, **newest first** within each
file. Reversed decisions are never deleted — they're marked and linked to what
replaced them, so the history explains *why not X*.

```markdown
### YYYY-MM-DD — Short title
- **Decision:** one declarative sentence
- **Rationale:** why, in one or two sentences
- **Status:** Confirmed | Pending | Reversed → [[file#anchor]]
- **Source:** chat YYYY-MM-DD / commit hash / plan file / SKILL.md
- **Links:** [[design-decisions]] [[definitions]]
```

Wiki-links use `[[filename]]` or `[[filename#heading-anchor]]`, matching the
auto-memory convention.

## Files

| File | What it holds |
|---|---|
| [[focus-areas]] | Current priorities, open threads, pending confirmations, deferred work |
| [[practice-decisions]] | Business/practice-level decisions: positioning, audience, awards, voice |
| [[design-decisions]] | Design-system history including the two reversed systems; likeness rules |
| [[definitions]] | Glossary of clinical and project-specific terms |
| [[medical-focus]] | Medical claims ledger — CONFIRMED (publishable) vs UNCONFIRMED (never render) |

## How to add an entry

1. Append under the matching file, newest first, using the format above.
2. Cross-link related entries with `[[wiki-links]]`; reversals link both ways.
3. Mirror the decision into the `memory` MCP graph and the project auto-memory
   — normally the `decision-log` skill does all three writes for you.
