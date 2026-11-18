import { AuthField, AuthForm, authCopy } from "@features/auth/presentation/components/AuthForm";
import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, isLoading, error } = useAuth();
  const submit = () => { if (!isLoading) register({ email, password, username }); };

  return (
    <AuthForm title="Crea tu cuenta" description="Elige el nombre con el que te verán en las salas."
      action="Crear cuenta" busy={isLoading} error={error} onSubmit={submit}
      footer={<Text style={authCopy.footer}>¿Ya tienes cuenta? <Link href="/(auth)/login" style={authCopy.link}>Inicia sesión</Link></Text>}>
      <AuthField label="Usuario" icon="user" placeholder="Usuario sin espacios" value={username}
        onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} autoComplete="username" />
      <AuthField label="Correo electrónico" icon="email" placeholder="nombre@correo.com"
        value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" />
      <AuthField label="Contraseña" icon="lock" password placeholder="Mínimo 6 caracteres" value={password}
        onChangeText={setPassword} autoCapitalize="none" autoComplete="new-password" returnKeyType="go" onSubmitEditing={submit} />
    </AuthForm>
  );
}
