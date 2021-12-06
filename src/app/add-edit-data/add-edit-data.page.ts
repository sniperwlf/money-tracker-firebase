import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-edit-data',
  templateUrl: './add-edit-data.page.html',
  styleUrls: ['./add-edit-data.page.scss'],
})
export class AddEditDataPage implements OnInit {

  isEdit: boolean;
  type: string;
  title: string;
  subTitle: string;
  amount:  string;
  id: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
      this.route.params.subscribe((data: any) => {
        //console.log(data.type);
        this.id = data.type;
        // eslint-disable-next-line eqeqeq
        if(data.type == 'add'){
          this.isEdit = false;
        }  else {
            this.isEdit = true;
            // eslint-disable-next-line @typescript-eslint/no-shadow
            this.firebaseService.get_single_transaction(data.type).subscribe((data: any) => {
                console.log(data);
                this.type = data.type;
                this.title = data.title;
                this.subTitle = data.subTitle;
                this.amount = data.amount;
            // eslint-disable-next-line @typescript-eslint/semi
            })
        }
      // eslint-disable-next-line @typescript-eslint/semi
      })
  }

  ngOnInit() {
  }

  addTransaction() {
      this.loading = true;
      // eslint-disable-next-line prefer-const
      let data = {
        type: this.type,
        title: this.title,
        subTitle: this.subTitle,
        amount: this.amount,
      // eslint-disable-next-line @typescript-eslint/semi
      }
      this.firebaseService.add_transaction(data).then((res: any) => {
          console.log(res);
          this.loading = false;
      // eslint-disable-next-line @typescript-eslint/semi
          this.router.navigateByUrl('/home')
      // eslint-disable-next-line @typescript-eslint/semi
      })
  }

  updateTransaction(){
    // eslint-disable-next-line prefer-const
    let data = {
      type: this.type,
      title: this.title,
      subTitle: this.subTitle,
      amount: this.amount,
    // eslint-disable-next-line @typescript-eslint/semi
    }

      this.firebaseService.update_transaction(this.id,data).then((res: any) => {
          console.log(res);
          this.router.navigateByUrl('/home');
      // eslint-disable-next-line @typescript-eslint/semi
      })
  }

}
