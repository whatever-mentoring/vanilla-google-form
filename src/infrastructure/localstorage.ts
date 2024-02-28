abstract class LocalStorage<T extends string> {
  private readonly storage: Storage;

  protected constructor() {
    this.storage = window.localStorage;
  }

  protected get(key: T): string | null {
    return this.storage.getItem(key);
  }

  protected set(key: T, value: string): void {
    this.storage.setItem(key, value);
  }

  protected clearItem(key: T): void {
    this.storage.removeItem(key);
  }

  protected clearAllItem(keys: T[]): void {
    keys.forEach((key) => this.clearItem(key as T));
  }
}

export default LocalStorage;
