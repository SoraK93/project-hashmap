import { LinkedList } from "../project-linked-lists/linked-list.js";

const HashMap = function (loadFac) {
  let loadFactor = loadFac;
  let capacity = 37;
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
    if (Math.floor(numberOfStoredKeys / capacity) >= loadFactor) {
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
  const remove = function(key) {
    let hashIndex = hash(key);
    if (!hashArray[hashIndex]) {
      throw new Error("No data found. Please check given key and try again.")
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
  }

  /** Returns total number of keys stored inside the hashmap */
  const length = function() {
    return numberOfStoredKeys;
  }

  /** Checks if the hashmap contains the given key */
  const has = function(key) {
    return (get(key)) ? true : false;
  }

  /** retrive hashmap array */
  const getHashArray = function () {
    return hashArray;
  };

  return { set, has, get, length, remove, getHashArray };
};

// Testing
const test = HashMap(0.75); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray"); // collision at index 24
test.set("frog", "green");
test.set("frog", "green1");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden"); // collision at index 24

console.log(test.remove("elephant"), "removed")

for (let i = 0, array = test.getHashArray(); i < array.length; i++) {
  if (array[i] !== null) {
    console.log(array[i].head);
  }
}

// console.log(test.getHashArray());
console.log(test.length());