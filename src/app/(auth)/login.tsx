import { AuthField, AuthForm, authCopy } from "@features/auth/presentation/components/AuthForm";
import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();
  const submit = () => { if (!isLoading) login({ email, password }); };

  return (
    <AuthForm title="Vuelve a conversar" description="Inicia sesión para entrar a tus salas."
      action="Iniciar sesión" busy={isLoading} error={error} onSubmit={submit}
      footer={<Text style={authCopy.footer}>¿No tienes cuenta? <Link href="/(auth)/register" style={authCopy.link}>Regístrate</Link></Text>}>
      <AuthField label="Correo electrónico" icon="email" placeholder="nombre@correo.com"
        value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" />
      <AuthField label="Contraseña" icon="lock" password placeholder="Tu contraseña" value={password}
        onChangeText={setPassword} autoCapitalize="none" autoComplete="current-password" returnKeyType="go" onSubmitEditing={submit} />
    </AuthForm>
  );
}
