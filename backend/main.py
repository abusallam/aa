from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api import agent, content

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(agent.router, prefix="/api/agent", tags=["agent"])
app.include_router(content.router, prefix="/api/content", tags=["content"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AgentSaaS-Pro Backend!"}
