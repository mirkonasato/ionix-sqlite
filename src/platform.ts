declare var cordova;

export function isBrowser(): Promise<boolean> {
  if (typeof cordova === 'undefined') {
    return Promise.resolve(true);
  }
  return new Promise(resolve => {
    document.addEventListener('deviceready', () => {
      resolve(cordova.platformId === 'browser');
    });
  });
}
