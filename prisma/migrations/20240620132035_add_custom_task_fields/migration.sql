-- CreateEnum
CREATE TYPE "TaskFieldType" AS ENUM ('NUMERIC', 'STRING', 'DROPDOWN');

-- CreateTable
CREATE TABLE "TaskField" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TaskFieldType" NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "TaskField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskFieldDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "taskFieldId" INTEGER NOT NULL,

    CONSTRAINT "TaskFieldDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskFieldNumericValue" (
    "taskFieldId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TaskFieldNumericValue_pkey" PRIMARY KEY ("taskFieldId","taskId")
);

-- CreateTable
CREATE TABLE "TaskFieldStringValue" (
    "taskFieldId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "TaskFieldStringValue_pkey" PRIMARY KEY ("taskFieldId","taskId")
);

-- CreateTable
CREATE TABLE "TaskFieldDropdownValue" (
    "taskFieldId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "dropdownOptionId" INTEGER NOT NULL,

    CONSTRAINT "TaskFieldDropdownValue_pkey" PRIMARY KEY ("taskFieldId","taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskField_projectId_title_type_key" ON "TaskField"("projectId", "title", "type");

-- CreateIndex
CREATE UNIQUE INDEX "TaskFieldDropdownOption_taskFieldId_value_key" ON "TaskFieldDropdownOption"("taskFieldId", "value");

-- AddForeignKey
ALTER TABLE "TaskField" ADD CONSTRAINT "TaskField_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldDropdownOption" ADD CONSTRAINT "TaskFieldDropdownOption_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldNumericValue" ADD CONSTRAINT "TaskFieldNumericValue_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldNumericValue" ADD CONSTRAINT "TaskFieldNumericValue_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldStringValue" ADD CONSTRAINT "TaskFieldStringValue_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldStringValue" ADD CONSTRAINT "TaskFieldStringValue_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldDropdownValue" ADD CONSTRAINT "TaskFieldDropdownValue_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldDropdownValue" ADD CONSTRAINT "TaskFieldDropdownValue_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldDropdownValue" ADD CONSTRAINT "TaskFieldDropdownValue_dropdownOptionId_fkey" FOREIGN KEY ("dropdownOptionId") REFERENCES "TaskFieldDropdownOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
