import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-72 md:w-98 min-h-76 md:min-h-78 px-2 py-2 bg-white rounded-md shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}
