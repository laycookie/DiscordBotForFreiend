# Discord bot

### Basic info

This is a simple discord bot with the following functionalities:

-   Ping a user with a reaction.
-   Gives users roles. (Work in progress)

### Basic file structure overview

deploy-commands.ts - Manages if commands should be created, deleted, if it should happen for public command or guild commands e.t.c. also passes basic command info from `commandInits.ts` to `index.ts`.
commandsInit.ts - Preapers the commands to be deployed and saves basic info about it so the command could be executed later on.

commands folder stores all of the commands code, each file in there is requred to export `{ name, description, permissions, execute }`. and optionaly `initOptions`.

-   name - name of the command
-   description - description of the command
-   permissions - permissions required to execute the command
-   execute - function that executes the command
-   initOptions - made to add options for the command the following function will run when the command is deployed.

### How to run

First in order to run your bot you need to make sure that you have node.js v16.X installed.

Then you need to create a file called `.env` in the root of the project and add the following varibles to it:

```env
TOKEN=
clientId=
guildId=

# Example of what I use DATABASE_URL="file:./db/dev.db"
DATABASE_URL=

# only true or false
buildCommands=
removeCommands=
buildCommandsPublic=
removeCommandsPublic=
```

You can also view those varibles in the `.env.example` file.

After all the dependencies are installed and `.env` file is seted up you can generate a database by running `npx prisma migrate dev --name init` at the root folder of the project.

Now just run `npm run dev` and the bot should be up and running.

#### Note to add properly later

If you have a button, selectmenu or e.t.c you need to make sure that you `.setCustomId()` to the name of the event file.
