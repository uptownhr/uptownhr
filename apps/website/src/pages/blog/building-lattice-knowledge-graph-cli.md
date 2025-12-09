---
layout: '../../layouts/BlogPost.astro'
title: 'Building Lattice: A Knowledge Graph CLI for Your Documentation'
description: 'How I built Lattice, a human-initiated knowledge graph system that turns markdown documentation into searchable, connected knowledge'
pubDate: 'Dec 08 2025'
heroImage: '/lattice-hero.png'
---

I've been deep into AI-assisted development with Claude Code, and one thing became clear: AI assistants work best when they have context. But context scattered across dozens of markdown files is hard to search and even harder to connect.

So I built [Lattice](https://github.com/Zabaca/lattice) - a knowledge graph CLI that turns your documentation into searchable, connected knowledge.

## The Problem with Documentation

Most documentation systems treat files as isolated units. You have a folder full of markdown files, maybe a search that does keyword matching, and that's it. But knowledge isn't isolated - it's connected.

When I research a topic, I create multiple related documents:
- Architecture decisions
- Technical comparisons
- Implementation notes
- Meeting notes

These documents reference the same concepts, tools, and decisions. But traditional documentation tools don't capture these relationships.

## What Makes Lattice Different

### Human-Initiated Extraction

Most knowledge graph tools (like GraphRAG or LightRAG) use a "pipeline-auto" approach - they automatically extract entities whenever you add a document. This sounds convenient, but it means:
- No control over what gets extracted
- No review before committing to the graph
- Hidden extraction quality issues

Lattice takes a different approach: **human-initiated extraction**. You decide when to extract entities, you can review what was extracted, and you commit changes to your graph explicitly.

```bash
# Extract entities from a document
lattice extract docs/architecture/authentication.md

# Review what was extracted (entities stored in YAML frontmatter)
cat docs/architecture/authentication.md

# Sync to the graph when you're ready
lattice sync
```

### Entities in YAML Frontmatter

Instead of hiding extracted entities in a database, Lattice stores them in your document's YAML frontmatter:

```yaml
---
title: Authentication Architecture
entities:
  - name: JWT
    type: Technology
    relationships:
      - target: User Authentication
        type: IMPLEMENTS
  - name: OAuth2
    type: Protocol
    relationships:
      - target: Third-Party Login
        type: ENABLES
---
```

This means:
- **Version controlled**: Entity changes are tracked in git
- **Editable**: Fix extraction errors before syncing
- **Transparent**: See exactly what's in your graph

### Powered by DuckDB

Early versions of Lattice used FalkorDB (a Redis-based graph database). It worked, but required Docker and external services. Then I migrated everything to DuckDB:

- **1,784 nodes** migrated with embeddings preserved
- **4,074 relationships** maintained
- **Zero external dependencies** - just a local file

DuckDB gives us:
- SQL for complex queries
- Vector search via VSS extension
- Single file storage (no Docker, no servers)

## The Workflow

Here's how I use Lattice with my research documentation:

### 1. Create Documentation

I use Claude Code's `/research` command to create new research documents. These are standard markdown files organized by topic.

### 2. Extract Entities

When a document is ready, I run entity extraction:

```bash
lattice extract docs/embedding-models/voyage-vs-openai.md
```

Claude Haiku analyzes the document and extracts:
- **Entities**: Tools, concepts, people, decisions
- **Relationships**: How entities connect to each other
- **Attributes**: Metadata about each entity

### 3. Review and Edit

The extracted entities appear in the document's frontmatter. I can:
- Fix misidentified entities
- Add missing relationships
- Remove irrelevant extractions

### 4. Sync to Graph

Once I'm happy with the extractions:

```bash
lattice sync
```

This updates the DuckDB graph with the new entities and relationships.

### 5. Semantic Search

Now I can search across all my documentation:

```bash
lattice search "authentication patterns"
```

This returns documents and entities ranked by semantic similarity, not just keyword matching.

## Claude Code Integration

Lattice is designed to work seamlessly with Claude Code. I created slash commands that integrate into my workflow:

- `/research [topic]` - Research a topic, create documentation
- `/entity-extract [file]` - Extract entities from a document
- `/graph-sync` - Sync extracted entities to the graph

The knowledge graph then feeds back into Claude Code through TemporalBridge (my AI memory system), giving Claude context about my past research and decisions.

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LATTICE ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Document                    Extraction                    Graph   │
│   ┌─────────┐                ┌──────────┐              ┌─────────┐  │
│   │ .md     │  ──────────▶   │  Claude  │  ─────────▶  │ DuckDB  │  │
│   │ files   │   /extract     │  Haiku   │   /sync      │  + VSS  │  │
│   └─────────┘                └──────────┘              └─────────┘  │
│        │                          │                         │       │
│        ▼                          ▼                         ▼       │
│   ┌─────────┐                ┌──────────┐              ┌─────────┐  │
│   │  YAML   │  ◀──────────   │ Entities │              │ Voyage  │  │
│   │ Front-  │   Writes to    │   JSON   │              │ Embed-  │  │
│   │ matter  │   frontmatter  │          │              │ dings   │  │
│   └─────────┘                └──────────┘              └─────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Components

1. **CLI** (`@zabaca/lattice`): Main interface for all operations
2. **Extractor**: Uses Claude Haiku for entity extraction
3. **Graph Store**: DuckDB with VSS extension for vector search
4. **Embeddings**: Voyage AI for semantic similarity

## Why Not Just Use [X]?

**Obsidian**: Great for personal notes, but the knowledge graph is based on explicit links, not semantic relationships. You have to manually create connections.

**Notion**: No real knowledge graph. Search is keyword-based.

**GraphRAG/LightRAG**: Pipeline-auto approach with no human review. Also Python-only (I wanted TypeScript/Bun).

**Neo4j**: Requires server setup. Overkill for personal documentation.

Lattice fills a specific niche: **TypeScript developers who want a knowledge graph for their markdown documentation with human-initiated extraction and local-first storage.**

## What's Next

I'm currently working on:
- **Better visualization**: A web UI to explore the graph
- **Cross-project search**: Query across multiple documentation repositories
- **Improved extraction**: Fine-tuning prompts for better entity recognition

## Try It Out

```bash
# Install globally
bun add -g @zabaca/lattice

# Initialize in your docs directory
lattice init

# Extract and sync
lattice extract docs/*.md
lattice sync

# Search
lattice search "your query"
```

Source code: [github.com/Zabaca/lattice](https://github.com/Zabaca/lattice)

If you're building documentation-heavy projects and want better search and discovery, give Lattice a try. I'd love to hear what you think.
