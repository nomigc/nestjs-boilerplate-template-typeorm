import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
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

  private compileTemplate(
    templateName: string,
    context?: Record<string, any>,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'mail',
      'templates',
      `${templateName}.html`,
    );
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const compiled = handlebars.compile(templateContent);
    return compiled(context);
  }

  async sendMail(
    mailto: string,
    subject: string,
    templateName: string,
    variables?: Record<string, any>,
  ): Promise<void> {
    let html = this.compileTemplate(templateName, variables);

    const mailOptions = {
      from: `${this.appConfigService.mailUser}`,
      to: mailto,
      subject,
      html,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Mail sent: %s', info.messageId);
  }
}
