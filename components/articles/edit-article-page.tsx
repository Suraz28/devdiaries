"use client";
import { FormEvent, startTransition, useActionState, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Articles } from "@prisma/client";
import { updateArticles } from "@/actions/update-article";
import Image from "next/image";
import Link from "next/link";

type EditPropsPage = {
  article: Articles;
};

const EditArticlePage: React.FC<EditPropsPage> = ({ article }) => {
  const [content, setContent] = useState(article.content);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");

  const [formState, action, isPending] = useActionState(
    updateArticles.bind(null, article.id),
    { errors: {} }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > 1 * 1024 * 1024) {  // 1MB = 1 * 1024 * 1024 bytes
        setFileError("File size must be less than 1MB.");
        setFeaturedImage(null);  // Clear the file if it's too large
      } else {
        setFileError("");  // Clear the error message
        setFeaturedImage(file);  // Set the valid file
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={article.title}
                placeholder="Enter article title"
                required
              />
              {formState.errors.title && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="CyberSecurity">CyberSecurity</option>
                <option value="Science">Science</option> 
                <option value="Politics">Politics</option> 
                <option value="Food & Lifestyle">Food & Lifestyle</option>
                <option value="HealthCare">HealthCare</option>
                <option value="HotTopics">HotTopics</option>
                <option value="other">Other</option>
              </select>
              {formState.errors.category && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              {article.featuredImage && (
                <div className="mb-4">
                  <Image
                    src={article.featuredImage}
                    alt="Current featured"
                    width={192}
                    height={128}  
                    className="object-cover rounded-md"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Current featured image
                  </p>
                </div>
              )}
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}  // Add file change handler
              />
              {fileError && (
                <span className="font-medium text-sm text-red-500">{fileError}</span>
              )}
              {formState.errors.featuredImage && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
              />
              {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Link href={"/dashboard"}>
                <Button type="button" variant="outline" className="cursor-pointer">
                  Discard Changes
                </Button>
              </Link>
              <Button
                disabled={isPending || !!fileError}  // Disable if pending or file size error exists
                type="submit"
                className="cursor-pointer"
              >
                {isPending ? "Loading..." : "Update Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
