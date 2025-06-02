import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  @Input() productId: number = 0;
  @Input() productName: string = '';
  @Input() productPrice: number = 0;

  constructor(private http: HttpClient) {
  }

  async buy(productId: number, productName: string, productPrice: number) {
    const stripe = await loadStripe('pk_test_51RVaADPaD58wH9BGjInz3iQEs1x0JP4VxxJgE14Rici6TbfKMq52ceKrFDZoyNiB5qnYtBUNOHO7waUHAr2axf6q00GHtF9O6i');
    const request = {
      productId: productId,
      productName: productName,
      productPrice: productPrice * 100
    }
    console.log(request);
    this.http.post<any>('http://localhost:8080/create-checkout-session', request).subscribe(res => {
      stripe?.redirectToCheckout({sessionId: res.id});
    });
  }
}
