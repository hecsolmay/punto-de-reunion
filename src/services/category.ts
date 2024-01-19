const MOOK_CATEGORIES = [
  {
    category_id: crypto.randomUUID(),
    name: 'Snacks',
    image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    category_id: crypto.randomUUID(),
    name: 'Platillos',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    category_id: crypto.randomUUID(),
    name: 'Postres',
    image_url: 'https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    category_id: crypto.randomUUID(),
    name: 'Dulces',
    image_url: 'https://images.unsplash.com/photo-1506224477000-07aa8a76be20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

export async function getCategories () {
  return MOOK_CATEGORIES.map(category => ({
    categoryId: category.category_id,
    name: category.name,
    imageUrl: category.image_url
  }))
}
