import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const posts = await BlogPost.find({}).select('_id title slug').sort({ publishedAt: -1 });
    res.status(200).json({ posts });
  } else if (req.method === 'POST') {
    // For simplicity, creating via server action, not API here
    res.status(405).json({ message: 'Use server actions to create blog posts.' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
