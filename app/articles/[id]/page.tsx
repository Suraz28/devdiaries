import ArticleDetailPage from "@/components/articles/article-detail-page";
import { prisma } from "@/lib/prisma";
import React from "react";

type ArticleDetailPageProps = {
  params: { id: string };
};

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const { id } = params; // Directly destructure params to get the `id`
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

export default page;
