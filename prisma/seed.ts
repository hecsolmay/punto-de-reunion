import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const ORGANIZATIONS = ['c5cb17d9-67ec-4963-9789-1d2c0eadd39b', '86a29fb4-0cf9-411a-8782-1eaa340c7621']

const getRandomOrganization = () => ORGANIZATIONS[Math.floor(Math.random() * ORGANIZATIONS.length)]

const PRODUCTS = [
  {
    name: 'Tamales',
    description: 'Masa de maíz rellena de carne, pollo o queso',
    price: '12.00',
    maxQuantityByCart: 8,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://www.mexicoenmicocina.com/wp-content/uploads/2018/03/tamales-de-elote.jpg' },
        { imageUrl: 'https://img-global.cpcdn.com/recipes/2103946_8121c709170978bf/1200x630cq70/photo.jpg' }
      ]
    }
  },
  {
    name: 'Chiles en Nogada',
    description: 'Chiles poblanos rellenos de carne molida y bañados en salsa de nuez',
    price: '80.00',
    maxQuantityByCart: 6,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://hunts.com.mx/wp-content/uploads/2021/09/Hunts-Chile-Nogada-1.jpg' },
        { imageUrl: 'https://www.nestleprofessional.com.mx/sites/default/files/styles/np_recipe_detail/public/2023-08/300305-478022e1169e2279e767de0967820b62.png?itok=i_ydQZ9Q' }
      ]
    }
  },
  {
    name: 'Pozole',
    description: 'Caldo de maíz con carne de cerdo y condimentos',
    price: '60.00',
    maxQuantityByCart: 2,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://www.cocinavital.mx/wp-content/uploads/2022/09/pozole-rojo.jpg' },
        { imageUrl: 'https://phantom-marca-us.unidadeditorial.es/38cc156b436b56320c082691810ca038/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/16/16632876379191.jpg' }
      ]
    }
  },
  {
    name: 'Enchiladas',
    description: 'Tortillas de maíz rellenas de carne o queso y bañadas en salsa de chile',
    price: '25.00',
    maxQuantityByCart: 5,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://www.elsoldezacatecas.com.mx/circulos/dgvgb4-circulos2020112901.jpg/ALTERNATES/LANDSCAPE_768/circulos2020112901.jpg' },
        { imageUrl: 'https://patijinich.com/es/wp-content/uploads/sites/3/2017/07/201-enchiladas-en-salsa-roja.jpg' }
      ]
    }
  },
  {
    name: 'Chiles Rellenos',
    description: 'Chiles poblanos rellenos de queso o carne y capeados',
    price: '35.00',
    maxQuantityByCart: 7,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://i.pinimg.com/736x/04/49/e9/0449e91f92868c3b9a8d548f19cac501.jpg' },
        { imageUrl: 'https://assets.unileversolutions.com/recipes-v2/243044.jpg' }
      ]
    }
  },
  {
    name: 'Tostadas',
    description: 'Tortillas de maíz fritas y cubiertas con carne, frijoles o verduras',
    price: '18.00',
    maxQuantityByCart: 9,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Tostadas_Sencillas.jpg' },
        { imageUrl: 'https://www.gob.mx/cms/uploads/article/main_image/85497/tostada_blog.jpg' }
      ]
    }
  },
  {
    name: 'Cochinita Pibil',
    description: 'Carne de cerdo adobada y cocida en horno de tierra',
    price: '70.00',
    maxQuantityByCart: 0,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://cdn.shopify.com/s/files/1/0078/5730/7737/files/Cochinita_pibil_480x480.png?v=1684351734' },
        { imageUrl: 'https://cdn0.recetasgratis.net/es/posts/9/7/5/tacos_de_cochinita_pibil_76579_orig.jpg' }
      ]
    }
  },
  {
    name: 'Sopes',
    description: 'Masa de maíz con frijoles, carne, lechuga y queso',
    price: '20.00',
    maxQuantityByCart: 6,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://www.goya.com/media/7924/sopes.jpg?quality=80' },
        { imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/delish-230307-sopes-328-rv-index-6418dad1de1ec.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=1200:*' }
      ]
    }
  },
  {
    name: 'Chilaquiles',
    description: 'Totopos de tortilla bañados en salsa de chile y queso',
    price: '30.00',
    maxQuantityByCart: 8,
    organizationId: getRandomOrganization(),
    images: {
      create: [
        { imageUrl: 'https://osojimix.mx/wp-content/uploads/2022/10/Chilaquiles-rojos-1.jpg' },
        { imageUrl: 'https://cdn2.cocinadelirante.com/sites/default/files/images/2021/09/chilaquiles-rojo-con-carne-en-adobo.jpg' }
      ]
    }
  }
]

async function main () {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const promise = PRODUCTS.map(product => prisma.products.create({ data: product }))

  const products = await prisma.$transaction(promise)

  console.log({ products })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
