import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Icon from '../components/Icon';

// Material Symbols Outlined paths used only on this screen.
const PATHS = {
  mail: 'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z',
  lock: 'M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z',
  lockReset: 'M520-120q-74 0-138.5-27.5T268-223l57-57q38 37 88 58.5T520-200q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198v7l73-73 57 56-170 170L30-490l57-56 73 74v-8q0-75 28.5-140.5t77-114q48.5-48.5 114-77T520-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-480q0 150-105 255T520-120Zm-80-200q-17 0-28.5-11.5T400-360v-120q0-17 11.5-28.5T440-520v-40q0-33 23.5-56.5T520-640q33 0 56.5 23.5T600-560v40q17 0 28.5 11.5T640-480v120q0 17-11.5 28.5T600-320H440Zm40-200h80v-40q0-17-11.5-28.5T520-600q-17 0-28.5 11.5T480-560v40Z',
  visibility: 'M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z',
  visibilityOff: 'm644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z',
  arrowForward: 'M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z',
  arrowBack: 'M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z',
};

const OUTLINE = '#707974';
const PLACEHOLDER = '#bfc9c3';

function Glyph({ d, size = 18, color = OUTLINE }: { d: string; size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960">
      <Path d={d} fill={color} />
    </Svg>
  );
}

type FieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secure?: boolean;
  onToggleSecure?: () => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words';
};

function Field({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secure,
  onToggleSecure,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: FieldProps) {
  const hasToggle = onToggleSecure !== undefined;
  return (
    <View className="gap-1">
      <Text className="font-jakarta-semibold text-[12px] text-on-surface-variant">{label}</Text>
      <View className="justify-center">
        <View className="absolute left-3.5 z-10" pointerEvents="none">
          {icon}
        </View>
        <TextInput
          className={`rounded-2xl bg-surface-container-low py-2.5 pl-10 font-sans text-[14px] text-on-surface ${hasToggle ? 'pr-11' : 'pr-4'}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          accessibilityLabel={label}
        />
        {hasToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${secure ? 'Show' : 'Hide'} ${label.toLowerCase()}`}
            onPress={onToggleSecure}
            hitSlop={8}
            className="absolute right-3 p-1"
          >
            <Glyph d={secure ? PATHS.visibility : PATHS.visibilityOff} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  // Placeholder submission: no validation or request yet.
  const goToLogin = () => router.replace('/');

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc]">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow gap-4 p-4 pb-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* Sign up form card */}
          <View className="gap-4 rounded-3xl bg-surface-container-lowest p-5 shadow-sm">
            <View className="gap-0.5">
              <View className="flex-row items-center justify-between">
                <Text className="font-jakarta-semibold text-[18px] leading-6 tracking-tight text-primary">
                  Sign up for an account
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Back to log in"
                  onPress={goToLogin}
                  hitSlop={8}
                >
                  <Glyph d={PATHS.arrowBack} size={20} color="#006c4a" />
                </Pressable>
              </View>
              <Text className="font-sans text-[12px] leading-4 text-[#707974]">
                Fill in your details below to get started in seconds.
              </Text>
            </View>

            <View className="gap-3.5">
              <Field
                label="Full Name"
                icon={<Icon name="person" size={18} color={OUTLINE} />}
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Maya Singh"
                autoCapitalize="words"
              />
              <Field
                label="Email Address"
                icon={<Glyph d={PATHS.mail} />}
                value={email}
                onChangeText={setEmail}
                placeholder="name@email.com"
                keyboardType="email-address"
              />
              <Field
                label="Password"
                icon={<Glyph d={PATHS.lock} />}
                value={password}
                onChangeText={setPassword}
                placeholder="Create strong password"
                secure={hidePassword}
                onToggleSecure={() => setHidePassword((hidden) => !hidden)}
              />
              <Field
                label="Confirm Password"
                icon={<Glyph d={PATHS.lockReset} />}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter your password"
                secure={hideConfirm}
                onToggleSecure={() => setHideConfirm((hidden) => !hidden)}
              />

              <Pressable
                accessibilityRole="button"
                onPress={goToLogin}
                className="mt-1 flex-row items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 shadow-md active:bg-primary-container"
              >
                <Text className="font-jakarta-semibold text-[14px] text-on-primary">Sign Up</Text>
                <Glyph d={PATHS.arrowForward} color="#ffffff" />
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row items-center justify-center px-2">
            <Text className="font-sans text-[14px] text-[#707974]">Already have an account? </Text>
            <Pressable accessibilityRole="link" onPress={goToLogin} className="ml-1 flex-row items-center">
              <Text className="font-jakarta-semibold text-[14px] text-secondary">Log in</Text>
              <Icon name="chevron_right" size={14} color="#006c4a" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
