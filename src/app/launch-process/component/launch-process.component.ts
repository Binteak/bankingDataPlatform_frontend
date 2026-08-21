import { Component } from '@angular/core';
import { LaunchProcessService } from '../service/launch-process.service';
import { CardModule} from 'primeng/card';
import { DropdownModule} from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';


@Component({
    standalone: true,
    imports: [ CardModule, DropdownModule, CommonModule, FormsModule, ButtonModule, CheckboxModule, InputSwitchModule],
    selector: 'app-launch-process',
    templateUrl: './launch-process.component.html',
    styleUrls: ['./launch-process.component.css']
})

export class LaunchProcessComponent {
    constructor(private _api: LaunchProcessService) {}

    //Campos principales
    purposes = [
        {purpose: 'Market Risk Stress', selected: false, disabled: false},
        {purpose: 'CCR Stress', selected: false, disabled: false},
    ];
    selectedPurpose ='';
    valueDates: { date: string;}[] = [];
    selectedValueDate = '';

    scenarios: { scenario: string;}[] = [];
    selectedScenario = '';

    currencies: { currency: string;}[] = [];
    selectedCurrency = '';

    fxRates: { rate: string;}[] = [];
    selectedFxRate = '';

    reportDate = '';
    ccrLabels: { label: string;}[] = [];
    selectedCCRLabel = '';

    showValueDate = false;
    showScenario = false;
    showCurrency = false;
    showFxRates = false;
    showReportDate = false;
    showCCRLabel = false;

    //Switches para el bloque derecho (independientes)
    includeIntragroupTrades = false;
    includeInternalTrades = false;
    includePNLCash = false;
    selectAll = false;

    //Sensitivities
    sensitivitiesAll = false;
    sensitivities = [
        { name: 'Interest Rate', selected: false },
        { name: 'Credit Spread', selected: false },
        { name: 'Equity', selected: false },
        { name: 'FX', selected: false },
        { name: 'Commodity', selected: false }
    ];

    //MR Stres Filtergin
    booksAll = false;
    books = [
        { name: 'Book1', selected: false },
        { name: 'Book2', selected: false },
        { name: 'Book3', selected: false }
    ];

    productsAll = false;
    products = [
        { name: 'Product1', selected: false },
        { name: 'Product2', selected: false },
        { name: 'CRD', 
          selected: false,
          isGroup: true,
          items: [
              { name: 'CDS', selected: false },
              { name: 'CDS', selected: false },
              { name: 'CDS', selected: false },
              { name: 'CDS', selected: false },
            ]
         }
    ];

    //Intermediate Results
    showIntermediateResults = false;
    showMoreInfo = false;
    intermediateSwitches = {
        shockLevel: false,
        riskFactorLevel: false,
        underlyingLevel: false,
        sensitivityLevel: false
    };

    intermediateResults = [
        { date: '31/01/2023 14:03:22', id: 276, user: 'X263500'},
        { date: '30/01/2023 10:15:45', id: 275, user: 'X318902'},
        { date: '29/01/2023 09:20:10', id: 274, user: 'X959996'},
    ]

    //--- Lógica principal ---
    onPurposeSwitchChange(purpose: any):void { 
        this.purposes.forEach(p => p.selected = (p === purpose));
        this.selectedPurpose = purpose.purpose;

        //Reset fields
        this.valueDates = [];
        this.selectedValueDate = '';
        this.scenarios = [];
        this.selectedScenario = '';
        this.currencies = [];
        this.selectedCurrency = '';
        this.fxRates = [];
        this.selectedFxRate = '';
        this.reportDate = '';
        this.ccrLabels = [];
        this.selectedCCRLabel = '';

        this.showValueDate = true;
        this.showScenario = false;
        this.showCurrency = false;
        this.showFxRates = false;
        this.showReportDate = false;
        this.showCCRLabel = false;

        this.includeIntragroupTrades = false;
        this.includeInternalTrades = false;
        this.includePNLCash = false;
        this.selectAll = false;
        this.sensitivitiesAll = false;
        this.booksAll = false;
        this.productsAll = false;
        this.sensitivities.forEach(s => s.selected = false);
        this.books.forEach(b => b.selected = false);
        this.products.forEach(p => { 
            p.selected = false;
            if (p.isGroup && p.items) {
                p.items.forEach(sub => sub.selected = false);
            }
        });

        //SERVICE!!-----------------------------------
        // const body = { purpose: purpose.purpose };
        // this._api.getValueDates(body).subscribe(response => { 
        //     this.valueDates = response.value_dates;
        // }, error => { 
        //     console.error('Error value dates:', error);
        // });
        //MOCK (Eliminar a futuro)
        if (purpose.purpose === 'Market Risk Stress') {
            this.valueDates = [
                { date: '2023-10-01' },
                { date: '2023-10-02' },
                { date: '2023-10-03' }
            ];
        } else if (purpose.purpose === 'CCR Stress') {
            this.valueDates = [
                { date: '2023-09-15' },
                { date: '2023-09-16' },
                { date: '2023-09-17' }
            ];
        }
        //SERVICE-END-----------------------------------
    }

    onValueDateChange(): void {
        if (this.selectedPurpose === 'Market Risk Stress') {
            //SERVICE!!-----------------------------------
            // const body = { purpose: this.selectedPurpose, value_date: this.selectedValueDate };
            // this._api.getScenarios(body).subscribe(response => { 
            //     this.scenarios = response.scenarios;
            // }, error => { 
            //     console.error('Error scenarios:', error);
            // });
            //MOCK (Eliminar a futuro)
            this.scenarios = [
                { scenario: 'MR Scenario 1' },
                { scenario: 'MR Scenario 2' },
                { scenario: 'MR Scenario 3' }
            ];
            this.showScenario = true;
        } else if (this.selectedPurpose === 'CCR Stress') {
            //SERVICE!!-----------------------------------
            // const body = { purpose: this.selectedPurpose, value_date: this.selectedValueDate };
            // this._api.getReportDateAndLabels(body).subscribe(response => { 
            //     this.ccrLabels = response.ccr_labels;
            //     this.reportDate = response.report_date;
            // }, error => { 
            //     console.error('Error report date and labels:', error);
            // });
            //MOCK (Eliminar a futuro)
            this.ccrLabels = [
                { label: 'CCR Label A' },
                { label: 'CCR Label B' },
                { label: 'CCR Label C' }
            ];
            this.reportDate = '2023-09-30';
            this.showReportDate = true;
            this.showCCRLabel = true;
        }
    }

    onScenarioChange(): void {
        //SERVICE!!-----------------------------------
        // const body = { purpose: this.selectedPurpose, 
        // value_date: this.selectedValueDate, 
        // reportDate: this.reportDate,
        // scenario: this.selectedScenario
        // ccrLabel: this.selectedCcrLabel
        // };
        // this._api.getCurrencies(body).subscribe(response => {
        //     this.currencies = response.currencies;
        //     this.showCurrency = true;
        // }, error => {
        //     console.error('Error currencies:', error);
        // });
        //MOCK (Eliminar a futuro)
        this.currencies = [
            { currency: 'USD' },
            { currency: 'EUR' },
            { currency: 'JPY' }
        ];
        this.showCurrency = true;
    }

    onCCRLabelChange(): void {
        //SERVICE!!-----------------------------------
        // const body = { purpose: this.selectedPurpose,
        // value_date: this.selectedValueDate,
        // reportDate: this.reportDate,
        // scenario: this.selectedScenario,
        // ccrLabel: this.selectedCcrLabel
        // };
        // this._api.getCurrencies(body).subscribe(response => {
        //     this.currencies = response.currencies;
        //     this.showCurrency = true;
        // }, error => {
        //     console.error('Error currencies:', error);
        // });
        //MOCK (Eliminar a futuro)
        this.currencies = [
            { currency: 'USD' },
            { currency: 'EUR' },
            { currency: 'JPY' }
        ];
        this.showCurrency = true;
    }

    onCurrencyChange(): void {
        //SERVICE!!-----------------------------------
        // const body = { purpose: this.selectedPurpose,
        // value_date: this.selectedValueDate,
        // reportDate: this.reportDate,
        // scenario: this.selectedScenario,
        // ccrLabel: this.selectedCcrLabel,
        // currency: this.selectedCurrency
        // };
        // this._api.getFxRates(body).subscribe(response => {
        //     this.fxRates = response.fx_rates;
        //     this.showFxRates = true;
        // }, error => {
        //     console.error('Error FX rates:', error);
        // });
        //MOCK (Eliminar a futuro)
        this.fxRates = [
            { rate: '1.0' },
            { rate: '0.85' },
            { rate: '110.0' }
        ];
        this.showFxRates = true;
    }

    onFxRateChange(): void {}

    launchProcess(): void { 
        const body = {
            purpose: this.selectedPurpose,
            valueDate: this.selectedValueDate,
            scenario: this.selectedScenario,
            currency: this.selectedCurrency,
            fxRate: this.selectedFxRate,
            reportDate: this.reportDate,
            ccrLabel: this.selectedCCRLabel,
            switches: this.getAllInputSwitchesValues()
        };
        console.log('Estado de todos los input switches:', body);
        //SERVICE!!-----------------------------------
        // this._api.launchProcess(body).subscribe(response => {
        //     console.log('Process launched successfully:', response);
        // }, error => {
        //     console.error('Error launching process:', error);
        // });
        //MOCK (Eliminar a futuro)
        console.log('Process launched successfully (mock)');
        //SERVICE-END-----------------------------------
    }

    // --- Selección masiva ---
    onSelectAllChange(event: any): void {
        this.selectAll = event.checked;
        this.sensitivitiesAll = this.selectAll;
        this.booksAll = this.selectAll;
        this.productsAll = this.selectAll;
        this.setAllSensitivities(this.selectAll);
        this.setAllBooks(this.selectAll);
        this.setAllProducts(this.selectAll);
    }

    onSensitivitiesAllChange(event: any): void {
        this.sensitivitiesAll = event.checked;
        this.setAllSensitivities(this.sensitivitiesAll);

        if(!this.sensitivitiesAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    setAllSensitivities(value: boolean): void {
        this.sensitivities.forEach(s => s.selected = value);
    }

    onBooksAllChange(event: any): void {
        this.booksAll = event.checked;
        this.setAllBooks(this.booksAll);

        if(!this.booksAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    setAllBooks(value: boolean): void {
        this.books.forEach(b => b.selected = value);
    }

    onProductsAllChange(event: any): void {
        this.productsAll = event.checked;
        this.setAllProducts(this.productsAll);
        if(!this.productsAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    setAllProducts(value: boolean): void {
        this.products.forEach(p => { 
            p.selected = value;
            if (p.isGroup && p.items) {
                p.items.forEach(sub => sub.selected = value);
            }
        });
    }

    onSensitivityChange(): void {
        this.sensitivitiesAll = this.sensitivities.every(s => s.selected);
        if(!this.sensitivitiesAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    onBookChange(): void {
        this.booksAll = this.books.every(b => b.selected);
        if(!this.booksAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    onProductChange(): void {
        this.products.forEach(p => { 
            if (p.isGroup && p.items) {
                p.items.forEach(sub => sub.selected = p.selected);
            }
          
        });
        this.productsAll = this.products.every(p => {
            if(p.isGroup && p.items) {
                return p.selected && p.items.every(sub => sub.selected);
            }
            return p.selected;
        });
   
        if(!this.productsAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    onSubProductChange(): void {
        this.products.forEach(p => {
            if(p.isGroup && p.items) {
                p.selected = p.items.every(sub => sub.selected);
            }
        });
        this.productsAll = this.products.every(p => {
            if(p.isGroup && p.items) {
               p.selected && p.items.every(sub => sub.selected);
            }
        });
        if(!this.productsAll) {
            this.selectAll = false;
        }
        if(this.sensitivitiesAll && this.booksAll && this.productsAll) {
            this.selectAll = true;
        }
    }

    getAllInputSwitchesValues(): any { 
        return {
            includeIntragroupTrades: this.includeIntragroupTrades,
            includeInternalTrades: this.includeInternalTrades,
            includePNLCash: this.includePNLCash,
            selectAll: this.selectAll,
            sensitivitiesAll: this.sensitivitiesAll,
            sensitivities: this.sensitivities.map(s => ({ name: s.name, selected: s.selected })),
            booksAll: this.booksAll,
            books: this.books.map(b => ({ name: b.name, selected: b.selected })),
            productsAll: this.productsAll,
            products: this.products.map(p => {
                if(p.isGroup && p.items) {
                    return { 
                        name: p.name, 
                        selected: p.selected,
                        items: p.items.map(sub => ({ name: sub.name, selected: sub.selected }))
                    };
                }   
                return { name: p.name, selected: p.selected };
            }),
            intermediateSwitches: {...this.intermediateSwitches}
        };
    }



}