import nodemailer from 'nodemailer';

import { EMAIL_PASS } from './env.js'

export const accountEmail = 'javascriptmastery00@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyansharora35@gmail.com',
    pass: EMAIL_PASS
  }
})

export default transporter;