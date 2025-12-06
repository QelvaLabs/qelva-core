# Contributing to Qelva Core

Qelva Core is still in **beta** and the architecture is evolving.  
Please keep changes small, focused, and well-explained.

## Development Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/QelvaLabs/Qelva-core.git
   cd Qelva-core
2. Install dependencies:
```bash
npm install
Run the backend(beta):
npm run dev:backend

Guidelines

Use TypeScript for all new code.

Do not log sensitive data (mnemonics, private keys, PINs, raw intents).

Keep modules small and focused (backend, relayer, client, packages).

Prefer composition over giant “god” services.

Pull Requests

Describe what and why, not only how.

If you change public types (proto), call it out clearly.

Make sure the CI is green (typecheck job) before requesting review.

Issue Reports

When filing an issue, include:

What you were trying to do

Steps to reproduce

Expected vs actual behaviour

Node.js version and OS (if relevant)

Thanks for helping shape the Qelva privacy stack.
