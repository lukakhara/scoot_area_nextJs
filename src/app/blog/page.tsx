import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Placeholder } from "@/components/Placeholder";
// import blogDesk from '../../public/blogDesk.png'
// import blogMob from '../../public/blogMob.png'
// import Link from 'next/link'
import Image from "next/image";
import Link from "next/link";

interface postTypes {
  date: string;
  title: string;
  excerpt: string;
}

const POSTS: postTypes[] = Array.from({ length: 6 }, () => ({
  date: "30/05/2025",
  title: "ელექტრო სკუტერები — მომავლის გადაადგილება უკვე დღეს",
  excerpt:
    "ელექტრო სკუტერები აღარ არის მხოლოდ ტრენდი — ისინი თანამედროვე ურბანული ცხოვრების აუცილებელი ნაწილი გახდა. მწვანე ტექნოლოგიებზე ორიენტირებული მსოფლიო სულ უფრო მეტად ირჩევს ეკო-მეგობრულ გადაადგილებას, და სწორედ ამ საჭიროებას პასუხობს ScootArea თავისი ხარისხიანი, სანდო და სტილური მოდელებით.",
}));

function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 lg:pt-12">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
          ბლოგი
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8h">
          {POSTS.map((post, i) => (
            <Link
              key={post.title}
              href={"/blogDetail"}
              className="uppercase transition-opacity hover:opacity-70"
              // activeProps={{ className: "text-primary" }}
            >
              {post.title}

              <article key={i} className="rounded-3xl bg-secondary p-5 sm:p-6 ">
                <div className="relative">
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet='/blogDesk.png'
                    />
                    <Image
                      src='/blogMob.png'
                      className="aspect-[4/3] w-full object-cover"
                      alt="item image"
                    />
                  </picture>
                  <span className="absolute bottom-0 left-0 rounded-tr-2xl bg-secondary py-2 pr-4 text-lg font-medium text-foreground/80">
                    {post.date}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-extrabold tracking-tight uppercase sm:text-xl">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="გვერდები"
        >
          <button
            aria-label="წინა"
            className="flex size-9 items-center justify-center rounded-full border hover:border-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
          {["1", "2", "3", "4", "…"].map((p) => (
            <button
              key={p}
              className="flex size-9 items-center justify-center rounded-full border text-sm hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
          <button
            aria-label="შემდეგი"
            className="flex size-9 items-center justify-center rounded-full border hover:border-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}

export default BlogPage;
