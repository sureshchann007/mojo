import { OnInit, AfterViewInit, Component } from '@angular/core';
import { UserService } from 'src/app/appservice/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoiceList.component.html',
    styleUrls: ['./invoiceList.component.css']
})
export class InvoiceListComponent implements OnInit, AfterViewInit {

    public gridApi;
    public gridColumnApi;

    public columnDefs;
    public defaultColDef;
    public autoGroupColumnDef;
    public rowData;

    constructor(private userService: UserService,private http: HttpClient) {

        this.columnDefs = [
            {
                field: 'billingYear',
                rowGroup: true,
                hide: true,
            },
            {
                field: 'billingMonth',
                rowGroup: true,
                hide: true,
            },
            {
                field: 'billingInv',
                rowGroup: true,
                hide: true,
            },
            {
                field: 'productCode',
                rowGroup: true,
                hide: true,
            },
            {
                field: 'productName',
                rowGroup: true,
                hide: true,
            },
            { 
                headerName: 'Total', 
                field: 'grandtotalAmt', aggFunc: 'sum' },            
          ];
          this.defaultColDef = {
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true,
          };
          this.autoGroupColumnDef = { 
            headerName: 'Invoice No.', 
            minWidth: 250 };

        
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        //this.getinvoiceList();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    //     this.http
    //   .get(
    //     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    //   )
    //   .subscribe(data => {
    //       console.log(data)
    //     this.rowData = data;
    //   });
        
        this.userService.getinvoiceList().subscribe((data: any) => {
            console.log(data)
            let dumData = data
            this.rowData = dumData.holeBean          
            console.log(this.rowData)
        });
    }
    
}