export function getProducts() {
  return "Hello, world!";
}

export function getProductById(id: string) {
  return `Product with id ${id}`;
}

export function createProduct() {
  return "Product created!";
}

export function updateProduct(id: string) {
  return `Product with id ${id} updated!`;
}

export function deleteProduct(id: string) {
  return `Product with id ${id} deleted!`;
}

export function getProductsByCategory(category: string) {
  return `Products in category ${category}`;
}

export function getProductsByPrice(price: number) {
  return `Products with price less than ${price}`;
}

export function getProductsBySubcategory(subcategory: string) {
  return `Products in subcategory ${subcategory}`;
}
