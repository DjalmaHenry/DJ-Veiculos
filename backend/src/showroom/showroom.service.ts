import { Injectable } from '@nestjs/common';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';
import * as firebase from 'firebase-admin';

@Injectable()
export class ShowroomService {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('showroom');

  create(createShowroomDto: CreateShowroomDto) {
    return this._collectionRef.add(createShowroomDto);
  }

  findAll() {
    return `This action returns all showroom`;
  }

  findOne(id: string) {
    return this._collectionRef.doc(id).get();
    // return `This action returns a #${id} showroom`;
  }

  update(id: number, updateShowroomDto: UpdateShowroomDto) {
    return `This action updates a #${id} showroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} showroom`;
  }
}
