# HIVE — Document Integrity Verification System

HIVE is a MERN-stack application designed to ensure document authenticity and prevent tampering using cryptographic hashing and blockchain-backed verification. It is built for legal, judicial, and compliance-driven use cases where proving document integrity matters more than trust.

## Overview

HIVE allows users to upload documents (DOCX/PDF). On upload, the system generates a cryptographic hash of the file and records it on a user-isolated blockchain ledger. Only the hash and minimal metadata are stored on-chain — never the actual document — ensuring privacy while maintaining immutability.

Any attempt to re-upload the same document or upload a modified version is detected immediately through hash comparison.

## Key Features

- Cryptographic hashing of uploaded documents  
- Blockchain-backed, immutable hash storage  
- Duplicate document upload prevention  
- Tamper detection via hash mismatch  
- User-isolated document records  
- Privacy-preserving design (no files on-chain)

## Why HIVE

Traditional document systems rely on centralized trust. HIVE replaces trust with cryptographic proof.  
If a document changes even slightly, its hash changes — making tampering provable rather than debatable.

This makes HIVE suitable for:
- Court evidence verification  
- Legal document validation  
- Compliance and audit trails  
- Long-term document integrity assurance  

## Tech Stack

- **MongoDB** — Stores document metadata and user data  
- **Express.js** — Backend API layer  
- **React.js** — Frontend user interface  
- **Node.js** — Server runtime  
- **Blockchain Ledger** — Stores immutable document hashes  

## High-Level Workflow

1. User uploads a document  
2. System generates a cryptographic hash  
3. Hash is checked for duplicates  
4. Hash + metadata are stored on the blockchain  
5. Document integrity can be verified anytime by re-hashing  

## Project Structure

