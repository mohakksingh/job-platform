-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "other_profile_details" TEXT,

    CONSTRAINT "CandidateProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewerProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "other_profile_details" TEXT,

    CONSTRAINT "InterviewerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "interviewer_id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "schedule_datetime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "feedback_id" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "posted_datetime" TIMESTAMP(3),

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "posted_datetime" TIMESTAMP(3),

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "interviewer_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER,
    "submitted_datetime" TIMESTAMP(3),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateProfile_user_id_key" ON "CandidateProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewerProfile_user_id_key" ON "InterviewerProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_candidate_id_key" ON "Interview"("candidate_id");

-- AddForeignKey
ALTER TABLE "CandidateProfile" ADD CONSTRAINT "CandidateProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewerProfile" ADD CONSTRAINT "InterviewerProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "InterviewerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "InterviewerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "InterviewerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
