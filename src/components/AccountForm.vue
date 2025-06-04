<template>
  <div class="account-form">
    <div class="account-form__header">
      <h2>Учетные записи</h2>
      <el-button
        class="account-form__add-btn"
        type="default"
        icon="Plus"
        circle
        @click="handleAddAccount"
      />
    </div>
    <div class="account-form__hint">
      <el-icon class="account-form__hint-icon"><InfoFilled /></el-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>
    <div class="account-form__table">
      <div class="account-form__table-head">
        <div class="account-form__th">Метки</div>
        <div class="account-form__th">Тип записи</div>
        <div class="account-form__th">Логин</div>
        <div class="account-form__th">Пароль</div>
        <div class="account-form__th"></div>
      </div>
      <div class="account-form__table-body">
        <AccountItem
          v-for="account in store.accounts"
          :key="account.id"
          :account="account"
          @delete="handleDeleteAccount"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import AccountItem from './AccountItem.vue';
import { useAccountStore } from '@/stores/accountStore';
import type { Account } from '@/types/account';
import { InfoFilled } from '@element-plus/icons-vue';

const store = useAccountStore();

const createEmptyAccount = (): Account => ({
  id: uuidv4(),
  labels: [],
  type: 'Локальная',
  login: '',
  password: ''
});

const handleAddAccount = () => {
  store.addAccount(createEmptyAccount());
};

const handleDeleteAccount = (id: string) => {
  store.removeAccount(id);
};

onMounted(() => {
  // Здесь можно добавить загрузку сохраненных данных из localStorage
  const savedAccounts = localStorage.getItem('accounts');
  if (savedAccounts) {
    try {
      const accounts = JSON.parse(savedAccounts);
      accounts.forEach((account: Account) => {
        store.addAccount(account);
      });
    } catch (error) {
      console.error('Ошибка при загрузке сохраненных данных:', error);
    }
  }
});
</script>

<style scoped>
.account-form {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.account-form__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.account-form__header h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: #222;
  letter-spacing: 0.01em;
  opacity: 1;
}
.account-form__add-btn {
  background: #fff;
  border: 1.5px solid #dbeafe;
  color: #409eff;
  box-shadow: none;
  transition: border 0.2s;
}
.account-form__add-btn:hover {
  border: 1.5px solid #409eff;
  background: #f0f7ff;
}
.account-form__hint {
  display: flex;
  align-items: center;
  background: #eaf3ff;
  color: #409eff;
  font-size: 0.98rem;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  font-weight: 500;
}
.account-form__hint-icon {
  color: #409eff;
  font-size: 1.2rem;
}
.account-form__table {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  padding: 0.5rem 0.5rem 0.5rem 0;
  min-height: 0; /* важно для flex! */
  width: 100%;
}
.account-form__table-head {
  display: flex;
  width: 100%;
  background: #f9fafc;
  border-radius: 10px 10px 0 0;
  font-weight: 700;
  color: #b0b3b8;
  font-size: 0.97rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  flex: 0 0 auto;
}
.account-form__th {
  flex: 1 1 0;
  min-width: 0;
  padding: 0 8px;
}
.account-form__th:last-child {
  flex: 0 0 40px;
}
.account-form__table-body {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>