import { HashMap } from "./hashmap.js";

// Testing
const test = HashMap(0.75); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray"); // collision at index 24
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden"); // collision at index 24

test.set("frog", "green1");
test.set("grape", "purple1");

test.set("moon", "silver");

for (let i = 0, array = test.getHashArray(); i < array.length; i++) {
  if (array[i] !== null) {
    console.log(array[i].head);
  }
}

console.log(test.getHashArray());

test.clear();
