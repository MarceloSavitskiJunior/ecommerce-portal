import { useState } from "react";
import { useSignUp } from "../cases/auth/hooks/use-sign-up";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const { mutate, isPending, error } = useSignUp();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    await mutate({name, email, password}, {onSuccess: () => (navigate('/'))});
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Criar conta</h1>

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-primary text-white w-full py-2 rounded">
          Criar conta
        </button>
      </form>
    </div>
  );
}
