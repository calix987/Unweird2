export default function PrivacyPage() {
  return (
    <div className="prose max-w-none">
      <h1>Privacy</h1>
      <p>Unweird processes your content to provide detection and rewriting results. In this demo, we do not store your text on our servers.</p>
      <h3>What we collect</h3>
      <ul>
        <li>Text you paste — processed in-memory for the result.</li>
        <li>Images you upload — analyzed in your browser; metadata is not transmitted.</li>
      </ul>
      <h3>What we don't do</h3>
      <ul>
        <li>No sale of data.</li>
        <li>No training on your content unless you explicitly opt in (future).</li>
      </ul>
      <h3>Contact</h3>
      <p>Email: <a href="mailto:unweirdteam@gmail.com">unweirdteam@gmail.com</a></p>
    </div>
  );
}
