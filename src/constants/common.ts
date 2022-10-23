export enum EStatusState {
  Idle = 1,
  Loading,
  Success,
  Failed,
}
export enum ETypeState {
  Create = 1,
  Get,
  Update,
  Delete,
}
export enum ETypePlaylistState {
  Create = 1,
  Get,
  Update,
  Delete,
  UpdateName,
  UpdateIsPublic,
  RemoteSongFromPlaylist,
  InsertSongToPlaylist,
  UpdateSongInPlaylist,
}
