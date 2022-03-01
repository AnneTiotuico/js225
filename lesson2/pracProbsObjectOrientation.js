function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    setPrice(tool, newPrice) {
      return newPrice >= 0 ? this.price = newPrice : console.log('Invalid Price');
    },
    describeProduct() {
      console.log('Name: ' + this.name);
      console.log('ID: ' + this.id);
      console.log('Price: $' + this.price);
      console.log('Stock: ' + this.stock);
    },
  };
}

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let hammer = createProduct(2, 'Hammer', 20, 25);
let saw = createProduct(3, 'Saw', 2, 60);

scissors.describeProduct();
drill.describeProduct();

hammer.describeProduct();
saw.describeProduct();



