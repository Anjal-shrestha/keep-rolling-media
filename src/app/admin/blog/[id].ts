import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectDB();

  if (req.method === 'GET') {
    const post = await BlogPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(post);
  } else if (req.method === 'PUT') {
    // Update via server actions, so disallow API PUT here for now
    return res.status(405).json({ message: 'Use server actions to update blog posts.' });
  } else if (req.method === 'DELETE') {
    try {
      await BlogPost.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Deleted' });
    } catch (e) {
      console.error('Failed to delete blog post:', e);
      return res.status(500).json({ message: 'Failed to delete' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
