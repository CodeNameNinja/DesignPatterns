## Single Responsibility Principle

The objective of the Single Responsibility Principle is to make sure that each class has only one reason to change.

take a look at the following Class.

```js
import fs from "fs";

class Journal {
  constructor(props) {
    this.entries = {};
  }
  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }
  removeEntry(index) {
    delete this.entries[index];
  }
  toString() {
    return Object.values(this.entries).join("\n");
  }
  save(filename) {
    fs.writeFileSync(filename, this.toString());
  }
  static load(filename) {
    // Load File.
  }
  // Load File from URL
  static loadFromUrl(url) {
    // Load File from URL
  }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");

console.log(j.toString());
```

As you can tell, this class has alot of different responsibilities.

managing a Jounal as well as handling saving a file and loading a file. 

According to the Single Responsibility Principle, this class should only have one reason to change.

Let's refactor this class so that it follows the Single Responsibility Principle.

```js
const fs = require('fs');

class Journal {
  constructor(props) {
    this.entries = {};
  }
  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }
  removeEntry(index) {
    delete this.entries[index];
  }
  toString() {
    return Object.values(this.entries).join("\n");
  }
}

class PersistenceManager {
  constructor(filename) {
    this.filename = filename;
  }
  save(journal) {
    fs.writeFileSync(this.filename, journal.toString());
  }
  load() {
    return Journal.load(this.filename);
  }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");

console.log(j.toString());

const p = new PersistenceManager("journal.txt");
p.save(j);

```

Now it's clear what each class is responsible for. and its much clearer to figure out what is going on.