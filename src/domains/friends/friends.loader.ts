// import * as DataLoader from 'dataloader';
// import { Friend } from './friends.entity';
// import { FriendService } from './friends.service';

// export function createFriendsLoader(friendService: FriendService) {
//   console.log("calling loader")
//   return new DataLoader<number, Friend>(async (studentIds) => {
    
    
//     const friends = await friendService.getAllFriendsByStudentIds(studentIds);

//     const mappedResults = _mapResultToIds(studentIds, friends);
//     return mappedResults;
//   });
// }

// function _mapResultToIds(studentIds: readonly number[], friends: Friend[]) {
//   return studentIds.map(
//     (id) =>
//       friends.find((friend: Friend) => friend.studentId === id) ||
//       new Error(`Could not load friend ${id}`),
//   );
// }
export{}