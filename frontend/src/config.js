const config = {
  appName: process.env.REACT_APP_NAME,
  apiUrl: process.env.REACT_APP_API_URL,
  version: process.env.REACT_APP_VERSION,
  roomStart: parseInt(process.env.REACT_APP_ROOM_START, 10),
  roomEnd: parseInt(process.env.REACT_APP_ROOM_END, 10),
  maintenanceRooms: process.env.REACT_APP_MAINTANENCE_ROOMS
    ? process.env.REACT_APP_MAINTANENCE_ROOMS.split(",").map(r => parseInt(r.trim(), 10))
    : []
};

export default config;
