/*
  Warnings:

  - You are about to drop the column `other_profile_details` on the `CandidateProfile` table. All the data in the column will be lost.
  - Added the required column `resume` to the `CandidateProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateProfile" DROP COLUMN "other_profile_details",
ADD COLUMN     "resume" TEXT NOT NULL;
