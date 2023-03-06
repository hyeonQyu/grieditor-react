export namespace AsyncUtil {
  /**
   * Get promise resolve value as async function when using setTimeout
   * @param returnValue
   * @param ms
   */
  export function getAsyncTimeoutPromise<T>(returnValue: T, ms: number = 0): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(returnValue);
      }, ms);
    });
  }
}
