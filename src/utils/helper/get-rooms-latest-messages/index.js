function getRoomsLatestMessages(roomsMessage) {
  const roomsLastMessage = []

  roomsMessage.forEach((singleRoomMessage) => {
    // check if there is message same as "singleRoomMessage" id in "roomsLastMessage"
    const currentItemIndex = roomsLastMessage.findIndex(
      (singleLastMessage) =>
        singleRoomMessage.roomId.toString() === singleLastMessage.roomId.toString()
    )

    // check result if there is message
    if (currentItemIndex !== -1) {
      // there is message in "roomsLastMessage" check if this "singleRoomMessage" is latest than which is saved in "roomsLastMessage"
      if (roomsLastMessage[currentItemIndex].createdAt < singleRoomMessage.createdAt) {
        // this is latest message => replace this with previous one
        roomsLastMessage[currentItemIndex] = singleRoomMessage
      }
    } else {
      // there is no any message => add this message to "roomsLastMessage"
      roomsLastMessage.push(singleRoomMessage)
    }
  })

  return roomsLastMessage
}

module.exports = { getRoomsLatestMessages }
