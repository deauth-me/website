"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [activeCountryFilter, setActiveCountryFilter] = useState<string>("All")
  const [activeStyleFilter, setActiveStyleFilter] = useState<string>("All")

  // Get unique architecture types for the filter
  const architectureTypes = ["All", ...Array.from(new Set(architectureData.map((item) => item.type)))].sort()

  // Get unique countries for the filter
  const countries = [
    "All",
    ...Array.from(
      new Set(
        architectureData.map((item) => {
          // Extract country from location (assuming format "City, Country")
          const locationParts = item.location.split(", ")
          return locationParts.length > 1 ? locationParts[locationParts.length - 1] : item.location
        }),
      ),
    ).sort(),
  ]

  // Get unique architectural styles for the filter
  const architecturalStyles = [
    "All",
    ...Array.from(
      new Set(
        architectureData.map((item) => {
          // Some items have multiple styles separated by commas or "and"
          // For simplicity, we'll just use the first style mentioned
          const style = item.architecturalStyle.split(",")[0].split(" and ")[0].trim()
          return style
        }),
      ),
    ).sort(),
  ]

  // Filter the architecture data based on all active filters
  const filteredArchitecture = architectureData.filter((item) => {
    const matchesType = activeFilter === "All" || item.type === activeFilter

    // Extract country from location
    const locationParts = item.location.split(", ")
    const country = locationParts.length > 1 ? locationParts[locationParts.length - 1] : item.location
    const matchesCountry = activeCountryFilter === "All" || country === activeCountryFilter

    // Check if the item matches the style filter
    // We'll check if the architecturalStyle field contains the selected style
    const matchesStyle = activeStyleFilter === "All" || item.architecturalStyle.includes(activeStyleFilter)

    return matchesType && matchesCountry && matchesStyle
  })

  return (
    <div className="min-h-screen bg-background">
       <SiteHeader />
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-serif text-xl font-bold">
            Sacred Structures
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium underline underline-offset-4">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground">
              About
            </Link>
            <Link href="/theory" className="text-sm font-medium text-muted-foreground">
              Theory
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <section className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-muted-foreground">Explore the beauty and history of sacred spaces around the world</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                {activeFilter !== "All" && (
                  <Badge variant="outline" className="w-fit">
                    Type: {activeFilter}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveFilter("All")}
                      aria-label="Clear type filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {activeCountryFilter !== "All" && (
                  <Badge variant="outline" className="w-fit">
                    Country: {activeCountryFilter}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveCountryFilter("All")}
                      aria-label="Clear country filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {activeStyleFilter !== "All" && (
                  <Badge variant="outline" className="w-fit">
                    Style: {activeStyleFilter}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setActiveStyleFilter("All")}
                      aria-label="Clear style filter"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Type</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {architectureTypes.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        className={activeFilter === type ? "bg-muted font-medium" : ""}
                        onClick={() => setActiveFilter(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Country</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {countries.map((country) => (
                      <DropdownMenuItem
                        key={country}
                        className={activeCountryFilter === country ? "bg-muted font-medium" : ""}
                        onClick={() => setActiveCountryFilter(country)}
                      >
                        {country}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Style</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {architecturalStyles.map((style) => (
                      <DropdownMenuItem
                        key={style}
                        className={activeStyleFilter === style ? "bg-muted font-medium" : ""}
                        onClick={() => setActiveStyleFilter(style)}
                      >
                        {style}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        {filteredArchitecture.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-muted-foreground mb-4">No architecture matches your current filters.</p>
            <Button
              onClick={() => {
                setActiveFilter("All")
                setActiveCountryFilter("All")
                setActiveStyleFilter("All")
              }}
            >
              Show all
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredArchitecture.length} {filteredArchitecture.length === 1 ? "result" : "results"}
              {(activeFilter !== "All" || activeCountryFilter !== "All" || activeStyleFilter !== "All") &&
                " with applied filters"}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArchitecture.map((item) => (
                <Link key={item.id} href={`/architecture/${item.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-2 right-2 bg-background/80 text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                        {item.type}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.architecturalStyle}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sacred Structures. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const architectureData = [
  {
    id: "st-peters-basilica",
    name: "St. Peter's Basilica",
    type: "Basilica",
    location: "Vatican City",
    imageUrl: "/images/st-peters-basilica.jpg",
    period: "Renaissance",
    description:
      "One of the largest churches in the world and a renowned example of Renaissance architecture, designed by Donato Bramante, Michelangelo, Carlo Maderno, and Gian Lorenzo Bernini.",
    yearBuilt: "1506-1626",
    architecturalStyle: "Renaissance and Baroque",
    features: ["Dome designed by Michelangelo", "Bernini's Baldacchino", "Pietà sculpture"],
  },
  {
    id: "notre-dame-cathedral",
    name: "Notre-Dame Cathedral",
    type: "Cathedral",
    location: "Paris, France",
    imageUrl: "/images/notre-dame-cathedral.jpg",
    period: "Gothic",
    description:
      "A medieval Catholic cathedral on the Île de la Cité known for its Gothic architecture, flying buttresses, and rose windows.",
    yearBuilt: "1163-1345",
    architecturalStyle: "French Gothic",
    features: ["Flying buttresses", "Rose windows", "Gargoyles and chimeras"],
  },
  {
    id: "sagrada-familia",
    name: "Sagrada Família",
    type: "Church",
    location: "Barcelona, Spain",
    imageUrl: "/images/sagrada-familia.jpg",
    period: "Modern",
    description:
      "Antoni Gaudí's unfinished masterpiece combining Gothic and Art Nouveau elements, featuring organic forms and mathematical precision.",
    yearBuilt: "1882-present",
    architecturalStyle: "Catalan Modernism",
    features: ["Hyperboloid structures", "Naturalistic design", "Symbolic facades"],
  },
  {
    id: "mont-saint-michel",
    name: "Mont-Saint-Michel Abbey",
    type: "Monastery",
    location: "Normandy, France",
    imageUrl: "/images/mont-saint-michel.jpg",
    period: "Medieval",
    description:
      "A monastery built on a tidal island, showcasing a mix of Romanesque and Gothic styles with a strategic and spiritual significance.",
    yearBuilt: "10th-16th century",
    architecturalStyle: "Romanesque and Gothic",
    features: ["Island setting", "Fortified walls", "Cloisters"],
  },
  {
    id: "cologne-cathedral",
    name: "Cologne Cathedral",
    type: "Cathedral",
    location: "Cologne, Germany",
    imageUrl: "/images/cologne-cathedral.jpg",
    period: "Gothic",
    description:
      "A High Gothic five-aisled basilica, one of Germany's most visited landmarks and a UNESCO World Heritage site.",
    yearBuilt: "1248-1880",
    architecturalStyle: "High Gothic",
    features: ["Twin spires", "Shrine of the Three Kings", "Stained glass windows"],
  },
  {
    id: "st-marks-basilica",
    name: "St. Mark's Basilica",
    type: "Basilica",
    location: "Venice, Italy",
    imageUrl: "/images/st-marks-basilica.jpg",
    period: "Byzantine",
    description:
      "Famous for its opulent design, gold mosaics, and its status as a symbol of Venetian wealth and power.",
    yearBuilt: "1063-1094",
    architecturalStyle: "Italo-Byzantine",
    features: ["Gold mosaics", "Greek cross layout", "Four bronze horses"],
  },
  {
    id: "chartres-cathedral",
    name: "Chartres Cathedral",
    type: "Cathedral",
    location: "Chartres, France",
    imageUrl: "/images/chartres-cathedral.jpg",
    period: "Gothic",
    description:
      "Considered one of the finest examples of French Gothic architecture, known for its stained glass windows and preservation of original features.",
    yearBuilt: "1194-1220",
    architecturalStyle: "High Gothic",
    features: ["Blue stained glass", "Labyrinth", "Mismatched spires"],
  },
  {
    id: "hagia-sophia",
    name: "Hagia Sophia",
    type: "Basilica/Mosque/Museum",
    location: "Istanbul, Turkey",
    imageUrl: "/images/hagia-sophia.jpg",
    period: "Byzantine",
    description:
      "Originally a Greek Orthodox Christian patriarchal basilica, later an imperial mosque, and now a museum, known for its massive dome.",
    yearBuilt: "532-537",
    architecturalStyle: "Byzantine",
    features: ["Massive central dome", "Pendentives", "Marble pillars"],
  },
  {
    id: "santa-maria-del-fiore",
    name: "Florence Cathedral",
    type: "Cathedral",
    location: "Florence, Italy",
    imageUrl: "/images/florence-cathedral.jpg",
    period: "Renaissance",
    description:
      "Formally the Cathedral of Santa Maria del Fiore, featuring Brunelleschi's innovative dome that remains the largest brick dome ever constructed.",
    yearBuilt: "1296-1436",
    architecturalStyle: "Gothic and Renaissance",
    features: ["Brunelleschi's dome", "Polychrome marble façade", "Giotto's Campanile"],
  },
  {
    id: "westminster-abbey",
    name: "Westminster Abbey",
    type: "Abbey",
    location: "London, England",
    imageUrl: "/images/westminster-abbey.jpg",
    period: "Gothic",
    description:
      "A Gothic abbey church and the traditional place of coronation and burial for English and British monarchs.",
    yearBuilt: "1245-1517",
    architecturalStyle: "Gothic",
    features: ["Henry VII Lady Chapel", "Poets' Corner", "Coronation Chair"],
  },
  {
    id: "saint-chapelle",
    name: "Sainte-Chapelle",
    type: "Chapel",
    location: "Paris, France",
    imageUrl: "/images/sainte-chapelle.jpg",
    period: "Gothic",
    description:
      "A royal chapel within the medieval Palais de la Cité, known for its exceptional stained glass windows.",
    yearBuilt: "1242-1248",
    architecturalStyle: "Rayonnant Gothic",
    features: ["15 stained glass windows", "Reliquary", "Slender supports"],
  },
  {
    id: "santiago-de-compostela",
    name: "Santiago de Compostela Cathedral",
    type: "Cathedral",
    location: "Galicia, Spain",
    imageUrl: "/images/santiago-de-compostela.jpg",
    period: "Romanesque",
    description:
      "The reputed burial place of Saint James the Great, one of the apostles of Jesus Christ, and the destination of the Way of St. James pilgrimage.",
    yearBuilt: "1075-1211",
    architecturalStyle: "Romanesque, Gothic, Baroque",
    features: ["Pórtico da Gloria", "Botafumeiro", "Baroque façade"],
  },
  {
    id: "saint-louis-cathedral",
    name: "St. Louis Cathedral",
    type: "Cathedral",
    location: "New Orleans, USA",
    imageUrl: "/images/saint-louis-cathedral.jpg",
    period: "Colonial",
    description:
      "The oldest cathedral in continuous use in the United States, representing the Spanish Colonial and French architectural influences.",
    yearBuilt: "1789-1794",
    architecturalStyle: "Spanish Colonial and French",
    features: ["Triple steeples", "Rococo altar", "St. Anthony's Garden"],
  },
  {
    id: "saint-patricks-cathedral",
    name: "St. Patrick's Cathedral",
    type: "Cathedral",
    location: "New York City, USA",
    imageUrl: "/images/saint-patricks-cathedral.jpg",
    period: "Neo-Gothic",
    description: "The largest Gothic Catholic cathedral in the United States, a prominent landmark of New York City.",
    yearBuilt: "1858-1878",
    architecturalStyle: "Neo-Gothic",
    features: ["Twin spires", "Rose window", "Lady Chapel"],
  },
  {
    id: "montserrat-monastery",
    name: "Montserrat Monastery",
    type: "Monastery",
    location: "Catalonia, Spain",
    imageUrl: "/images/montserrat-monastery.jpg",
    period: "Modern",
    description:
      "A Benedictine abbey located on the mountain of Montserrat, known for the Virgin of Montserrat and its unique setting.",
    yearBuilt: "11th century (rebuilt in 19th-20th century)",
    architecturalStyle: "Modernist",
    features: ["Black Madonna", "Mountain setting", "Boys' choir"],
  },
  {
    id: "saint-basils-cathedral",
    name: "Saint Basil's Cathedral",
    type: "Cathedral",
    location: "Moscow, Russia",
    imageUrl: "/images/saint-basils-cathedral.jpg",
    period: "Medieval Russian",
    description: "Originally a church, now a museum, known for its distinctive onion domes and vibrant colors.",
    yearBuilt: "1555-1561",
    architecturalStyle: "Russian Orthodox",
    features: ["Colorful onion domes", "Asymmetrical design", "Nine chapels"],
  },
  {
    id: "sant-andrea-al-quirinale",
    name: "Sant'Andrea al Quirinale",
    type: "Church",
    location: "Rome, Italy",
    imageUrl: "/images/sant-andrea-al-quirinale.jpg",
    period: "Baroque",
    description:
      "A Jesuit church designed by Gian Lorenzo Bernini, considered a gem of Baroque architecture. It features an elliptical plan, rich polychrome marble, and a famous gilded stucco dome.",
    yearBuilt: "1658-1670",
    architecturalStyle: "Italian Baroque",
    features: ["Elliptical plan", "Bernini design", "Gilded dome", "Polychrome marble"],
  },
  {
    id: "san-carlo-alle-quattro-fontane",
    name: "San Carlo alle Quattro Fontane",
    type: "Church",
    location: "Rome, Italy",
    imageUrl: "/images/san-carlo-alle-quattro-fontane.jpg",
    period: "Baroque",
    description:
      "An iconic work by Francesco Borromini, known for its intricate geometric design based on triangles and its undulating facade. It stands at an intersection marked by four fountains.",
    yearBuilt: "1638-1646",
    architecturalStyle: "Italian Baroque",
    features: ["Borromini design", "Undulating facade", "Complex geometric plan", "Oval dome"],
  },
  {
    id: "sant-ivo-alla-sapienza",
    name: "Sant'Ivo alla Sapienza",
    type: "Church",
    location: "Rome, Italy",
    imageUrl: "/images/sant-ivo-alla-sapienza.jpg",
    period: "Baroque",
    description:
      "Another masterpiece by Francesco Borromini, this church is famed for its unique central plan resembling a Star of David and its extraordinary corkscrew lantern atop the dome.",
    yearBuilt: "1642-1660",
    architecturalStyle: "Italian Baroque",
    features: ["Borromini design", "Central plan (Star of David)", "Corkscrew lantern", "Concave facade"],
  },
  {
    id: "san-lorenzo-turin",
    name: "Real Chiesa di San Lorenzo",
    type: "Church",
    location: "Turin, Italy",
    imageUrl: "/images/san-lorenzo-turin.jpg",
    period: "Baroque",
    description:
      "Designed by Guarino Guarini, this church is celebrated for its mathematical complexity and stunning dome created by intersecting ribs forming an eight-pointed star pattern.",
    yearBuilt: "1668-1687",
    architecturalStyle: "Italian Baroque",
    features: ["Guarini design", "Intersecting rib dome", "Complex geometry", "Central plan"],
  },
  {
    id: "cappella-della-sacra-sindone",
    name: "Cappella della Sacra Sindone",
    type: "Chapel",
    location: "Turin, Italy",
    imageUrl: "/images/cappella-della-sacra-sindone.jpg",
    period: "Baroque",
    description:
      "A chapel by Guarino Guarini built to house the Shroud of Turin (located within Turin Cathedral). It is renowned for its dramatic, mathematically complex dome constructed with superimposed arches.",
    yearBuilt: "1668-1694",
    architecturalStyle: "Italian Baroque",
    features: ["Guarini design", "Layered arch dome", "Designed for Shroud of Turin", "Black marble decoration"],
  },
  // New entries for Venice churches
  {
    id: "santa-maria-della-salute",
    name: "Santa Maria della Salute",
    type: "Church",
    location: "Venice, Italy",
    imageUrl: "/images/santa-maria-della-salute.jpg",
    period: "Baroque",
    description:
      "A magnificent octagonal church built as a votive offering for the city's deliverance from the plague. Standing at the entrance to the Grand Canal, it's one of Venice's most iconic landmarks, featuring a massive dome that dominates the skyline.",
    yearBuilt: "1631-1687",
    architecturalStyle: "Venetian Baroque",
    features: ["Octagonal design", "Twin bell towers", "Massive dome", "136 statues of saints"],
  },
  {
    id: "san-giorgio-maggiore",
    name: "San Giorgio Maggiore",
    type: "Church",
    location: "Venice, Italy",
    imageUrl: "/images/san-giorgio-maggiore.jpg",
    period: "Renaissance",
    description:
      "Located on its own island across from St. Mark's Square, this church was designed by Andrea Palladio and represents one of the finest examples of Renaissance architecture in Venice. Its bright white façade creates a striking contrast against the blue Venetian lagoon.",
    yearBuilt: "1566-1610",
    architecturalStyle: "Palladian",
    features: ["Classical façade", "Harmonious proportions", "Bell tower", "Tintoretto paintings"],
  },
  {
    id: "santa-maria-dei-miracoli",
    name: "Santa Maria dei Miracoli",
    type: "Church",
    location: "Venice, Italy",
    imageUrl: "/images/santa-maria-dei-miracoli.jpg",
    period: "Renaissance",
    description:
      "Often called 'the marble gem of Venice,' this small church is entirely clad in polychrome marble with delicate sculptural details. Built to house a miraculous icon of the Virgin Mary, it features an unusual raised presbytery and barrel-vaulted ceiling adorned with 50 paintings of prophets and saints.",
    yearBuilt: "1481-1489",
    architecturalStyle: "Early Venetian Renaissance",
    features: ["Polychrome marble exterior", "Coffered barrel vault", "Raised presbytery", "Intricate marble inlays"],
  },
  {
    id: "il-redentore",
    name: "Il Redentore",
    type: "Church",
    location: "Venice, Italy",
    imageUrl: "/images/il-redentore.jpg",
    period: "Renaissance",
    description:
      "Built as a votive church to thank God for the end of the 1575-1576 plague, Il Redentore is another masterpiece by Andrea Palladio. Located on Giudecca Island, it features a perfectly proportioned façade that combines classical elements with innovative solutions to create a sense of harmony and monumentality.",
    yearBuilt: "1577-1592",
    architecturalStyle: "Palladian",
    features: [
      "Classical façade",
      "Giant order columns",
      "Luminous interior",
      "Annual Festa del Redentore celebration",
    ],
  },
  // New entries for Rome basilicas
  {
    id: "san-giovanni-in-laterano",
    name: "Archbasilica of St. John Lateran",
    type: "Basilica",
    location: "Rome, Italy",
    imageUrl: "/images/san-giovanni-in-laterano.jpg",
    period: "Baroque",
    description:
      "The oldest and highest ranking of the four papal major basilicas, serving as the official ecclesiastical seat of the Pope as Bishop of Rome. Despite numerous reconstructions, it maintains its status as the 'mother church' of all churches in Rome and throughout the world.",
    yearBuilt: "4th century (rebuilt 1650-1723)",
    architecturalStyle: "Baroque",
    features: ["Massive statues of the Apostles", "Cosmatesque floor", "Lateran Obelisk", "Papal throne"],
  },
  {
    id: "santa-maria-maggiore",
    name: "Basilica di Santa Maria Maggiore",
    type: "Basilica",
    location: "Rome, Italy",
    imageUrl: "/images/santa-maria-maggiore.jpg",
    period: "Paleo-Christian",
    description:
      "One of Rome's four major papal basilicas, it contains one of the best-preserved Byzantine interiors in the city. The basilica houses stunning 5th-century mosaics depicting Old Testament scenes and is famous for housing relics of Christ's manger from Bethlehem.",
    yearBuilt: "432-440",
    architecturalStyle: "Paleo-Christian, Baroque façade",
    features: ["5th-century mosaics", "Coffered Renaissance ceiling", "Crypt of the Nativity", "Borghese Chapel"],
  },
  {
    id: "san-paolo-fuori-le-mura",
    name: "Basilica of Saint Paul Outside the Walls",
    type: "Basilica",
    location: "Rome, Italy",
    imageUrl: "/images/san-paolo-fuori-le-mura.jpg",
    period: "Paleo-Christian",
    description:
      "One of Rome's four major papal basilicas, built over the burial place of St. Paul the Apostle. After being largely destroyed by fire in 1823, it was faithfully reconstructed to match its original 4th-century design, creating one of the best examples of early Christian basilica architecture.",
    yearBuilt: "4th century (rebuilt 1823-1854)",
    architecturalStyle: "Neoclassical",
    features: ["Portraits of all popes", "Cloister with twisted columns", "Paschal candelabrum", "St. Paul's tomb"],
  },
  {
    id: "santa-maria-in-trastevere",
    name: "Basilica di Santa Maria in Trastevere",
    type: "Basilica",
    location: "Rome, Italy",
    imageUrl: "/images/santa-maria-in-trastevere.jpg",
    period: "Medieval",
    description:
      "One of the oldest churches in Rome, possibly the first where Mass was openly celebrated. The basilica features stunning 12th and 13th-century mosaics in the apse and nave, and incorporates ancient Roman columns from the Baths of Caracalla in its structure.",
    yearBuilt: "340 (rebuilt 1140)",
    architecturalStyle: "Romanesque",
    features: ["Golden mosaics", "Ancient Roman columns", "Cosmati pavement", "Octagonal fountain in piazza"],
  },
  {
    id: "san-clemente",
    name: "Basilica di San Clemente",
    type: "Basilica",
    location: "Rome, Italy",
    imageUrl: "/images/san-clemente.jpg",
    period: "Medieval",
    description:
      "A three-tiered complex that offers a fascinating journey through Roman history. The current 12th-century basilica sits atop a 4th-century church, which itself was built over a 1st-century Roman house and Mithraic temple, allowing visitors to literally descend through layers of history.",
    yearBuilt: "1108 (over 4th century church)",
    architecturalStyle: "Romanesque",
    features: ["Three historical layers", "Apse mosaic", "Schola cantorum", "Mithraic temple"],
  },
  // New churches from Spain and South America
  {
    id: "burgos-cathedral",
    name: "Burgos Cathedral",
    type: "Cathedral",
    location: "Burgos, Spain",
    imageUrl: "/images/burgos-cathedral.jpg",
    period: "Gothic",
    description:
      "A masterpiece of Spanish Gothic architecture and a UNESCO World Heritage site. The cathedral is known for its elegant spires, intricate stonework, and the famous Golden Staircase. Construction began in 1221 and continued for over three centuries, resulting in a harmonious blend of Gothic styles.",
    yearBuilt: "1221-1567",
    architecturalStyle: "Spanish Gothic",
    features: ["Octagonal spires", "Star-shaped dome", "Golden Staircase", "Chapel of the Constable"],
  },
  {
    id: "toledo-cathedral",
    name: "Toledo Cathedral",
    type: "Cathedral",
    location: "Toledo, Spain",
    imageUrl: "/images/toledo-cathedral.jpg",
    period: "Gothic",
    description:
      "One of Spain's most important Gothic cathedrals, built on the site of a former mosque. The cathedral is renowned for its impressive scale, magnificent choir stalls, and the transparent altar that allows light to pass through alabaster sculptures. It houses an impressive collection of artworks by El Greco, Goya, and Velázquez.",
    yearBuilt: "1226-1493",
    architecturalStyle: "High Gothic",
    features: ["Transparent altar", "Elaborate choir stalls", "El Transparente", "Treasury with Monstrance"],
  },
  {
    id: "seville-cathedral",
    name: "Seville Cathedral",
    type: "Cathedral",
    location: "Seville, Spain",
    imageUrl: "/images/seville-cathedral.jpg",
    period: "Gothic",
    description:
      "The largest Gothic cathedral in the world and a UNESCO World Heritage site. Built on the site of a former mosque, it retains the Giralda, the minaret converted into a bell tower. The cathedral houses the tomb of Christopher Columbus and features an impressive collection of religious art and treasures.",
    yearBuilt: "1401-1528",
    architecturalStyle: "Spanish Gothic",
    features: ["Giralda Tower", "Tomb of Christopher Columbus", "Vast interior", "Elaborate altarpiece"],
  },
  {
    id: "basilica-of-our-lady-of-pilar",
    name: "Basilica of Our Lady of the Pillar",
    type: "Basilica",
    location: "Zaragoza, Spain",
    imageUrl: "/images/basilica-of-pilar.jpg",
    period: "Baroque",
    description:
      "A magnificent Baroque basilica dedicated to the Virgin Mary, built on the site where she allegedly appeared to Saint James in 40 AD. The basilica houses the venerated wooden statue of the Virgin on a pillar (pilar), which gives the church its name. The interior is adorned with frescoes by Francisco Goya and other notable artists.",
    yearBuilt: "1681-1872",
    architecturalStyle: "Spanish Baroque",
    features: ["Multiple domes and towers", "Venerated pillar statue", "Goya frescoes", "Ornate chapels"],
  },
  {
    id: "metropolitan-cathedral-mexico-city",
    name: "Metropolitan Cathedral of Mexico City",
    type: "Cathedral",
    location: "Mexico City, Mexico",
    imageUrl: "/images/metropolitan-cathedral-mexico-city.jpg",
    period: "Colonial",
    description:
      "The largest and oldest cathedral in the Americas, built over the Aztec sacred precinct. The cathedral showcases a unique blend of architectural styles including Gothic, Baroque, and Neoclassical elements. It has been sinking into the soft ground of the former lake bed, requiring extensive restoration work.",
    yearBuilt: "1573-1813",
    architecturalStyle: "Spanish Colonial, Baroque, Neoclassical",
    features: ["Altar of the Kings", "Choir stalls", "Golden altarpieces", "Chapels of the Apse"],
  },
  {
    id: "basilica-of-our-lady-of-copacabana",
    name: "Basilica of Our Lady of Copacabana",
    type: "Basilica",
    location: "Copacabana, Bolivia",
    imageUrl: "/images/basilica-of-copacabana.jpg",
    period: "Colonial",
    description:
      "A significant pilgrimage site on the shores of Lake Titicaca, housing the venerated statue of the Virgin of Copacabana, the patron saint of Bolivia. The basilica combines Spanish colonial architecture with indigenous Andean elements, reflecting the cultural synthesis that occurred during the colonial period.",
    yearBuilt: "1610-1651",
    architecturalStyle: "Moorish-influenced Spanish Colonial",
    features: [
      "Moorish-style domes",
      "Miraculous Virgin statue",
      "Ornate altarpiece",
      "Indigenous decorative elements",
    ],
  },
  {
    id: "cusco-cathedral",
    name: "Cusco Cathedral",
    type: "Cathedral",
    location: "Cusco, Peru",
    imageUrl: "/images/cusco-cathedral.jpg",
    period: "Colonial",
    description:
      "Built on the foundations of an Inca palace, this cathedral is a prime example of colonial architecture in Peru. It features a fascinating blend of Spanish Renaissance and Baroque styles with indigenous Quechua influences. The cathedral houses a remarkable collection of colonial art from the Cusco School, including a Last Supper painting showing Jesus and the apostles dining on guinea pig.",
    yearBuilt: "1559-1654",
    architecturalStyle: "Spanish Renaissance, Baroque with Andean influences",
    features: ["Silver altar", "Cusco School paintings", "Cedar choir stalls", "Chapel of the Señor de los Temblores"],
  },
   // New Baroque churches from Central Europe
  {
    id: "st-nicholas-church-prague",
    name: "St. Nicholas Church",
    type: "Church",
    location: "Prague, Czech Republic",
    imageUrl: "/images/st-nicholas-church-prague.jpg",
    period: "Baroque",
    description:
      "One of the most important Baroque churches in Central Europe, St. Nicholas Church in Prague's Lesser Town is a masterpiece of High Baroque architecture. The church features a massive dome and an impressive bell tower, with an opulent interior decorated with frescoes, sculptures, and a magnificent pipe organ once played by Mozart.",
    yearBuilt: "1704-1755",
    architecturalStyle: "High Baroque",
    features: ["Massive dome", "Elaborate frescoes", "Mozart's organ", "Sculptures by Braun"],
  },
  {
    id: "karlskirche-vienna",
    name: "Karlskirche",
    type: "Church",
    location: "Vienna, Austria",
    imageUrl: "/images/karlskirche-vienna.jpg",
    period: "Baroque",
    description:
      "Dedicated to St. Charles Borromeo, Karlskirche is considered the most outstanding Baroque church in Vienna and one of the city's greatest buildings. Commissioned by Emperor Charles VI, the church features a magnificent dome flanked by two giant columns inspired by Trajan's Column in Rome, decorated with scenes from the life of St. Charles Borromeo.",
    yearBuilt: "1716-1737",
    architecturalStyle: "Late Baroque",
    features: ["Iconic twin columns", "Elliptical dome", "Relief sculptures", "Panoramic rooftop view"],
  },
  {
    id: "frauenkirche-dresden",
    name: "Frauenkirche Dresden",
    type: "Church",
    location: "Dresden, Germany",
    imageUrl: "/images/frauenkirche-dresden.jpg",
    period: "Baroque",
    description:
      "The Frauenkirche (Church of Our Lady) is a Lutheran church that was completely destroyed during World War II and meticulously reconstructed after German reunification. It is one of the most remarkable examples of Protestant sacred architecture, featuring a distinctive bell-shaped dome that dominates Dresden's skyline. The interior is notable for its light-filled space and concentric circular design.",
    yearBuilt: "1726-1743 (reconstructed 1994-2005)",
    architecturalStyle: "Saxon Baroque",
    features: [
      "Bell-shaped dome",
      "Circular interior",
      "Original stones integrated in reconstruction",
      "Sandstone construction",
    ],
  },
  {
    id: "benedictine-abbey-melk",
    name: "Melk Abbey Church",
    type: "Church",
    location: "Melk, Austria",
    imageUrl: "/images/benedictine-abbey-melk.jpg",
    period: "Baroque",
    description:
      "Part of the magnificent Benedictine Abbey of Melk, the abbey church is a jewel of Austrian Baroque architecture. Perched on a rocky outcrop overlooking the Danube River, the church features a stunning interior with gold leaf decoration, vibrant ceiling frescoes, and an abundance of marble. The twin towers and dome of the church form an iconic riverside silhouette.",
    yearBuilt: "1702-1736",
    architecturalStyle: "Austrian Baroque",
    features: ["Gold leaf decoration", "Ceiling frescoes", "Marble columns", "Spiral towers"],
  },
  {
    id: "st-martins-church-bratislava",
    name: "St. Martin's Cathedral",
    type: "Church",
    location: "Bratislava, Slovakia",
    imageUrl: "/images/st-martins-church-bratislava.jpg",
    period: "Baroque",
    description:
      "Originally built in Gothic style and later remodeled with Baroque elements, St. Martin's Cathedral served as the coronation church for Hungarian kings for nearly 300 years. The church is distinguished by its 85-meter tower topped with a replica of the Hungarian royal crown. The interior features a blend of Gothic structure with Baroque decoration, including an impressive equestrian statue of St. Martin.",
    yearBuilt: "13th century (Baroque renovations 17th-18th century)",
    architecturalStyle: "Gothic with Baroque elements",
    features: ["Crown tower", "Baroque chapels", "Crypt of notable bishops", "Coronation history"],
  },
  // New Modern churches from France
  {
    id: "notre-dame-du-haut",
    name: "Notre Dame du Haut",
    type: "Church",
    location: "Ronchamp, France",
    imageUrl: "/images/notre-dame-du-haut.jpg",
    period: "Modern",
    description:
      "Designed by the renowned architect Le Corbusier, Notre Dame du Haut is one of the most important works of 20th-century religious architecture. The sculptural concrete building features curved walls, an asymmetrical design, and small, irregularly placed colored glass windows that create a mystical play of light inside. It represents a radical departure from traditional church architecture while maintaining a profound sense of spirituality.",
    yearBuilt: "1950-1955",
    architecturalStyle: "Expressionist Modern",
    features: ["Curved concrete walls", "Sculptural roof", "Colored light wells", "Acoustic properties"],
  },
  {
    id: "church-of-saint-pierre-firminy",
    name: "Church of Saint-Pierre",
    type: "Church",
    location: "Firminy, France",
    imageUrl: "/images/church-of-saint-pierre-firminy.jpg",
    period: "Modern",
    description:
      "Another Le Corbusier design, the Church of Saint-Pierre was completed posthumously in 2006, 41 years after the architect's death. The concrete structure takes the form of a truncated cone that widens as it rises, with light entering through precisely positioned openings. On certain days, the constellation of Orion is projected onto the interior walls through carefully placed perforations.",
    yearBuilt: "1970-2006",
    architecturalStyle: "Late Modern",
    features: ["Truncated cone shape", "Constellation light effect", "Concrete construction", "Acoustic design"],
  },
  {
    id: "notre-dame-de-toute-grace",
    name: "Notre-Dame de Toute Grâce",
    type: "Church",
    location: "Plateau d'Assy, France",
    imageUrl: "/images/notre-dame-de-toute-grace.jpg",
    period: "Modern",
    description:
      "Built as a sanatorium church in the French Alps, Notre-Dame de Toute Grâce is famous for its remarkable collection of modern art by some of the 20th century's greatest artists. The church features works by Matisse, Chagall, Braque, Léger, Bonnard, and others, representing a significant reconciliation between modern art and religious expression in the aftermath of World War II.",
    yearBuilt: "1937-1950",
    architecturalStyle: "Modern with Alpine influences",
    features: ["Matisse mosaic", "Chagall baptistery", "Léger mosaic facade", "Lurçat tapestry"],
  },
  {
    id: "sainte-jeanne-darc-nice",
    name: "Église Sainte-Jeanne-d'Arc",
    type: "Church",
    location: "Nice, France",
    imageUrl: "/images/sainte-jeanne-darc-nice.jpg",
    period: "Modern",
    description:
      "A striking example of concrete modernism, the Church of St. Joan of Arc in Nice features a distinctive parabolic arch structure that dominates its exterior. The church's design symbolizes Joan of Arc's hands in prayer, with the interior bathed in colored light from stained glass windows. The minimalist concrete interior creates a solemn, contemplative atmosphere.",
    yearBuilt: "1926-1933",
    architecturalStyle: "Art Deco Modern",
    features: ["Parabolic arch", "Concrete construction", "Symbolic design", "Colored light effects"],
  },
  {
    id: "notre-dame-de-pentecote",
    name: "Notre-Dame de Pentecôte",
    type: "Church",
    location: "La Défense, Paris, France",
    imageUrl: "/images/notre-dame-de-pentecote.jpg",
    period: "Modern",
    description:
      "Located in the heart of Paris's business district, Notre-Dame de Pentecôte is a contemporary church designed as a place of worship and reflection for office workers. The seven-story glass and concrete structure features a minimalist design with a transparent facade that contrasts with the surrounding skyscrapers. The interior is arranged vertically with the main worship space elevated above street level.",
    yearBuilt: "1998-2001",
    architecturalStyle: "Contemporary Minimalist",
    features: ["Glass facade", "Vertical arrangement", "Urban integration", "Minimalist interior"],
  }
]


