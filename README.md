# botpress-channel-rocketchat

Botpress module channel for Rocket.Chat

## Development

To test this module follow this steps:

1. Install the dependencies by running `npm install`
2. Compile the module using `npm run compile`
3. Link the module to ease development and testing using `npm link`
4. Install the module in your testing bot using `npm install --save path/to/the/module`
5. Create you bot in another directory `cd .. && mkdir bot && botpress init`
6. Install the bot dependencies `npm install`
7. Link the module using `npm link MODULE-NAME`
8. Run the bot `botpress start`
