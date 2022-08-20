const sendEmail = require('../_helpers/email');

describe('mail.js', () => {
  test('Send valid email', async () => {
    const info = await sendEmail({
      from: process.env.EMAIL_FROM,
      to: 'platinum.test@yopmail.com',
      subject: 'Test Send Email CI/CD',
      html: `<div>
                <h1>Test Email</h1>
            </div>`
    })

    expect(info).not.toBe(null);
  }, 15000)
})