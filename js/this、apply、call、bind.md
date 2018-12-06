# Function.prototype.call()

## 定义

call() 方法调用了一个函数。，其具有一个指定的 this 值和分别提供的参数（参数的列表）。

`跟apply（）方法类似，只有一个区别，就是call()方法接受若干个参数的列表，而apply方法接受一个包含多个参数的数组。`

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5));
// output:
// Food:{
//    category:'food',
//    name:'cheese',
//    price:5
//}
```

## 语法

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

参数：

- thisArg：在 fun 函数运行时指定的`this`值。

需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)，同时值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象。

- arg1, arg2, ...： 指定的参数列表

## 描述：

call ( )允许为不同的对象分配和调用属于一个对象的函数/方法。

可以让 call()中的对象调用当前对象所拥有的 function。你可以使用 call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

`问题：call可以调用不是本身的this吗？也就是thisArg可以是别的类吗？`

## 事例

### 使用 call()方法调用爸爸构造

在一个子构造函数中，你可以通过调用爸爸构造函数的 call 对象来实现  继承，类似于 java 中的写法。下面的 🌰 中，使用 Food 构造函数创建的对象事例都会拥有在 Product 构造函数中添加的`name` 和`price`属性，但是 category 是 在各自的构造函数中定义的。

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
  if (price < 0) {
    throw RangeError("is error", this);
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

//等同于
function Food(name, price) {
  this.name = name;
  this.price = price;
  if (price < 0) {
    throw RangeError("is Error", this);
  }
  this.category = "food";
}

var cheese = new Food("feta", 5);
```

### 使用 call 方法调用匿名函数

在下例中的 for 循环体内，我们创建了一个匿名函数，然后通过调用该函数的 call 方法，将每个数组元素作为指定的 this 值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个 print 方法，这个 print 方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为 this 值传入那个匿名函数（普通参数就可以），目的是为了演示 call 的用法。

```javascript
const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Fail" }
];
for (let i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log(`i am i=${i} species=${this.species} this:${this}`);
    };
    this.print();
  }.call(animals[i], i));
}
```

### 使用 call 方法调用函数并且指定上下问中的 `this`

```javascript
```


