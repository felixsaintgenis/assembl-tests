const signIn = require('../helpers').signin;

describe('Assembl signin', () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
  });

  test('I can sign in assembl', async () => {
    await signIn();
    const profileMenu = await page.$eval(
      '#user-dropdown',
      el => (el ? true : false)
    );
    await expect(profileMenu).toBe(true);
  });
});
