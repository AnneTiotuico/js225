// 1. What will the code below output to the console?
let message = 'Hello from the global scope!';

function func(message) {
  message = 'Hello from the function scope!';
  console.log(message);
}

func(message);
console.log(message);

// This will output 'Hello from the function scope!' and
// then 'Hello from the global scope!'

// 2. What will the code below log to the console?
// What does this output demonstrate in relation to the output of problem one?

let myObj = { message: 'Greetings from the global scope!' };

function func(obj) {
  obj.message = 'Greetings from the function scope!';
  console.log(obj.message);
}

func(myObj);

console.log(myObj.message);

// This will output 'Greetings from the function scope!' twice.
// This demonstrates the mutabilty of objects and that when we pass an object
// into a function, we are making a copy of the reference to that object rather
// than making a copy of the object itself, like in problem one where a copy of
// the string value was made.
// Within the function, both myObj and obj point to the same object.
// When we reassign the message property of obj within the func, we also see the change
// on myObj since they are pointing to the same object.

/*
LS Explanation:
This output demonstrates the mutability of objects. Unlike primitives,
an object can have its data changed without breaking the connection to any
variables pointing to it. Thus, reassigning myObj's property message inside
the function scope doesn't break myObj's connection to the object itself.
As a result, myObj.messages's reassignment in the function scope is reflected
in the global scope as well.
*/

// 3. What will the code below log to the console?
let message = 'Hello from the global scope!';

function func() {
  message = 'Hello from the function scope!';
  console.log(message);
}

func();
console.log(message);

// This will log 'Hello from the function scope!' twice.
// Because func no longer has a parameter, we reassign the global `message`
// within the function and the global `message` variable holds the new string.

/*
LS Explanation:
Unlike in problem one, we aren't passing the outer scope variable message into
the function as an argument, and no new variable is declared in its scope.
Instead, message simply resolves to the global-scope variable. As a result,
the reassignment that occurs in the function scope is reflected in the global
scope as well.
*/

// 4. What will the code below log to the console?
let a = 10;
let obj = {
  a
}

let newObj = obj;
newObj.a += 10;

console.log(obj.a === a);
console.log(newObj.a === obj.a);

// This will log `false` then `true`.
// Because we declare and initialize a variable `a` to the primitive number 10,
// this 10 cannot be mutated, only reassigned, which we never do since the obj
// property `a` is different from the variable `a`.
// Then we create a copy of the reference to `obj` and save it to `newObj`,
// we then reassign the property `a` to 20. But because `newObj` references the
// same object as `obj`, we see the change in `obj` as well.

/*
LS Explanation:
Primitive values are immutable, and newObj.a += 10 reassigns the property a to
a new value. As a result, the comparison in the first log operation returns false.
Since objects are mutable, newObj which references the same object assigned to
obj can be altered without breaking the reference to the object in memory.
Thus, the property reassignment performed on newObj is reflected in obj as well,
and the comparison in the second log statement returns true.
*/

// 5. Consider the code below:
let animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

let menagerie = {
  warthog: animal,
};

animal = {
  name: 'Timon',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal;

menagerie.warthog === animal; // false
menagerie.meerkat === animal; // true

// If objects are mutable, why does the second to last line return false?

// This is because on line 109, we create an object `menagerie` with a property
// `warthog` and assign it to the reference to an object that we declared on
// lines 103-106. But on lines 112-115 we reassign that `animal` variable to
// a new object holding different property values.
// The `warthog` property still has a reference to the original object containing
// the name 'Pumbaa'. Therefore line 119 returns `false` since `warthog` holds
// a different object than what we reassigned `animal` to on lines 112-115.

/*
LS Explanation:
Line 10 creates a new object and assigns it to animal, reassigning the variable
rather than mutating the original value. This new object isn't the same as the
object initialized on line 1, and as a result, line 17 evaluates to false, and
line 18 evaluates to true.
*/