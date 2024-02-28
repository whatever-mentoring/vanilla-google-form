/**
 *  https://github.com/facebook/react/blob/8e2bde6f2751aa6335f3cef488c05c3ea08e074a/packages/shared/shallowEqual.js
 * */
const shallowEqual = <T>(objA: T, objB: T): boolean => {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA) as Array<keyof T>;
  const keysB = Object.keys(objB) as Array<keyof T>;

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
};

const shallowArrayEqual = (arrA: any[], arrB: any[]): boolean => {
  if (arrA.length !== arrB.length) return false;

  for (let i = 0; i < arrA.length; i++) {
    if (Array.isArray(arrA[0]) && Array.isArray(arrB[0])) {
      return shallowArrayEqual(arrA[0], arrB[0]);
    } else if (!shallowEqual(arrA[i], arrB[i])) {
      return false;
    }
  }

  return true;
};

export { shallowEqual, shallowArrayEqual };
