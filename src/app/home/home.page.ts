import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    moneyTransactions: any;
  constructor(
    public firebaseService:   FirebaseService
  ) {
      this.firebaseService.get_transactions().subscribe((res: any) => {
          this.moneyTransactions =  res.map(e => ({
                  id:   e.payload.doc.id,
                  type:   e.payload.doc.data().type,
                  title:   e.payload.doc.data().title,
                  subTitle:   e.payload.doc.data().subTitle,
                  amount: e.payload.doc.data().amount,
              }));
      }, (err: any) => {
          console.log(err);
      });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  delete_transaction(transactionId){
    this.firebaseService.delete_transaction(transactionId).then((res: any) =>{
      // eslint-disable-next-line @typescript-eslint/semi
      console.log(res)
    // eslint-disable-next-line @typescript-eslint/semi
    })
  }
}
