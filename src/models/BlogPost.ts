import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  featuredImageUrl: string;
  content: string;
  excerpt?: string;
  category?: string;
  // Add the timestamp fields that Mongoose creates
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    featuredImageUrl: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: String,
    category: String,
  },
  { timestamps: true } // This option adds createdAt and updatedAt
);

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);