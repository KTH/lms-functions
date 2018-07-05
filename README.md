# lms-functions

Azure Functions examples.

## Run in local

1. **Download the software**

   Install the [Azure Functions Core Tools 2.x](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2) (version 2 is in Preview stage –i.e. not for production– but version 1 is only supported in Windows :disappointed: :disappointed:)

2. **Settings**

   Create a `local.settings.json` file based on `local.settings.json.in` template. You will need from the Azure Portal:

   - The connection string **without** the "EntityPath" part. Something like `Endpoint=sb://...servicebus.windows.net/;SharedAccessKeyName=...;SharedAccessKey=...`~~`;EntityPath=...`~~
   - The name of the topic.
   - The name of the topic subscription.

3. **Install dependencies and run**.

   ```
   npm install
   func host start
   ```
