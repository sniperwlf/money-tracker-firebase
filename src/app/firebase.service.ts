import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    collectionName = 'money-tracking';

  constructor(
      private firestore: AngularFirestore
  ) { }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  get_transactions(){
      return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  add_transaction(data){
      return this.firestore.collection(this.collectionName).add(data);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  delete_transaction(id){
      return this.firestore.doc(this.collectionName + '/' + id).delete();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  get_single_transaction(id){
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  update_transaction(id,data){
      return this.firestore.doc(this.collectionName + '/' + id).update(data);
  }
}
