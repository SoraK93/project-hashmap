import { LinkedList } from "../project-linked-lists/linked-list.js";

export const HashMap = function (loadFac) {
  const loadFactor = loadFac;
  let capacity = 12;
  let hashArray = new Array(capacity).fill(null);
  let numberOfStoredKeys = 0;

  /** Create hash code by using the given key
   * @key {String}
   */
  const hash = function (key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };

  /** It pushes given key, value pair into the hashmap
   * @key {String}
   * @value {String}
   */
  const set = function (key, value) {
    // Increase array size of 80% full
    if (Math.floor(getFilledBucket() / capacity) >= loadFactor) {
      hashArray = hashArray.concat(new Array(arraySize));
      capacity = hashArray.length;
    }

    let hashIndex = hash(key);
    let hashObject = { key, value };
    // If bucket is empty
    if (!hashArray[hashIndex]) {
      let list = new LinkedList();
      list.prepend(hashObject);
      hashArray[hashIndex] = list;
      numberOfStoredKeys++;
      return hashArray;
    }

    // checking if key already present in the bucket
    let currNode = get(key);
    if (currNode) {
      currNode.value = value;
      return hashArray;
    }

    // dealing with collision
    hashArray[hashIndex].prepend(hashObject);
    numberOfStoredKeys++;
    return hashArray;
  };

  /** Find and return the object using the given key, return null of key not found */
  const get = function (key) {
    let hashIndex = hash(key);
    let hashBucket = hashArray[hashIndex];
    let currNode = hashBucket.head;

    while (currNode !== null) {
      if (currNode.value && currNode.value.key === key) {
        return currNode.value;
      }
      currNode = currNode.nextNode;
    }

    return null;
  };

  /** Remove a object by using given key from the hashmap
   * @key {String}
   */
  const remove = function (key) {
    let hashIndex = hash(key);
    if (!hashArray[hashIndex]) {
      throw new Error("No data found. Please check given key and try again.");
    }

    let hashLinkedList = hashArray[hashIndex];
    let currNode = hashLinkedList.head;

    if (hashLinkedList.size === 1 && currNode.value.key === key) {
      numberOfStoredKeys--;
      return hashLinkedList.pop();
    }

    while (hashLinkedList.size >= 2 && currNode.nextNode.nextNode != null) {
      if (currNode.nextNode.key === key) {
        break;
      }
      currNode = currNode.nextNode;
    }
    let removedNode = currNode.nextNode;
    currNode.nextNode = currNode.nextNode.nextNode;
    numberOfStoredKeys--;
    return removedNode;
  };

  /** Returns total number of keys stored inside the hashmap */
  const length = function () {
    return numberOfStoredKeys;
  };

  /** Get number of buckets that has data stored in it */
  const getFilledBucket = function () {
    let filledBucket;
    for (let i = 0, array = getHashArray(); i < array.length; i++) {
      if (array[i] !== null) {
        let curr = array[i];
        if (curr.size >= 1) {
          filledBucket++;
        }
      }
    }
    return filledBucket;
  };

  /** Clear all the data from the hashmap */
  const clear = function () {
    numberOfStoredKeys = 0;
    hashArray = new Array(capacity);
  };

  /** Get all the object stored in the hashmap */
  const getObjects = function () {
    const keysValueArray = [];

    for (let i = 0, array = getHashArray(); i < array.length; i++) {
      if (array[i] !== null) {
        let curr = array[i].head;
        while (curr !== null) {
          keysValueArray.push(curr.value);
          curr = curr.nextNode;
        }
      }
    }

    return keysValueArray;
  };

  /** Get all the keys stored in the hashmap */
  const keys = function () {
    const keysArray = getObjects().map((ele) => ele.key);
    return keysArray;
  };

  /** Get all the value stored in the hashmap */
  const values = function () {
    const valuesArray = getObjects().map((ele) => ele.value);
    return valuesArray;
  };

  /** Get all the key, value pairs in nested array format */
  const entries = function () {
    const keysArray = keys();
    const valuesArray = values();
    const entriesArray = keysArray.map((ele, index) => [
      ele,
      valuesArray[index],
    ]);
    return entriesArray;
  };

  /** Checks if the hashmap contains the given key */
  const has = function (key) {
    return get(key) ? true : false;
  };

  /** retrive hashmap array */
  const getHashArray = function () {
    return hashArray;
  };

  return {
    hash,
    set,
    has,
    get,
    length,
    remove,
    getHashArray,
    clear,
    keys,
    values,
    entries,
    getFilledBucket
  };
};
