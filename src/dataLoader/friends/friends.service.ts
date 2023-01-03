import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Friend } from './friends.entity';

@Injectable()
export class FriendService {
  //constructor(private readonly friendRepository: FriendRepository) {}

  //   public async getStudentFriends(studentId: number): Promise<Friend[]> {
  //     return await this.friendRepository.getStudentFriends(studentId);
  //   }

  constructor(@InjectModel(Friend.name) private friendsModel: Model<Friend>) {}

  public async getStudentFriends(studentId: number): Promise<Friend[]> {
    return await this.friendsModel.find({
      studentId: studentId,
    });
  }

  public async getAllFriendsByStudentIds(
    studentIds: readonly ObjectId[],
  ): Promise<Friend[]> {
    console.log("calling db")
    const classIds = studentIds.map((studentId) => studentId.toString());
    return this.friendsModel.find({ studentId: { $in: classIds } });
  }

  public async getStudentsFriendsByBatch(
    studentIds: readonly ObjectId[],
  ): Promise<(Friend | any)[]> {
    console.log("calling friends", studentIds)
    const friends = await this.getAllFriendsByStudentIds(studentIds);

    console.log(" friends", friends)
    const mappedResults = this._mapResultToIds(studentIds, friends);
    console.log(" mappedResults", mappedResults)
    return mappedResults;
  }

  private _mapResultToIds(studentIds: readonly ObjectId[], friends: Friend[]) {
    return studentIds.map(
      (id) =>
        friends.filter((friend: Friend) => friend.studentId === id.toString()) || null,
    );
  }
}
