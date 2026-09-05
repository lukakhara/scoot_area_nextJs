import Image from 'next/image';

export default function GalleryImage({ mobile, desktop, desktopOnly }: { mobile: string; desktop: string; desktopOnly?: boolean }) {
  return (
    <picture className={desktopOnly ? "hidden md:block" : undefined}>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <Image src={mobile} alt="Gallery Image" width={400} height={300} className="w-full object-cover" />
    </picture>
  );
}