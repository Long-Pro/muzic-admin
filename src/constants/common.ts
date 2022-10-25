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
  ToggleIsDelete,
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
export enum TypeToggleIsDeleteModal {
  Delete = 1,
  Active,
}
