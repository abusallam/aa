# 🚀 AgentSaaS-Pro: AI-Enhanced SaaS Website

AgentSaaS-Pro is a modern, AI-powered SaaS website built with:

- ✅ Next.js (Frontend)
- ✅ FastAPI (Backend)
- ✅ PostgreSQL (Database)
- ✅ AI Agent (MCP-ready for dynamic logic)
- ✅ Docker Compose (for local & production deployment)
- ✅ Persistent storage for data and media
- ✅ Admin panel & chatbot interface powered by the AI agent

---

## 📁 Project Structure

```
project/
├── frontend/              # Next.js frontend
│   ├── pages/             # Homepage, contact, services
│   ├── components/        # Hero, Services, Chatbot, AdminPanel
│   ├── lib/               # agentClient.ts for API calls
│   └── public/assets/     # Cloned media assets
│
├── backend/               # FastAPI backend
│   ├── main.py            # Application entry
│   ├── agent/             # MCP/Aider integration
│   ├── api/               # REST APIs for agent/content
│   ├── models.py          # SQLAlchemy models
│   └── database.py        # DB session config
│
├── docker/                # Dockerfiles
│   ├── frontend/
│   └── backend/
│
├── docker-compose.yml     # Docker deployment
├── .env                   # Environment variables
└── volumes/               # Persistent volumes
```

---

## 🧠 AI Agent Features

- Generate or edit web pages dynamically
- Modify frontend layouts and backend logic
- Receive instructions via chatbot or admin UI
- Leverages Gemini Function Calling for robust command processing
- Works with Gemini or Aider-based models using MCP

---

## 📦 Technologies Used

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | Next.js + Tailwind CSS |
| Backend     | FastAPI (Python)  |
| Database    | PostgreSQL        |
| DevOps      | Docker Compose    |
| AI Agent    | MCP + Aider-ready |
| Storage     | Volume-mapped     |

---

## ⚙️ How to Run

### 1. Clone the Project

```bash
git clone https://github.com/YOUR_REPO/AgentSaaS-Pro.git
cd AgentSaaS-Pro
cp .env.example .env  # Update secrets and DB info
```

### 2. Start Docker

```bash
docker compose up --build
```

### 3. Access Services

| Service     | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| Website     | [http://localhost:3000](http://localhost:3000)             |
| API Server  | [http://localhost:8000](http://localhost:8000)             |
| Admin Panel | [http://localhost:3000/admin](http://localhost:3000/admin) |

---

## 🔐 Environment Variables

`.env` example:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/saas
GEMINI_API_KEY=...
JWT_SECRET=your_jwt_secret
```

---

## 💬 API & Agent Usage

### Endpoint

```http
POST /api/agent
```

### Request

```json
{
  "text": "Create a new pricing page with three tiers"
}
```

### Response

```json
{
  "response": "Page created and added to the menu"
}
```

---

## 📊 Admin Panel

* Manage pages
* Send commands to the AI
* View logs
* Requires JWT authentication

---

## 📥 Persistent Storage

PostgreSQL and uploads are stored outside Docker:

```yaml
volumes:
  postgres_data:
    driver: local
    driver_opts:
      type: none
      device: /srv/saas-db-data
      o: bind
```

Update `device:` to your preferred mount point.

---

## 🧱 Roadmap

* [x] Clone existing site design
* [x] AI chat widget with FastAPI (now with Function Calling!)
* [x] Admin panel with JWT
* [x] Docker Compose with volume mounts
* [ ] Auto-deploy via Coolify
* [ ] Multi-language support
* [ ] WebRTC support

---

## 📞 Support

This project is maintained by a senior AI developer and powered by MCP-compatible agents.

For advanced integrations, contact your Alpha Agent or add more tools via the backend.
