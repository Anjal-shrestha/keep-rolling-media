import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import DeleteBlogPostButton from '@/components/DeleteBlogPostButton'; // Import the new component

export default async function BlogAdminPage() {
  await connectDB();
  const posts = await BlogPost.find({}).sort({ createdAt: -1 });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog</h1>
        <Link
          href="/admin/dashboard/blog/new"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          + Add New Post
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {JSON.parse(JSON.stringify(posts)).map((post: any) => (
          <div
            key={post._id}
            className="border-b last:border-b-0 py-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{post.title}</h3>
            </div>
            <div className="flex gap-2">
               <Link
                href={`/admin/dashboard/blog/edit/${post._id}`}
                className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              >
                Edit
              </Link>
              {/* Use the new delete button component */}
              <DeleteBlogPostButton postId={post._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}