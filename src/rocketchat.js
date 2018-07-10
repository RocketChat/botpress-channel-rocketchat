const { driver } = require('@rocket.chat/sdk');
import Promise from 'bluebird'
import _ from 'lodash'

class RocketChat {
  constructor(bp, config) {

    if (!bp || !config) {
      throw new Error('You need to specify botpress and config')
    }

    this.config = config
    this.connected = false
  }

  sendText(channelId, text, options) {

    return Promise.fromCallback(cb => {
      // simple messages sent to test RocketChat connection
      driver.sendToRoomId('BOTPRESSSS!', 'GENERAL', {})
      driver.sendToRoomId(text, channelId, {})
    })
  }

  isConnected() {
    return this.connected
  }

  getData() {
    return this.data
  }

  async connect(bp) {
    try {
      // make the connection with RocketChat
      await driver.connect({ host: 'localhost:3002', useSsl: false})
      await driver.login({ username: 'botpress', password: 'botpress'})
      await driver.joinRooms(['GENERAL'])
      await driver.subscribeToMessages()
    } catch (error) {
      console.log(error)
    }
  }

  async disconnect() {
    await driver.disconnect()
  }
}

module.exports = RocketChat
