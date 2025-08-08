# Apex Legends Live Data API

A TypeScript library that provides type-safe message creation for the Apex Legends Live Data API. Simplifies building requests for observer camera control, custom match management, and lobby operations. 

The Apex Legends api changes every so often so this may go out of date fairly quickly. 

## Installation

```bash
npm install apexlivedatajson
```

## Usage

Import the `ApexMessage` factory and create type-safe API messages:

```typescript
import { ApexMessage } from 'apexlivedatajson';

// Change observer camera to a specific player
const cameraMessage = ApexMessage.createMessage('changeCamera', {
  target: { name: 'PlayerName' }
});

// Join a custom match lobby
const joinMessage = ApexMessage.createMessage('customMatchJoinLobby', {
  roleToken: 'your-role-token'
});

// Toggle pause in a match
const pauseMessage = ApexMessage.createMessage('pauseToggle', {
  preTimer: 5
}, false); // withAck set to false
```

### Available Actions

- **Camera Control**: `changeCamera` - Switch observer camera to different players
- **Match Control**: `pauseToggle` - Pause/unpause supported match types
- **Custom Match**: Create, join, and manage custom match lobbies
- **Team Management**: Set teams, spawn points, and match settings
- **Chat**: Send messages to custom match lobbies

All methods provide full TypeScript intellisense and type checking for request parameters.
