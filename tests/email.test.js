const sendEmail = require('../_helpers/email');

describe('mail.js', () => {
  test('Send valid email', async () => {
    const info = await sendEmail({
      from: 'testting.sendemail@domain.com',
      to: 'platinum.test@yopmail.com',
      subject: 'Test Send Email CI/CD',
      html: `<div>
                <h1>Test Email CI/CD</h1>
            </div>`
    })

    expect(info).not.toBe(null);
  }, 15000)
})