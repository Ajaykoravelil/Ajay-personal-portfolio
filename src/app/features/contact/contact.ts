import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  isSubmitting = false;
  isSuccess = false;
  isError = false;
  isIncomplete = false;
  showPopup = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      this.isIncomplete = true;
      this.isSuccess = false;
      this.isError = false;
      this.showPopup = true;
      form.reportValidity(); // Optional: show native tooltips too
      return;
    }

    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;
    this.isIncomplete = false;
    this.showPopup = false;

    const formData = new FormData(form);
    const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeGzTMDHFfEvCqwPuGKHWcwt_pFzqTR2mlgRanqaoY4B3uyyQ/formResponse';

    try {
      await fetch(googleFormUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      this.isSuccess = true;
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      this.isError = true;
    } finally {
      this.isSubmitting = false;
      this.showPopup = true;

      // Auto close popup after 5 seconds
      setTimeout(() => {
        this.closePopup();
      }, 5000);
    }
  }

  closePopup() {
    this.showPopup = false;
    this.isIncomplete = false;
  }
}



