"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();

    if (user) {
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
    }

    return <div>{children}</div>; // Always return children
};

export default Layout;
