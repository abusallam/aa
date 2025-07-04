import os
from openai import OpenAI
from sqlalchemy.orm import Session
from ..models import Page
from ..api.content import PageCreate, PageUpdate # Import Pydantic models for validation

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def process_command(command_text: str, db: Session) -> str:
    """
    Processes a natural language command using the AI agent.
    This is a simplified implementation.
    """
    command_text_lower = command_text.lower()

    if "create page" in command_text_lower:
        # Example: "Create page 'About Us' with slug 'about-us' and content 'This is the about page.'"
        try:
            parts = command_text.split("'")
            title = parts[1]
            slug = parts[3]
            content = parts[5]

            page_data = PageCreate(title=title, slug=slug, content=content)
            
            db_page = db.query(Page).filter(Page.slug == page_data.slug).first()
            if db_page:
                return f"Error: Page with slug '{slug}' already exists."

            new_page = Page(title=page_data.title, slug=page_data.slug, content=page_data.content)
            db.add(new_page)
            db.commit()
            db.refresh(new_page)
            return f"Page '{title}' created successfully with slug '{slug}'."
        except Exception as e:
            return f"Error creating page: {e}. Please ensure the command format is 'Create page 'TITLE' with slug 'SLUG' and content 'CONTENT'."

    elif "update page" in command_text_lower:
        # Example: "Update page with slug 'about-us' to content 'Updated about page content.'"
        try:
            parts = command_text.split("'")
            slug = parts[1]
            
            db_page = db.query(Page).filter(Page.slug == slug).first()
            if not db_page:
                return f"Error: Page with slug '{slug}' not found."

            # Simple update for content for now
            if "content" in command_text_lower and len(parts) > 3:
                updated_content = parts[3]
                db_page.content = updated_content
            else:
                return "Error: Update command missing content. Format: 'Update page with slug 'SLUG' to content 'NEW CONTENT'."

            db.add(db_page)
            db.commit()
            db.refresh(db_page)
            return f"Page with slug '{slug}' updated successfully."
        except Exception as e:
            return f"Error updating page: {e}. Please ensure the command format is 'Update page with slug 'SLUG' to content 'NEW CONTENT'."

    elif "delete page" in command_text_lower:
        # Example: "Delete page with slug 'about-us'."
        try:
            parts = command_text.split("'")
            slug = parts[1]

            db_page = db.query(Page).filter(Page.slug == slug).first()
            if not db_page:
                return f"Error: Page with slug '{slug}' not found."
            
            db.delete(db_page)
            db.commit()
            return f"Page with slug '{slug}' deleted successfully."
        except Exception as e:
            return f"Error deleting page: {e}. Please ensure the command format is 'Delete page with slug 'SLUG'."
    
    # Fallback to OpenAI for general commands
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for a SaaS website. Respond concisely."},
                {"role": "user", "content": command_text}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Could not process command with AI: {e}"
