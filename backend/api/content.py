from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Page
from datetime import datetime

router = APIRouter()

# Pydantic schemas for request/response
class PageBase(BaseModel):
    title: str
    slug: str
    content: str

class PageCreate(PageBase):
    pass

class PageUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None

class PageResponse(PageBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

# CRUD Endpoints
@router.post("/", response_model=PageResponse)
def create_page(page: PageCreate, db: Annotated[Session, Depends(get_db)]):
    db_page = db.query(Page).filter(Page.slug == page.slug).first()
    if db_page:
        raise HTTPException(status_code=400, detail="Page with this slug already exists")
    
    db_page = Page(**page.dict())
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page

@router.get("/", response_model=List[PageResponse])
def get_all_pages(db: Annotated[Session, Depends(get_db)]):
    return db.query(Page).all()

@router.get("/{slug}", response_model=PageResponse)
def get_page_by_slug(slug: str, db: Annotated[Session, Depends(get_db)]):
    db_page = db.query(Page).filter(Page.slug == slug).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    return db_page

@router.put("/{slug}", response_model=PageResponse)
def update_page(slug: str, page: PageUpdate, db: Annotated[Session, Depends(get_db)]):
    db_page = db.query(Page).filter(Page.slug == slug).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    for key, value in page.dict(exclude_unset=True).items():
        setattr(db_page, key, value)
    
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page

@router.delete("/{slug}")
def delete_page(slug: str, db: Annotated[Session, Depends(get_db)]):
    db_page = db.query(Page).filter(Page.slug == slug).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    db.delete(db_page)
    db.commit()
    return {"message": "Page deleted successfully"}
