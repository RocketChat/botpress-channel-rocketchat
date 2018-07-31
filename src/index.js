import _ from 'lodash'
import Promise from 'bluebird'
//import outgoing from './outgoing'
import actions from './actions'
import RocketChat from './rocketchat'
import UMM from './umm'

let rocketchat = null

const outgoingMiddleware = (event, next) => {
  if (event.platform !== 'rocketchat') {
    return next()
  }
  // if (!outgoing[event.type]) {
  //   return next('Unsupported event type: ' + event.type)
  // }
  //outgoing[event.type](event, next, rocketchat)
  rocketchat.sendText(event.raw.channelId, event.text, event.raw.options)
  return next()
}

module.exports = {
  config: {
  },

  init(bp) {
    bp.middlewares.register({
      name: 'rocketchat.sendMessages',
      type: 'outgoing',
      order: 100,
      handler: outgoingMiddleware,
      module: 'botpress-channel-rocketchat',
      description: 'Sends messages to Rocket.Chat'
  })

  bp.rocketchat = {}
  _.forIn(actions, (action, name) => {
    bp.rocketchat[name] = actions[name]
    let sendName = name.replace(/^create/, 'send')
    bp.rocketchat[sendName] = Promise.method(function() {
      var msg = action.apply(this, arguments)
      return bp.middlewares.sendOutgoing(msg)
    })
  })
  UMM(bp)
  },

  ready: async function(bp, configurator) {
    const config = await configurator.loadAll()

    rocketchat = new RocketChat(bp, config)

    await rocketchat.connect(bp)
    // simple message sent to test rocketchat connection
    //rocketchat.sendText('GENERAL', 'message sent from botpress.', {})
    await rocketchat.receiveText(bp)
    UMM(bp)
  }
}
