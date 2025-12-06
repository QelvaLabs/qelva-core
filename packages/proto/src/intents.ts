// Shared Qelva intent types (beta)

export interface TransferIntent {
  id: string;
  fromPersonaId: string;
  toAddress: string;
  tokenMint: string;
  amountLamports: string; // string to avoid JS number issues
  createdAt: string;      // ISO timestamp
}
