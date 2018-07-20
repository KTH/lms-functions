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

## Create and run it in Azure Portal
1)Create functions app for async/await Nodejs 8.9.4. Use right azure prenumeration för be able to reach queue you need.
Go to "Programinställningar" and change these parameters to:
FUNCTIONS_EXTENSION_VERSION: ~2
WEBSITE_NODE_DEFAULT_VERSION: 8.9.4

2) Create function using ServiceBus topic trigger for 'input' data.
Because FUNCTIONS_EXTENSION_VERSION: ~2 is a beta version, a developer should install the addition
F.e., Microsoft.Azure.WebJobs.ServiceBus

3) New message in Service Bus is locked for period of time.
After n times it goes to poison queue.
Function tries to execute message from poison queue n times more.
Then if no, it ends up in Deadletter queue.

https://www.feval.ca/posts/function-queue-retry/
https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue#trigger---message-metadata

Trigger - poison messages
When a queue trigger function fails, Azure Functions retries the function up to five/n times for a given queue message, including the first try. If all five attempts fail, the functions runtime adds a message to a queue named <originalqueuename>-poison. You can write a function to process messages from the poison queue by logging them or sending a notification that manual attention is needed.

To handle poison messages manually, check the dequeueCount of the queue message.
