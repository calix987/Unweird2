export default function PrivacyPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Privacy</h1>
      <p>Unweird processes your content to provide detection and rewriting results. In this demo, we do not store your text on our servers.
      If you sign in or subscribe later, we will update this policy.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Text you paste to analyze — processed in-memory for the result.</li>
        <li>Images you upload — analyzed in your browser; metadata is not transmitted.</li>
      </ul>
      <h2>What we don’t do</h2>
      <ul>
        <li>No sale of data.</li>
        <li>No training on your content unless you explicitly opt in (future).</li>
      </ul>
      <p className="mt-6">Contact: <a href="mailto:unweirdteam@gmail.com">unweirdteam@gmail.com</a></p>
    </article>
  );
}
