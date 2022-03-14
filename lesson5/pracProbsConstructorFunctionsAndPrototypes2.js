/*
1. Follow the steps below:
Create an object called shape that has a getType method.
Define a Triangle constructor function whose prototype is shape. Objects created with Triangle should have four own properties: a, b, c (representing the sides of a triangle), and type.
Add a new method to the prototype called getPerimeter.
Test your implementation with the following code:

*/

let shape = {
  getType() {
    return this.type;
  }
};

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

Triangle.prototype = shape;

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};

Triangle.prototype.constructor = Triangle;

let t = new Triangle(3, 4, 5);
t.constructor;                 // Triangle(a, b, c)
shape.isPrototypeOf(t);        // true
t.getPerimeter();              // 12
t.getType();                   // "triangle"

/*
LS Solution:
let shape = {
  getType() {
    return this.type;
  },
};

function Triangle(a, b, c) {
  this.type = 'triangle';
  this.a = a;
  this.b = b;
  this.c = c;
}

Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};

Triangle.prototype.constructor = Triangle;

One thing that you may miss to do is to set the constructor to the proper value. Typically, this is done for you automatically, in that a function's prototype object will automatically have a property constructor pointing to the function. However in this case, since we pointed the Triangle function's prototype to shape, we lost that constructor reference. Therefore we have to set it back manually.

Note also that we placed the getPerimeter method on the object assigned to the prototype property of the Triangle function so that we can leverage that it's a function called with the new operator and, as such, can share methods (behavior).
*/

/* 2. Since a constructor is just a function, it can be called without the new operator, and this can lead to unexpected results and errors especially for inexperienced programmers.

Write a constructor function that can be used with or without the new operator, and return the same result in either form. Use the code below to check your solution:
*/

function User(first, last) {
  if (this instanceof User) {
    this.name = `${first} ${last}`;
    return this
  } else {
    let obj = {};
    obj.name = `${first} ${last}`;
    return obj;
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

/*
LS Solution:
In the constructor function, first check the value of this to see if it is an instance created by the constructor function. Since, if it's called with the new operator JavaScript sets the value of this behind the scenes. Given that, check if it's used as a regular function (invoked without the new), if it is invoke itself with the new operator and return the result. If it is used as a constructor function, run the rest of the code in the function.

function User(first, last){
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user = User('John', 'Doe');

console.log(name);        // => Jane Doe
console.log(user.name);   // => John Doe

Constructor functions built this way are called "scope-safe constructors". Most of JavaScript's built-in constructors, such as Object, RegExp and Array, are scope-safe.

new Object();          // Object {}
Object();              // Object {}
new Array(1, 2, 3);    // [1, 2, 3]
Array(1, 2, 3);        // [1, 2, 3]
*/

// 3. Create a function that can create an object with a given object as its prototype, without using Object.create.

function createObject(obj) {
  let result = {}
  Object.setPrototypeOf(result, obj);
  return result;
}

let foo = {
  a: 1
};

let bar = createObject(foo);
foo.isPrototypeOf(bar);         // true

/*
LS Solution:
You could work through the [[Prototype]] property, but a better solution is to create a "temporary" function, and set its prototype to the given object, then use the function to create objects. You don't have to worry about browser compatibility with this solution.

function createObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

We can create a temporary constructor function, set its prototype object to the argument, then create an object based on the constructor. In fact, this is a simplified implementation for Object.create itself!

Alternative Solution:
function createObject(obj) {
  return Object.setPrototypeOf({}, obj);
}

This solution also works. However, please take note of the warning from MDN when using Object.setPrototypeof.
*/

// 4. Similar to the problem above, without using Object.create, create a begetObject method that you can call on any object to create an object inherited from it:

let foo = {
  a: 1,
};

Object.prototype.begetObject = function() {
  return Object.setPrototypeOf({}, this)
}

let bar = foo.begetObject();
foo.isPrototypeOf(bar);         // true

/*
LS Solution:
What prototype object do we have to add a method to so that "any" object will be able to look it up? Check out the lesson on Prototypal Inheritance and Behavior Delegation for a refresher.

Object.prototype.begetObject = function () {
  function F() {}
  F.prototype = this;
  return new F();
}

Since the begetObject function can be called on any object, we'll need to make it a function defined on Object.prototype.
*/

// 5. Create a function neww, so that it works like the new operator. For this practice problem, you may use Object.create.

function neww(constructor, args) {
  let result = Object.create(constructor.prototype);
  result.constructor(...args);
  return result;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}

/*
LS Solution:
You may want to go back to the Constructor Functions and Constructors and Prototypes assignments and review what happens when a function is used as a constructor and what happens behind the scenes. Note that if the constructor function has no explicit return, the created object will be returned.

function neww(constructor, args) {
  let object = Object.create(constructor.prototype);
  let result = constructor.apply(object, args);

  return typeof result === 'object' ? result : object;
}
*/