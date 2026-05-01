import { pgTable, pgEnum, uuid, text, integer, timestamp, date } from 'drizzle-orm/pg-core'

export const tierEnum = pgEnum('tier', ['young', 'teen'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  dob: date('dob').notNull(),
  tier: tierEnum('tier').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const decks = pgTable('decks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  topic: text('topic').notNull(),
  cardCount: integer('card_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').notNull().references(() => decks.id),
  front: text('front').notNull(),
  back: text('back').notNull(),
  hint: text('hint'),
  position: integer('position').notNull(),
})
