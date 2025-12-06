# Qelva Threat Model (Beta)

Qelva is a **privacy-native identity & transaction layer** on Solana.
This document describes, at a high level, what we are trying to protect and from whom.

## 1. Assets

The main assets we care about:

- User private keys and mnemonics
- User PIN / local authentication secrets
- Mapping between real identity ↔ on-chain personas
- Mapping between different personas belonging to the same user
- Transaction graph privacy (who paid whom, when, and how much)
- Automation rules that may reveal patterns or balance thresholds

## 2. Adversaries

We assume the following potential adversaries:

- **On-chain observers**  
  - Anyone watching Solana chain data (indexers, explorers, MEV bots, etc.)
- **Network observers**  
  - Nodes or infrastructure that can see traffic between client ↔ backend ↔ relayer
- **Curious backend operator**  
  - Backend sees metadata but should not see keys, mnemonics, or real-world identity
- **Curious relayer operator**  
  - Relayer executes intents and sees on-chain tx, but should not trivially link all personas
- **Basic malware on user device**  
  - Can read some local state; mitigations rely on OS + client hardening (out of scope here).

We do **not** currently model:

- State-level actors with global traffic visibility + subpoena powers
- Advanced hardware compromise (cold wallet theft, TEE breaks, etc.)

These may be considered in a future, stronger model.

## 3. Goals

Qelva aims to provide:

- **Non-custodial key ownership**  
  - Keys and mnemonics are generated and stored locally; backend and relayer never see them.

- **Persona separation**  
  - Activity under one persona should not trivially link to another via on-chain heuristics.

- **Reduced address linkability**  
  - Direct “user wallet → tx” exposure is replaced by a relayer-based model.

- **Metadata minimisation**  
  - Backend and relayer only store what they actually need to function.

- **Safe defaults**  
  - Users get privacy-preserving behaviour without having to flip ten settings.

## 4. Non-Goals (for now)

Qelva does *not* currently aim to provide:

- Perfect, formally proved anonymity against global adversaries
- Full protection against compromised user devices
- Strong privacy guarantees if users voluntarily leak data to third-party services

We prefer **honest, practical privacy** over marketing buzzwords.

## 5. Attack Examples (High-Level)

Examples of what we care about:

- **Address clustering:**  
  Chain analysis tools try to group multiple addresses as belonging to one entity.

- **Timing correlation:**  
  A large incoming tx and several outgoing txs happen back-to-back; easy to link.

- **Relayer deanonymisation:**  
  If relayer always sends from a small set of addresses, its behaviour becomes predictable.

- **Persona cross-linking via automation:**  
  If a single automation rule touches multiple personas in a naive way, an observer can link them.

These are the types of attacks the Split & Delay engine, persona separation, and relayer design are meant to reduce.

## 6. Design Principles (Privacy)

- Minimise data collection and retention
- Keep cryptographic material at the edge (client)
- Prefer multiple weak signals of privacy over a single brittle one
- Make privacy the default path, not an optional upgrade

This doc will evolve as the implementation matures.
