import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  clientName: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  vehiclesBranded: string;
  campaignFocus: string;
  // Add the timestamp fields that Mongoose creates
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    vehiclesBranded: { type: String, required: true },
    campaignFocus: { type: String, required: true },
  },
  { timestamps: true } // This option adds createdAt and updatedAt
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);