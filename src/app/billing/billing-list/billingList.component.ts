import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/appservice/user.service';
import { Router } from '@angular/router';
import { RowNode } from 'ag-grid-community';
import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { MasterBean } from 'src/app/master/master-bean/masteBean';



@Component({
    selector: 'app-billing-list',
    templateUrl: './billingList.component.html',
    styleUrls: ['./billingList.component.css']
})
export class BillingListComponent implements OnInit, AfterViewInit {

    //default
    private gridApi;
    private gridColumnApi;
    public modules: Module[] = AllModules;

    public columnDefs;
    public defaultColDef;
    public columnTypes;
    public rowData;
    public groupDefaultExpanded;
    //default

    // List
    fetchedData: any;
    fetchedProductCode: any;
    // List

    constructor(private userService: UserService) {
        
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.productCode();
        this.getbillingList();

    }

    productCode() {
        this.userService.getproductCode().subscribe((data: any) => {
            let dumdata = data;
            this.fetchedProductCode = dumdata.productCode;
            console.log(this.fetchedProductCode)
            this.agGrid();
        });
    }

    getbillingList() {
        this.userService.getmasterUser().subscribe((data: any) => {
            this.fetchedData = data;
        });

    }

    agGrid() {
        let code = this.fetchedProductCode;
      
        this.columnDefs = [
            {
                headerName: 'S.No', field: 'sno',
                valueGetter: function (params) {
                    return params.node.rowIndex + 1;
                },
                type: 'valueColumn',
                editable: false,
            },
            {
                headerName: 'Product Code', field: 'productCode',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    cellHeight: 25,
                    values: code,
                },

            },
            {
                headerName: 'Product Name', field: 'productName',
                // cellEditor: 'agRichSelectCellEditor',
                // cellEditorParams: function(params) {
                //     var productCode = params.data.productCode;
                //     var allowedCities = getproductName(productCode);
                //     return {
                //     values: allowedCities,
                //     // formatValue: function(value) {
                //     //     return value + ' (' + selectedCountry + ')';
                //     // },
                //     };
                // },
            },
            {
                headerName: 'Product Quantity', field: 'productQuantity',
                type: 'valueColumn',
            },
            {
                headerName: 'Product Actual Price', field: 'productactualPrice',
                // type: 'valueColumn',
                editable: false,
            },
            {
                headerName: 'Product Grand Price', field: 'productgrandPrice',                
                valueGetter: this.bracketsFormatter,
                editable: false,
                aggFunc: 'sum',
                cellClass: 'total-col',
            },


        ];
        this.defaultColDef = {
            flex: 1,
            sortable: true,
            editable: true,
            resizable: true,
            filter: 'agTextColumnFilter',
        };
        this.columnTypes = {
            valueColumn: {
                editable: true,
                aggFunc: 'sum',
                valueParser: 'Number(newValue)',
                filter: 'agNumberColumnFilter',
            },
        };
        //this.rowData = getRowData();
        this.groupDefaultExpanded = 1;

    }


    onCellValueChanged(params) {
        this.gridApi = params.api;
        let pinnedBottomData = this.generatePinnedBottomData();
        this.gridApi.setPinnedBottomRowData([pinnedBottomData]);

         var colId = params.column.getId();

         if (colId === 'productCode') {
            var productCode = params.data.productCode;
            var productName = params.data.productName;
            var allowedproductName = this.getproductName(productCode);
            if(allowedproductName){
                params.node.setDataValue('productName', allowedproductName);
            }
            var allowedproductactualPrice = this.getproductactualPrice(productCode);
            if(allowedproductactualPrice){
                params.node.setDataValue('productactualPrice', allowedproductactualPrice);
            }
          }

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.setRowData(getRowData());

    }

    generatePinnedBottomData() {
        let result = {};

        this.gridColumnApi.getAllGridColumns().forEach(item => {
            result[item.colId] = null;
        });
        return this.calculatePinnedBottomData(result);
    }

    calculatePinnedBottomData(target: any) {
        let columnsWithAggregation = ['productgrandPrice']
        columnsWithAggregation.forEach(element => {
            console.log('element', element);
            this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
                if (rowNode.data['productQuantity'] != null && rowNode.data['productactualPrice'] != null)
                    var total = rowNode.data['productQuantity'] * rowNode.data['productactualPrice'];
                target[element] += Number(total.toFixed(2));
            });
            if (target[element])
                target[element] = `Total: ${target[element].toFixed(2)}`;
        })
        return target;
    }

    bracketsFormatter(params) {
        if (params.data.productgrandPrice != null && params.data.productgrandPrice != undefined) {
            return params.data.productgrandPrice;
        } else {
            return params.data.productQuantity * params.data.productactualPrice;
        }
    }

    getproductName(productCode){  

        const fetchproductName = this.fetchedData.filter(data => data.productCode === productCode)[0];
        let productName = fetchproductName.productName        
        return productName;
    }

    getproductactualPrice(productCode){
        const fetchproductPrice = this.fetchedData.filter(data => data.productCode === productCode)[0];
        let productPrice = fetchproductPrice.productPrice        
        return productPrice;
    }
}


function getRowData() {
    var rowData = [];
    for (var i = 0; i < 500; i++) {
        rowData.push({
            productCode: '',
            productName: '',
            productQuantity: 0,
            productactualPrice: 0,
        })
    }
    return rowData;
}


// cleanData(){
//     this.gridApi.setRowData([]);
// }

