import { Schema, model } from 'mongoose';
import { PrivacyModel, TPrivacy } from './Privacy.interface';
      
      const PrivacySchema = new Schema<TPrivacy, PrivacyModel>({
        message: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      PrivacySchema.statics.isPrivacyExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Privacy = model<TPrivacy, PrivacyModel>('Privacy', PrivacySchema);
      