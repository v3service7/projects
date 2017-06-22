import { DerekFrontPage } from './app.po';

describe('derek-front App', function() {
  let page: DerekFrontPage;

  beforeEach(() => {
    page = new DerekFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
