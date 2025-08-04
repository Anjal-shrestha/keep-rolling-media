import mongoose, { Schema, Document } from 'mongoose';

// Define the structure of the blog post document
export interface IBlogPost extends Document {
  title: string;
  slug: string; // For clean URLs like /blog/my-first-post
  content: string;
  featuredImageUrl: string;
  author: string;
}

// This is the Mongoose schema
const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    featuredImageUrl: { type: String, required: true },
    author: { type: String, default: 'Keep Rolling Media' },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// This exports the model, creating it if it doesn't already exist
export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);