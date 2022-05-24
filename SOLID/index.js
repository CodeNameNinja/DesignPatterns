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
