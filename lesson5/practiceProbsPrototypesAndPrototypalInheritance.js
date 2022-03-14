'use strict';

// 1. Write a function that returns the object on a given object's prototype chain where a property is defined. See the example code below:
function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object)
  }
  return object;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null

/*
LS Solution:
You'll need to traverse up the prototype chain of the object and for each object, see if the property is defined, with the hasOwnProperty method. Note that Object.prototype is at the top of the prototype chain. If you can't find the property there and use Object.getPrototypeOf to get its prototype, you'll get null and that's what you should return.

function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object);
  }

  return object;
}
*/

// 2. Write a function to provide a shallow copy of an object. The object that you copy should share the same prototype chain as the original object, and it should have the same own properties that return the same values or objects when accessed. Use the code below to verify your implementation:

function shallowCopy(object) {
  let copy = Object.create(Object.getPrototypeOf(object));
  Object.assign(copy, object);
  return copy;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

let baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
baz.hasOwnProperty('a');  // false
baz.hasOwnProperty('b');  // false

/*
LS Solution:
This would be a straightforward implementation:

function shallowCopy(object) {
  let result = Object.create(Object.getPrototypeOf(object));
  let prop;

  for (prop in object) {
    if (object.hasOwnProperty(prop)) {
      result[prop] = object[prop];
    }
  }

  return result;
}
However, this implementation doesn't consider the fact that the object could have a property with the name of hasOwnProperty, in which case we'll get an error:

let a = {
  hasOwnProperty: 1,
};

shallowCopy(a);   // Uncaught TypeError: object.hasOwnProperty is not a function
A more robust solution is the following:

function shallowCopy(object) {
  let result = Object.create(Object.getPrototypeOf(object));
  let prop;

  for (prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      result[prop] = object[prop];
    }
  }

  return result;
}
Note: the reason this is called "shallow copy" is because we don't recursively copy the objects referenced by the original object, which would be a "deep copy" or "deep clone".

Alternative Solution:
This solution avoids the need to check if the object hasOwnProperty when iterating over each of its properties. The difference with using Object.getOwnPropertyNames is that it returns properties of the object that are not enumerable. Properties that are not enumerable don't show up when used in conjunction with for...in. This difference isn't critical at this stage. However, should you wish to know more about it here is a link to an MDN article that goes into more detail.

function shallowCopy(object) {
  let copy = Object.create(Object.getPrototypeOf(object));

  Object.getOwnPropertyNames(object).forEach(function(prop) {
    copy[prop] = object[prop];
  });

  return copy;
}
*/

// 3. Write a function that extends an object (destination object) with contents from multiple objects (source objects).

function extend(destination) {
  let sources = [].slice.call(arguments);
  sources.forEach(source => {
    Object.assign(destination, source);
  });

  return destination;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe

/*
LS Solution:
function extend(destination) {
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        destination[prop] = source[prop];
      }
    }
  }

  return destination;
}

The extend function is JavaScript's way for the "Mixin" pattern. For example in this case, our funcs object is a bag of methods that can be mixed into objects with the extend method. Many popular JavaScript libraries and frameworks provide functionality like our extend function here. ECMAScript 6 (ES6) provides Object.assign method that does the same too.

Object.assign in ES6: See the polyfill implementation on the bottom
_.extend in Underscore
Also, we can implement the shallowCopy function with extend, if we don't care about preserving the prototype chain:

function shallowCopy(object) {
  return extend({}, object);
}

Alternative Solution 1:
Similar to that of the alternative solution to question 2, we can also use Object.getOwnPropertyNames for the solution to this question (3).

function extend(destination) {
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    Object.getOwnPropertyNames(source).forEach(function(prop) {
      destination[prop] = source[prop];
    });
  }

  return destination;
}

Alternative Solution 2:
This alternative solution is similar to the given solution. The only difference is that it uses the rest syntax.

function extend(destination, ...args) {
  for (let i = 0; i < args.length; i++) {
    let source = args[i];
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        destination[prop] = source[prop];
      }
    }
  }

  return destination;    
}

*/