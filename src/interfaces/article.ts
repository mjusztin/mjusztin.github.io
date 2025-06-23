import type { ImageMetadata } from "astro";

export default interface Article {
    id: number;
    documentId: string;
    description: string;
    title: string;
    cover: ImageMetadata;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string;
}