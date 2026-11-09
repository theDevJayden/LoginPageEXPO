import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Icon from './Icon';

const NAV_ITEMS = [
  { icon: 'account_balance_wallet', label: 'Home', href: '/home', replace: false },
  { icon: 'monitoring', label: 'Analytics', href: '/category-spending', replace: true },
  { icon: 'receipt_long', label: 'Transactions', href: '/expense-income', replace: false },
  { icon: 'manage_accounts', label: 'Settings', href: null, replace: false },
] as const;

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="h-16 flex-row items-center justify-around bg-surface px-2">
      {NAV_ITEMS.map((item) => {
        const active = item.href !== null && pathname === item.href;
        const href = item.href;
        const onPress =
          href === null || active
            ? undefined
            : item.replace
              ? () => router.replace(href)
              : () => router.navigate(href);
        return (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={onPress}
            className="min-h-[44px] min-w-[56px] items-center justify-center gap-0.5"
          >
            <Icon name={item.icon} size={24} color={active ? '#003527' : '#404944'} />
            <Text className={`font-jakarta-bold text-[10px] ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
