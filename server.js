/**
 * QUANTUM NETWORK - Backend API Template (Node.js/Express)
 * This is a fully functional skeleton ready to be integrated with your Minecraft server database (MySQL/MongoDB)
 * Features includes: Live Stats, Store Syncing, Ban List fetching, User Auth.
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve the frontend files from root

// Dummy Data
const serverState = {
    online: true,
    players: 1540,
    maxPlayers: 2000,
    tps: 20.0,
    ping: 12
};

// 21. Custom API & Live Stats
app.get('/api/stats', (req, res) => {
    // In production, use a library like 'minecraft-server-util' to ping the server directly
    res.json({
        success: true,
        data: serverState
    });
});

// 3. Store / Ranks - Auto-Sync Hook (Tebex Webhook Simulator)
app.post('/api/store/webhook', (req, res) => {
    const { transaction_id, username, package_name } = req.body;
    console.log(`[STORE] Processing transaction ${transaction_id} for ${username} (Package: ${package_name})`);

    // Here you would execute rcon command: rcon.send(`say ${username} bought ${package_name}!`);
    // rcon.send(`lp user ${username} parent add ${package_name}`);

    res.json({ success: true, message: "Package delivered" });
});

// 14. Ban List API
app.get('/api/bans', (req, res) => {
    // Connect to LiteBans or AdvancedBan MySQL database
    res.json({
        success: true,
        data: [
            { player: "Hacker123", reason: "KillAura", staff: "ZEUS", expires: "Never" },
            { player: "ToxicUser", reason: "Spamming", staff: "ATHENA", expires: "2026-03-10" }
        ]
    });
});

// 13. Player Panel - Minecraft Auth Mock
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Connect to AuthMe MySQL DB or XenForo
    if (username && password) {
        res.json({ success: true, token: "mock_jwt_token_123", username });
    } else {
        res.status(401).json({ success: false, error: "Invalid credentials" });
    }
});

// 6. Discord Linking API
app.post('/api/users/link-discord', (req, res) => {
    const { mc_uuid, discord_id } = req.body;
    // Map Discord ID to MC UUID in DB for role syncing
    console.log(`[LINK] Linking MC UUID ${mc_uuid} to Discord ${discord_id}`);
    res.json({ success: true, message: "Accounts linked successfully." });
});

app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` QUANTUM NETWORK BACKEND STARTED ON PORT ${PORT}`);
    console.log(`===============================================`);
    console.log(`- API URL: http://localhost:${PORT}/api/stats`);
    console.log(`- Serving frontend on http://localhost:${PORT}/`);
});
