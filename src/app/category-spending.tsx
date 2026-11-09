import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import DonutChart from '../components/DonutChart';
import Icon from '../components/Icon';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/budget';
import { Category, Entry, OTHERS_CATEGORY_ID, toDateKey } from '../utils/entries';

type CategoryTotal = {
  category: Category;
  amount: number;
  share: number;
  count: number;
};

function getCategoryBreakdown(
  entries: Entry[],
  getCategory: (id: string | null) => Category | undefined,
  now: Date = new Date(),
) {
  const month = toDateKey(now).slice(0, 7);
  const byCategory = new Map<string, { category: Category; amount: number; count: number }>();
  let total = 0;

  for (const entry of entries) {
    if (entry.type !== 'expense' || !entry.date.startsWith(month)) continue;
    const category = getCategory(entry.categoryId) ?? getCategory(OTHERS_CATEGORY_ID);
    if (!category) continue;
    const row = byCategory.get(category.id) ?? { category, amount: 0, count: 0 };
    row.amount += entry.amount;
    row.count += 1;
    byCategory.set(category.id, row);
    total += entry.amount;
  }

  const rows: CategoryTotal[] = [...byCategory.values()]
    .map((row) => ({ ...row, share: total > 0 ? row.amount / total : 0 }))
    .sort((a, b) => b.amount - a.amount);

  return { rows, total };
}

const percentLabel = (share: number) => `${Math.round(share * 100)}%`;

export default function CategorySpendingScreen() {
  const { entries, getCategory } = useFinance();
  const { rows, total } = getCategoryBreakdown(entries, getCategory);
  const isEmpty = total <= 0 || rows.length === 0;
  const top = rows[0];

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentContainerClassName="gap-6 px-4 pb-8 pt-4">
        <Text className="font-jakarta-bold text-[24px] leading-8 tracking-tight text-primary">Category Spending</Text>

        <View className="items-center rounded-3xl bg-surface-container-lowest p-6 shadow-sm">
          <View className="h-56 w-56 items-center justify-center">
            <DonutChart
              size={224}
              viewBoxSize={100}
              radius={38}
              strokeWidth={12}
              trackColor="#e5eeff"
              segments={isEmpty ? [] : rows.map((row) => ({ value: row.share, color: row.category.color }))}
            />
            <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center px-12">
              {isEmpty ? (
                <>
                  <Text className="text-center font-jakarta-semibold text-[16px] text-on-surface-variant">
                    No expenses yet
                  </Text>
                  <Text className="mt-0.5 text-center font-sans text-[12px] text-on-surface-variant">This month</Text>
                </>
              ) : (
                <>
                  <Text
                    numberOfLines={2}
                    className="text-center font-jakarta-semibold text-[18px] leading-6 text-on-surface"
                  >
                    {top.category.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    className="mt-0.5 font-jakarta-bold text-[36px] leading-[44px] tracking-tight"
                    style={{ color: top.category.color }}
                  >
                    {percentLabel(top.share)}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between px-1">
            <Text className="font-jakarta-semibold text-[18px] leading-6 text-primary">All Categories</Text>
            <Text className="font-jakarta-semibold text-[10px] text-on-surface-variant">
              {`${rows.length} ${rows.length === 1 ? 'Category' : 'Categories'}`}
            </Text>
          </View>

          {isEmpty ? (
            <View className="items-center gap-2 rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
              <Icon name="pie_chart" size={28} color="#707974" />
              <Text className="font-jakarta-semibold text-[14px] text-on-surface">No spending this month</Text>
              <Text className="text-center font-sans text-[12px] text-on-surface-variant">
                Expenses you add this month will show up here by category.
              </Text>
            </View>
          ) : (
            rows.map((row) => (
              <View key={row.category.id} className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
                <View className="mb-1 flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center gap-2 pr-2">
                    <View
                      className="h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${row.category.color}20` }}
                    >
                      <Icon name={row.category.icon} size={20} color={row.category.color} />
                    </View>
                    <View className="flex-1">
                      <Text numberOfLines={1} className="font-jakarta-semibold text-[14px] leading-5 text-primary">
                        {row.category.name}
                      </Text>
                      <Text className="font-sans text-[12px] leading-4 text-on-surface-variant">
                        {`${row.count} ${row.count === 1 ? 'transaction' : 'transactions'}`}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-jakarta-bold text-[14px] leading-5 text-primary">
                      {formatRupiah(row.amount)}
                    </Text>
                    <View className="rounded-full px-2 py-0.5" style={{ backgroundColor: `${row.category.color}20` }}>
                      <Text className="font-jakarta-bold text-[10px]" style={{ color: row.category.color }}>
                        {percentLabel(row.share)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                  <View
                    className="h-full rounded-full"
                    style={{ width: `${row.share * 100}%`, backgroundColor: row.category.color }}
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <BottomNav />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
