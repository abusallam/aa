import os
import google.generativeai as genai
from sqlalchemy.orm import Session
from ..models import Page
from ..api.content import PageCreate
from typing import List
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
client = genai.GenerativeModel("gemini-pro")

def list_files_tool(path: str) -> str:
    """
    Lists all files and directories in a specified path. 
    Use this to explore the project structure.
    """
    try:
        if not os.path.exists(path) or not os.path.isdir(path):
            return f"Error: Path '{path}' is not a valid directory."
        
        items = os.listdir(path)
        if not items:
            return f"The directory '{path}' is empty."
        
        return "\n".join(items)
    except Exception as e:
        return f"Error listing files: {e}"

def read_file_tool(path: str) -> str:
    """
    Reads the entire content of a file.
    Use this to understand existing code or content before making changes.
    """
    try:
        if not os.path.exists(path) or not os.path.isfile(path):
            return f"Error: File '{path}' not found."
        
        with open(path, "r") as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {e}"

def write_file_tool(path: str, content: str) -> str:
    """
    Writes or overwrites content to a file.
    This is useful for creating new files or modifying existing ones.
    """
    try:
        with open(path, "w") as f:
            f.write(content)
        return f"File '{path}' written successfully."
    except Exception as e:
        return f"Error writing to file: {e}"

def create_page_tool(title: str, slug: str, content: str, db: Session) -> str:
    """Creates a new page in the database."""
    try:
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
        return f"Error creating page: {e}"

def update_page_tool(slug: str, content: str, db: Session) -> str:
    """Updates the content of an existing page."""
    try:
        db_page = db.query(Page).filter(Page.slug == slug).first()
        if not db_page:
            return f"Error: Page with slug '{slug}' not found."
        
        db_page.content = content
        db.add(db_page)
        db.commit()
        db.refresh(db_page)
        return f"Page with slug '{slug}' updated successfully."
    except Exception as e:
        return f"Error updating page: {e}"

def delete_page_tool(slug: str, db: Session) -> str:
    """Deletes a page from the database."""
    try:
        db_page = db.query(Page).filter(Page.slug == slug).first()
        if not db_page:
            return f"Error: Page with slug '{slug}' not found."
        
        db.delete(db_page)
        db.commit()
        return f"Page with slug '{slug}' deleted successfully."
    except Exception as e:
        return f"Error deleting page: {e}"

tools = [
    {
        "type": "function",
        "function": {
            "name": "list_files_tool",
            "description": "Lists all files and directories in a given path.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path of the directory to list."
                    }
                },
                "required": ["path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_file_tool",
            "description": "Reads the content of a file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path of the file to read."
                    }
                },
                "required": ["path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "write_file_tool",
            "description": "Writes content to a file, creating it if it doesn't exist.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path of the file to write to."
                    },
                    "content": {
                        "type": "string",
                        "description": "The content to write to the file."
                    }
                },
                "required": ["path", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_page_tool",
            "description": "Creates a new website page with a given title, URL slug, and content.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title of the new page."
                    },
                    "slug": {
                        "type": "string",
                        "description": "The URL slug for the new page (must be unique)."
                    },
                    "content": {
                        "type": "string",
                        "description": "The HTML or Markdown content of the new page."
                    }
                },
                "required": ["title", "slug", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_page_tool",
            "description": "Updates the content of an existing website page identified by its slug.",
            "parameters": {
                "type": "object",
                "properties": {
                    "slug": {
                        "type": "string",
                        "description": "The URL slug of the page to update."
                    },
                    "content": {
                        "type": "string",
                        "description": "The new HTML or Markdown content for the page."
                    }
                },
                "required": ["slug", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_page_tool",
            "description": "Deletes a website page identified by its slug.",
            "parameters": {
                "type": "object",
                "properties": {
                    "slug": {
                        "type": "string",
                        "description": "The URL slug of the page to delete."
                    }
                },
                "required": ["slug"]
            }
        }
    }
]

def process_command(command_text: str, db: Session) -> str:
    """
    Processes a natural language command using the AI agent,
    leveraging OpenAI's function calling capabilities.
    """
    # Gemini models typically don't take a 'system' role in the same way as OpenAI.
    # The system instructions are often part of the model's initial configuration or prompt.
    # For tool use, the prompt is typically just the user's query.
    chat = client.start_chat(history=[])
    
    try:
        # Send the message with tools to Gemini
        # Gemini's send_message automatically handles tool_choice based on tools provided
        response = chat.send_message(command_text, tools=tools)
        
        # Access the candidate to get potential function calls or text response
        candidate = response.candidates[0]
        
        if candidate.function_calls:
            # If function calls are detected, process them
            available_functions = {
                "list_files_tool": list_files_tool,
                "read_file_tool": read_file_tool,
                "write_file_tool": write_file_tool,
                "create_page_tool": create_page_tool,
                "update_page_tool": update_page_tool,
                "delete_page_tool": delete_page_tool,
            }
            
            # Assuming a single function call for simplicity, similar to OpenAI example
            tool_call = candidate.function_calls[0]
            function_name = tool_call.name
            function_to_call = available_functions.get(function_name)
            
            if function_to_call:
                # Convert `tool_call.args` (which is a dict) to `function_args` directly
                function_args = {k: v for k, v in tool_call.args.items()}
                
                # Pass db session to the tool function
                tool_response = function_to_call(db=db, **function_args)
                return tool_response
            else:
                return f"Error: Tool '{function_name}' not found."
        elif candidate.content.parts:
            # If no tool call, return the AI's direct response content
            # Gemini's content is in parts, join them if multiple
            return "".join(part.text for part in candidate.content.parts)
        else:
            return "Could not process command."

    except Exception as e:
        return f"Could not process command with AI: {e}"
