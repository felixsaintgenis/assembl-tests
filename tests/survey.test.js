const signIn = require('../helpers').signin;
const data = require('../data');
const { users, url } = data;
const { participant } = users;

describe('Survey actions', () => {
  const surveyDebate = `${url}/e2e-tests-survey`;
  beforeAll(async () => {
    jest.setTimeout(20000);
    await signIn(surveyDebate, participant.email, participant.password);
    await page.goto(`${surveyDebate}/debate/survey/theme/VGhlbWF0aWM6Mzk5OQ==`);
  });
  const randomId = Math.random() * 10000;
  test('I can answer to the first question of a thematic', async () => {
    const firstQuestionInput = '.questions-section .public-DraftEditor-content';
    const answerText = `Parceque c'est ainsi, tout simplement. #${randomId}`;
    const submitButton = '.button-submit';
    const answerBody = '.post-body-content > div > div > p';
    await page.waitForSelector('.dark-title-5');
    await page.waitForSelector(firstQuestionInput);
    await page.click(firstQuestionInput);
    await page.type(firstQuestionInput, answerText);
    await page.waitFor(submitButton);
    await page.click(submitButton);
    await page.waitForSelector('.showAlert');
    await page.waitFor(1500); // replace by a better waiter
    await expect(page).toMatch(answerText);
  });
});
