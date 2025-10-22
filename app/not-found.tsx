import { Metadata } from "next";
import NotFoundPage from "./not-found-page";

export const metadata: Metadata = {
    title: "404 - Error",
    description: "Page not found",
    openGraph: {
        title: "404 - Error",
        description: "Page not found",
        url: "https://08-zustand-sigma-five.vercel.app/",
        images: [{
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "Note Hub - word with white letters on light blue background",
        }]
    }
}

const NotFound = () => {
    return <NotFoundPage />
}

export default NotFound;