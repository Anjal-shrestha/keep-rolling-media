import mongoose, { Schema, Document } from 'mongoose';

// This defines the structure of the project document
export interface IProject extends Document {
  title: string;
  clientName: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

// This is the Mongoose schema
const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// This exports the model, creating it if it doesn't already exist
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);