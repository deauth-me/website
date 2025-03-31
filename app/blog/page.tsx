import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function BlogPage() {
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
            <Link href="/about" className="text-sm font-medium text-muted-foreground">
              About
            </Link>
            <Link href="/theory" className="text-sm font-medium text-muted-foreground">
              Theory
            </Link>
            <Link href="/blog" className="text-sm font-medium underline underline-offset-4">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-2">Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Latest news, articles, and insights about Catholic architecture
          </p>

          <div className="mb-12">
            <Card className="overflow-hidden">
              <div className="aspect-[21/9] relative">
                <Image
                  src="/images/notre-dame-cathedral.jpg"
                  alt="Notre-Dame Cathedral Restoration"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Notre-Dame Cathedral: Restoration Progress and Future Plans</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      March 15, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Dr. Marie Laurent
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Following the devastating fire in 2019, Notre-Dame Cathedral in Paris has been undergoing an extensive
                  restoration process. This article examines the current state of the restoration, the challenges faced,
                  and the plans for the cathedral's future.
                </p>
                <p>
                  The restoration team has made significant progress in stabilizing the structure, cleaning the stone,
                  and preparing for the reconstruction of the spire. We'll look at how traditional craftsmanship is
                  being combined with modern technology to restore this Gothic masterpiece.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Read full article
                </Link>
              </CardFooter>
            </Card>
          </div>

          <h2 className="font-serif text-2xl font-bold mb-6">Recent Articles</h2>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-primary text-sm font-medium hover:underline">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="bg-muted rounded-lg p-6">
            <h2 className="font-serif text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-4 text-sm">
              Stay updated with the latest articles, architectural discoveries, and site additions. We send a monthly
              digest of our best content.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Subscribe
              </button>
            </div>
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

const blogPosts = [
  {
    id: 1,
    title: "The Symbolism of Light in Gothic Cathedrals",
    author: "Prof. Thomas Wilson",
    date: "March 10, 2025",
    imageUrl: "/images/chartres-cathedral.jpg",
    excerpt:
      "Explore how medieval architects used stained glass and architectural elements to create theological statements about divine light and spiritual illumination in Gothic cathedrals.",
  },
  {
    id: 2,
    title: "Baroque Churches of Latin America: A Fusion of Cultures",
    author: "Dr. Isabella Morales",
    date: "March 5, 2025",
    imageUrl: "/images/saint-louis-cathedral.jpg",
    excerpt:
      "Discover how European Baroque architecture was transformed in the Americas, incorporating indigenous influences and creating a unique architectural language.",
  },
  {
    id: 3,
    title: "Modern Catholic Church Design: Tradition Meets Innovation",
    author: "Architect Michael Chen",
    date: "February 28, 2025",
    imageUrl: "/images/sagrada-familia.jpg",
    excerpt:
      "An examination of how contemporary architects are balancing liturgical requirements with modern aesthetics and sustainable building practices in new Catholic churches.",
  },
  {
    id: 4,
    title: "The Acoustic Design of Sacred Spaces",
    author: "Dr. Sarah Johnson",
    date: "February 20, 2025",
    imageUrl: "/images/st-peters-basilica.jpg",
    excerpt:
      "How architectural acoustics enhance the liturgical experience, from Gregorian chant in Romanesque abbeys to organ music in Baroque churches and modern sound design.",
  },
]

