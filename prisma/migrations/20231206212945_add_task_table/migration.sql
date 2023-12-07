-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TO_DO', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'TO_DO',
    "due_date" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
