import { PrismaClient } from "@prisma/client";

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
