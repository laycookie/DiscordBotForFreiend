import { PrismaClient } from "@prisma/client";

// This script is made to add a server to the database.

function addServerToDB(serverId: string) {
    const prisma = new PrismaClient();

    async function main() {
        console.log(serverId);
    }

    main()
        .catch((e) => {
            console.log(e.message);
        })
        .finally(() => {
            prisma.$disconnect();
        });
}

export { addServerToDB };
