import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import EditBlogPostForm from '@/components/EditBlogPostForm'; // We will use this form component

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = await BlogPost.findById(params.id);

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  // **THE FIX:** Create a clean, plain object with guaranteed types.
  // This is the most reliable way to pass data from server to client.
  const plainPost = {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    featuredImageUrl: post.featuredImageUrl,
    // Add any other fields your IBlogPost model has here
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      {/* Pass the clean, plain object to the form */}
      <EditBlogPostForm post={plainPost} />
    </div>
  );
}