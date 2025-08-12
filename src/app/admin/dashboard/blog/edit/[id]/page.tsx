import EditBlogPostForm from '@/components/EditBlogPostForm';

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogPostForm postId={params.id} />
    </div>
  );
}