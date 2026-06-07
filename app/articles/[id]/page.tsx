import ArticleDetailPage from "@/components/articles/article-detail-page";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";


type ArticleDetailPageProps = {
  params: Promise<{id:string}>
};

const Page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const { id } = await params;
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
    notFound();
  }
  return (
    <div>
      <ArticleDetailPage article={article} /> 
    </div>
  );
};

export default Page;