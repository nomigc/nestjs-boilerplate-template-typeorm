import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly appConfigService: AppConfigService) {}
  private transporter = nodemailer.createTransport({
    host: this.appConfigService.mailHost,
    port: this.appConfigService.mailPort,
    service: this.appConfigService.mailService,
    secure: true,
    auth: {
      user: this.appConfigService.mailUser,
      pass: this.appConfigService.mailPassword,
    },
  });

  async sendOtp(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `${this.appConfigService.mailUser}`,
      to,
      subject: 'You request for otp.',
      text: `Your OTP is here.`,
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  }
}
