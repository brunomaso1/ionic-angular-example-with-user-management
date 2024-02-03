import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private session: Storage | null = null;

  constructor(private storage: Storage) { }

  async set(key: string, value: string | null): Promise<void> {
    await this.init();
    this.session?.set(key, value);
  }

  async get(key: string): Promise<string> {
    await this.init();
    return this.session?.get(key);
  }

  private async init() {
    if (this.session == null) {
      const storage = await this.storage.create();
      this.session = storage;
    }
  }
}