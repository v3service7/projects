import { NewdatingPage } from './app.po';

describe('newdating App', () => {
  let page: NewdatingPage;

  beforeEach(() => {
    page = new NewdatingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
