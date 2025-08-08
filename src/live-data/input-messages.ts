// Enum used to describe the target of a ChangeCamera operation
export enum PlayerOfInterest {
    UNSPECIFIED = 0,

    // cycle through known Players in a team
    NEXT = 1,
    PREVIOUS = 2,

    // Go to an interesting player
    KILL_LEADER = 3,
    CLOSEST_ENEMY = 4,
    CLOSEST_PLAYER = 5,
    LATEST_ATTACKER = 6
}

// Request to change the observer camera
// If changing by a target's name, be aware that the 
//   - server may skip the request if the player is not actively in the game (i.e. waiting for reconnect, downed or killed)
//   - If the string is longer than 256 characters, the request will fail
export interface ChangeCamera {
    target: Target
}

// one of
export type Target = { poi: PlayerOfInterest } | { name: string } | { nucleusHash: string };

// Request message to toggle pause in a match type that supports it
// After submitting this request, listen for PauseStateChangeNotification messages for specific information from the server
export interface PauseToggle {
    preTimer: number;
}

// Request to create a custom match lobby
// deno-lint-ignore no-empty-interface
export interface CustomMatch_CreateLobby {
}

// Request to join an existing custom match lobby identified by the `roleToken`
export interface CustomMatch_JoinLobby {
    roleToken: string;
}

// Request to leave a custom match lobby
// deno-lint-ignore no-empty-interface
export interface CustomMatch_LeaveLobby {
}

// Request to programatically change your player's ready state in a custom match lobby
export interface CustomMatch_SetReady {
    isReady: boolean;
}

// Request to retrieve all connected players in a custom match lobby
// deno-lint-ignore no-empty-interface
export interface CustomMatch_GetLobbyPlayers {
}

// Request to change the state of matchmaking in a custom match lobby
// When enabled is True, the lobby will attempt to being a match
export interface CustomMatch_SetMatchmaking {
    enabled: boolean;
}

// Request to assign a particular player to a specific team
// Note that the `targetHardwareName` and `targetNucleusHash` can be obtained from a prior request to CustomMatch_GetLobbyPlayers
// If the parameters do not match any lobby player, the request is ignored
// The `teamId` is across the entire lobby. Meaning, observers have a teamId of 0 and match players will be teamId of 1 and upwards
export interface CustomMatch_SetTeam {
    teamId: number;
    targetHardwareName: string;
    targetNucleusHash: string;
}

// Request to remove a player from the currently connected custom match lobby
export interface CustomMatch_KickPlayer {
    targetHardwareName: string;
    targetNucleusHash: string;
}

// Request to alter the settings of a custom match lobby
// Your request should specify all fields being set with the new value
// For convinience, call `CustomMatch_GetSettings` to get the full state of settings
export interface CustomMatch_SetSettings {
    playlistName: string;
    adminChat: boolean;
    teamRename: boolean;
    selfAssign: boolean;
    aimAssist: boolean;
    anonMode: boolean;
}

// Review all the current settings. This request will be replied to with
// `CustomMatch_SetSettings` from which you can modify and reply with any new values for your convenience
// deno-lint-ignore no-empty-interface
export interface CustomMatch_GetSettings {
}

// Request to set the name of a team in custom match lobby
// Requires special access and is subject to text filtering
export interface CustomMatch_SetTeamName {
    teamId: number;
    teamName: string;
}

// Select a pre-determined spawn point in the map for the team.
// Requires special access. Set spawnPoint to -1 to unset.
export interface CustomMatch_SetSpawnPoint {
    teamId: number;
    spawnPoint: number;
}

// Enum used to segment the current map into main areas
export enum MapRegion {
    TOP_LEFT = 0,
    TOP_RIGHT = 1,
    BOTTOM_LEFT = 2,
    BOTTOM_RIGHT = 3,
    CENTER = 4,
    REGIONS_COUNT = 5
};

// Request to override ring end and exclude a particular area
// Requires special access. Set sectionToExclude to REGIONS_COUNT or higher to reset.
// It is recommended to reset exclusions after every match as they persist in the match settings
export interface CustomMatch_SetEndRingExclusion {
    sectionToExclude: MapRegion;
}

// Request to review the list of banned legends for this Custom Match.
// The response to this event is the message CustomMatch_LegendBanStatus
// deno-lint-ignore no-empty-interface
export interface CustomMatch_GetLegendBanStatus {
}

// Request to set the banned legends in this match. This should be a list of strings, and the list of all banned legends must be passed in each time in this request
// In other words, the list that this request contains will always replace the Custom Match setting. Banned legends will persist with the Custom Match lobby. 
// To reset the list of banned legends, send this request with an empty list
// To obtain valid values for this list, use the CustomMatch_GetLegendBanStatus. The field LegendMatchStatus.reference is what can be submitted in this API call
// Note that these strings are case-sensitive.
export interface CustomMatch_SetLegendBan {
    legendRefs: string[];
}

// Request to programatically send a chat message to the entire custom match lobby
export interface CustomMatch_SendChat {
    text: string;
}


// Envelope message for any Live API request
// This allows a single uniform data structure for requests to be made and for the game to receive them
// Specifically, there is only one possible action per request. You can request an acknowledgement of your request by setting `withAck` to true
// Acknowledgements will come in the form of a Response message. More information can be found with that event
//
// A single example to create a CustomMatch_JoinLobby request in python is as follows
// ```
// req = Request()
// req.customMatch_JoinLobby.roleToken = "<some token>"
// req.withAck = True
// ```
// For more information, consult the Protobuf documentation for your language of choice and look at details regarding the `oneof` field (https://protobuf.dev/programming-guides/proto3/#oneof)
export interface Request {
    // Receive an acknowledgement of the request having been received
    withAck: boolean;

    // Preshared key to use with the request. Only necessary if the connecting game has a preshared key specified through `cl_liveapi_requests_psk`
    preSharedKey?: string;

    actions: RequestActions;
}

export type RequestActions =
    { ChangeCamera: ChangeCamera; } |
    { PauseToggle: PauseToggle; } |
    { CustomMatch_CreateLobby: CustomMatch_CreateLobby; } |
    { CustomMatch_JoinLobby: CustomMatch_JoinLobby; } |
    { CustomMatch_LeaveLobby: CustomMatch_LeaveLobby; } |
    { CustomMatch_SetReady: CustomMatch_SetReady; } |
    { CustomMatch_SetMatchmaking: CustomMatch_SetMatchmaking; } |
    { CustomMatch_SetTeam: CustomMatch_SetTeam; } |
    { CustomMatch_KickPlayer: CustomMatch_KickPlayer; } |
    { CustomMatch_SetSettings: CustomMatch_SetSettings; } |
    { CustomMatch_SendChat: CustomMatch_SendChat; } |
    { CustomMatch_GetLobbyPlayers: CustomMatch_GetLobbyPlayers; } |
    { CustomMatch_SetTeamName: CustomMatch_SetTeamName; } |
    { CustomMatch_GetSettings: CustomMatch_GetSettings; } |
    { CustomMatch_SetSpawnPoint: CustomMatch_SetSpawnPoint; } |
    { CustomMatch_SetEndRingExclusion: CustomMatch_SetEndRingExclusion; } |
    { CustomMatch_GetLegendBanStatus: CustomMatch_GetLegendBanStatus; } |
    { CustomMatch_SetLegendBan: CustomMatch_SetLegendBan; };