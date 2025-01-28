import { Schema, model } from 'mongoose';
      import { TService, ServiceModel } from './Service.interface';
      
      const ServiceSchema = new Schema<TService, ServiceModel>({
        name: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      ServiceSchema.statics.isServiceExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Service = model<TService, ServiceModel>('Service', ServiceSchema);
      