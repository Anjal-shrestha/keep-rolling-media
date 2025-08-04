import { updateBlogPostAction } from '@/app/actions/blogActions';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Image from 'next/image';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const post = JSON.parse(JSON.stringify(await BlogPost.findById(params.id)));

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  const updateActionWithId = updateBlogPostAction.bind(null, post._id.toString());

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form action={updateActionWithId} encType="multipart/form-data" className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={post.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Change Featured Image (Optional)
          </label>
          <div className="mt-2 flex items-center gap-4">
            <Image src={post.featuredImageUrl} alt="Current image" width={80} height={80} className="rounded-md object-cover bg-gray-100" />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            required
            defaultValue={post.content}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}