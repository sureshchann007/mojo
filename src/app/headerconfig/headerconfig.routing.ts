import { Routes } from '@angular/router';
import { BillingListComponent } from '../billing/billing-list/billingList.component';
import { MasterListComponent } from '../master/master-list/masterList.component';
import { MasterAddComponent } from '../master/master-add/masterAdd.component';
import { MasterEditComponent } from '../master/master-edit/masterEdit.component';


export const HeaderconfigRoutes: Routes = [    
     {path:'Billing-List',component:BillingListComponent},
     {path:'Master-List',component:MasterListComponent},
     {path:'Master-Add',component:MasterAddComponent},
     {path:'Master-Edit/:id',component:MasterEditComponent}
]