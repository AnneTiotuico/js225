// 1. What does the following code log to the console?
let a = 1;
let foo;
let obj;

function Foo() {
  this.a = 2;
  this.bar = function() {
    console.log(this.a);
  };
  this.bar();
}

foo = new Foo();

foo.bar();
Foo();

obj = {};
Foo.call(obj);
obj.bar();

console.log(this.a);

// This will log 2 due to line 14, then log 2 again from line 16, then log 2 again from line 17 (this also sets the global object property `a` to 2), then logs 2 from line 20, then logs 2 again from line 21, then logs 2 again from line 23. It will log 2 six times.

/*
LS Solution:
The output is different when running the code via node (i.e., node fileName.js).

2
2
2
2
2
2

Line 13 creates a new object foo with the constructor function. The constructor function calls the bar method while constructing the object, which logs 2 out. foo.bar() logs the next 2. With Foo(), we're calling the Foo function with the global object context which sets the global object's a to 2, and logs out the next 2. Foo.call(obj) adds the a property and the bar method to the obj object, then called the bar method, logging out the next 2. At this point, we can now call the bar method directly on obj so this logs out the fifth 2. Finally, since the global object's a property is already changed to 2, the last 2 is logged out.

*/

// 2. What does the following code log to the console?
// let RECTANGLE = {
//   area() {
//     return this.width * this.height;
//   },
//   perimeter() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);
// console.log(rect1.area);
// console.log(rect1.perimeter);

// This logs NaN then NaN because when we invoke the area() and perimeter() methods on lines 55 and 56, we use RECTANGLE as the calling object, which changes the context of `this` to RECTANGLE and since it doesn't have its width and height properties defined, we get undefined and doing the mathematical operations will result in NaN.

// To Fix:
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

/*
LS Solution:
NaN
NaN

this in RECTANGLE.area and RECTANGLE.perimeter functions is set to the RECTANGLE object when they are called. Since RECTANGLE does not define width and height properties, both methods return NaN.


function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}
*/


// 3. Write a constructor function Circle, that takes a radius as an argument. You should be able to call an area method on the created objects to get the circle's area. Test your implementation with the following code:

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return Math.PI * this.radius**2;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27

/*
LS Solution:
let Circle = function(radius) {
  this.radius = radius;
};

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
};
*/

// 4. What will the following code log out and why?
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());

// This will log `true` since `ninja` inherits from Ninja's prototype property object which has the `swingSword()` function.

/*
LS Solution:
true

Even though the swingSword method is defined on the prototype after the ninja object is created, the prototype chain lookup happens when the swingSword method is called on the object, and it can be found.
*/

// 5. What will the following code log out and why?
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());

// This will throw an error because the prototype that `ninja` inherits from does not have a `swingSword()` method defined, instead, Ninja's prototype property object is reassigned to a different object that has the method.

/*
LS Solution:
Uncaught TypeError: ninja.swingSword is not a function

In this case, we didn't add a new method to the constructor function's prototype object by mutating it, but rather made it point to a different object. The ninja object, meanwhile, still inherited from the original prototype object, therefore it couldn't find a swingSword method anywhere on its prototype chain.
*/

// 6. Implement the method described in the comments below:
let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true

/*
LS Solution:
let ninjaA;
let ninjaB;
function Ninja(){
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
};

console.log(ninjaA.swing().swung);
console.log(ninjaB.swing().swung);

This pattern of "chainable" method invocation on an object requires methods defined on the prototype to always return the context object (in this case, ninjaA and ninjaB).
*/

// 7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true

/*
LS Solution:
The value assigned to ninjaA is an object that was created using a constructor function (because of the use of the new operator). As such, this object will have a constructor property that points to its constructor function. Think of a way to leverage this property and you will arrive at a solution.

Solution 1: use Object.create

let ninjaA = (function(){
  function Ninja(){};
  return new Ninja();
})();

let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor);  // => true

Solution 2: use the constructor function

let ninjaA = (function(){
  function Ninja(){};
  return new Ninja();
})();

let ninjaB = new ninjaA.constructor;

console.log(ninjaB.constructor === ninjaA.constructor);  // => true
Take note, though, that with this approach that the object created will also have the properties assigned within the constructor function Ninja. It just so happens that there were no properties set with this example, so it's not critical.
*/