# line-web-value-noti

### install dependencies
```
npm install
```

### .env template
```
LINE_CHANNEL_ID=<YOUR_CHANNEL_ID>
LINE_CHANNEL_SECRET=<YOUR_CHANNEL_SECRET>
LINE_CHANNEL_ACCESS_TOKEN=<YOUR_CHANNEL_ACCESS_TOKEN>
LINE_USER_ID=<YOUR_LINE_USER_ID>
```

### settings file template
```
module.exports = {
    WAIT_DELAY: <DELAY_IN_MS>,
    NOTIFY_DELAY: <DELAY_IN_MS>,
    LOOP_DELAY: <DELAY_IN_MS>,
    
    TARGETS: [
        {
            LABEL: <str>,
            URL: <str>,
            SELECTOR: <str>,
            PARSER: <(str) => any>,
            TRIGGER: <(str) => bool>,
            FORMATTER: <(str, any) => str>
        }

        //...
    ]
}
```

### run command
```
node main.js exampleSettings.js
```
