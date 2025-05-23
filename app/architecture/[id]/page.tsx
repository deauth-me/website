import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Info, Landmark, History, Users } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"

export default function ArchitecturePage({ params }: { params: { id: string } }) {
  // Find the architecture item by ID
  const architecture = architectureData.find((item) => item.id === params.id)

  // If not found, show a message
  if (!architecture) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Architecture not found</h1>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-serif text-xl font-bold">
            Sacred Structures
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Home
            </Link>
            <Link href="/theory" className="text-sm font-medium text-muted-foreground">
              Theory
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to all architecture
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
            <Image
              src={architecture.imageUrl || "/placeholder.svg"}
              alt={architecture.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              {architecture.type}
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">{architecture.name}</h1>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{architecture.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Built: {architecture.yearBuilt}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Landmark className="h-4 w-4" />
                <span>{architecture.architecturalStyle}</span>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-lg">{architecture.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {architecture.features?.map((feature, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-md">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="history" className="mt-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span className="hidden sm:inline">Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="religious" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Religious Significance</span>
            </TabsTrigger>
            <TabsTrigger value="visitor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Visitor Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Historical Context</h2>
                <div className="prose max-w-none">
                  {architecture.historicalContext ? (
                    <div dangerouslySetInnerHTML={{ __html: architecture.historicalContext }} />
                  ) : (
                    <>
                      <p>
                        {architecture.name} was constructed during the {architecture.period.toLowerCase()} period,
                        specifically between {architecture.yearBuilt}. This era was characterized by significant
                        developments in architectural techniques and religious expression.
                      </p>
                      <p>
                        The construction was commissioned by {getCommissioner(architecture)} and took place during a
                        time of {getHistoricalContext(architecture)}. The building has survived through centuries of
                        history, witnessing {getHistoricalEvents(architecture)}.
                      </p>
                      <p>
                        Over the centuries, {architecture.name} has undergone several renovations and restorations, each
                        adding to its historical significance while preserving its original character and purpose.
                      </p>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold mt-6 mb-3">Timeline</h3>
                <div className="space-y-4">
                  {architecture.timeline
                    ? architecture.timeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="font-bold w-24 flex-shrink-0">{event.year}</div>
                          <div>{event.event}</div>
                        </div>
                      ))
                    : getDefaultTimeline(architecture).map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="font-bold w-24 flex-shrink-0">{event.year}</div>
                          <div>{event.event}</div>
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Architectural Details</h2>
                <div className="prose max-w-none">
                  {architecture.architecturalDetails ? (
                    <div dangerouslySetInnerHTML={{ __html: architecture.architecturalDetails }} />
                  ) : (
                    <>
                      <p>
                        {architecture.name} exemplifies the {architecture.architecturalStyle} style, characterized by
                        {getArchitecturalCharacteristics(architecture)}. The building's design reflects the technical
                        innovations and aesthetic preferences of its time.
                      </p>
                      <p>
                        The structure features {architecture.features?.join(", ")}, which are hallmarks of
                        {architecture.period.toLowerCase()} religious architecture. The spatial organization follows
                        {getSpatialOrganization(architecture)}, creating a sense of {getSpatialEffect(architecture)}.
                      </p>
                      <p>
                        The materials used in construction include {getMaterials(architecture)}, showcasing the
                        craftsmanship and technical abilities of the builders. The construction techniques employed,
                        such as
                        {getConstructionTechniques(architecture)}, were innovative for their time.
                      </p>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold mt-6 mb-3">Key Architectural Elements</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {architecture.architecturalElements
                    ? architecture.architecturalElements.map((element, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{element.name}</h4>
                          <p className="text-sm text-muted-foreground">{element.description}</p>
                        </div>
                      ))
                    : getDefaultArchitecturalElements(architecture).map((element, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{element.name}</h4>
                          <p className="text-sm text-muted-foreground">{element.description}</p>
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="religious" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Religious Significance</h2>
                <div className="prose max-w-none">
                  {architecture.religiousSignificance ? (
                    <div dangerouslySetInnerHTML={{ __html: architecture.religiousSignificance }} />
                  ) : (
                    <>
                      <p>
                        As a {architecture.type.toLowerCase()}, {architecture.name} serves as{" "}
                        {getReligiousFunction(architecture)}. The building embodies the Catholic Church's theological
                        principles through its design, artwork, and spatial arrangement.
                      </p>
                      <p>
                        The sacred space is organized to {getLiturgicalPurpose(architecture)}, reflecting the liturgical
                        practices of the time it was built. The orientation and layout follow{" "}
                        {getOrientation(architecture)}, which has symbolic meaning in Catholic tradition.
                      </p>
                      <p>
                        Throughout its history, {architecture.name} has been associated with{" "}
                        {getReligiousEvents(architecture)}. It continues to be an important place of worship,
                        pilgrimage, and spiritual significance for Catholics worldwide.
                      </p>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold mt-6 mb-3">Sacred Art & Symbolism</h3>
                <div className="space-y-4">
                  {architecture.sacredArt
                    ? architecture.sacredArt.map((art, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-medium">{art.name}</h4>
                          <p className="text-sm text-muted-foreground">{art.description}</p>
                        </div>
                      ))
                    : getDefaultSacredArt(architecture).map((art, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-medium">{art.name}</h4>
                          <p className="text-sm text-muted-foreground">{art.description}</p>
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitor" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Visitor Information</h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Opening Hours</h3>
                    <div className="space-y-2 text-sm">
                      {architecture.openingHours ? (
                        <div dangerouslySetInnerHTML={{ __html: architecture.openingHours }} />
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span>Monday - Saturday:</span>
                            <span>9:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>1:00 PM - 5:00 PM</span>
                          </div>
                          <p className="text-muted-foreground mt-2">
                            Hours may vary during religious holidays and special events.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Admission</h3>
                    <div className="space-y-2 text-sm">
                      {architecture.admission ? (
                        <div dangerouslySetInnerHTML={{ __html: architecture.admission }} />
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span>General:</span>
                            <span>€10</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Students/Seniors:</span>
                            <span>€7</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Children under 12:</span>
                            <span>Free</span>
                          </div>
                          <p className="text-muted-foreground mt-2">Entry to worship services is always free.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Visitor Tips</h3>
                    <ul className="space-y-2 text-sm list-disc pl-5">
                      {architecture.visitorTips ? (
                        architecture.visitorTips.map((tip, index) => <li key={index}>{tip}</li>)
                      ) : (
                        <>
                          <li>Dress modestly - shoulders and knees should be covered</li>
                          <li>Photography is permitted in most areas, but no flash</li>
                          <li>Guided tours are available in multiple languages</li>
                          <li>Visit early in the morning to avoid crowds</li>
                          <li>Allow at least 1-2 hours for your visit</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Nearby Attractions</h3>
                    <ul className="space-y-2 text-sm list-disc pl-5">
                      {architecture.nearbyAttractions ? (
                        architecture.nearbyAttractions.map((attraction, index) => <li key={index}>{attraction}</li>)
                      ) : (
                        <>
                          <li>Local museums and art galleries</li>
                          <li>Historic city center</li>
                          <li>Traditional restaurants and cafes</li>
                          <li>Public gardens and parks</li>
                          <li>Other religious and historical sites</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="font-serif text-2xl font-bold mb-6">More Sacred Architecture</h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {architectureData
              .filter((item) => item.id !== architecture.id)
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/architecture/${item.id}`} className="group">
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-2">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover transition-transform group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </Link>
              ))}
          </div>
        </div>
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

// Helper functions to generate content based on architecture type and period
function getCommissioner(architecture: any) {
  const type = architecture.type.toLowerCase()
  const period = architecture.period.toLowerCase()

  if (type.includes("cathedral")) {
    return "the local bishop and diocese"
  } else if (type.includes("basilica")) {
    return "the Pope and Church authorities"
  } else if (type.includes("monastery") || type.includes("abbey")) {
    return "the monastic order"
  } else {
    return "local religious authorities"
  }
}

function getHistoricalContext(architecture: any) {
  const period = architecture.period.toLowerCase()

  if (period.includes("medieval") || period.includes("gothic")) {
    return "growing urban populations and increasing religious devotion"
  } else if (period.includes("renaissance")) {
    return "cultural rebirth and renewed interest in classical forms"
  } else if (period.includes("baroque")) {
    return "the Counter-Reformation and Catholic Church's response to Protestantism"
  } else if (period.includes("modern")) {
    return "industrialization and new construction technologies"
  } else {
    return "significant religious and cultural development"
  }
}

function getHistoricalEvents(architecture: any) {
  const location = architecture.location.toLowerCase()

  if (location.includes("france")) {
    return "the French Revolution, World Wars, and modern restoration efforts"
  } else if (location.includes("italy") || location.includes("vatican")) {
    return "the Renaissance, political unification of Italy, and World Wars"
  } else if (location.includes("spain")) {
    return "the Reconquista, Spanish Civil War, and modern tourism"
  } else if (location.includes("germany")) {
    return "the Reformation, World Wars, and post-war reconstruction"
  } else if (location.includes("england") || location.includes("london")) {
    return "the English Reformation, Industrial Revolution, and the Blitz"
  } else {
    return "wars, political changes, and cultural transformations"
  }
}

function getDefaultTimeline(architecture: any) {
  const period = architecture.period.toLowerCase()
  const yearBuilt = architecture.yearBuilt
  let startYear = ""
  let midYear = ""
  let endYear = ""

  if (yearBuilt.includes("-")) {
    const years = yearBuilt.split("-")
    startYear = years[0]
    endYear = years[1]

    // Calculate a mid-point year if possible
    if (!isNaN(Number.parseInt(startYear)) && !isNaN(Number.parseInt(endYear))) {
      const start = Number.parseInt(startYear)
      const end = Number.parseInt(endYear)
      midYear = Math.floor((start + end) / 2).toString()
    } else {
      midYear = startYear
    }
  } else if (yearBuilt.includes("century")) {
    startYear = yearBuilt
    midYear = yearBuilt
    endYear = yearBuilt
  } else {
    startYear = yearBuilt
    midYear = (Number.parseInt(yearBuilt) + 50).toString()
    endYear = (Number.parseInt(yearBuilt) + 100).toString()
  }

  return [
    { year: startYear, event: `Construction begins on ${architecture.name}` },
    { year: midYear, event: `Major architectural elements completed` },
    { year: endYear, event: `Construction completed or consecration` },
    { year: "18th century", event: `Renovations and additions in Baroque style` },
    { year: "19th century", event: `Major restoration work` },
    { year: "20th century", event: `Modern conservation efforts` },
    { year: "Present", event: `Continues to serve as an important religious and cultural landmark` },
  ]
}

function getArchitecturalCharacteristics(architecture: any) {
  const style = architecture.architecturalStyle.toLowerCase()

  if (style.includes("gothic")) {
    return " pointed arches, ribbed vaults, flying buttresses, and large stained glass windows"
  } else if (style.includes("renaissance")) {
    return " symmetry, proportion, geometry, and classical orders"
  } else if (style.includes("baroque")) {
    return " dramatic use of light, rich decoration, and dynamic forms"
  } else if (style.includes("romanesque")) {
    return " round arches, thick walls, sturdy pillars, and decorative arcading"
  } else if (style.includes("byzantine")) {
    return " domes, mosaics, and a rich use of interior decoration"
  } else {
    return " distinctive elements that reflect its historical and cultural context"
  }
}

function getSpatialOrganization(architecture: any) {
  const type = architecture.type.toLowerCase()

  if (type.includes("cathedral") || type.includes("basilica")) {
    return " a cruciform plan with a central nave, side aisles, transept, and apse"
  } else if (type.includes("church")) {
    return " a longitudinal plan with a clear progression from entrance to altar"
  } else if (type.includes("chapel")) {
    return " a simple, intimate layout designed for smaller congregations"
  } else if (type.includes("monastery") || type.includes("abbey")) {
    return " a complex arrangement of religious and communal spaces around a cloister"
  } else {
    return " a traditional religious layout adapted to its specific function"
  }
}

function getSpatialEffect(architecture: any) {
  const period = architecture.period.toLowerCase()

  if (period.includes("gothic")) {
    return "verticality and divine light"
  } else if (period.includes("renaissance")) {
    return "harmony and human-scaled proportions"
  } else if (period.includes("baroque")) {
    return "drama and emotional impact"
  } else if (period.includes("byzantine")) {
    return "mystical transcendence"
  } else if (period.includes("modern")) {
    return "simplicity and spiritual focus"
  } else {
    return "sacred presence and religious devotion"
  }
}

function getMaterials(architecture: any) {
  const location = architecture.location.toLowerCase()

  if (location.includes("italy") || location.includes("vatican")) {
    return "marble, travertine, and brick"
  } else if (location.includes("france")) {
    return "limestone, stained glass, and lead"
  } else if (location.includes("spain")) {
    return "sandstone, granite, and plaster"
  } else if (location.includes("germany")) {
    return "sandstone, brick, and timber"
  } else if (location.includes("russia")) {
    return "brick, wood, and colorful ceramic tiles"
  } else {
    return "locally sourced stone, wood, and decorative elements"
  }
}

function getConstructionTechniques(architecture: any) {
  const period = architecture.period.toLowerCase()

  if (period.includes("gothic")) {
    return " pointed arches, ribbed vaults, and flying buttresses"
  } else if (period.includes("renaissance")) {
    return " dome construction and classical proportioning systems"
  } else if (period.includes("byzantine")) {
    return " pendentives and dome construction"
  } else if (period.includes("modern")) {
    return " reinforced concrete and steel framing"
  } else {
    return " masonry techniques appropriate to the period"
  }
}

function getDefaultArchitecturalElements(architecture: any) {
  const style = architecture.architecturalStyle.toLowerCase()
  const elements = []

  if (style.includes("gothic")) {
    elements.push(
      {
        name: "Flying Buttresses",
        description: "External arched supports that allow for taller, thinner walls and larger windows",
      },
      {
        name: "Pointed Arches",
        description: "Arches that come to a point at the top, allowing for greater height and structural support",
      },
      {
        name: "Ribbed Vaults",
        description:
          "Ceiling vaulting with protruding ribs that distribute weight and allow for more complex ceiling designs",
      },
      {
        name: "Rose Windows",
        description: "Large circular stained glass windows, typically found on the west façade or transepts",
      },
    )
  } else if (style.includes("renaissance")) {
    elements.push(
      {
        name: "Classical Orders",
        description: "Use of Doric, Ionic, or Corinthian columns and proportions based on classical antiquity",
      },
      {
        name: "Dome",
        description: "Hemispherical structure that crowns the building, often with a lantern at the top",
      },
      {
        name: "Symmetrical Façade",
        description: "Balanced design with equal elements on either side of a central axis",
      },
      { name: "Rounded Arches", description: "Semicircular arches used in windows, doorways, and arcades" },
    )
  } else if (style.includes("baroque")) {
    elements.push(
      {
        name: "Dramatic Lighting",
        description: "Strategic use of light sources to create dramatic effects and highlight important elements",
      },
      {
        name: "Elaborate Decoration",
        description: "Rich ornamentation, including sculptures, gilding, and painted surfaces",
      },
      {
        name: "Curved Forms",
        description: "Dynamic, curved walls, columns, and decorative elements that create a sense of movement",
      },
      {
        name: "Trompe l'oeil",
        description: "Illusionistic painting techniques that create the appearance of three-dimensional space",
      },
    )
  } else if (style.includes("byzantine")) {
    elements.push(
      {
        name: "Central Dome",
        description: "Large dome resting on pendentives, symbolizing heaven above the earthly realm",
      },
      {
        name: "Mosaics",
        description: "Decorative wall and ceiling coverings made of small pieces of colored glass or stone",
      },
      {
        name: "Pendentives",
        description: "Triangular sections of vaulting that allow a circular dome to rest on a square base",
      },
      { name: "Iconostasis", description: "Screen decorated with icons that separates the nave from the sanctuary" },
    )
  } else {
    elements.push(
      { name: "Main Façade", description: "The principal exterior face of the building, often elaborately decorated" },
      { name: "Nave", description: "The central, longitudinal space of the church where the congregation gathers" },
      { name: "Altar", description: "The sacred table where the Eucharist is celebrated, typically at the east end" },
      { name: "Bell Tower/Spire", description: "Vertical element that houses bells and serves as a visual landmark" },
    )
  }

  return elements
}

function getReligiousFunction(architecture: any) {
  const type = architecture.type.toLowerCase()

  if (type.includes("cathedral")) {
    return "the seat of a bishop and the mother church of a diocese"
  } else if (type.includes("basilica")) {
    return "a church of special distinction granted by papal designation"
  } else if (type.includes("church")) {
    return "a place of regular worship for the local Catholic community"
  } else if (type.includes("chapel")) {
    return "a smaller place of worship, often dedicated to a specific saint or purpose"
  } else if (type.includes("monastery") || type.includes("abbey")) {
    return "a center of religious life for a community of monks or nuns"
  } else {
    return "an important center of Catholic worship and tradition"
  }
}

function getLiturgicalPurpose(architecture: any) {
  const period = architecture.period.toLowerCase()

  if (period.includes("medieval") || period.includes("gothic")) {
    return "facilitate processions and the veneration of relics"
  } else if (period.includes("renaissance") || period.includes("baroque")) {
    return "emphasize the centrality of the Mass and the Eucharist"
  } else if (period.includes("modern")) {
    return "create a sense of community and active participation in the liturgy"
  } else {
    return "support Catholic liturgical practices and devotions"
  }
}

function getOrientation(architecture: any) {
  const period = architecture.period.toLowerCase()

  if (period.includes("medieval") || period.includes("gothic") || period.includes("romanesque")) {
    return 'an east-west orientation, with the altar at the east end symbolizing Christ as the "rising sun"'
  } else if (period.includes("renaissance") || period.includes("baroque")) {
    return "a centralized or longitudinal plan that emphasizes processional movement toward the altar"
  } else if (period.includes("modern")) {
    return "a flexible arrangement that may adapt traditional orientations to modern urban contexts"
  } else {
    return "traditional Catholic spatial arrangements that reflect theological symbolism"
  }
}

function getReligiousEvents(architecture: any) {
  const type = architecture.type.toLowerCase()

  if (type.includes("cathedral")) {
    return "major diocesan celebrations, ordinations, and episcopal liturgies"
  } else if (type.includes("basilica")) {
    return "papal visits, special jubilees, and important feast days"
  } else if (type.includes("monastery") || type.includes("abbey")) {
    return "monastic prayer cycles, retreats, and religious community life"
  } else if (type.includes("shrine")) {
    return "pilgrimages, healing services, and devotional practices"
  } else {
    return "regular masses, sacramental celebrations, and local religious traditions"
  }
}

function getDefaultSacredArt(architecture: any) {
  const style = architecture.architecturalStyle.toLowerCase()
  const art = []

  if (style.includes("gothic")) {
    art.push(
      {
        name: "Stained Glass Windows",
        description:
          "Colored glass depicting biblical scenes and saints, filtering light to create a heavenly atmosphere",
      },
      {
        name: "Sculptural Program",
        description: "Statues and reliefs on the façade and interior telling biblical stories and depicting saints",
      },
      {
        name: "Choir Screen",
        description: "Ornate divider between the choir and nave, often decorated with religious scenes",
      },
    )
  } else if (style.includes("renaissance")) {
    art.push(
      { name: "Frescoes", description: "Wall paintings depicting biblical narratives and theological concepts" },
      { name: "Altar Paintings", description: "Devotional images focusing on Christ, the Virgin Mary, and saints" },
      { name: "Classical Symbolism", description: "Integration of classical motifs with Christian symbolism" },
    )
  } else if (style.includes("baroque")) {
    art.push(
      {
        name: "Ceiling Paintings",
        description: "Illusionistic paintings creating visions of heaven opening above the congregation",
      },
      {
        name: "Dramatic Sculptures",
        description: "Dynamic, emotional sculptural works depicting religious ecstasy and conversion",
      },
      { name: "Elaborate Altarpieces", description: "Multi-layered compositions framing sacred images and relics" },
    )
  } else if (style.includes("byzantine")) {
    art.push(
      {
        name: "Mosaics",
        description: "Gold-backed glass tesserae creating luminous images of Christ, saints, and biblical scenes",
      },
      { name: "Icons", description: "Sacred images following strict theological and artistic conventions" },
      { name: "Liturgical Furnishings", description: "Ornate altar furnishings, lamps, and ceremonial objects" },
    )
  } else {
    art.push(
      {
        name: "Religious Artwork",
        description: "Paintings and sculptures depicting important religious figures and stories",
      },
      {
        name: "Liturgical Symbols",
        description: "Visual elements representing aspects of Catholic faith and practice",
      },
      {
        name: "Decorative Elements",
        description: "Ornamental features that enhance the sacred character of the space",
      },
    )
  }

  return art
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
  },
  {
    "id": "sveti-stefan-cathedral-novi-sad",
    "name": "Sveti Stefan Cathedral",
    "type": "Cathedral",
    "location": "Novi Sad, Serbia",
    "imageUrl": "/images/sveti-stefan-cathedral-novi-sad.jpg",
    "period": "Neoclassical",
    "description": "A prominent Roman Catholic cathedral in Novi Sad, known for its impressive size and architectural details. It was built in the late 19th century and is dedicated to Saint Stephen.",
    "yearBuilt": "1895",
    "architecturalStyle": "Neoclassical",
    "features": ["Tall bell tower", "Ornate interior", "Stained glass windows", "Central location"]
  },
  {
    "id": "alexander-nevsky-cathedral-sofia",
    "name": "Alexander Nevsky Cathedral",
    "type": "Cathedral",
    "location": "Sofia, Bulgaria",
    "imageUrl": "/images/alexander-nevsky-cathedral-sofia.jpg",
    "period": "Neo-Byzantine",
    "description": "An iconic Bulgarian Orthodox cathedral in Sofia, built in the late 19th and early 20th centuries in Neo-Byzantine style. It is one of the largest Eastern Orthodox cathedrals in the world and a symbol of Sofia.",
    "yearBuilt": "1912",
    "architecturalStyle": "Neo-Byzantine",
    "features": ["Golden domes", "Extensive mosaic decoration", "Large bell tower", "Crypt with icon collection"]
  },
  {
    "id": "tbilisi-sioni-cathedral",
    "name": "Tbilisi Sioni Cathedral",
    "type": "Cathedral",
    "location": "Tbilisi, Georgia",
    "imageUrl": "/images/tbilisi-sioni-cathedral.jpg",
    "period": "Medieval",
    "description": "A historic Georgian Orthodox cathedral in Tbilisi, with a long and eventful history dating back to the 6th century. It has been destroyed and rebuilt multiple times, retaining its significance as a major religious site.",
    "yearBuilt": "6th century (various reconstructions)",
    "architecturalStyle": "Georgian Orthodox",
    "features": ["Relics of St. Thomas", "Historic icons", "Traditional Georgian architecture", "Central location in Old Town"]
  },
  {
    "id": "gelati-monastery",
    "name": "Gelati Monastery",
    "type": "Monastery",
    "location": "Kutaisi, Georgia",
    "imageUrl": "/images/gelati-monastery.jpg",
    "period": "Medieval",
    "description": "A UNESCO World Heritage site and a significant center of learning and culture in medieval Georgia. Founded in the 12th century by King David IV, it features impressive mosaics and murals.",
    "yearBuilt": "12th century",
    "architecturalStyle": "Georgian Orthodox",
    "features": ["Byzantine-style mosaics", "Medieval frescoes", "Royal tombs", "Academy building"]
  },
  {
    "id": "rila-monastery",
    "name": "Rila Monastery",
    "type": "Monastery",
    "location": "Rila Mountains, Bulgaria",
    "imageUrl": "/images/rila-monastery.jpg",
    "period": "Renaissance",
    "description": "The largest and most famous Eastern Orthodox monastery in Bulgaria, founded in the 10th century. The current buildings date back to the 19th century and are renowned for their stunning architecture and vibrant murals.",
    "yearBuilt": "19th century (current complex)",
    "architecturalStyle": "Bulgarian Renaissance",
    "features": ["Colorful facade", "Intricate wood carvings", "Monastery museum", "Scenic mountain setting"]
  },
  {
    "id": "saint-sophia-cathedral-kyiv",
    "name": "Saint Sophia Cathedral",
    "type": "Cathedral",
    "location": "Kyiv, Ukraine",
    "imageUrl": "/images/saint-sophia-cathedral-kyiv.jpg",
    "period": "Medieval",
    "description": "A UNESCO World Heritage site and one of the most important landmarks of Kyiv. Built in the 11th century, the cathedral features stunning Byzantine mosaics and frescoes.",
    "yearBuilt": "11th century",
    "architecturalStyle": "Byzantine",
    "features": ["Ancient mosaics and frescoes", "Bell tower", "Historical significance", "Central location"]
  },
  {
    "id": "kutaisi-bagrati-cathedral",
    "name": "Bagrati Cathedral",
    "type": "Cathedral",
    "location": "Kutaisi, Georgia",
    "imageUrl": "/images/kutaisi-bagrati-cathedral.jpg",
    "period": "Medieval",
    "description": "A UNESCO World Heritage site, though partially destroyed and recently reconstructed. This 11th-century cathedral in Kutaisi is a symbol of Georgian unity and power.",
    "yearBuilt": "11th century (reconstructed)",
    "architecturalStyle": "Georgian Orthodox",
    "features": ["Impressive scale", "Historical significance", "Panoramic views of Kutaisi", "Ongoing restoration efforts"]
  },
  {
    "id": "saint-michael's-golden-domed-monastery",
    "name": "Saint Michael's Golden-Domed Monastery",
    "type": "Monastery",
    "location": "Kyiv, Ukraine",
    "imageUrl": "/images/saint-michaels-golden-domed-monastery.jpg",
    "period": "Baroque",
    "description": "A historic monastery in Kyiv with distinctive golden domes. Originally built in the Middle Ages, it was demolished by the Soviet regime and rebuilt in the 1990s.",
    "yearBuilt": "12th century (rebuilt 1990s)",
    "architecturalStyle": "Ukrainian Baroque",
    "features": ["Golden domes", "Blue facade", "Historical significance", "Central location"]
  },
  {
    "id": "holy-trinity-cathedral-tbilisi",
    "name": "Holy Trinity Cathedral of Tbilisi",
    "type": "Cathedral",
    "location": "Tbilisi, Georgia",
    "imageUrl": "/images/holy-trinity-cathedral-tbilisi.jpg",
    "period": "Modern",
    "description": "Also known as Sameba Cathedral, this is the main Georgian Orthodox cathedral in Tbilisi. Completed in 2004, it is one of the largest religious buildings in the South Caucasus.",
    "yearBuilt": "2004",
    "architecturalStyle": "Georgian Orthodox",
    "features": ["Large golden dome", "Impressive scale", "Intricate stone carvings", "Panoramic views of Tbilisi"]
  },
  {
    "id": "patriarchal-cathedral-of-the-resurrection-of-christ",
    "name": "Patriarchal Cathedral of the Resurrection of Christ",
    "type": "Cathedral",
    "location": "Bucharest, Romania",
    "imageUrl": "/images/patriarchal-cathedral-bucharest.jpg",
    "period": "Baroque",
    "description": "The main cathedral of the Romanian Orthodox Church, located in Bucharest. It is a significant religious and historical landmark.",
    "yearBuilt": "1656-1658",
    "architecturalStyle": "Romanian Baroque",
    "features": ["Relics of Saint Demetrius", "Iconostasis", "Historical significance", "Central location"]
  }
]

