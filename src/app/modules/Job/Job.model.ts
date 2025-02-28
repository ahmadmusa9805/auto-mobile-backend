import { Schema, model } from 'mongoose';
import { JobModel, TJob } from './Job.interface';
      
      const JobSchema = new Schema<TJob, JobModel>({
        regName: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        raisedId: { type: Schema.Types.ObjectId, ref: 'User' },
        grandId: { type: Schema.Types.ObjectId, ref: 'User' },
        make: { type: String, required: true },
        jobId: { type: String, required: true, unique: true },
        model: { type: String, required: true },
        engine: { type: String, required: true },
        power: { type: String, required: true },
        gearBox: { type: String, required: true },
        services: { type: [String], required: true }, // Assuming services is an array of strings
        status: { type: String, default: "pending" },
        paymentStatus: { type: String, default: "pending" },
        additionalInfo: { type: String },
        assignedTechnician: { type: Schema.Types.ObjectId, ref: 'User', default: null	}, // Assuming it's a reference to a technician ID
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        invoiceRequest: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
      });
      
      JobSchema.statics.isJobExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Job = model<TJob, JobModel>('Job', JobSchema);
      
    
    