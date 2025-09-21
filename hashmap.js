const HashMap = function () {
  let loadFactor = 0.8;
  let capacity = 37;
  let hashArray = new Array(capacity);

  /** Create hash code by using the given key
   * @key {String}
   */
  const hash = function(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };

  return { hash };
};

const test = HashMap(); // or HashMap() if using a factory

console.log(test.hash("apple"));
