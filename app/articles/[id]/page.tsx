import ArticleDetailPage from "@/components/articles/article-detail-page";
import { prisma } from "@/lib/prisma";
import React from "react";

interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

// ✅ Remove React.FC to allow async function
const Page = async ({ params }: PageProps) => {
  if (!params?.id) {
    return <h1>Invalid Article ID</h1>;
  }

  const { id } = params;

  // Fetch the article from the database
  const article = await prisma.articles.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  // Handle the case if the article is not found
  if (!article) {
    return <h1>Article not found.</h1>;
  }

  return (
    <div>
      <ArticleDetailPage article={article} />
    </div>
  );
};

export default Page;
