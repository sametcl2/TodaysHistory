import store from 'store'
import { showToast } from 'store/toast'
import { ToastTypes } from 'types/toast'

type CreateToastType = {
  title: string
  subTitle: string
  show: boolean
  type: ToastTypes
}

export const handleCreateToast = ({ title, subTitle, show, type }: CreateToastType) => {
  store.dispatch(showToast({ title, subTitle, show, type }))
}
