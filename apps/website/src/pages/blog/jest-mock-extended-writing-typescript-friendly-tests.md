---
layout: "../../layouts/BlogPost.astro"
title: "Jest Mock Extended - Writing Typescript Friendly Tests"
description: "Lorem ipsum dolor sit amet"
pubDate: "May 17 2024"
heroImage: "/jest.jpg"
---
If you are writing tests in a Typescript and aren't utilizing the Jest Mock Extended library, 
you are missing out on a fantastic testing experience and doing it the hard way. The [jest-mock-extended](https://www.npmjs.com/package/jest-mock-extended) library 
provides the `mock` test utility. This utility helps create mocks that are typescript friendly,
so types do not get in the way of writing your testing. 

Often when writing a test, you have specific objects and properties that your test cares about. 
The `mock` utility allows you to create a mock object with just the properties you care about and nothing else. 
This saves you time by not having to create a full mock object.


## Example of Hello User Function
```typescript
interface User {
  id: string;
  name: string;
  profile: {
    age: number;
    phone: string;
    address: string;
    zip: string;
    state: string;
  }
}

function helloUser(user: User) {
  return `hello ${user.name}`
}
```
## Example of Testing without Jest Mock Extended
```typescript
const user = {
  id: '123',
  name: 'John Doe',
  profile: {
    age: 30,
    phone: '555-555-5555',
    address: '123 Main St',
    zip: '12345',
    state: 'CA'
  }
}
const res = helloUser(user)

expect(res).toBe('hello John Doe')
```

## Example of Testing with Jest Mock Extended
```typescript
import { mock } from 'jest-mock-extended';

const user = mock<User>({
  name: 'John Doe'
});

const res = helloUser(user);

expect(res).toBe('hello John Doe');
```

The example above is actually a simple scenario but you can imagine how ugly it can get when you have more complex 
classes and objects that you are testing. The `mock` utility also mocks entire classes and their methods. 

## Example of Mocking a Class
```typescript
import { mock } from 'jest-mock-extended';

class User {
  constructor(public name: string) {}
  sayHello() {
    return `hello ${this.name}`
  }
  
  sayGoodbye() {
    return `goodbye ${this.name}`
  }
}

const user = mock<User>(); // all the methods are mocked automatically

user.sayHello();
user.sayHello.toHaveBeenCalled(); // => true
user.sayGoodbye.not.toHaveBeenCalled(); // => false

user.sayGoodbye.mockReturnValue('goodbye X');

user.sayGoodBye() // => goodbye X
```
The above is extremely useful in scenarios where you are injecting classes and want to mock their behavior.
Imagine trying to mock a class without the `mock` utility. It would be a nightmare to mock all the methods and 
properties.
```typescript
class UserService {
  constructor(private user: User) {
  }

  sayHello() {
    return this.user.sayHello();
  }
}

// you can now instantiate and test say hello with a simple mock
const user = mock<User>({ name: 'John Doe' });
const userService = new UserService(user);
expecet(userService.sayHello()).toBe('hello John Doe'); // => true
```