import { Schema, model } from 'mongoose';
      import { TAdmin, AdminModel } from './Admin.interface';
      
      const AdminSchema = new Schema<TAdmin, AdminModel>({
        name: { type: String, required: true },
        description: { type: String },
        atcCodes: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      AdminSchema.statics.isAdminExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema);
      