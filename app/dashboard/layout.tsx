import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import LeftSidebar from "@/components/dashboard/left-sidebar";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  await prisma.user.upsert({
    where: { clerkUserId: user.id },
    update: {},
    create: {
      name: user.fullName as string,
      clerkUserId: user.id,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  });

  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LeftSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
