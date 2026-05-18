import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Category } from '@/constants/categories';

export type RootStackParamList = {
  Home: undefined;
  Chat: { category: Category };
  Result: { sessionId: string };
  History: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
