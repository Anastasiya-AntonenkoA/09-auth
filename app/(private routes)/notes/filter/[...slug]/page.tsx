import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NoteTag } from "@/types/note";
import fetchNotesServer from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
 params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0] === "All" ? "All" : slug[0];
    return {
        title: tag ? `Notes - ${tag}` : "All Notes",
        description: tag ? `Notes filtered by tag: ${tag}` : "All Notes",
        openGraph: {
            title: tag ? `Notes - ${tag}` : "All Notes",
            description: tag ? `Notes filtered by tag: ${tag}` : "All Notes",
            siteName: "NoteHub",
            url: `https://09-auth-fq26.vercel.app/notes/filter/${slug[0]}`,
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `Notes tagged with ${tag}`,
            }]
        }
    }
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  const searchWord = "";
  const page = 1;

    await queryClient.prefetchQuery({
      queryKey: ["notes", searchWord, page, tag],
      queryFn: () => fetchNotesServer(searchWord, page, tag as NoteTag | undefined),
    });
  
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Notes by category: {tag || 'All'}</h1>
        <NotesClient tag={tag} />
      </div>
    </HydrationBoundary>
  );
};