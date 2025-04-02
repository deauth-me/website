import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-serif text-xl font-bold">
            Sacred Structures
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium underline underline-offset-4">
              About
            </Link>
            <Link href="/theory" className="text-sm font-medium text-muted-foreground">
              Theory
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground">
              Blog
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
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-6">About Sacred Architecture</h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src="/images/st-peters-basilica.jpg"
              alt="St. Peter's Basilica"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="prose max-w-none">
            <h2>Our Mission</h2>
            <br />
            <p>
              Sacred Structures is dedicated to becoming the premier online resource for religious architecture, with
              a particular focus on Catholic churches, cathedrals, basilicas, and monasteries around the world. Our
              mission is to document, preserve, and share the rich architectural heritage of the Catholic Church, making
              it accessible to scholars, students, travelers, and anyone with an appreciation for sacred spaces.
            </p>
            <br />
            <p>
              This site is being updated and enhanced daily with new content, features, and architectural sites. Our
              team of researchers, historians, and architecture enthusiasts is constantly working to expand our database
              and provide the most comprehensive and accurate information available.
            </p>
            <br />
            <h2>What We Offer</h2>
            <p>
              Our growing collection features detailed information on some of the world's most significant Catholic
              architectural sites, including:
            </p>
            <br />
            <ul>
              <li>Comprehensive historical context and background</li>
              <li>Detailed architectural analysis and descriptions</li>
              <li>Information on religious significance and liturgical functions</li>
              <li>High-quality images and visual documentation</li>
              <li>Practical visitor information for those planning to visit these sacred sites</li>
              <li>Educational resources on architectural styles and terminology</li>
            </ul>

            <h2>Our Approach</h2>
              <br>
            <p>
              We believe that sacred architecture represents one of humanity's highest artistic and spiritual
              achievements. Catholic churches and cathedrals in particular embody centuries of theological thought,
              artistic innovation, and cultural expression. Our approach combines:
            </p>
            <br />
            <ul>
              <li>Architectural expertise and historical research</li>
              <li>Theological understanding of sacred spaces</li>
              <li>Appreciation for artistic and cultural contexts</li>
              <li>Accessibility for both experts and newcomers to architectural study</li>
            </ul>

            <h2>Join Our Community</h2>
            <br />
            <p>
              Sacred Structures is more than just a website—it's a growing community of people passionate about
              religious architecture. We invite you to:
            </p>

            <br />
            <ul>
              <li>Explore our extensive database of architectural sites</li>
              <li>Read our blog for the latest updates and in-depth articles</li>
              <li>Learn about architectural theory and Catholic building traditions</li>
              <li>Share your own experiences and photographs of sacred sites</li>
              <li>Connect with others who share your interest in sacred architecture</li>
            </ul>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">Explore</h3>
              <p className="text-muted-foreground mb-4">
                Discover sacred sites from around the world in our comprehensive database.
              </p>
              <Link href="/">
                <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Browse Architecture
                </button>
              </Link>
            </div>

            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">Learn</h3>
              <p className="text-muted-foreground mb-4">
                Understand the principles and history behind Catholic architectural styles.
              </p>
              <Link href="/theory">
                <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Read Theory
                </button>
              </Link>
            </div>

            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Follow our blog for the latest articles, discoveries, and site additions.
              </p>
              <Link href="/blog">
                <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Visit Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
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

