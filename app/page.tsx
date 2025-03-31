"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("All")

  // Get unique architecture types for the filter
  const architectureTypes = ["All", ...Array.from(new Set(architectureData.map((item) => item.type)))].sort()

  // Filter the architecture data based on the active filter
  const filteredArchitecture =
    activeFilter === "All" ? architectureData : architectureData.filter((item) => item.type === activeFilter)

  return (
    <div className="min-h-screen bg-background">
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
              {activeFilter !== "All" && (
                <Badge variant="outline" className="w-fit">
                  {activeFilter}
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveFilter("All")}
                    aria-label="Clear filter"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
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
            </div>
          </div>
        </section>

        {filteredArchitecture.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-muted-foreground mb-4">No architecture matches your current filter.</p>
            <Button onClick={() => setActiveFilter("All")}>Show all</Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredArchitecture.length} {filteredArchitecture.length === 1 ? "result" : "results"}
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
            &copy; {new Date().getFullYear()} Sacred Architecture. All rights reserved.
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
]

