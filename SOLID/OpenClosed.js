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