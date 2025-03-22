import ArticleDetailPage from "@/components/articles/article-detail-page";
import { prisma } from "@/lib/prisma";
import React from "react";


type ArticleDetailPageProps = {
  params: Promise<{id:string}>
};

const Page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const { id } = await params;  // Resolve the promise directly here
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
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