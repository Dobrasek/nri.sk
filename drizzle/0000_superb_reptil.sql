CREATE TABLE "entitlements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"tier" text NOT NULL,
	"packet_slug" text NOT NULL,
	"source" text DEFAULT 'stripe' NOT NULL,
	"stripe_session_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "entitlements_user_tier_idx" ON "entitlements" USING btree ("user_id","tier");