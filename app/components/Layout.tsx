import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-xol min-h-screen">
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
        </div>
    )
}