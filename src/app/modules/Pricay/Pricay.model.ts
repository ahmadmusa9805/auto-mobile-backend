import { Schema, model } from 'mongoose';
      import { TPricay, PricayModel } from './Pricay.interface';
      
      const PricaySchema = new Schema<TPricay, PricayModel>({
        message: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      PricaySchema.statics.isPricayExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Pricay = model<TPricay, PricayModel>('Pricay', PricaySchema);
      