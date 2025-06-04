<template>
  <div class="account-item-row">
    <el-form :model="formData" class="account-item-form" @submit.prevent>
      <el-form-item :error="errors.labels" class="account-item-cell">
        <el-input
          v-model="formData.labels"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="Значение"
          :maxlength="50"
          @blur="validateLabels"
          size="small"
          class="input-like-textarea"
        />
      </el-form-item>
      <el-form-item :error="errors.type" class="account-item-cell">
        <el-select
          v-model="formData.type"
          placeholder="Тип записи"
          @change="handleTypeChange"
          size="small"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </el-form-item>
      <el-form-item :error="errors.login" class="account-item-cell">
        <el-input
          v-model="formData.login"
          placeholder="Значение"
          :maxlength="100"
          @blur="validateLogin"
          size="small"
        />
      </el-form-item>
      <el-form-item
        v-if="formData.type === 'Локальная'"
        :error="errors.password"
        class="account-item-cell account-item-password"
      >
        <el-input
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Значение"
          :maxlength="100"
          @blur="validatePassword"
          size="small"
        >
          <template #suffix>
            <el-icon @click="showPassword = !showPassword" class="password-eye">
              <component :is="showPassword ? 'View' : 'Hide'" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <div v-else class="account-item-cell"></div>
      <div class="account-item-cell account-item-delete">
        <el-button class="delete-btn" type="default" icon="Delete" circle @click="handleDelete" />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Account, AccountFormData, AccountType } from '@/types/account'
import { useAccountStore } from '@/stores/accountStore'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const store = useAccountStore()

const formData = reactive<AccountFormData>({
  labels: '',
  type: 'Локальная',
  login: '',
  password: '',
})

const errors = reactive({
  labels: '',
  type: '',
  login: '',
  password: '',
})

const showPassword = ref(false)

const validateLabels = () => {
  errors.labels = ''
  if (formData.labels.length > 50) {
    errors.labels = 'Максимальная длина 50 символов'
  }
  updateAccount()
}

const validateType = () => {
  errors.type = ''
  if (!formData.type) {
    errors.type = 'Выберите тип записи'
  }
  updateAccount()
}

const validateLogin = () => {
  errors.login = ''
  if (!formData.login) {
    errors.login = 'Логин обязателен'
  } else if (formData.login.length > 100) {
    errors.login = 'Максимальная длина 100 символов'
  }
  updateAccount()
}

const validatePassword = () => {
  errors.password = ''
  if (formData.type === 'Локальная' && !formData.password) {
    errors.password = 'Пароль обязателен'
  } else if (formData.password && formData.password.length > 100) {
    errors.password = 'Максимальная длина 100 символов'
  }
  updateAccount()
}

const handleTypeChange = (value: AccountType) => {
  formData.type = value
  if (value === 'LDAP') {
    formData.password = ''
  }
  validateType()
}

const updateAccount = () => {
  if (
    !errors.labels &&
    !errors.type &&
    !errors.login &&
    (formData.type === 'LDAP' || !errors.password)
  ) {
    const updatedAccount: Account = {
      id: props.account.id,
      labels: store.parseLabels(formData.labels),
      type: formData.type,
      login: formData.login,
      password: formData.type === 'LDAP' ? null : formData.password,
    }
    store.updateAccount(props.account.id, updatedAccount)
  }
}

const handleDelete = () => {
  emit('delete', props.account.id)
}

onMounted(() => {
  formData.labels = props.account.labels.map((label) => label.text).join(';')
  formData.type = props.account.type
  formData.login = props.account.login
  formData.password = props.account.password || ''
})
</script>

<style scoped>
.account-item-row {
  display: flex;
  align-items: stretch;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin: 0 0.5rem;
}
.account-item-form {
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 0;
}
.account-item-cell {
  flex: 1 1 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
}
.account-item-password {
  min-width: 140px;
}
.account-item-delete {
  flex: 0 0 40px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.delete-btn {
  background: #fff;
  border: 1.5px solid #ffe4e6;
  color: #f56c6c;
  transition: border 0.2s;
}
.delete-btn:hover {
  border: 1.5px solid #f56c6c;
  background: #fff0f1;
}
.password-eye {
  cursor: pointer;
  font-size: 1.2em;
}
.input-like-textarea .el-textarea__inner {
  resize: none !important;
  border-radius: 6px;
  background: #fff;
  min-height: 38px;
  line-height: 1.2;
  padding: 0 11px;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  font-size: 15px;
  transition: border-color 0.2s;
  overflow: hidden !important;
}
.input-like-textarea .el-textarea__inner:focus {
  border-color: #409eff;
  outline: none;
}
</style>
