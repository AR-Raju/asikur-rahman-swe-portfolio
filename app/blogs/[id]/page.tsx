import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readTime: number;
}

async function getBlog(id: string): Promise<Blog> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="mb-6">
            <Badge className="mb-4">{blog.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime} min read</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={blog.featuredImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="whitespace-pre-line leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br>") }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/blogs">View More Posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
