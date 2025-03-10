import fs from "fs";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "test") {
    if (fs.existsSync(".env.test")) {
        dotenv.config({ path: ".env.test" });
    } else {
        console.error("Error: .env.test file not found. Aborting tests.");
        process.exit(1);
    }
}
import("./testModels.js");
