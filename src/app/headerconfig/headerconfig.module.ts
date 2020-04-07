import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { HeaderconfigRoutes } from './headerconfig.routing';
import { BillingListComponent } from '../billing/billing-list/billingList.component';
import { MasterListComponent } from '../master/master-list/masterList.component';
import { MasterAddComponent } from '../master/master-add/masterAdd.component';
import { MasterEditComponent } from '../master/master-edit/masterEdit.component';
import { AgGridModule } from 'ag-grid-angular';
import { InvoiceListComponent } from '../invoice/invoice-list/invoiceList.component';



@NgModule({
    imports: [CommonModule,
        RouterModule.forChild(HeaderconfigRoutes),
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([])        
        ],
        providers: [DatePipe],
        entryComponents:[],
        schemas:[CUSTOM_ELEMENTS_SCHEMA],
        declarations:[BillingListComponent,MasterListComponent,MasterAddComponent,MasterEditComponent,InvoiceListComponent]
})
export class HeaderConfigComponentModule{}