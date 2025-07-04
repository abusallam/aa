from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from ..database import get_db
from ..agent.agent import process_command  # Assuming this function exists

router = APIRouter()

class AgentCommand(BaseModel):
    text: str

@router.post("/")
async def handle_agent_command(command: AgentCommand, db: Annotated[Session, Depends(get_db)]):
    # Here, you would integrate with your AI agent logic
    # For now, let's call a placeholder function
    try:
        response = process_command(command.text, db)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
def get_agent_status():
    return {"status": "Agent API is running"}
