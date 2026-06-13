import BlogFooter from "@/components/home/blog-footer";
import { Navbar } from "@/components/home/header/navbar";
import Link from "next/link";

const TutorialsPage = () => {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tutorials
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Step-by-step tutorials are coming soon. In the meantime, check out
            our{" "}
            <Link href="/articles" className="text-primary underline">
              articles
            </Link>{" "}
            for in-depth guides and walkthroughs.
          </p>
        </div>
      </div>
      <BlogFooter />
    </main>
  );
};

export default TutorialsPage;
