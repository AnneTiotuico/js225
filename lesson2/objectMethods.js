let me = {
  firstName: 'Anne',
  lastName: 'Tio',
  id: 1,
};

let friend = {
  firstName: 'John',
  lastName: 'Smith',
  id: 2,
};

let mother = {
  firstName: 'Amber',
  lastName: 'Doe',
  id: 3,
};

let father = {
  firstName: 'Shane',
  lastName: 'Doe',
  id: 4,
};

// function fullName(person) {
//   console.log(person.firstName + ' ' + person.lastName);
// }

// fullName(me);
// fullName(friend);
// fullName(mother);
// fullName(father);

// let people = [];

// people.push(me);
// people.push(friend);
// people.push(mother);
// people.push(father);

// function rollCall(collection) {
//   let length;
//   let i;
//   for (i = 0, length = collection.length; i < length; i += 1) {
//     fullName((collection[i]));
//   }
// }

// rollCall(people);

// function rollCall(collection) {
//   collection.forEach(function(item) {
//     fullName(item);
//   });
// }

// function rollCall(collection) {
//   collection.forEach(fullName);
// }

// rollCall(people);

let people = {
  collection: [me, friend, mother, father],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  lastIndex: function() {
    return this.collection.length > 0 ? this.collection.slice(-1)[0].id : 0;
  },

  rollCall: function() {
    this.collection.forEach(this.fullName);
  },

  add: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }

    let uniqueId = this.lastIndex() + 1;
    person.id = uniqueId;

    this.collection.push(person);
  },

  getIndex: function(person) {
    let index = -1;
    this.collection.forEach(function(comparator, i) {
      if (comparator.firstName === person.firstName &&
          comparator.lastName === person.lastName) {
        index = i;
      }
    });

    return index;
  },

  remove: function(person) {
    let index = this.getIndex(person);
    if (this.isInvalidPerson(person)) {
      return;
    }

    index = this.getIndex(person);
    if (index === -1) {
      return;
    }

    this.collection.splice(index, 1);
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName !== 'string' && typeof person.lastName !== 'string';
  },

  get: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }

    return this.collection[this.getIndex(person)];
  },

  update: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }

    let existingPersonId = this.getIndex(person);
    if (existingPersonId === -1) {
      this.add(person);
    } else {
      this.collection[existingPersonId] = person;
    }
  },

};

// people.rollCall();
// people.remove({ firstName: 'John', lastName: 'Smith'});
// people.rollCall();

people.add({firstName: 'Steph', lastName: 'Curry'});
people.add({firstName: 'Bart', lastName: 'Simpson'});

console.log(people.collection);
