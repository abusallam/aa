const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface AgentCommandResponse {
  response: string;
}

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

interface PageCreate {
  title: string;
  slug: string;
  content: string;
}

interface PageUpdate {
  title?: string;
  slug?: string;
  content?: string;
}

export const sendAgentCommand = async (text: string): Promise<AgentCommandResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to send agent command");
  }

  return response.json();
};

export const getPages = async (): Promise<Page[]> => {
  const response = await fetch(`${API_BASE_URL}/api/content`);
  if (!response.ok) {
    throw new Error("Failed to fetch pages");
  }
  return response.json();
};

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const response = await fetch(`${API_BASE_URL}/api/content/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch page");
  }
  return response.json();
};

export const createPage = async (pageData: PageCreate): Promise<Page> => {
  const response = await fetch(`${API_BASE_URL}/api/content/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create page");
  }
  return response.json();
};

export const updatePage = async (slug: string, pageData: PageUpdate): Promise<Page> => {
  const response = await fetch(`${API_BASE_URL}/api/content/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update page");
  }
  return response.json();
};

export const deletePage = async (slug: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/content/${slug}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete page");
  }
  return response.json();
};
