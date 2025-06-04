import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account, Label } from '@/types/account';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([]);

  const addAccount = (account: Account) => {
    accounts.value.push(account);
  };

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id);
  };

  const updateAccount = (id: string, updatedAccount: Account) => {
    const index = accounts.value.findIndex(account => account.id === id);
    if (index !== -1) {
      accounts.value[index] = updatedAccount;
    }
  };

  const parseLabels = (labelsString: string): Label[] => {
    if (!labelsString.trim()) return [];
    return labelsString
      .split(';')
      .map(label => label.trim())
      .filter(label => label.length > 0)
      .map(label => ({ text: label }));
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    parseLabels
  };
}); 