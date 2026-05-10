import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productNo: integer('product_no').notNull(),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  affiliateUrl: text('affiliate_url').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  action: text('action').notNull(),
  details: text('details').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(), // Contoh: 'theme'
  value: text('value').notNull(),      // Contoh: 'default', 'dark', 'coffee'
});

