import { PrismaClient } from "@prisma/client";

// This script verifyes that all servers are in the database.
// This script needs to run only once. when the bot is turned on.

function scanServersDB() {
    const prisma = new PrismaClient();

    async function main() {
        console.log("test");
    }

    main()
        .catch((e) => {
            console.log(e.message);
        })
        .finally(() => {
            prisma.$disconnect();
        });
}

export { scanServersDB };
