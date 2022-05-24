The `Open Closed Principle` States that `Objects` are *Open for extension but closed for modification*

What we mean for extension is really inheritance.

We do not want to modify an Object as it may already been deployed and tested, and modification could cause unforseen breakages.

Take a look at the following code:
```js
let Color = Object.freeze({
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
});

let Size = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});
class Product {
  constructor(name, color, size) {
    (this.name = name), (this.color = color), (this.size = size);
  }
}

class ProductFilter {
  constructor() {}
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }
}

let apple = new Product("Apple", Color.RED, Size.SMALL);
let tree = new Product("Tree", Color.GREEN, Size.LARGE);
let house = new Product("House", Color.BLUE, Size.LARGE);

let products = [apple, tree, house];
let pf = new ProductFilter();
for (let p of pf.filterByColor(products, Color.GREEN)) {
  console.log(p.name + ": is green");
}

```

We have a class called `Product` and another class called `ProductFilter`

in `ProductFilter` every time we want to add a new way to filter, we have to modify the class by adding another method.

and this is not good.

For us to create an expansion we will build what we call a `Specification` this sub class will be used to expand on an existing Class.


Take a look at the new refactored code:

```js
let Color = Object.freeze({
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
});

let Size = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});
class Product {
  constructor(name, color, size) {
    (this.name = name), (this.color = color), (this.size = size);
  }
}

class ProductFilter {
  constructor() {}
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }
}

//specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }
  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}

class BetterFiler {
  constructor() {}
  filter(items, spec) {
    return items.filter((i) => spec.isSatisfied(i));
  }
}

let betterFilter = new BetterFiler();
console.log("Green Products: with new Approach");

let apple = new Product("Apple", Color.RED, Size.SMALL);
let tree = new Product("Tree", Color.GREEN, Size.LARGE);
let house = new Product("House", Color.BLUE, Size.LARGE);

let products = [apple, tree, house];
for (let p of betterFilter.filter(
  products,
  new ColorSpecification(Color.GREEN)
)) {
  console.log(p.name);
}
```

Now we can clearly see how expansion can make things a lot easier to use and to write cleaner code.