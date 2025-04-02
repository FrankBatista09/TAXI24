import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':tripId')
  generateInvoice(@Param('tripId') tripId: string) {
    return this.invoiceService.generateFromTrip(tripId);
  }

  @Get()
  getAllInvoices(){
    return this.invoiceService.findAll();
  }
}
