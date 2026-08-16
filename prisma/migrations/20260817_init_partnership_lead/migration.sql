-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "lp-partnership_leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "commitment" TEXT NOT NULL,
    "idea_name" TEXT NOT NULL,
    "target_user" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "mvp_features" TEXT NOT NULL,
    "acquisition" TEXT NOT NULL,
    "validation" TEXT NOT NULL,
    "profit_share" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lp-partnership_leads_pkey" PRIMARY KEY ("id")
);
