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
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
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
    const start = hash % this._capacity; // 3 -> 11

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key == key && !slot._deleted) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;

    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
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
// console.log(lor.get('Hobbit'))
// serialize(lor);
// console.log(lor.get('Maiar'));

// input: String, example: acecarr
// output: Bool, example, true
// Loop through the string one character at a time
// keep track of how many times each letter is used
// Look at each char in the hash map
// if there are 2 or more characters with odd counts, return false
// otherwise return true

function palindrome(str) {
  const charMap = new HashMap();
  let odds = 0;
  let count;
  for (let i=0; i<str.length; i++) {
    try {
      count = charMap.get(str[i]);
    } catch (e) {
      count = 0;
    }
    charMap.set(str[i], count + 1);
  }

  for (let i=0; i<str.length; i++) {
    count = charMap.get(str[i]);
    if (count % 2) odds++;
    if (odds > 1) return false;
  }
  return true;
}


//////////////////////////////////////////////////////
// Anagram Grouping
// input: ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
// output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

// get first word workingWord
// put first word into a HashMap and into first element of TotalWordArray
// get second word
// loop through second word checkWord
//  Check every letter to be inside first word hash map
//  if letter is not in first word HM, create a new hash map for new word
//  else put newWord into firstWord array
// return totalWordArray

function anagramGrouping(words) {
  let workingWord = words[0];
  let totalWordArray = [[workingWord]];
  let hashMapArray = [];

  function startHashMap(word, hashMap) {
    for (let i = 0; i < word.length; i++) {
      hashMap.set(word[i], 1)
    }

    return hashMap;
  }

  hashMapArray[0] = startHashMap(workingWord, new HashMap());


  for (let j = 1; j < words.length; j++ ) {
    let checkWord = words[j];
    let exists;

    for (let k = 0; k < hashMapArray.length; k++) {
      for (let i = 0; i < checkWord.length; i++ ) {
        try {
          exists = hashMapArray[k].get(checkWord[i]) ? true : false;
          
        } catch (e) {
          hashMapArray.push(startHashMap(checkWord, new HashMap()));
          console.log(k, 'the kth hash map is ', hashMapArray[k])
          totalWordArray.push([checkWord]);
          exists = false;
          break;
        }
      }
      if (exists){
            totalWordArray[k].push(checkWord);
          } else {
            break;
          }
    
    }
  }
  console.log(hashMapArray.length)

  return totalWordArray;
}

// input: ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
// output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))