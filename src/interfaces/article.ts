import type { ImageMetadata } from "astro";

interface ParagraphBlock {
    __component: 'article-components.paragraph';
    id: number;
    text: string;
}

interface ImageBlock {
    __component: 'article-components.image';
    id: number;
    caption: string;
    data: {
        url: string;
    }
}

type ContentBlock = ParagraphBlock | ImageBlock;

export default interface Article {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content_blocks: [ContentBlock];
    source_url: string
}