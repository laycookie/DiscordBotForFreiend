# Discord bot

This is a simple discord bot with the following functionalities:

-   Ping a user with a reaction.
-   Gives users roles. (Work in progress)

#### Basic file structure overview

deploy-commands.ts - Manages if commands should be created, deleted, if it should happen for public command or guild commands e.t.c. also passes basic command info from `commandInits.ts` to `index.ts`.
commandsInit.ts - Preapers the commands to be deployed and saves basic info about it so the command could be executed later on.

commands folder stores all of the commands code, each file in there is requred to export `{ name, description, permissions, execute }`. and optionaly `initOptions`.

-   name - name of the command
-   description - description of the command
-   permissions - permissions required to execute the command
-   execute - function that executes the command
-   initOptions - made to add options for the command the following function will run when the command is deployed.
