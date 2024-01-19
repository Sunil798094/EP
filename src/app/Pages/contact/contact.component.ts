import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_2wt7hbz', 'template_bbxm8o6', e.target as HTMLFormElement, `ThnW_h9vDpoFmWWvP`)
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert("Email Sent");
      }, (error) => {
        console.log(error.text);
      });
  }

}
