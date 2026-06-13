import BlogFooter from "@/components/home/blog-footer";
import { Navbar } from "@/components/home/header/navbar";

const AboutPage = () => {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Dev
            </span>
            Diaries
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            DevDiaries is a place for developers to share insights, tutorials,
            and stories about technology, programming, and the ever-changing
            world of software development.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you are debugging a tricky issue, learning a new
            framework, or just want to read about someone else&apos;s
            experience, DevDiaries brings together articles written by
            passionate developers.
          </p>
        </div>
      </div>
      <BlogFooter />
    </main>
  );
};

export default AboutPage;
