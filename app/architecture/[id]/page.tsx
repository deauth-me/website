import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Info, Landmark, History, Users } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-serif text-xl font-bold">
            Sacred Architecture
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
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
]

