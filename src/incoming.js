module.exports = (bp, rocketchat) => {
  // const isButtonAction = payload => {
  //   return payload.message_ts ? true : false
  // }

  const isFromBot = event => {
    // TODO:
    // Identify bot messages
    // if (event.bot_id || event.subtype) {
    //   return true
    // }
    // if (event.user === slack.getBotId()) {
    //   return true
    // }
    return false
  }

  // TODO: Not sure with we need this preprocessEvent
  const preprocessEvent = payload => {
    let userId = payload.user

    // if (isButtonAction(payload)) {
    //   userId = payload.user.id
    // }

    // const mid = `${payload.channel}_${payload.user}_${payload.ts}`

    // if (mid && !messagesCache.has(mid)) {
    //   // We already processed this message
    //   payload.alreadyProcessed = true
    // } else {
    //   // Mark it as processed
    //   messagesCache.set(mid, true)
    // }

    //return users.getOrFetchUserProfile(userId)
    return true //payload.user.id
  }

  const isDirect = messageType => {
    if(messageType == 'd') return true; else return false;
  }
  const isLiveChat = messageType => {
    if (messageType == 'l') return true;
    else return false;
  }
  const isSystem = messageType => {
    if (messageType == 's') return true;
    else return false;
  }
  const isChannel = messageType => {
    if (messageType == 'c') return true;
    else return false;
  }
  const isPrivate = messageType => {
    if (messageType == 'p') return true;
    else return false;
  }
  const extractBasics = event => {
    //FIX THIS
    return {
      platform: 'rocketchat',
      channel: { id: event.channel },
      ts: event.ts,
      direct: isDirect(event.channel),
      raw: event
    }
  }

  const isBotMentioned = text => {
    // let match = []
    // while ((match = mentionRegex.exec(text))) {
    //   const mentionedId = match[1]
    //   if (mentionedId === slack.getBotId()) {
    //     return true
    //   }
    // }
    //TODO:
    // Verify if bot name is on message
    return false
  }

  // preprocessEvent(payload).then(user => {
  //   bp.middlewares.sendIncoming({
  //     platform: 'rocketchat',
  //     type: 'action',
  //     text: user.profile.real_name + action_text,
  //     user: user,
  //     channel: payload.channel,
  //     action: payload.actions[0],
  //     action_type: action_type,
  //     callback_id: payload.callback_id,
  //     ts: payload.message_ts,
  //     action_ts: payload.action_ts,
  //     direct: isDirect(payload.channel.id),
  //     raw: payload
  //   })
  // })

}
