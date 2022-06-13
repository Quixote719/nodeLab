const foods = [
    { id: 1, name: 'milk' },
    { id: 2, name: 'apple' },
    { id: 3, name: 'fish' }
  ]
  
  const cats = [
    { color: 'white', foodId: 1 },
    { color: 'red', foodId: 2 },
    { color: 'black', foodId: 3 }
  ]
  
  const fakerIO = arg => new Promise((resolve, reject) => {
    setTimeout(() => resolve(arg), 300)
  })
  
  const getFoodById = async id => {
    console.log('--- enter getFoodById ---', { id })
    return fakerIO(foods.find(food => food.id === id))
  }
  
  const resolvers = {
    Query: {
      cats: (parent, args, context, info) => cats
    },
    Cat: {
      love: async cat => getFoodById(cat.foodId)
    }
  }
  
module.exports = resolvers