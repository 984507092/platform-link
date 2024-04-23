<template>
  <div>
    <el-dialog v-model="isShowDialog" :title="title?'新增':'编辑'" width="200" center>
      <el-form :model="formData" ref="ruleFormRef" :rules="rules" label-width="auto">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="formData.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="formData.link" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="icon">
          <el-input v-model="formData.icon" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="模块名">
          <el-input v-model="formData.parentName" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCloseShow">取消</el-button>
          <el-button type="primary" @click="handleConfirm(ruleFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, ref, reactive} from 'vue';
import type {FormInstance, FormRules} from 'element-plus'

interface FormData {
  id?: string | number
  name: string,
  link: string,
  icon?: string,
  parentName?: string,
}

let emits = defineEmits(['close', 'confirm'])
const props = withDefaults(defineProps<{
  showDialog: boolean,
  title: boolean,
  form: FormData
}>(), {
  showDialog: false,
  title: true
})


const ruleFormRef = ref<FormInstance>()
let isShowDialog = ref<boolean>(false)
let formData: FormData = reactive({
  name: '',
  link: "",
  icon: "",
  parentName: '',
})


watch([() => props.showDialog, () => props.form, () => props.title], ([newVal, newFormVal, newTitle]) => {
  isShowDialog.value = newVal
  if (!newTitle && newFormVal.id) {
    formData = Object.assign(formData, newFormVal)
  }
}, {deep: true})

const rules = reactive<FormRules<FormData>>({
  name: [
    {required: true, message: '请输入类型名', trigger: 'blur'},
  ],
  link: [
    {required: true, message: '请输入链接', trigger: 'blur'},
  ],
})


const handleCloseShow = () => {
  emits('close')
}

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('confirm', formData)
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>

</style>
