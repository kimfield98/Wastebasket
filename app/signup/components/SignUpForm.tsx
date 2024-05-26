function SignUpForm() {
  return (
    <form className="flex flex-col">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;