-- CreateTable
CREATE TABLE "ServerSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serverId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CommandSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serverSettingId" INTEGER NOT NULL,
    CONSTRAINT "CommandSettings_serverSettingId_fkey" FOREIGN KEY ("serverSettingId") REFERENCES "ServerSetting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GetRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commandSettingsId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "GetRole_commandSettingsId_fkey" FOREIGN KEY ("commandSettingsId") REFERENCES "CommandSettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoleToChoose" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "getRoleId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "RoleToChoose_getRoleId_fkey" FOREIGN KEY ("getRoleId") REFERENCES "GetRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerSetting_serverId_key" ON "ServerSetting"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "CommandSettings_serverSettingId_key" ON "CommandSettings"("serverSettingId");

-- CreateIndex
CREATE UNIQUE INDEX "GetRole_commandSettingsId_key" ON "GetRole"("commandSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleToChoose_getRoleId_key" ON "RoleToChoose"("getRoleId");
