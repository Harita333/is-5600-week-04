const fs = require('fs').promises
const { get } = require('http')
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')
async function list (options = {}) {
  const { offset = 0, limit = 25 , tag } = options
  const data = await fs.readFile(productsFile)

  return JSON.parse(data)
  .filter(product =>{
    if (!tag) {
      return product
    }
    return product.tags.find(({title}) => title == tag)
  })
  
  .slice(offset, offset + limit) // Slice the products
}

async function GET(id) {
  const products = JSON.parse(await fs.readFile (productsFile))
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
  
    return null;
  }

  async function deleteProduct(id) {
    console.log(`Product with ID ${id} was "deleted" (simulated).`)
    return { message: `Product with ID ${id} deleted.` }
  }
  
  async function updateProduct(id, data) {
    console.log(`Product with ID ${id} was "updated" (simulated).`, data)
    return { message: `Product with ID ${id} updated.` }
  }



module.exports = {
  list,
  get,
  deleteProduct,
  updateProduct,
}