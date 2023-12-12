# LMS-Functions

Various serverless functions connecting KTH Canvas instances to the LADOK LIS Adapter message stream.

Messages sent on the stream are documented in the private docs:
https://confluence.its.umu.se/confluence/display/IOR/Ladok-LIS+adapter

## Configuring the Service Bus Subscription

Copy `local.setting.json.in` to `local.settings.json` and edit it.

When editing the following key/value of local.settings.json:

```
"SERVICE_BUS_SUBSCRIPTION_NAME": "[subscription name. e.g. lms-carlos]",
"SERVICE_BUS_CONNECTION_STRING": "[connection string]",
```

Obtain the connection string from Azure Portal. Don't inclue `EntityPath=...`
https://stackoverflow.com/questions/55899118/how-to-send-a-message-to-azure-service-bus-event-to-event-hub-bus-from-single

## About Azure Function Development

### Install Azure Functions for Local Development

Install the Azure Functions Core Tools:
https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local

NOTE: Make sure you have Node >=16

### Create an Azure Function Project

**Using VS Code** (You need to install the Azure Functions extension):
https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript

To start application and allow debugging in VS Code go to debug pane and select:

- "Node.js" > "Run Script: start"

NOTE: If you use `nvm` and the default Node version on your system isn't >=14 this will fail.
Make sure you select Node 14 or higher as your default before launching VS Code.

**Using CLI**:
https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript

### Local Development

Azure Function Developer Guide
https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference?tabs=blob

Trigger non-HTTP functions during development
https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cmacos%2Ccsharp%2Cportal%2Cbash#non-http-triggered-functions

.
