export abstract class AbstractLocalStorage {
  protected getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  protected setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  protected clear(): void {
    localStorage.clear();
  }
}
