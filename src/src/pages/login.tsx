import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../cases/auth/hooks/use-sign-in";

export function LoginPage() {
  const { mutate, isPending, error } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      mutate(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Login realizado!");
            navigate("/");
          },
          onError: () => {
            toast.error("Credenciais inválidas!");
          }
        }
      );
      
    } catch (err: any) {
      toast.error('Erro ao tentar acessar.');
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
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

        <Button className="bg-primary text-white w-full py-2 rounded">
          Entrar
        </Button>

        <h2>Não tem conta? Cria a sua agora!</h2>
        <Button className="bg-primary text-white w-full py-2 rounded" onClick={() => navigate('/signup')}>
          Criar conta
        </Button>
      </form>
    </div>
  );
}
