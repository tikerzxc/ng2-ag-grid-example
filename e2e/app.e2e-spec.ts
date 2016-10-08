import { Ng2AgGridExamplePage } from './app.po';

describe('ng2-ag-grid-example App', function() {
  let page: Ng2AgGridExamplePage;

  beforeEach(() => {
    page = new Ng2AgGridExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
