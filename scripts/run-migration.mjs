import { readFileSync } from "node:fs";
import dns from "node:dns/promises";
import net from "node:net";
import { Client } from "pg";

async function getIPv4(host) {
  try {
    const a = await dns.resolve4(host);
    return a[0];
  } catch {
    return null;
  }
}

async function getIPv6(host) {
  try {
    const aaaa = await dns.resolve6(host);
    return aaaa[0];
  } catch {
    return null;
  }
}

const host = "db.ibzbznhkowqnehbvcctk.supabase.co";
const password = "r+u8Z%TpPc*Bf*/";

console.log(`Resolving ${host}...`);
const [v4, v6] = await Promise.all([getIPv4(host), getIPv6(host)]);
console.log(`IPv4: ${v4 || "none"}`);
console.log(`IPv6: ${v6 || "none"}`);

const targets = [];
if (v4) targets.push({ host: v4, family: 4, label: "IPv4" });
if (v6) targets.push({ host: v6, family: 6, label: "IPv6" });

if (targets.length === 0) {
  console.error("No resolvable IP for DB host. Exiting.");
  process.exit(1);
}

// Test TCP connectivity first
for (const t of targets) {
  await new Promise((resolve) => {
    const sock = net.createConnection({ host: t.host, port: 5432, family: t.family });
    sock.setTimeout(8000);
    sock.once("connect", () => {
      console.log(`✓ TCP ${t.label} (${t.host}:5432) reachable`);
      sock.end();
      resolve();
    });
    sock.once("error", (e) => {
      console.log(`✗ TCP ${t.label} failed: ${e.message}`);
      resolve();
    });
    sock.once("timeout", () => {
      console.log(`✗ TCP ${t.label} timeout`);
      sock.destroy();
      resolve();
    });
  });
}

// Try pg with each IP
for (const t of targets) {
  const client = new Client({
    host: t.host,
    port: 5432,
    user: "postgres",
    password,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
    family: t.family,
    connectionTimeoutMillis: 10000,
  });
  try {
    console.log(`\nTrying ${t.label} (${t.host})...`);
    await client.connect();
    console.log("✓ Connected");
    const sql = readFileSync("supabase/migrations/0001_init.sql", "utf8");
    console.log("Running migration...");
    await client.query(sql);
    console.log("✓ Migration applied successfully.");
    await client.end();
    process.exit(0);
  } catch (err) {
    console.log(`✗ ${t.label} failed: ${err.message}`);
    try { await client.end(); } catch {}
  }
}

console.error("\nAll attempts failed.");
process.exit(1);
