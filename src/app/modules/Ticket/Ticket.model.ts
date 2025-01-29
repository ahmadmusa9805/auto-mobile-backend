import { Schema, model } from 'mongoose';
      import { TTicket, TicketModel } from './Ticket.interface';
      
      const TicketSchema = new Schema<TTicket, TicketModel>({
        jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
        status: { type: String },
        isDeleted: { type: Boolean, default: false },
      });
      
      TicketSchema.statics.isTicketExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Ticket = model<TTicket, TicketModel>('Ticket', TicketSchema);
      