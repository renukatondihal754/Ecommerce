// Auth.js (Sign Up / Login)
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = () => {
      localStorage.setItem("user", JSON.stringify({ email }));
      alert(`Welcome, ${email}`);
    };
  
    const handleSignUp = () => {
      localStorage.setItem("user", JSON.stringify({ email }));
      alert(`Sign up successful! Welcome, ${email}`);
    };
  
    return (
      <div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    );
  };
  