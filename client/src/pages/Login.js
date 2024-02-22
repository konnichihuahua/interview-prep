import LoginForm from "../components/LoginForm";

function Login({ setIsAuth }) {
  return (
    <div className="flex items-center justify-center">
      <LoginForm setIsAuth={setIsAuth} />
    </div>
  );
}

export default Login;
