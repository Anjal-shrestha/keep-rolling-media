import EditBlogPostForm from '@/components/EditBlogPostForm';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = await BlogPost.findById(params.id);

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  // Create a clean, plain object with guaranteed types to pass to the client.
  const plainPost = {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    featuredImageUrl: post.featuredImageUrl,
    // Add any other fields from IBlogPost here if needed
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogPostForm post={plainPost} />
    </div>
  );
}