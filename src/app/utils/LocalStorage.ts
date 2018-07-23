export class LocalStorage {
  private static prefix = 'api_blog';

  private static getKey(key: string): string {
    return `${LocalStorage.prefix}/${key}`;
  }

  public static getItem(key: string): any {
    if (!key) {
      return null;
    }
    return localStorage.getItem(LocalStorage.getKey(key));
  }

  public static setItem(key: string, value: any) {
    localStorage.setItem(LocalStorage.getKey(key), value);
  }

  public static setItems(items: {[key: string]: any}) {
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        LocalStorage.setItem(key, items[key]);
      }
    }
  }

  public static removeItem(key: string) {
    localStorage.removeItem(LocalStorage.getKey(key));
  }

  public static removeItems(keys: string[]) {
    keys.forEach(k => LocalStorage.removeItem(k));
  }
}
