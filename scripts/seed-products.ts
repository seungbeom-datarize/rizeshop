import { config } from "dotenv";

// Load .env.local file BEFORE importing db
config({ path: ".env.local" });

import { categories as categoriesData } from "../src/data/categories";
import {
  products as productsData,
  productVariants,
} from "../src/data/products";

async function seedProducts() {
  const { db } = await import("../src/db");
  const { categories, products, product_variants } = await import("../src/db/schema");

  try {
    console.log("Starting product seed...");

    // Insert categories
    console.log("Inserting categories...");
    const categoryInserts = categoriesData.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
    }));

    await db.insert(categories).values(categoryInserts).onConflictDoNothing();
    console.log(`✓ Inserted ${categoryInserts.length} categories`);

    // Insert products
    console.log("Inserting products...");
    const productInserts = productsData.map((prod) => ({
      id: prod.id,
      categoryId: prod.categoryId,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      images: prod.images,
      brand: prod.brand,
      createdAt: new Date(prod.createdAt),
    }));

    await db.insert(products).values(productInserts).onConflictDoNothing();
    console.log(`✓ Inserted ${productInserts.length} products`);

    // Insert product variants
    console.log("Inserting product variants...");
    const variantInserts = productVariants.map((variant) => ({
      id: variant.id,
      productId: variant.productId,
      name: variant.name,
      value: variant.value,
      additionalPrice: variant.additionalPrice,
      stock: variant.stock,
    }));

    await db
      .insert(product_variants)
      .values(variantInserts)
      .onConflictDoNothing();
    console.log(`✓ Inserted ${variantInserts.length} product variants`);

    console.log("\n✓ Successfully seeded products!");
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedProducts();
