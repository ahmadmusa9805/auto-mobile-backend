import { Schema, model } from 'mongoose';
      import { TInvoice, InvoiceModel } from './Invoice.interface';

      const InvoiceSchema = new Schema<TInvoice, InvoiceModel>({
        jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
        clientAdminName: { type: String },
        serviceName: { type: String, required: true },
        servicePrice: { type: String, required: true },
        paymentStatus: { type: String, required: true },
        totalCost: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      InvoiceSchema.statics.isInvoiceExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Invoice = model<TInvoice, InvoiceModel>('Invoice', InvoiceSchema);
      