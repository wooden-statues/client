import Artist from "./components/Artist";
import Hero from "./components/Hero";
import Liked from "./components/Liked";
import Manufacturing from "./components/Manufacturing";

export default function Home() {
    return (
        <>
            <Hero />
            <main>
                <Liked />
                <Artist />
                <Manufacturing />
            </main>
        </>
    );
}