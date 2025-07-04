import React, { useState, useEffect } from 'react';
import { getPages, createPage, sendAgentCommand, Page as ContentPage } from '../../lib/agentClient';

const AdminPanel: React.FC = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageContent, setNewPageContent] = useState('');
  const [agentCommand, setAgentCommand] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPages = await getPages();
      setPages(fetchedPages);
    } catch (err) {
      setError('Failed to fetch pages.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle || !newPageSlug || !newPageContent) {
      setError('All fields are required to create a page.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await createPage({ title: newPageTitle, slug: newPageSlug, content: newPageContent });
      setNewPageTitle('');
      setNewPageSlug('');
      setNewPageContent('');
      fetchPages(); // Refresh the list of pages
    } catch (err) {
      setError(`Failed to create page: ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendAgentCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentCommand.trim()) {
      setAgentResponse('Please enter a command.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await sendAgentCommand(agentCommand);
      setAgentResponse(res.response);
      setAgentCommand('');
    } catch (err) {
      setAgentResponse(`Error sending command: ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {loading && <p className="text-blue-600 mb-4">Loading...</p>}

      {/* Create New Page Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create New Page</h2>
        <form onSubmit={handleCreatePage} className="space-y-4">
          <div>
            <label htmlFor="newPageTitle" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="newPageTitle"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPageSlug" className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              id="newPageSlug"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPageContent" className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
            <textarea
              id="newPageContent"
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newPageContent}
              onChange={(e) => setNewPageContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            Create Page
          </button>
        </form>
      </section>

      {/* Send Command to AI Agent Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send Command to AI Agent</h2>
        <form onSubmit={handleSendAgentCommand} className="space-y-4">
          <div>
            <label htmlFor="agentCommand" className="block text-sm font-medium text-gray-700">Command</label>
            <input
              type="text"
              id="agentCommand"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., Create page 'Contact Us' with slug 'contact' and content '...' "
              value={agentCommand}
              onChange={(e) => setAgentCommand(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
            disabled={loading}
          >
            Send Command
          </button>
          {agentResponse && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium">Agent Response:</h3>
              <p className="text-gray-800">{agentResponse}</p>
            </div>
          )}
        </form>
      </section>

      {/* Existing Pages Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Pages</h2>
        {pages.length === 0 ? (
          <p className="text-gray-600">No pages found. Create one above!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pages.map((page) => (
              <li key={page.id} className="py-4">
                <h3 className="text-xl font-medium text-gray-900">{page.title}</h3>
                <p className="text-gray-600">Slug: <span className="font-mono text-sm bg-gray-100 p-1 rounded">{page.slug}</span></p>
                <div className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: page.content.substring(0, 150) + '...' }}></div>
                {/* Add edit/delete buttons later if needed */}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
