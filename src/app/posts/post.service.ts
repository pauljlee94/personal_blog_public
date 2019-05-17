import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore'
import {Post} from './post'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref => 
      ref.orderBy('published', 'desc'))
  } 
  getPosts() {
    return this.postsCollection.snapshotChanges()
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges()
  }

  create(data: Post) {
    this.postsCollection.add(data)
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`)
  }

  delete(id: string) {
    return this.getPost(id).delete()
  }

  update(id: string, formData) {
    return this.getPost(id).update(formData)
  }
}
