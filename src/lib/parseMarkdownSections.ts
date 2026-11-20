export interface BlogSection {
  title: string | null;
  content: string;
}

export function parseMarkdownSections(markdown: string): BlogSection[] {
  return markdown
    .trim()
    .split(/(?=^#{1,2}\s)/m)
    .map((block) => {
      const [first, ...rest] = block.trim().split("\n");
      const isHeading = /^#{1,2}\s/.test(first);

      return {
        title: isHeading ? first.replace(/^#{1,2}\s+/, "").trim() : null,
        content: (isHeading ? rest : [first, ...rest]).join("\n").trim(),
      };
    })
    .filter((s) => s.title || s.content);
}