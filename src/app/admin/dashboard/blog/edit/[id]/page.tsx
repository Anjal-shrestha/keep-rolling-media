import EditBlogPostForm from '@/components/EditBlogPostForm';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = await BlogPost.findById(params.id);

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  // **THE FIX IS HERE:**
  // We now ensure that `bulletPoints` is always an array, even if it's empty or missing from the database.
  const plainPost = {
    _id: post._id.toString(),
    title: post.title,
    featuredImageUrl: post.featuredImageUrl,
    introParagraph: post.introParagraph,
    subheading: post.subheading,
    bulletPoints: post.bulletPoints || [], // Fallback to an empty array
    conclusion: post.conclusion,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogPostForm post={plainPost} />
    </div>
  );
}