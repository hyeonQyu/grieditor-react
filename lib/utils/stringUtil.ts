export namespace StringUtil {
  export function insertAt(originStr: string, newStr: string, index: number) {
    return `${originStr.slice(0, index)}${newStr}${originStr.slice(index)}`;
  }
}
