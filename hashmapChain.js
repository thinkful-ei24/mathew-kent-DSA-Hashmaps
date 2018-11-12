class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertAt(item, position) {
    let currNode = this.head;
    let prevNode = this.head;
    let currentPosition = 0;

    while (currentPosition !== position && currNode !== null) {
      currentPosition++;
      prevNode = currNode;
      currNode = prevNode.next;
    }
    prevNode.next = new _Node(item, prevNode.next);
  }

  insertBefore(item, value) {
    let currNode = this.head;
    let prevNode = this.head;

    while (currNode.value !== value) {
      if (currNode.next === null) {
        return null;
      } else {
        prevNode = currNode;
        currNode = currNode.next;
      }
    }

    prevNode.next = new _Node(item, currNode);
  }

  insertAfter(item, value) {
    let currNode = this.head;

    while (currNode.value !== value) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }

    currNode.next = new _Node(item, currNode.next);
  }

  // Retrieval
  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value.key !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
}

function display(SLL) {
  let currNode = SLL.head;
  if (!SLL.head) {
    return null;
  }
  while (currNode && currNode.value !== null) {
    console.log(currNode.value);
    currNode = currNode.next;
  }
}

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key Error');
    }
    return this._slots[index].find(key);
  }

  set(key, value) {
    // console.log(key, value);
    // const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    // if (loadRatio > HashMap.MAX_LOAD_RATIO) {
    //   this._resize(this._capacity * HashMap.SIZE_RATIO);
    // }
    const index = this._findSlot(key);
    if (!this._slots[index]) {
      // console.log('working');
      this._slots[index] = new LinkedList();
    }

    this._slots[index].insertLast({
      key,
      value,
      deleted: false
    });
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }

    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const index = hash % this._capacity;

    return index;
    // for (let i=start; i<start + this._capacity; i++) {
    //   const index = i % this._capacity;
    //   const slot = this._slots[index];
    //   if (slot === undefined || slot.key == key && !slot._deleted) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;

    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      console.log(slot);
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    // console.log(string);
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

function serialize(hashMap) {
  for (const slot of hashMap._slots) {
    if (slot !== undefined && !slot.deleted) {
      console.log(hashMap.get(slot.key, slot.value));
    }
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lor = new HashMap();
lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit', 'Frodo');
lor.set('Wizard', 'Gandolf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');

// serialize(lor);
console.log(lor.get('Hobbit'));