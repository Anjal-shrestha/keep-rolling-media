import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);