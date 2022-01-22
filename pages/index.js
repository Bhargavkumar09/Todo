import Head from "next/head";

export default function Home() {
  return (
    <>
      <h1>My Todo App</h1>
      <input type="text" />
      <button type="submit">Add</button>
      <ul>
        <li>Go to vishal's house</li>
        <li>Learn something new</li>
        <li>Implement it straight after</li>
      </ul>
    </>
  );
}
