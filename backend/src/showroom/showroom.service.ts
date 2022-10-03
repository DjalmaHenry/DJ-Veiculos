import { Injectable } from '@nestjs/common';
import { ShowroomDto } from './dto/showroom.dto';
import * as firebase from 'firebase-admin';
import { DocumentSnapshot } from '@google-cloud/firestore';

@Injectable()
export class ShowroomService {
  private get _collectionRef(): firebase.firestore.CollectionReference<ShowroomDto> {
    return firebase
      .firestore()
      .collection(
        'showroom',
      ) as firebase.firestore.CollectionReference<ShowroomDto>;
  }

  public async create(createShowroomDto: ShowroomDto): Promise<string> {
    return (await this._collectionRef.add(createShowroomDto)).id;
  }

  public async findAll(): Promise<ShowroomDto[]> {
    const data = await this._collectionRef.get();

    return data.docs.map((doc) => this.convert(doc.id, doc));
  }

  public async findOne(id: string): Promise<ShowroomDto | null> {
    const data = await this._collectionRef.doc(id).get();

    return data ? this.convert(id, data) : null;
  }

  public async update(
    id: string,
    updateShowroomDto: ShowroomDto,
  ): Promise<boolean> {
    const data = await this._collectionRef.doc(id).get();

    if (!data) {
      return null;
    }

    await this._collectionRef.doc(id).update(updateShowroomDto);

    return true;
  }

  public async remove(id: string): Promise<boolean> {
    const data = await this._collectionRef.doc(id).get();

    if (!data) {
      return null;
    }

    await this._collectionRef.doc(id).delete();

    return true;
  }

  private convert(
    uid: string,
    data: DocumentSnapshot<ShowroomDto>,
  ): ShowroomDto {
    const showroom = data.data() as ShowroomDto;
    return {
      id: uid,
      ...showroom,
    } as ShowroomDto;
  }
}
