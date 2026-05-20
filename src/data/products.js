import adidasShoe from '../assets/heropics/adidas.webp';
import nikeShoe from '../assets/heropics/nike.webp';
import pumaShoe from '../assets/heropics/puma.webp';
import frame1 from '../assets/latest/frame1.webp';
import frame2 from '../assets/latest/frame2.webp';

export const PRODUCTS = [
  {
    id: "adidas-f50",
    brand: "Adidas",
    name: "F50 Elite Fast",
    price: 22000,
    tag: "SPEED // EXCLUSIVE",
    description: "The next generation soccer-street hybrid. Built with high-frequency aerodynamic weave and translucent carbon fiber base.",
    sizes: [40, 41, 42, 43, 44, 45],
    image: adidasShoe
  },
  {
    id: "nike-vapor",
    brand: "Nike",
    name: "Street Vapor R10",
    price: 24000,
    tag: "CONTROL // COUTURE",
    description: "An aggressive lifestyle predator forged for concrete survival. Coated in heavy-duty matte charcoal armor.",
    sizes: [40, 41, 42, 43, 44, 45],
    image: nikeShoe
  },
  {
    id: "puma-active",
    brand: "Puma",
    name: "District Active",
    price: 19000,
    tag: "URBAN // MID-TOP",
    description: "Raw athletic mid-top celebrating the energy of Algiers' District 10. Wraps high around the ankle with heavy duty elastic support.",
    sizes: [40, 41, 42, 43, 44, 45],
    image: pumaShoe
  },
  {
    id: "adidas-predator-accuracy",
    brand: "Adidas",
    name: "Predator Accuracy+",
    price: 25000,
    tag: "PRECISION",
    description: "High-definition grip technology positioned across the strike zone. Designed for perfect ball control, swerve, and shooting precision on the pitch.",
    sizes: [41, 42, 43, 44, 45, 46],
    image: frame1 
  },
  {
    id: "adidas-x-crazyfast",
    brand: "Adidas",
    name: "X Crazyfast.1",
    price: 23500,
    tag: "LIGHTWEIGHT",
    description: "Aeropacity Speedskin provides comfort and a second-skin feel. Built specifically for the players who leave defenders in the dust.",
    sizes: [40, 42, 43, 44],
    image: frame2
  },
  {
    id: "adidas-copa-pure",
    brand: "Adidas",
    name: "Copa Pure Elite",
    price: 21000,
    tag: "HERITAGE",
    description: "Premium leather construction for an unmatched touch. The modern classic for the purist of the game.",
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: "nike-phantom-gx",
    brand: "Nike",
    name: "Phantom GX Elite",
    price: 26000,
    tag: "CONTROL",
    description: "Gripknit technology for a sticky touch. Designed for precise passing and shooting in any condition.",
    sizes: [40, 41, 42, 43, 44],
    image: "https://images.unsplash.com/photo-1597274791287-72d00bf0dc80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: "puma-king-ultimate",
    brand: "Puma",
    name: "King Ultimate",
    price: 20000,
    tag: "COMFORT",
    description: "K-BETTER non-animal based upper material. The legendary classic reinvented for the modern game.",
    sizes: [40, 41, 42, 43, 44, 45],
    image: "https://images.unsplash.com/photo-1612387605285-7ee92eae6958?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: "nike-mercurial-vapor",
    brand: "Nike",
    name: "Mercurial Vapor 15",
    price: 24500,
    tag: "SPEED",
    description: "Built for explosive straight-line speed. Features a responsive Zoom Air unit for ultimate acceleration.",
    sizes: [41, 42, 43, 44],
    image: "https://images.unsplash.com/photo-1768696082264-44f14594ca2c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: "nike-phantom-gt2",
    brand: "Nike",
    name: "Phantom GT2 Pro",
    price: 21000,
    tag: "ACCURACY",
    description: "Data-driven design engineered for precise attacks. Features off-center lacing for a clean strike zone.",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    image: "https://images.unsplash.com/photo-1674023797418-5df05e00b6cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  }
];
