function LogInForm() {
  return (
    <form className="flex flex-col">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LogInForm;