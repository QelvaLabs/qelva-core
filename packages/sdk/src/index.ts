import type { TransferIntent } from '../../proto/src';

export interface QelvaClientOptions {
  /**
   * Base URL of the Qelva backend, e.g. "http://localhost:4000"
   */
  baseUrl: string;
}

export class QelvaClient {
  private readonly baseUrl: string;

  constructor(options: QelvaClientOptions) {
    // remove trailing slashes to avoid "//" in URLs
    this.baseUrl = options.baseUrl.replace(/\/+$/, '');
  }

  /**
   * Call backend /health endpoint.
   */
  async health(): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/health`);

    if (!res.ok) {
      throw new Error(`Qelva health check failed with status ${res.status}`);
    }

    return res.json();
  }

  /**
   * Send a TransferIntent to the backend.
   */
  async createTransferIntent(intent: TransferIntent): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/intents/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(intent)
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(
        `Failed to create transfer intent (status ${res.status}). ${body || ''}`.trim()
      );
    }

    return res.json();
  }
}
