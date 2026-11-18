# Contexto Completo del Proyecto CV-CREATOR-APP


================================================
ðŸ“„ ARCHIVO: .env
================================================

EXPO_PUBLIC_SUPABASE_URL=https://kckesjijxugitfztrnga.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_vVB0g0rG_gb_tSeYD3CyvQ_xz0NHcPt

================================================
ðŸ“„ ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo

example

# generated native folders
/ios
/android


================================================
ðŸ“„ ARCHIVO: AGENTS.md
================================================

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


================================================
ðŸ“„ ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "mi-chat-app",
    "slug": "mi-chat-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "michatapp",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76
        }
      ],
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}


================================================
ðŸ“„ ARCHIVO: CLAUDE.md
================================================




================================================
ðŸ“„ ARCHIVO: env.d.ts
================================================

declare const proccess: {
    env: {
        readonly EXPO_PUBLIC_SUPABASE_URL: string;
        readonly EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
        readonly [key: string]: string | undefined;
    };
};

================================================
ðŸ“„ ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
ðŸ“„ ARCHIVO: package.json
================================================

{
  "name": "mi-chat-app",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo/ui": "~57.0.26",
    "@supabase/supabase-js": "^2.119.1",
    "@tanstack/react-query": "^5.108.0",
    "expo": "~57.0.33",
    "expo-constants": "~57.0.24",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.5",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.14",
    "expo-router": "~57.0.31",
    "expo-secure-store": "~57.0.4",
    "expo-splash-screen": "~57.0.11",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1",
    "zustand": "^5.1.0"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}


================================================
ðŸ“„ ARCHIVO: README.md
================================================

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


================================================
ðŸ“„ ARCHIVO: scripts\reset-project.js
================================================

#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /src and /scripts directories to /example based on user input and creates a new /src/app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["src", "scripts"];
const exampleDir = "example";
const newAppDir = "src/app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /src/app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /src/app directory created.");

    // Create index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 src/app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 src/app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit src/app/index.tsx to edit the main screen.\n3. Put all your application code in /src, only screens and layout files should be in /src/app.${
        userInput === "y"
          ? `\n4. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);


================================================
ðŸ“„ ARCHIVO: src\app\(app)\chat\[roomId].tsx
================================================

import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { Message } from "@features/chat/domain/entities/Message";
import { useChat } from "@features/chat/presentation/hooks/useChat";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { messages, sendMessage, isLoading } = useChat(roomId);
  const user = useAuthStore((s) => s.user);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) listRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  }, [input, sendMessage]);

  const renderMsg = ({ item }: { item: Message }) => {
    const isOwn = item.userId === user?.id;
    return (
      <View style={[styles.row, isOwn && styles.rowOwn]}>
        <View style={[styles.bubble, isOwn ? styles.own : styles.other]}>
          {!isOwn && <Text style={styles.author}>{item.authorUsername}</Text>}
          <Text style={[styles.text, isOwn && styles.textOwn]}>
            {item.content}
          </Text>
          <Text style={styles.time}>
            {item.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderMsg}
        contentContainerStyle={{ padding: 12 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  row: { flexDirection: "row", marginVertical: 4 },
  rowOwn: { justifyContent: "flex-end" },
  bubble: { maxWidth: "75%", borderRadius: 12, padding: 10 },
  own: { backgroundColor: "#007AFF" },
  other: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e0e0e0" },
  author: { fontSize: 11, fontWeight: "600", color: "#555", marginBottom: 2 },
  text: { fontSize: 15, color: "#000" },
  textOwn: { color: "#fff" },
  time: { fontSize: 10, color: "#aaa", marginTop: 4, alignSelf: "flex-end" },
  inputRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: { color: "#fff", fontSize: 16 },
});


================================================
ðŸ“„ ARCHIVO: src\app\(app)\index.tsx
================================================

import { Room } from "@features/chat/domain/entities/Message";
import { useRooms } from "@features/chat/presentation/hooks/useRooms";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RoomsScreen() {
  const { rooms, isLoading, createRoom, isCreating, createError } = useRooms();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");

  const handleCreate = () => {
    if (!roomName.trim() || isCreating) return;
    createRoom(roomName.trim(), {
      onSuccess: () => {
        setRoomName("");
        setModalVisible(false);
      },
    });
  };

  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity
      style={styles.roomItem}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <Text style={styles.roomName}># {item.name}</Text>
      <Text style={styles.roomDate}>{item.createdAt.toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(r) => r.id}
        renderItem={renderRoom}
        contentContainerStyle={rooms.length === 0 ? { flex: 1 } : undefined}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.empty}>No hay salas aún. ¡Crea una!</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Nueva sala</Text>
            {createError && <Text style={styles.dialogError}>{createError}</Text>}
            <TextInput
              style={styles.dialogInput}
              placeholder="Nombre de la sala"
              value={roomName}
              onChangeText={setRoomName}
              autoFocus
              maxLength={50}
            />
            <View style={styles.dialogActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createBtn, isCreating && { opacity: 0.6 }]}
                onPress={handleCreate}
                disabled={isCreating}
              >
                {isCreating ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.createText}>Crear</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { color: "#999", fontSize: 16 },
  roomItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomName: { fontSize: 16, fontWeight: "600" },
  roomDate: { fontSize: 12, color: "#999" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 32 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  dialog: { backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  dialogTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  dialogError: { color: "red", fontSize: 13, marginBottom: 8 },
  dialogInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  dialogActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelBtn: { padding: 10 },
  cancelText: { color: "#666", fontSize: 15 },
  createBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});


================================================
ðŸ“„ ARCHIVO: src\app\(app)\_layout.tsx
================================================

import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function AppLayout() {
  const { logout } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#007AFF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Salas de Chat",
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{ marginRight: 4 }}>
              <Text style={{ color: "#fff", fontSize: 14 }}>Salir</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="chat/[roomId]" options={{ title: "Chat" }} />
    </Stack>
  );
}



================================================
ðŸ“„ ARCHIVO: src\app\(auth)\login.tsx
================================================

import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido 👋</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => login({ email, password })}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>
      <Link href="/(auth)/register" style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "red", marginBottom: 12, textAlign: "center" },
  link: { marginTop: 16, textAlign: "center", color: "#007AFF" },
});



================================================
ðŸ“„ ARCHIVO: src\app\(auth)\register.tsx
================================================

import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, isLoading, error } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Usuario (sin espacios)"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña (mín. 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => register({ email, password, username })}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>
      <Link href="/(auth)/login" style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "red", marginBottom: 12, textAlign: "center" },
  link: { marginTop: 16, textAlign: "center", color: "#007AFF" },
});



================================================
ðŸ“„ ARCHIVO: src\app\(auth)\_layout.tsx
================================================

import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}



================================================
ðŸ“„ ARCHIVO: src\app\explore.tsx
================================================

import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('../../assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText type="small">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\index.tsx
================================================

import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\_layout.tsx
================================================

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '@shared/infrastructure/supabase/client';
import { useAuthStore } from '@features/auth/presentation/store/authStore';
import { SupabaseAuthRepository } from '@features/auth/infrastructure/repositories/SupabaseAuthRepository';
 
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } }
});
const authRepo = new SupabaseAuthRepository();
 
function AuthGuard() {
  const { user, setUser } = useAuthStore();
  const segments = useSegments();
  const router   = useRouter();
 
  useEffect(() => {
    // Restaurar sesión desde AsyncStorage al iniciar la app
    authRepo.getCurrentUser().then(setUser);
 
    // Escuchar cambios de sesión: token expirado, logout en otro dispositivo
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const user = await authRepo.getCurrentUser();
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);
 
  useEffect(() => {
    const inAuth = segments[0] === '(auth)';
    if (!user && !inAuth) router.replace('/(auth)/login');
    if (user  && inAuth)  router.replace('/(app)');
  }, [user, segments]);
 
  return <Slot />;
}
 
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard />
    </QueryClientProvider>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.tsx
================================================

import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.web.tsx
================================================

import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View style={styles.background} entering={keyframe.duration(DURATION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.tsx
================================================

import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.web.tsx
================================================

import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\external-link.tsx
================================================

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\hint-row.tsx
================================================

import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-text.tsx
================================================

import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-view.tsx
================================================

import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}


================================================
ðŸ“„ ARCHIVO: src\components\ui\collapsible.tsx
================================================

import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\web-badge.tsx
================================================

import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});


================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;


================================================
ðŸ“„ ARCHIVO: src\features\auth\application\use-cases\LoginUseCase.ts
================================================

import { AuthError } from "../../../../shared/domain/errors/AppError";
import { User } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class LoginUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!email || !password)
      throw new AuthError("Email y contraseña son requeridos");
    try {
      return await this.authRepo.login(email, password);
    } catch (error) {
      throw new AuthError("Credenciales inválidas", error);
    }
  }
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\application\use-cases\RegisterUseCase.ts
================================================

import { AuthError } from "../../../../shared/domain/errors/AppError";
import { User } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class RegisterUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(email: string, password: string, username: string): Promise<User> {
    if (!email || !password || !username)
      throw new AuthError('Todos los campos son requeridos');
    if (password.length < 6)
      throw new AuthError('La contraseña debe tener al menos 6 caracteres');
    if (username.includes(' '))
      throw new AuthError('El username no puede contener espacios');
    try {
      return await this.authRepo.register(email, password, username);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrar usuario';
      throw new AuthError(message, error);
    }
  }
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\domain\entities\User.ts
================================================

export interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\domain\repositories\IAuthRepository.ts
================================================

import { User } from '../entities/User';

export interface IAuthRepository {
    login(email: string, password: string) : Promise<User>;
    register(email: string, password: string, username: string): Promise<User>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\infrastructure\repositories\SupabaseAuthRepository.ts
================================================

import { supabase } from "../../../../shared/infrastructure/supabase/client";
import { User } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class SupabaseAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) throw error;

    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", data.user.id)
      .single();

    return {
      id: data.user.id,
      email: data.user.email!,
      username: profile?.username ?? "",
      avatarUrl: profile?.avatar_url ?? undefined,
    };
  }

  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error("No se pudo crear el usuario");
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, username });
    if (profileError) throw new Error(profileError.message);
    return { id: data.user.id, email: data.user.email!, username };
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();
    return {
      id: user.id,
      email: user.email!,
      username: profile?.username ?? "",
    };
  }
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\presentation\hooks\useAuth.ts
================================================

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { RegisterUseCase } from "../../application/use-cases/RegisterUseCase";
import { SupabaseAuthRepository } from "../../infrastructure/repositories/SupabaseAuthRepository";
import { useAuthStore } from "../store/authStore";

type RegisterDto = { email: string; password: string; username: string };

const authRepo = new SupabaseAuthRepository();
const loginUseCase = new LoginUseCase(authRepo);
const registerUseCase = new RegisterUseCase(authRepo);

export function useAuth() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  // useMutation de TanStack Query maneja isLoading y error automáticamente
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUseCase.execute(email, password),
    onSuccess: (user) => {
      setUser(user);
      router.replace("/(app)");
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password, username }: RegisterDto) =>
      registerUseCase.execute(email, password, username),
    onSuccess: (user) => {
      setUser(user);
      router.replace("/(app)");
    },
  });

  const logout = async () => {
    try {
      await authRepo.logout();
    } finally {
      setUser(null);
      router.replace("/(auth)/login");
    }
  };

  return {
    user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error:
      loginMutation.error?.message ?? registerMutation.error?.message ?? null,
  };
}


================================================
ðŸ“„ ARCHIVO: src\features\auth\presentation\store\authStore.ts
================================================

import { create } from 'zustand';
import { User } from '../../domain/entities/User';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));



================================================
ðŸ“„ ARCHIVO: src\features\chat\application\use-cases\CreateRoomUseCase.ts
================================================

import { ChatError } from "../../../../shared/domain/errors/AppError";
import { Room } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class CreateRoomUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}
  async execute(name: string, userId: string): Promise<Room> {
    if (!name.trim()) throw new ChatError("El nombre de la sala es requerido");
    return this.chatRepo.createRoom(name.trim(), userId);
  }
}



================================================
ðŸ“„ ARCHIVO: src\features\chat\application\use-cases\GetMessagesUseCase.ts
================================================

import { Message } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class GetMessagesUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}
  execute(roomId: string): Promise<Message[]> {
    return this.chatRepo.getMessages(roomId);
  }
}


================================================
ðŸ“„ ARCHIVO: src\features\chat\application\use-cases\SendMessageUseCase.ts
================================================

import { ChatError } from "../../../../shared/domain/errors/AppError";
import { Message } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class SendMessageUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}
  async execute(
    roomId: string,
    userId: string,
    content: string,
  ): Promise<Message> {
    const trimmed = content.trim();
    if (!trimmed) throw new ChatError("El mensaje no puede estar vacío");
    if (trimmed.length > 500) throw new ChatError("Máximo 500 caracteres");
    return this.chatRepo.sendMessage(roomId, userId, trimmed);
  }
}



================================================
ðŸ“„ ARCHIVO: src\features\chat\application\use-cases\SubscribeToRoomUseCase.ts
================================================

import { Message } from "../../domain/entities/Message";
import { IChatRepository } from "../../domain/repositories/IChatRepository";

export class SubscribeToRoomUseCase {
  constructor(private readonly chatRepo: IChatRepository) {}
  execute(roomId: string, onMessage: (msg: Message) => void): () => void {
    return this.chatRepo.subscribeToRoom(roomId, onMessage);
  }
}



================================================
ðŸ“„ ARCHIVO: src\features\chat\domain\entities\Message.ts
================================================

export interface Message {
  id:           string;
  roomId:       string;
  userId:       string;
  content:      string;
  createdAt:    Date;
  authorUsername?: string; // Desnormalización controlada para la UI
}

export interface Room {
  id:           string;
  name:         string;
  createdBy:    string;
  createdAt:    Date;
}


================================================
ðŸ“„ ARCHIVO: src\features\chat\domain\entities\Room.ts
================================================




================================================
ðŸ“„ ARCHIVO: src\features\chat\domain\repositories\IChatRepository.ts
================================================

import { Message, Room } from "../entities/Message";

export interface IChatRepository {
  getRooms(): Promise<Room[]>;
  createRoom(name: string, userId: string): Promise<Room>;
  getMessages(roomId: string): Promise<Message[]>;
  sendMessage(
    roomId: string,
    userId: string,
    content: string,
  ): Promise<Message>;
  // Devuelve la función unsubscribe, compatible con el return de useEffect
  subscribeToRoom(
    roomId: string,
    onMessage: (msg: Message) => void,
  ): () => void;
}


================================================
ðŸ“„ ARCHIVO: src\features\chat\infrastructure\repositories\SupabaseChatRepository.ts
================================================

import { supabase } from "@shared/infrastructure/supabase/client";
import { Message, Room } from "@features/chat/domain/entities/Message";
import { IChatRepository } from "@features/chat/domain/repositories/IChatRepository";
export class SupabaseChatRepository implements IChatRepository {
 
  async getRooms(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms').select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(this.mapRoom);
  }
 
  async createRoom(name: string, userId: string): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms').insert({ name, created_by: userId })
      .select().single();
    if (error) throw error;
    return this.mapRoom(data);
  }
 
  async getMessages(roomId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('id, room_id, user_id, content, created_at, profiles(username)')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .limit(50);
    if (error) throw error;
    return (data ?? []).map(this.mapMessage);
  }
 
  async sendMessage(roomId: string, userId: string, content: string): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({ room_id: roomId, user_id: userId, content })
      .select('id, room_id, user_id, content, created_at, profiles(username)')
      .single();
    if (error) throw error;
    return this.mapMessage(data);
  }
 
  subscribeToRoom(roomId: string, onMessage: (msg: Message) => void): () => void {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', {
          event: 'INSERT', schema: 'public',
          table: 'messages', filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          // El payload no incluye el username — se obtiene con una query extra
          const { data: profile } = await supabase
            .from('profiles').select('username')
            .eq('id', payload.new.user_id).single();
          onMessage({
            id:             payload.new.id,
            roomId:         payload.new.room_id,
            userId:         payload.new.user_id,
            content:        payload.new.content,
            createdAt:      new Date(payload.new.created_at),
            authorUsername: profile?.username,
          });
        }
      ).subscribe();
 
    return () => { supabase.removeChannel(channel); };
  }
 
  private mapRoom = (raw: any): Room => ({
    id: raw.id, name: raw.name,
    createdBy: raw.created_by, createdAt: new Date(raw.created_at),
  });
 
  private mapMessage = (raw: any): Message => ({
    id: raw.id, roomId: raw.room_id, userId: raw.user_id,
    content: raw.content, createdAt: new Date(raw.created_at),
    authorUsername: raw.profiles?.username,
  });
}


================================================
ðŸ“„ ARCHIVO: src\features\chat\presentation\hooks\useChat.ts
================================================

import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { GetMessagesUseCase } from "@features/chat/application/use-cases/GetMessagesUseCase";
import { SendMessageUseCase } from "@features/chat/application/use-cases/SendMessageUseCase";
import { SubscribeToRoomUseCase } from "@features/chat/application/use-cases/SubscribeToRoomUseCase";
import { Message } from "@features/chat/domain/entities/Message";
import { SupabaseChatRepository } from "@features/chat/infrastructure/repositories/SupabaseChatRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const chatRepo = new SupabaseChatRepository();
const sendMessageUseCase = new SendMessageUseCase(chatRepo);
const getMessagesUseCase = new GetMessagesUseCase(chatRepo);
const subscribeUseCase = new SubscribeToRoomUseCase(chatRepo);

export function useChat(roomId: string) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  // Paso 1: obtener historial de mensajes con cache
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", roomId], // Clave única por sala
    queryFn: () => getMessagesUseCase.execute(roomId),
    enabled: !!user,
    // Los mensajes antiguos no se revalidan automáticamente.
    // Realtime se encarga de los mensajes nuevos.
    staleTime: Infinity,
  });

  // Paso 2: suscribirse al canal Realtime
  useEffect(() => {
    const unsubscribe = subscribeUseCase.execute(roomId, (newMsg) => {
      queryClient.setQueryData(["messages", roomId], (old: Message[] = []) => {
        // Evitar duplicados: el optimistic update ya agregó este mensaje
        const exists = old.some((m) => m.id === newMsg.id);
        return exists ? old : [...old, newMsg];
      });
    });
    return unsubscribe; // Cleanup al desmontar: cierra el WebSocket
  }, [roomId]);

  // Paso 3: enviar mensaje con optimistic update via useMutation
  const sendMutation = useMutation({
    mutationFn: (content: string) =>
      sendMessageUseCase.execute(roomId, user!.id, content),

    // onMutate se ejecuta ANTES de la petición (optimistic update)
    onMutate: async (content) => {
      const tempMsg: Message = {
        id: `temp-${Date.now()}`,
        roomId,
        userId: user!.id,
        content,
        createdAt: new Date(),
        authorUsername: user!.username,
      };
      queryClient.setQueryData(["messages", roomId], (old: Message[] = []) => [
        ...old,
        tempMsg,
      ]);
      return { tempMsg }; // Contexto para onError
    },

    onSuccess: (realMsg, _content, context) => {
      queryClient.setQueryData(["messages", roomId], (old: Message[] = []) =>
        old.map((m) => (m.id === context?.tempMsg.id ? realMsg : m)),
      );
    },

    onError: (_err, _content, context) => {
      if (context?.tempMsg) {
        queryClient.setQueryData(["messages", roomId], (old: Message[] = []) =>
          old.filter((m) => m.id !== context.tempMsg.id),
        );
      }
    },
  });

  return {
    messages,
    sendMessage: sendMutation.mutate,
    isLoading,
    isSending: sendMutation.isPending,
  };
}



================================================
ðŸ“„ ARCHIVO: src\features\chat\presentation\hooks\useRooms.ts
================================================

import { useAuthStore } from "@features/auth/presentation/store/authStore";
import { CreateRoomUseCase } from "@features/chat/application/use-cases/CreateRoomUseCase";
import { Room } from "@features/chat/domain/entities/Message";
import { SupabaseChatRepository } from "@features/chat/infrastructure/repositories/SupabaseChatRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const chatRepo = new SupabaseChatRepository();
const createRoomUseCase = new CreateRoomUseCase(chatRepo);

export function useRooms() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  // useQuery obtiene la lista de salas y la cachea bajo la clave ['rooms']
  const {
    data: rooms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => chatRepo.getRooms(),
    enabled: !!user, // Solo fetchar si hay usuario autenticado
  });

  // useMutation para crear una sala nueva
  const createMutation = useMutation({
    mutationFn: (name: string) => createRoomUseCase.execute(name, user!.id),
    onSuccess: (newRoom) => {
      // Actualizar el cache 
      queryClient.setQueryData(["rooms"], (old: Room[]) => [
        newRoom,
        ...(old ?? []),
      ]);
    },
  });

  return {
    rooms,
    isLoading,
    error: error?.message ?? null,
    createRoom: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message ?? null,
  };
}



================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.ts
================================================

export { useColorScheme } from 'react-native';


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.web.ts
================================================

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-theme.ts
================================================

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}


================================================
ðŸ“„ ARCHIVO: src\shared\domain\errors\AppError.ts
================================================


export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, cause?: unknown) {
    super('AUTH_ERROR', message, cause);
  }
}

export class ChatError extends AppError {
  constructor(message: string, cause?: unknown) {
    super('CHAT_ERROR', message, cause);
  }
}


================================================
ðŸ“„ ARCHIVO: src\shared\infrastructure\supabase\client.ts
================================================

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Supabase espera métodos getItem/setItem/removeItem, pero expo-secure-store
// expone getItemAsync/setItemAsync/deleteItemAsync – este adaptador los mapea.
const SecureStoreAdapter = {
  getItem: (key: string) =>
    SecureStore.getItemAsync(key),

  setItem: (key: string, value: string) =>
    SecureStore.setItemAsync(key, value),

  removeItem: (key: string) =>
    SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: SecureStoreAdapter, // tokens guardados en almacenamiento encriptado del dispositivo
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);


================================================
ðŸ“„ ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "env.d.ts",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "lib": [
      "ESNext"
    ],
    "ignoreDeprecations": "6.0",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "@features/*": [
        "src/features/*"
      ],
      "@shared/*": [
        "src/shared/*"
      ]
    }
  }
}