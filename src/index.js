import _ from 'lodash'
import Promise from 'bluebird'
import actions from './actions'
import outgoing from './outgoing'
import RocketChat from './rocketchat'
import UMM from './umm'

var rocketchat = null

const outgoingMiddleware = async (event, next) => {
  if (event.platform !== 'rocketchat') {
    return next()
  }

  if (!outgoing[event.type]) {
    return next('Unsupported event type: ' + event.type)
  }
  await outgoing[event.type](event, next, rocketchat)
}

module.exports = {
  config: {
    username: { type: 'string', default: '', env: 'ROCKETCHAT_USERNAME' },
    password: { type: 'string', default: '', env: 'ROCKETCHAT_PASSWORD' },
    hostname: { type: 'string', default: '', env: 'ROCKETCHAT_HOST' },
    useSSL: { type: 'string', default: '', env: 'ROCKETCHAT_USESSL' },
    subscribeTo: { type: 'string', default: '', env: 'ROCKETCHAT_SUBSCRIBETO' },
    scope: {
      type: 'string',
      default: 'admin,bot,chat:write:bot,commands,identify,incoming-webhook,channels:read',
      env: 'ROCKETCHAT_SCOPE'
    }
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
      bp.rocketchat[sendName] = Promise.method(function () {
        var msg = action.apply(this, arguments)
        return bp.middlewares.sendOutgoing(msg)
      })
    })
    UMM(bp)
  },

  ready: async function (bp, configurator) {
    const config = await configurator.loadAll()

    rocketchat = new RocketChat(bp, config)
    const setConfigAndRestart = async newConfigs => {
      await configurator.saveAll(newConfigs)
      await rocketchat.setConfig(newConfigs)
      await rocketchat.connect(bp)
    }
    const conn = await rocketchat.connect(bp)
    return rocketchat.listen(bp)
  }
}
