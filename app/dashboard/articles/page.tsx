import ArticleSearchInput from "@/components/articles/article-search-input";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Link from "next/link";
import AllArticlesPage from "@/components/articles/all-articles-page";
import { AllArticlesPageSkeleton } from "@/lib/all-articles-page-skeleton";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ITEMS_PER_PAGE = 3; // Number of items per page

const Page = async ({ searchParams }: SearchPageProps) => {
  const resolvedSearchParams = await searchParams; // Await the promise

  // Extract and normalize search parameters
  const searchText = Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search || "";

  const currentPage = Number(
    Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page
  ) || 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  // Fetch articles based on search query and pagination
  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
        </div>

        {/* Articles List with Suspense */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {/* Prev Button */}
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link key={index} href={`?search=${searchText}&page=${index + 1}`} passHref>
              <Button
                variant={currentPage === index + 1 ? "destructive" : "ghost"}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          {/* Next Button */}
          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === totalPages}>
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
