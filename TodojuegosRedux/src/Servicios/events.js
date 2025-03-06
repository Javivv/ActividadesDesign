export const events = [
  {
    id: 1,
    title: "E3 2025 - Electronic Entertainment Expo",
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Gamescom 2025",
    location: "Colonia, Alemania",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tokyo Game Show 2025",
    location: "Tokyo, Japón",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Game Awards 2025",
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "IndieCade Festival",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "BlizzCon 2025",
    location: "Anaheim, USA",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "PAX West 2025",
    location: "Seattle, USA",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&h=675&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Minecraft Live 2025",
    location: "Online",
    image: "https://images.unsplash.com/photo-1587573089734-599851b2c3b5?q=80&w=1200&h=675&auto=format&fit=crop",
  },
]


export const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events)
    }, 500) 
  })
}

