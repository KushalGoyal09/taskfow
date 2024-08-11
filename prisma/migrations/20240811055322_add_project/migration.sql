-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('Individual', 'Team');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "projectId" INTEGER;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "type" "ProjectType" NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
