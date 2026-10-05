import ProductCardImage from "@/components/ui/ProductCardImage";
import { BlogPost } from "@/types/blog";
import { Play } from "lucide-react";
import { projectHmrChunkNamesSubscribe } from "next/dist/build/swc/generated-native";
import Image from "next/image";
import { notFound } from "next/navigation";


async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("BlogDetail id=", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch scooter ${id}: ${res.status}`);
  }

  const blog:BlogPost = await res.json();
  console.log("data=", blog.images);

  return (
    <div className="px-18">
      <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">ბლოგი</h1>

      {/* Main image */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/insideBlogDesk.png" />
        <ProductCardImage src={blog.coverImage} alt={blog.title}/>
      </picture>

      <h1>{blog.title}</h1>

      {/* First text section */}
      <div>
        {blog.content}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 test">
        {blog.images.map((image) => (
          <ProductCardImage src={image} alt="blog image"/>
        ))}
      </div>

      {/* Video player */}
      <div className="hidden min-h-[640px] w-full items-center justify-center bg-[#9E9E9E] md:flex">
        <Play />
      </div>

      {/* Second text section */}
      <div>
        ელექტრო სკუტერები სულ უფრო ხშირად გვხვდება თანამედროვე ქალაქის ქუჩებზე —
        ისინი არამხოლოდ გადაადგილების საშუალებაა, არამედ ცხოვრების ახალი სტილი.
        ScootArea ბლოგი შეიქმნა იმისთვის, რომ დაგეხმაროს უკეთ გაიცნო ეს სფერო და
        მიიღო მაქსიმალური სარგებელი შენი სკუტერისგან. ჩვენს ბლოგში იპოვი დეტალურ
        ინფორმაციას ელექტრო სკუტერების მოდელებზე, ტექნოლოგიურ სიახლეებზე,
        ტრენდებსა და ცვლილებებზე, რომლებიც გავლენას ახდენს ეკო-მეგობრულ
        გადაადგილებაზე. წაიკითხე შედარებები, რომ სწორად შეარჩიო შენთვის იდეალური
        მოდელი. გაეცანი მოვლის რჩევებს, რომლებიც გაგიმარტივებს სკუტერის
        ხანგრძლივად შენახვას და ოპტიმალურ მუშაობას. ასევე არ გამოგრჩეს იურიდიული
        რჩევები და გზაზე გადაადგილების წესები, რომელიც მნიშვნელოვან როლს
        თამაშობს დღევანდელ ქალაქურ ცხოვრებაში — მით უფრო, როცა მოძრაობ ახალ
        ფორმატში. ScootArea ბლოგის მიზანია, გაგიზიაროს გამოცდილება, დაგეხმაროს
        სწორი გადაწყვეტილებების მიღებაში და გაგიწიოს მეგზურობა სკუტერულ გზაზე —
        იქნება ეს შენი პირველი შეძენა, ტექნიკური გამოწვევა თუ უბრალოდ ინტერესი
        თანამედროვე გადაადგილების სტილისადმი. დარჩი ჩართული — აქ ყოველდღე რაღაც
        ახალს გაიგებ. ელექტრო სკუტერები სულ უფრო ხშირად გვხვდება თანამედროვე
        ქალაქის ქუჩებზე — ისინი არამხოლოდ გადაადგილების საშუალებაა, არამედ
        ცხოვრების ახალი სტილი. ScootArea ბლოგი შეიქმნა იმისთვის, რომ დაგეხმაროს
        უკეთ გაიცნო ეს სფერო და მიიღო მაქსიმალური სარგებელი შენი სკუტერისგან.
        ჩვენს ბლოგში იპოვი დეტალურ ინფორმაციას ელექტრო სკუტერების მოდელებზე,
        ტექნოლოგიურ სიახლეებზე, ტრენდებსა და ცვლილებებზე, რომლებიც გავლენას
        ახდენს ეკო-მეგობრულ გადაადგილებაზე. წაიკითხე შედარებები, რომ სწორად
        შეარჩიო შენთვის იდეალური მოდელი. გაეცანი მოვლის რჩევებს, რომლებიც
        გაგიმარტივებს სკუტერის ხანგრძლივად შენახვას და ოპტიმალურ მუშაობას. ასევე
        არ გამოგრჩეს იურიდიული რჩევები და გზაზე გადაადგილების წესები, რომელიც
        მნიშვნელოვან როლს თამაშობს დღევანდელ ქალაქურ ცხოვრებაში — მით უფრო, როცა
        მოძრაობ ახალ ფორმატში. ScootArea ბლოგის მიზანია, გაგიზიაროს გამოცდილება,
        დაგეხმაროს სწორი გადაწყვეტილებების მიღებაში და გაგიწიოს მეგზურობა
        სკუტერულ გზაზე — იქნება ეს შენი პირველი შეძენა, ტექნიკური გამოწვევა თუ
        უბრალოდ ინტერესი თანამედროვე გადაადგილების სტილისადმი. დარჩი ჩართული —
        აქ ყოველდღე რაღაც ახალს გაიგებ.
      </div>
    </div>
  );
}

export default BlogDetail;
