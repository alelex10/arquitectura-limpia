// apps/backend/src/server.ts
import app from "./app";
import { sequelize } from "./config/database";

const PORT = process.env.PORT ?? 4000;

async function start() {
    console.log("Starting server...");
	try {
		await sequelize.authenticate();
		console.log("Database connected");
		// si quieres sincronizar modelos en dev:
		// await sequelize.sync({ alter: true });

		app.listen(PORT, () => {
			console.log(`Server listening on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

start();

