# calss

## 定义

类其实是特殊的函数，就像是你能够定义的函数表达式跟函数时一样。
 类语法有两个组成部分：

1. 类表达式
2. 类声明

### 类声明

带有 `class`的  关键字的类名。

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

`tip:函数声明和类声明之间的一个重要区别是函数声明会提升，类声明不会。你首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError：`

```javascript
let p = new Rectangle();
// ReferenceError

class Rectangle {}
```

```javascript
func();

function func() {
  console.log("i am func");
}
// ok
func();

func = () => {
  console.log("i am func");
};
// ReferenceError
```

`这是因为：func = () => {} 表示的其实是 func = function func() {}; 所以在func用的时候，他还未定义`

### 类体

 一个类的类体是一对花括号/大括号 {} 中的部分。这是你定义类成员的位置，如方法或构造函数。

#### 严格模式

类声明和类表达式的主体都执行在严格模式下。比如，构造函数，静态方法，原型方法，getter 和 setter 都在严格模式下执行。

#### 构造函数

constructor 方法是一个特殊的方法，其用于创建和初始化使用 class 创建的一个对象。一个类只能拥有一个名为 “constructor”的特殊方法。如果类包含多个 constructor 的方法，则将抛出 一个 SyntaxError 。

一个构造函数可以使用 super 关键字来调用一个父类的构造函数。

#### 原型方法

```javascript
class Rectangle {
  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
const square = new Rectangle(10, 10);

console.log(square.area);
// 100
```

#### 静态方法

static 关键字用来定义一个类的一个静态方法。调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法。静态方法通常用于为一个应用程序创建工具函数。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

#### 用原型和静态方法包装

### 使用 extends 创建子类

extends 关键字在类声明或类表达式中用于创建一个类作为另一个类的一个子类。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + " makes a noise.");
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + " barks.");
  }
}

var d = new Dog("Mitzie");
// 'Mitzie barks.'
d.speak();
```

在上述的代码，我加上

```javascript
Animal.prototype.look = function() {
  console.log(this);
  console.log(this.name + " makes a noise.");
};
var i = new Dog("karis");
i.look();
console.log(i);
```

log 出来只有 name 这个属性。umm，为什么。。

如果子类中，存在构造函数，则需要在使用 this 之前首先调用 super()。

也可以扩展传统的基于函数的“类”：

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + " makes a noise.");
};

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + " barks.");
  }
}

var d = new Dog("Mitzie");
d.speak();
```

请注意，类不能继承常规（非可构造）对象。如果要继承常规对象，可以改用 Object.setPrototypeOf()：

```javascript
var Animal = {
  speak() {
    console.log(this.name + " makes a noise.");
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal); // If you do not do this you will get a TypeError when you invoke speak

var d = new Dog("Mitzie");
d.speak(); // Mitzie makes a noise.
```
