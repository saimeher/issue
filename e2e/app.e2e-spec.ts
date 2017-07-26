import { IssueRegisterPage } from './app.po';

describe('issue-register App', () => {
  let page: IssueRegisterPage;

  beforeEach(() => {
    page = new IssueRegisterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
