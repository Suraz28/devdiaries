"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import type { Like } from "@prisma/client";
import { toggleLike } from "@/actions/like-toggle";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);
      await toggleLike(articleId);
    });
  };

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <Button
        type="button"
        variant="ghost"
        className="gap-2"
        onClick={handleLike}
        disabled={isPending}
      >
        <ThumbsUp className="h-5 w-5" />
        {optimisticLikes}
      </Button>
      <Button variant="ghost" className="gap-2">
        <Bookmark className="h-5 w-5" /> Save
      </Button>
      <Button variant="ghost" className="gap-2">
        <Share2 className="h-5 w-5" /> Share
      </Button>
    </div>
  );
};

export default LikeButton;
