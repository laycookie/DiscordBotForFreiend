import { PrismaClient } from "@prisma/client";

/* The following script is here just for testing the database,
 * and adding some values if necessary.
 * DO NOT EXECUTE THIS SCRIPT IN PRODUCTION.
 */
function dbExecute() {
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

export { dbExecute };
