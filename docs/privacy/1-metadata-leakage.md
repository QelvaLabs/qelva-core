# Metadata & Leakage Surfaces (Beta)

Even with encryption and non-custodial keys, **metadata** can still leak a lot of information.
This document lists main metadata surfaces in Qelva and how we plan to reduce them.

## 1. On-Chain Metadata

- Transaction timestamps
- Amounts and token mints
- Relayer addresses used as senders
- Recipient addresses
- Fee payer information

**Mitigations (planned / partial):**

- Use a pool of relayer addresses instead of a single hot wallet
- Split large transfers into multiple smaller ones (Split & Delay)
- Randomised delay windows to break simple timing correlations
- Support for different persona-level “privacy profiles” (more/less aggressive obfuscation)

## 2. Backend Metadata

Backend should only see:

- Intent payloads (without raw key material)
- Minimal user identifiers required for auth / rate limiting
- Automation rules and state necessary to execute them

**We explicitly avoid:**

- Storing raw mnemonics / private keys
- Storing PINs in plaintext
- Building marketing-style user profiles based on intents

## 3. Relayer Metadata

Relayer(s) sees:

- Intents selected for execution
- On-chain transactions produced from those intents
- Internal schedules for Split & Delay

Risks:

- A single relayer has a privileged view of user activity
- If logs are too verbose, they become a privacy leak on their own

**Mitigations (planned):**

- Configurable logging levels with sane defaults (no full payload dumps)
- Option to self-host relayers (user/organization-controlled)
- Clear separation between intent data and operational metrics

## 4. Network Metadata

TLS protects contents in transit, but not:

- IP addresses of clients, backend and relayers
- Connection timing patterns

These are partially out-of-scope for the protocol, but:

- We encourage running Qelva clients and relayers behind privacy-respecting infra
- Future docs may include guidelines for Tor / VPN / proxy setups

## 5. Logging Policy (Draft)

As a starting point:

- No application logs should contain:
  - mnemonics
  - private keys
  - PINs
  - full raw intents, unless explicitly in a debug mode

- Logs should focus on:
  - high-level events (intent accepted, intent executed, rule triggered)
  - error codes and IDs, not full payloads

This policy will be refined once the backend and relayer are more complete.
