import type { ImageMetadata } from "astro";

export default interface Article {
    id: number;
    documentId: string;
    title: string;
    content: string;
    slug: string;
    coverImage: ImageMetadata;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}