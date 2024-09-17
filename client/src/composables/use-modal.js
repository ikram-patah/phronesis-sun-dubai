import { reactive, onMounted } from 'vue'

export function useModal(modals) {
  const modalIds = Array.isArray(modals) ? modals : [modals]

  const state = reactive({
    modal: {}
  })

  modalIds.forEach((modalId) => {
    state.modal[modalId] = null
  })

  function closeModal(modalId) {
    state.modal[modalId].hide()
  }

  function showModal(modalId) {
    Object.keys(state.modal).forEach((key) => {
      closeModal(key)
    })
    state.modal[modalId].show()
  }

  onMounted(() => {
    Object.keys(state.modal).forEach((modalId) => {
      state.modal[modalId] = new bootstrap.Modal(document.getElementById(modalId), {
        keyboard: false,
        backdrop: 'static'
      })
    })
  })

  return {
    closeModal,
    showModal
  }
}
