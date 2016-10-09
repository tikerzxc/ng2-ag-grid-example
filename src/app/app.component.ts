import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import RefData from './refData';
import SkillFilter from './skillFilter';
import ProficiencyFilter from './proficiencyFilter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng2 ag-grid example';
  showToolPanel = false;
  private gridOptions: GridOptions;
  private rowData: any[];
  private columnDefs: any[];

  constructor() {
    this.gridOptions = {};
    this.createRowData();
    this.createColumnDefs();
  }

  private createRowData() {
    let rowData: any[] = [];

    for (let i = 0; i < 10000; i++) {
      let countryData = RefData.countries[i % RefData.countries.length];
      rowData.push({
        name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
        skills: {
          android: Math.random() < 0.4,
          html5: Math.random() < 0.4,
          mac: Math.random() < 0.4,
          windows: Math.random() < 0.4,
          css: Math.random() < 0.4
        },
        address: RefData.addresses[i % RefData.addresses.length],
        years: Math.round(Math.random() * 100),
        proficiency: Math.round(Math.random() * 100),
        country: countryData.country,
        continent: countryData.continent,
        language: countryData.language,
        mobile: this.createRandomPhoneNumber(),
        landline: this.createRandomPhoneNumber()
      });
    }
    this.rowData = rowData;
  }

  private createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
      result += Math.round(Math.random() * 10);
      if (i === 2 || i === 5 || i === 8) {
        result += ' ';
      }
    }
    return result;
  }

  countryCellRenderer(params) {
    const flag = '<img border="0" width="15" height="10" style="margin-bottom: 2px" src="assets/images/flags/'
      + RefData.COUNTRY_CODES[params.value] + '.png">';
    return flag + ' ' + params.value;
  }

  skillsCellRenderer(params) {
    const data = params.data;
    const skills = [];
    RefData.IT_SKILLS.forEach(function (skill) {
      if (data && data.skills && data.skills[skill]) {
        skills.push('<img src="assets/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
      }
    });
    return skills.join(' ');
  }

  percentCellRenderer(params) {
    const value = params.value;
    const eDivPercentBar = document.createElement('div');

    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
      eDivPercentBar.style.backgroundColor = 'red';
    } else if (value < 60) {
      eDivPercentBar.style.backgroundColor = '#ff9900';
    } else {
      eDivPercentBar.style.backgroundColor = '#00A000';
    }

    const eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';

    const eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);

    return eOuterDiv;
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true
      },
      {
        headerName: 'Employee',
        children: [
          {
            headerName: 'Name', field: 'name',
            width: 150, pinned: true
          },
          {
            headerName: 'Country', field: 'country', width: 150,
            cellRenderer: this.countryCellRenderer, pinned: true,
            filterParams: { cellRenderer: this.countryCellRenderer, cellHeight: 20 }
          },
        ]
      },
      {
        headerName: 'IT Skills',
        children: [
          {
            headerName: 'Skills',
            width: 125,
            suppressSorting: true,
            cellRenderer: this.skillsCellRenderer,
            filter: SkillFilter
          },
          {
            headerName: 'Proficiency',
            field: 'proficiency',
            width: 120,
            cellRenderer: this.percentCellRenderer,
            filter: ProficiencyFilter
          },
        ]
      },
      {
        headerName: 'Contact',
        children: [
          { headerName: 'Mobile', field: 'mobile', width: 150, filter: 'text' },
          { headerName: 'Land-line', field: 'landline', width: 150, filter: 'text' },
          { headerName: 'Address', field: 'address', width: 500, filter: 'text' }
        ]
      }
    ];
  }

  onModelUpdated() {
    console.log('onModelUpdated');
    // this.calculateRowCount();
  }

  onCellClicked($event) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }
}
